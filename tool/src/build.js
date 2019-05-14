const fs = require("fs");
const getFiles = require("get-files-in-dir");
const path = require("path");
const cleanCSS = require("clean-css");
const html = require("jsdom");
const uglifyes = require("uglify-es");

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
module.exports.start = function () {

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
    const dom = new html.JSDOM(content);
    Array.from(dom.window.document.querySelectorAll("style")).forEach(el => {
      el.innerHTML = new cleanCSS({}).minify(el.innerHTML).styles;
    });
    Array.from(dom.window.document.querySelectorAll("script")).forEach(el => {
      if (el.hasAttribute("src")) {
        let src = el.getAttribute("src");
        el.removeAttribute("src");
        el.innerHTML = fs.readFileSync(path.resolve(file_list[i], "..", src), "utf8");
      }
      el.innerHTML = uglifyes.minify(el.innerHTML, {
        "compress": true,
        "mangle": true,
        "output": {
          "wrap_iife": true
        }
      }).code;
    });
    let name = path.parse(file_list[i]).name;
    let part_js = makeJS(name, dom.serialize().replace(/\s\s+?/g, ""), true, ++n);
    final_js += `/*${name}*/\n`;
    final_js += makeJS(name, dom.serialize().replace(/\s\s+?/g, ""), false, n) + ";\n";
    fs.writeFileSync(path.resolve("./build/unpack", path.relative(path.resolve(process.cwd(), "./src"), file_list[i].replace(".html", ".js"))), uglifyes.minify(part_js).code);
  }
  fs.writeFileSync(path.resolve("./build/pack/build.js"), uglifyes.minify(`(function(){${final_js}})()`, {
    "compress": true,
    "mangle": true,
    "output": {
      "wrap_iife": true,
      "comments": true
    }
  }).code);
  console.log("build finished...");
}

function makeJS(name, domstring, isInstance = false, n) {
  return `(function () {
    ${isInstance ? pack0 : ""}
            const elements = document.createElement("template");
            elements.setAttribute("for", ${
    JSON.stringify(name)
    });
            document.head.appendChild(elements);
            elements.innerHTML = ${
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
                return elements;
              }
            });
          })()
          `;
}