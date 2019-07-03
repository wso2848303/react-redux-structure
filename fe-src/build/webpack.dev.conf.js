const path = require('path');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('../config/index');
const utils = require('./utils');

module.exports = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.dev.cssSourceMap,
      usePostCSS: true,
      cssModule: config.base.cssModule,
      cssModuleExcludePath: config.base.cssModuleExcludePath
    })
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: config.dev.index,
      inject: 'body',
      minify: {
        html5: true
      },
      hash: false
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    host: config.dev.host,
    port: config.dev.port,
    contentBase: path.join(__dirname, '../public'),
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    noInfo: true,
    open: config.dev.autoOpenBrowser,
    proxy: config.dev.proxyTable,
  }
});