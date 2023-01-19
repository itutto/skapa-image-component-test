const Module = require("module");
const fs = require("fs");
const path = require("path");
const findAllPaths = require("./findAllPaths.js");

// This tool compiles source code into a module runtime.
// It is used in this plugin's context to provide a modified sub-module for Jest.
function patchModule(modulePath, contentHandler = (s) => s, parentPath) {
  const alteredScript = contentHandler(fs.readFileSync(modulePath).toString());

  var alteredModule = new Module(modulePath, parentPath);
  alteredModule.filename = modulePath;
  alteredModule.paths = [path.dirname(modulePath)].concat(
    findAllPaths(path.dirname(modulePath))
  );
  alteredModule._compile(alteredScript, modulePath);
  return alteredModule;
}

module.exports = { patchModule };
