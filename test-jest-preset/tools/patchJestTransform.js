'use-strict';
const Module = require('module');
const fs = require('fs');
const path = require('path');
const oriPath = path.join(path.dirname(require.resolve('@jest/transform')), '/ScriptTransformer.js'); // The file that holds the logic to decide if a file should be transformed or not.
const findAllPaths = require('./findAllPaths.js');
/* 
const runtimePath = require.resolve('jest-runtime');
const runtimeContent = fs.readFileSync(runtimePath)
    .toString()
    .replace('(.*strict.*?\n)',
`$1\n
require('/Users/istue/Code/BugReports/React18 - image/react18test/test-jest-preset/tools/patchJestTransform.js');
`);

const runtimeModule = new Module(runtimePath);
runtimeModule.filename = runtimePath;
runtimeModule.path = path.dirname(runtimePath);
runtimeModule.paths = [path.dirname(runtimePath)].concat(findAllPaths(path.dirname(runtimePath)));
debugger;
runtimeModule._compile(runtimeContent, runtimePath); */


const oriContent = fs.readFileSync(oriPath)
    .toString()
    .replace(/(\s*[^.])(shouldTransform\(filename\).*)/, // Look for the `shouldTransform` function definition.
    `$1$2
    debugger; // this is injected
    if (/(@ingka|tslib|lit)/.test(filename)) return true;
    `); // and add an extra first line which will always report skapa web component related files as transformable. 


fs.writeFileSync(path.resolve(__dirname, 'test-output.js'), oriContent, 'utf-8');

const originalRequire = Module.prototype.require;
    // Hijack Node's Module require function.
    // If you're wondering why this extreme method is necessary:
    // Jest has very limited controls: 
    // - Presets are overridden by local configurations.
    // - No plugin support.
    //  and the users of Jest are typically not familiar enough with its API to come up with a correct configuration.
Module.prototype.require = function () {
    const tgt = arguments[0]; // The module name or path to be required.
    debugger;
/*      if (tgt && /jest-runtime/.test(tgt)) {
        debugger;
        return runtimeModule.exports;

    };
      */
    // Check if it is the Jest's script transformer.
    if (tgt && /ScriptTransformer/.test(tgt)) {
        // If yes, then serve the one that always transforms the Skapa Web Component related ESModules into CJS.
        const akarmi = require.cache;
        debugger;
        return alteredModule.exports;
    }
    
    // Behave unchanged otherwise
    return originalRequire.apply(this, arguments);
};

// debugger;
      
var alteredModule = new Module(oriPath, require.resolve('@jest/transform'));
alteredModule.filename = oriPath;
alteredModule.paths = [''].concat(findAllPaths(path.dirname(oriPath)));

alteredModule._compile(oriContent, oriPath);
