const path = require('path');
const fs = require('fs');

const testpath = '/Users/istue/Code/BugReports/React18 - image/react18test/node_modules/@jest/transform/build';
function findAllPaths(basePath, result=[]) {
    if (basePath === '/' || !fs.existsSync(basePath)) return result;
    
    const modulespath = path.resolve(basePath, 'node_modules');
    if (fs.existsSync(modulespath) && !result.includes(modulespath)) result.push(modulespath)
    
    const parentDirPath = path.resolve(basePath, '../');
    findAllPaths(parentDirPath, result);
    
    return result;
} 

const result = findAllPaths(testpath);
debugger;