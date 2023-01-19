'use strict';
Object.defineProperty(exports, '__esModule', { value: true });

const escapeSlash = require('./tools/escapeSlash.js');

function stripRegexpCharacter(str) {
    return str.replace(/^\/|\/$/g, ""); // trim the regexp symbols from beginning and end.
}

function RegexToEscaped(exp) {
    return escapeSlash(stripRegexpCharacter(exp.toString()));
}

const transformPattern = /(@ingka|tslib|@?lit(-[^\\/]*)?)[\\/].+\.js$/;
const transformIgnorePrefixPattern = /^(?!(.*node_modules[\\/]+)(@ingka|@?lit(-[^\\/]*)?|tslib)[\\/]+).*/;


module.exports = {
    raw: { transformPattern, transformIgnorePrefixPattern },
    escapedString: {
        transformPattern: stripRegexpCharacter(transformPattern.toString()), // transform patterns are expected without regexp symbol.
        transformIgnorePrefixPattern: RegexToEscaped(transformIgnorePrefixPattern) // this is double string parsed so an extra layer of escape is necessary.
    }
}