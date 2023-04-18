const webpackMerge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const prodConfig = { mode: 'production' };

module.exports = webpackMerge.merge(baseConfig, prodConfig);
