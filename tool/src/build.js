const babel = require("@babel/core");
const fs = require("fs");
const getFiles = require("get-files-in-dir");
const path = require("path");
const postcss = require("postcss");
const postcss_autoprefixer = require("autoprefixer");
const postcss_handle_imports = require("postcss-import");
const html = require("jsdom");
const uglifyes = require("uglify-es");
const hash = require("./hash.js");
const fetch = require("node-fetch");
const file = require("file-url");

function minify(code) {
  let res = babel.transformSync(`{${code}}`, {
    presets: ["@babel/preset-env"],
    plugins: [],
    comments: false
  });
  return minifyes(res.code);
}

function minifyes(code) {
  return uglifyes.minify(code).code;
}

function ends(str, part) {
  return str.lastIndexOf(part) === (str.length - part.length);
}

function ensure(pathlike) {
  if (!fs.existsSync(path.resolve(process.cwd(), pathlike))) {
    fs.mkdirSync(path.resolve(process.cwd(), pathlike));
  }
}
let package = require(path.resolve(process.cwd(), "./customfw.json"));
let parts = package.version.split(".").reverse();
parts[0]++;
for (let i = 0; i < parts.length; i++) {
  if (parts[i] >= package["version-max"]) {
    parts[i] = package["version-min"];
    parts[i + 1] = parts[i + 1] || package["version-min"];
  }
}
package.version = parts.reverse().join(".");
fs.writeFileSync(path.resolve(process.cwd(), "./customfw.json"), JSON.stringify(package, null, 2));
const pack0 = fs.readFileSync(path.resolve(__dirname, "./pack.0.js"), "utf8");
module.exports.start = async function () {

  let n = 0;
  console.log("starting build...");
  let file_list = getFiles(path.resolve(process.cwd(), "./src"), true, function (filename) {
    return ends(filename, ".html");
  });
  ensure("./build");
  ensure("./build/unpack");
  ensure("./build/pack");
  let final_js = `\n/*initalization code*/\n` + pack0;
  final_js += `app_state.set("manifest",${JSON.stringify(package)});\n`;
  for (let i = 0; i < file_list.length; i++) {
    let content = fs.readFileSync(file_list[i]).toString();
    const dom = new html.JSDOM(content, {
      url: file(file_list[i])
    });
    let promise = [];
    Array.from(dom.window.document.querySelectorAll("link")).forEach(async (el) => promise.push((async el => {
      // el.innerHTML = new cleanCSS({}).minify(el.innerHTML).styles;
      // el.innerHTML = postcss([postcss_autoprefixer]).process(el.innerHTML);
      if (el.getAttribute("rel") == "stylesheet") {
        try {
          const url = new URL(el.getAttribute("href"));
          console.log("fetching", url.href);
          promise.push(fetch(url.href).then(data => data.text()).then(css => {
            console.log("got", url.href, "with length", css.length);
            let style = dom.window.document.createElement("style");
            style.setAttribute("origin", url.href);
            style.innerHTML = css;
            el.replaceWith(style);
          }).catch(e => {
            console.log("failed to get", url.href, e);
          }));
        } catch (e) {
          console.log("assuming href is file path", path.resolve(path.dirname(file_list[i]), el.getAttribute("href")));
          let style = dom.window.document.createElement("style");
          style.innerHTML = fs.readFileSync(path.resolve(path.dirname(file_list[i]), el.getAttribute("href")), "utf8");
          el.replaceWith(style);
        }
      }
    })(el)));
    await Promise.all(promise);
    promise = [];
    Array.from(dom.window.document.querySelectorAll("style")).forEach((el) => promise.push((el => {
      // el.innerHTML = new cleanCSS({}).minify(el.innerHTML).styles;
      return postcss([postcss_autoprefixer, postcss_handle_imports]).process(el.innerHTML, {
        "from": file_list[i]
      }).then(css => el.innerHTML = css);
    })(el)));
    await Promise.all(promise);
    Array.from(dom.window.document.querySelectorAll("script")).forEach(el => {
      if (el.hasAttribute("src")) {
        let src = el.getAttribute("src");
        el.removeAttribute("src");
        el.innerHTML = fs.readFileSync(path.resolve(file_list[i], "..", src), "utf8");
      }
      el.innerHTML = minifyes(el.innerHTML, {
        "compress": true,
        "mangle": true,
        "output": {
          "wrap_iife": true
        }
      });
      el.setAttribute("hash", hash(el.innerHTML));
    });
    let name = path.parse(file_list[i]).name;
    let part_js = makeJS(name, dom.serialize().replace(/\s\s+?/g, ""), true, ++n);
    final_js += `/*${name}*/\n`;
    final_js += makeJS(name, dom.serialize().replace(/\s\s+?/g, ""), false, n) + ";\n";
    fs.writeFileSync(path.resolve("./build/unpack", path.relative(path.resolve(process.cwd(), "./src"), file_list[i].replace(".html", ".js"))), minify(part_js));
  }
  fs.writeFileSync(path.resolve("./build/pack/build.js"), `!function(){${minify(`(function(){${final_js}})()`, {
    "compress": true,
    "mangle": true,
    "output": {
      "wrap_iife": true,
      "comments": true
    }
  })}}();`);
  console.log("build finished...");
}
let id = 0;

function makeJS(name, domstring, isInstance = false, n) {
  id++;
  return `(function () {
    ${isInstance ? pack0 : ""}
            const elements$${id} = document.createElement("template");
            elements$${id}.setAttribute("for", ${
    JSON.stringify(name)
    });
            document.head.appendChild(elements$${id});
            elements$${id}.innerHTML = ${
    JSON.stringify(domstring).replace(/\\n/g, "")
            };
            customElements.define(${
              JSON.stringify(name)
            }, class CustomElement${n} extends HTMLElement {
              constructor() {
                super();
                init(this);
              }
              static get id(){
                return ${n}
              }
              static get template(){
                return elements$${id};
              }
            });
          })()
          `;
}