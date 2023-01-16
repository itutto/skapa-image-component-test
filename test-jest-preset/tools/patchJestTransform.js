'use-strict';
const Module = require('module');
const path = require('path');
const { patchModule } = require('./patchModule.js');


const runnerPath = require.resolve('jest-runner');
let patchedRunner;

function patchJestRunner() {
    if (!patchedRunner) {
        patchedRunner = patchModule(runnerPath,
            src => {                
                return src.replace(/(.*async runTests.*)/,
            `$1\n
            debugger; //injected\n
            tests.forEach(test => {
                const ref = test.context.config.transformIgnorePatterns;
                ref.map((p,i) => ref[i] = '(?!(node_modules[\\/])?(@ingka|lit|tslib))' + p);
            })
            `)
        });
    }

    return patchedRunner;
}
 
/*  
const transformerPath = path.join(path.dirname(require.resolve('@jest/transform')), '/ScriptTransformer.js'); // The file that holds the logic to decide if a file should be transformed or not.
let patchedTransformer;
function patchJestTransformer() {
    if (!patchedTransformer) {
        patchedTransformer = patchModule(transformerPath,
            src => src.replace(
                /(\s*[^.])(shouldTransform\(filename\).*)/, // Look for the `shouldTransform` function definition.
            `$1$2
            debugger; // this is injected
            if (/(@ingka|tslib|lit)/.test(filename)) return true;
            `)
            )
    }
    return patchedTransformer;
}
 */

const originalRequire = Module.prototype.require;
    // Hijack Node's Module require function.
    // If you're wondering why this extreme method is necessary:
    // Jest has very limited controls: 
    // - Presets are overridden by local configurations.
    // - No plugin support.
    //  and the users of Jest are typically not familiar enough with its API to come up with a correct configuration.
Module.prototype.require = function () {

    const tgt = arguments[0]; // The module name or path to be required.


    if(tgt && /jest-runner/.test(tgt)) {

        // debugger;
        return patchJestRunner().exports;
    }
      
    // Check if it is the Jest's script transformer.
/*     if (tgt && /ScriptTransformer/.test(tgt)) {
        // If yes, then serve the one that always transforms the Skapa Web Component related ESModules into CJS.
        // const akarmi = require.cache;
        debugger;
        return patchJestTransformer().exports;
    } */
    
    // Behave unchanged otherwise
    return originalRequire.apply(this, arguments);
};

      
