const path = require('path');
const glob = require('glob');

module.exports = {
  entry: {
    async: glob.sync(path.join(__dirname, '/src/js/async/**/*.js')),
    all: glob.sync(path.join(__dirname, '/src/js/index/**/*.js')),
  },
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [
          /(node_modules)/,
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
};
