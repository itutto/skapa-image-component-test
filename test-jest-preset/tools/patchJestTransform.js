'use-strict';
const Module = require('module');
const { patchModule } = require('./patchModule.js');

const runnerPath = require.resolve('jest-runner');
let patchedRunner;

function patchJestRunner() {
    if (!patchedRunner) {
        patchedRunner = patchModule(runnerPath,
            src => src.replace(/(.*\srunTests\(.*)/,
            `$1\n
            const exceptionPattern = '^(?!(.*node_modules[\\/])(@ingka|@?lit(-[^\\/]*)?|tslib)[\\/]).*';
            const tranformRegexpString = "(@ingka|tslib|@?lit(-[^\\\\/]*)?)[\\\\/].+\\\\.js$";

            tests.forEach(test => {
                const ref = test.context.config.transformIgnorePatterns;
                ref.map((p,i) => {
                    if (!p.includes(exceptionPattern))
                        ref[i] = exceptionPattern + p;
                });

                const jestTransforms = test.context.config.transform;
                
                const transformRuleIndex = jestTransforms.findIndex(tform => tform[0] === tranformRegexpString);
                if (transformRuleIndex > 0) {
                    // let's make sure the SkapaWebComponents are transformed with the appropriate transformer.
                    // this requires that the transformer of the preset to be in the first place of the transformers list.

                    const skapaTransformer = jestTransforms.splice(transformRuleIndex, 1)[0]; // Removed from the array
                    jestTransforms.unshift(skapaTransformer); // Added to the beginning.
                } else if (transformRuleIndex === -1) {
                    // Let's inject the Skapa web components transform rule.
                    jestTransforms.unshift([tranformRegexpString, '/Users/istue/Code/BugReports/React18 - image/react18test/test-jest-preset/transformer.js', {}]);
                }
            })

            debugger;
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

    if(tgt && /jest-runner(.*index.js)?$/.test(tgt)) 
        {
            debugger;
            return patchJestRunner().exports;    }
      
    // Behave unchanged otherwise
    return originalRequire.apply(this, arguments);
};

