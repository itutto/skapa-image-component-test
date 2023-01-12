'use-strict';

const Module = require('module');
const fs = require('fs');
const path = require('path');
const oriPath = path.join(path.dirname(require.resolve('@jest/transform')), '/ScriptTransformer.js');

const oriContent = fs.readFileSync(oriPath)
    .toString()
    .replace(/(\s+)(shouldTransform\(filename\).*)/,
    `$1$2\nif (/(@ingka|tslib|lit([^\\/]+)?)/.test(filename)) return true;`);


const originalRequire = Module.prototype.require;
Module.prototype.require = function () {
    // Hijack the CRA webpack config import.
    const tgt = arguments[0];
    // console.log('require loads');
    if (tgt && /fast-json-stable-stringify/.test(tgt)) {
        console.log('whaaat');
        debugger;
    }
    
    if (tgt && /ScriptTransformer/.test(tgt)) {
        const result = alteredModule.exports;
        debugger;
        return result;
    }
    
    // Behave unchanged otherwise
    return originalRequire.apply(this, arguments);
};
      
function findAllPaths(basePath, result=[]) {
    if (basePath === '/' || !fs.existsSync(basePath)) return result;
    
    const modulespath = path.resolve(basePath, 'node_modules');
    if (fs.existsSync(modulespath) && !result.includes(modulespath)) result.push(modulespath)
    
    const parentDirPath = path.resolve(basePath, '../');
    findAllPaths(parentDirPath, result);
    
    return result;
} 


const alteredModule = new Module(oriPath, require.resolve('@jest/transform'));
alteredModule.filename = oriPath;
alteredModule.paths = [''].concat(findAllPaths(path.dirname(oriPath)));


alteredModule._compile(oriContent, oriPath);

