'use strict';
require('./tools/patchJestTransform.js');

Object.defineProperty(exports, '__esModule', { value: true });
/** @type {import('jest').Config} */
var config = {
  transform: {
    '(@ingka|tslib|@?lit(-[^\\/]*)?)[\\/].+\\.js$': require.resolve('./transformer.js')
  }
};


module.exports = config;
