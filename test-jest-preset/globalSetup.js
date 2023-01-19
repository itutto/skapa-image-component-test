"use strict";
require("./tools/patchJestTransform.js");

function patchConfiguration(globalConfig, projectConfig) {
  // The configuration is applied via the import at the top of the file.
  // Jest configration cannot be updated directly from here.
}

module.exports = patchConfiguration;
