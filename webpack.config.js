const webpack = require('webpack');
const path = require('path');

const entry = ['./client/index.js'];

const output = {
  path: path.resolve(__dirname, 'dist'),
  publicPath: '/dist/',
  filename: 'bundle.js',
};

module.exports = {
  entry,
  output,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react','babel-preset-env'],
          },
        },
      },
      {
        test: /\.css/,
        exclude: /node_modules/,
        use: [{
          loader: 'style-loader',
        },{
          loader: 'css-loader'
        }
        ],
      },
    ],
  },
};
