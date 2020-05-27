module.exports = {
  output: {
    filename: 'all.js',
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: [
          /(node_modules)/,
          /async.(js)$/,
        ],
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devtool: 'source-map',
};
