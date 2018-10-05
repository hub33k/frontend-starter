"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.help = exports.STYLES_CONFIG = exports.TEMPLATE_CONFIG = exports.PORT = exports.ASSETS_PATH = exports.STATIC_URL = exports.PRODUCTION = exports.DEVELOPMENT = exports.APP_NAME = void 0;
// ================================================================
// Variables
var APP_NAME = 'Frontend starter';
exports.APP_NAME = APP_NAME;
var DEVELOPMENT = process.env.NODE_ENV === 'development';
exports.DEVELOPMENT = DEVELOPMENT;
var PRODUCTION = process.env.NODE_ENV === 'production';
exports.PRODUCTION = PRODUCTION;
var STATIC_URL = '/';
exports.STATIC_URL = STATIC_URL;
var ASSETS_PATH = 'assets';
exports.ASSETS_PATH = ASSETS_PATH;
var PORT = 1337; // ================================
// Template config

exports.PORT = PORT;
var TEMPLATE_CONFIG = {
  // ================
  // Variables used inside templates (html)
  variables: {
    ROOT_URL: '/',
    STATIC_URL: STATIC_URL + ASSETS_PATH + '/',
    isDev: DEVELOPMENT,
    isProd: PRODUCTION,
    title: APP_NAME
  },
  // ================
  // Variables used by webpack
  // Entries
  // In <head>
  heads: ['index', 'init', 'front_styles'],
  // Before </body>
  bodys: ['main'],
  minify: PRODUCTION ? {
    html5: true,
    collapseWhitespace: true,
    minifyCSS: true,
    minifyJS: true,
    minifyURLs: false,
    removeAttributeQuotes: false,
    removeComments: true,
    removeEmptyAttributes: true,
    removeOptionalTags: false,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributese: true,
    useShortDoctype: true
  } : false
}; // ================================
// Styles config
// https://github.com/planetflash/sharing_variables_js_sass

exports.TEMPLATE_CONFIG = TEMPLATE_CONFIG;
var STYLES_CONFIG = {
  data: "$DEVELOPMENT: ".concat(DEVELOPMENT, "; $PRODUCTION: ").concat(PRODUCTION)
}; // ================================================================
// Helpers

exports.STYLES_CONFIG = STYLES_CONFIG;

var help = function help(a) {
  console.log(a);
};

exports.help = help;