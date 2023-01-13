'use strict';
require('./tools/patchJestTransform.js');

Object.defineProperty(exports, '__esModule', { value: true });
/** @type {import('jest').Config} */
var config = {
  setupFiles: [require.resolve('./tools/patchJestTransform.js')],
  transform: {
    // transform @ingka, tslib and lit packages (lit, tslib, lit-element, lit-html etc)
    '(@ingka|tslib|lit(-[^\\/]*)?)([\\/].+\\.js)?$': require.resolve('./transformer.js')
  }
};

exports.default = config;
