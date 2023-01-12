'use strict';
require('./tools/patchJestTransform.js');

Object.defineProperty(exports, '__esModule', { value: true });

var __importDefault = function(mod) {
  return (mod && mod.__esModule) ? mod : { default: mod };
};

var babel_jest_1 = __importDefault(require('babel-jest'));
var config = {
  babelrc: false,
  presets: [
    ['@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }]
  ]
};
exports.default = babel_jest_1.default.createTransformer(config);
