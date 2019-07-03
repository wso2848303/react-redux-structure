'use strict'
const path = require('path')
module.exports = {
  base: {
    cssModule: false,
    cssModuleExcludePath: /public/
  },
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    index: path.resolve(__dirname, '../public/index.html'),
    proxyTable: {},
    host: 'localhost',
    port: 3000,
    autoOpenBrowser: true,
    cssSourceMap: true
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    index: path.resolve(__dirname, '../public/index.html'),
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  },
}