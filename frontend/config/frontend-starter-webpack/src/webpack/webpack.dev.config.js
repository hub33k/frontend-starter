const path = require('path');
const webpackDev = require('./webpack.base.config');

webpackDev.mode = 'development';
webpackDev.devtool = 'source-map';

module.exports = webpackDev;
