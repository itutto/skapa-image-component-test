'use strict';
// require('@ingka/jest-preset-webc');

const config = {
  preset: '<rootDir>/test-jest-preset',// '@ingka/jest-preset-webc',
  roots: [
    "<rootDir>/src"
  ],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  setupFiles: [
    "react-app-polyfill/jsdom"
  ],
  setupFilesAfterEnv: [
    "<rootDir>/src/setupTests.ts"
  ],
  testMatch: [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
  ],

  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(jsx|mjs|cjs|ts|tsx)$": "<rootDir>/config/jest/babelTransform.js",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  transformIgnorePatterns: [
    "^.+\\.module\\.(css|sass|scss)$",
    "node_modules[\\/]lit",
    "node_modules[\\/]@ingka/.*-webc",
    "/node_modules/",
    "node_modules/(?!@)"
  ],
  modulePaths: [],
  moduleNameMapper: {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  resetMocks: true
};


module.exports = config;