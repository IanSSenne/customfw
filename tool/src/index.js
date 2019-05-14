const fs = require("fs");
const path = require("path");
const ora = require("ora");
const cwd = process.cwd();
const build_tools = require("./build.js");

const args = process.argv;
args.shift();
args.shift();
if (!fs.existsSync(path.relative(cwd, "./customfw.json"))) {
  console.log("did not find customfw.json in " + cwd + ", writing...");
  fs.writeFileSync(path.resolve(cwd, JSON.stringify({
    version: "0.0.0",
    "version-min": 0,
    "version-max": 10
  }, null, 2)));
} else {
  console.log("found customfw.json");
}
build_tools.start();
let last = new Date().getTime();
let is_active = false;
if (args.indexOf("-w") >= 0) {
  let spinner = new ora("waiting for changes...").start();
  fs.watch(path.relative(cwd, "./src"), {
    encoding: "utf8"
  }, () => {
    if (new Date().getTime() - last > 100 && !is_active) {
      is_active = true;
      spinner.stop();
      build_tools.start()
      spinner.start();
      last = new Date().getTime();
      is_active = false;
    }
  });
}