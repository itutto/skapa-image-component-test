'use-strict';
const Module = require('module');
const { patchModule } = require('./patchModule.js');

const runnerPath = require.resolve('jest-runner');
let patchedRunner;

function patchJestRunner() {
    if (!patchedRunner) {
        patchedRunner = patchModule(runnerPath,
            src => src.replace(/(.*async runTests.*)/,
            `$1\n
            tests.forEach(test => {
                const ref = test.context.config.transformIgnorePatterns;
                ref.map((p,i) => ref[i] = '(?!(node_modules[\\/])?(@ingka|lit|tslib))' + p);
            })
            `)
        );
    }

    return patchedRunner;
}
 


const originalRequire = Module.prototype.require;
    // Hijack Node's Module require function.
    // If you're wondering why this extreme method is necessary:
    // Jest has very limited controls: 
    // - Presets are overridden by local configurations.
    // - No plugin support.
    //  and the users of Jest are typically not familiar enough with its API to come up with a correct configuration.
Module.prototype.require = function () {
    const tgt = arguments[0]; // The module name or path to be required.

    if(tgt && /jest-runner/.test(tgt)) 
        return patchJestRunner().exports;    
      
    // Behave unchanged otherwise
    return originalRequire.apply(this, arguments);
};

      
