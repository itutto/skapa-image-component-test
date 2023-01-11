const config = {
    babelrc: false,
    presets: [
      ['@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }]
    ]
  };
  module.exports = require('babel-jest').default.createTransformer(config);
  