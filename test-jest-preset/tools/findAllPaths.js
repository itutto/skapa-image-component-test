'use strict';
const path = require('path');
const fs = require('fs');

// This little helper tool will traverse a base path up and collectes each node_modules folder.
// It used to provide a resolver lookup path for artifically created modules.
function findAllPaths(basePath, result=[]) {
    if (basePath === '/' || !fs.existsSync(basePath)) return result;
    
    const modulespath = path.resolve(basePath, 'node_modules');
    if (fs.existsSync(modulespath) && !result.includes(modulespath)) result.push(modulespath)
    
    const parentDirPath = path.resolve(basePath, '../');
    findAllPaths(parentDirPath, result);
    
    return result;
} 

module.exports = findAllPaths;
