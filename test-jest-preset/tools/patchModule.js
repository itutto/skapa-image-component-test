
const Module = require('module');
const fs = require('fs');
const path = require('path');
const findAllPaths = require('./findAllPaths.js');

function patchModule(modulePath, contentHandler = s=>s , parentPath ) {
    const alteredScript = contentHandler(fs.readFileSync(modulePath).toString());    

    // fs.writeFileSync(path.resolve(__dirname, path.basename(modulePath)),alteredScript,'utf-8');
          
    var alteredModule = new Module(modulePath, parentPath);
    alteredModule.filename = modulePath;
    alteredModule.paths = [path.dirname(modulePath)].concat(findAllPaths(path.dirname(modulePath)));
    alteredModule._compile(alteredScript, modulePath);
    return alteredModule;
}

module.exports = { patchModule };