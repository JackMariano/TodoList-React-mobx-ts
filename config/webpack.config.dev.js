const path = require('path');
const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const devServer = {
  host: '127.0.0.1',
  port: '8000',
  hot: true,
  compress: true,
  static: {
    directory: path.join(__dirname, './public'),
  },
};

const devConfig = {
  mode: 'development',
  devServer,
};

module.exports = webpackMerge.merge(baseConfig, devConfig);
