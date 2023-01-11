

/** @type {import('jest').Config} */
const config = {
    transform: {
        // transform @ingka, tslib and lit packages (lit, lit-element, lit-html etc)
        "(@ingka|tslib|lit(-[^\\/]*)?)[\\/].+\\.js$": require.resolve("./transformer.js"),
      },
  };
  
  module.exports = config;