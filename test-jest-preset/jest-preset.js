"use strict";
require("./tools/patchJestTransform.js");
const patterns = require('./patterns.js');

Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('jest').Config} */
var config = {
  transform: {
    [patterns.escapedString.transformPattern]: require.resolve("./transformer.js"),
  },
};
module.exports = config;
