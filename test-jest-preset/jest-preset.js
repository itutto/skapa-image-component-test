"use strict";
require("./tools/patchJestTransform.js");

const skapaMatchPattern = /(@ingka|tslib|@?lit(-[^\\/]*)?)[\\/].+\.js$/
  .toString()
  .replace(/^\/|\/$/g, ""); // trim the regexp symbols from beginning and end.

Object.defineProperty(exports, "__esModule", { value: true });
/** @type {import('jest').Config} */
var config = {
  transform: {
    [skapaMatchPattern]: require.resolve("./transformer.js"),
  },
};
module.exports = config;
