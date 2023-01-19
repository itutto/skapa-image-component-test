"use strict";
const path = require("path");
const fs = require("fs");

// This little helper tool will traverse a base path up and collects each node_modules folder.
// It is used to provide a resolver lookup path for modules compiled at runtime.
function findAllPaths(basePath, result = []) {
  const { dir, root } = path.parse(basePath);
  if (dir === root || !fs.existsSync(basePath)) return result;

  const modulespath = path.resolve(basePath, "node_modules");
  if (fs.existsSync(modulespath) && !result.includes(modulespath))
    result.push(modulespath);

  const parentDirPath = path.resolve(basePath, "..");
  findAllPaths(parentDirPath, result);

  return result;
}

module.exports = findAllPaths;
