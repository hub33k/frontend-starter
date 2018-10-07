// ================================================================
// Variables
const APP_NAME = 'Frontend starter';
const DEVELOPMENT = process.env.NODE_ENV === 'development';
const PRODUCTION = process.env.NODE_ENV === 'production';

const STATIC_URL = '/';
const ASSETS_PATH = 'assets';
const PORT = 1337;


// ================================
// Webpack config
const entries = [];

// ================================
// Template config
const TEMPLATE_CONFIG = {
  // ================
  // Variables used inside templates (html)
  variables: {
    ROOT_URL: '/',
    STATIC_URL: STATIC_URL + ASSETS_PATH + '/',
    isDev: DEVELOPMENT,
    isProd: PRODUCTION,
    title: APP_NAME,
  },
  // ================
  // Variables used by webpack
  // Entries
  // In <head>
  heads: [
    'index',
    'init',
    'front_styles',
  ],
  // Before </body>
  bodys: [
    'main',
  ],
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
  } : false,
};

// ================================
// Styles config
// https://github.com/planetflash/sharing_variables_js_sass
const STYLES_CONFIG = {
  data: `$DEVELOPMENT: ${DEVELOPMENT}; $PRODUCTION: ${PRODUCTION}`,
};


// ================================================================
// Helpers
const help = (a) => {
  console.log(a);
};

// ================================================================
// Exports
module.exports = {
  APP_NAME: APP_NAME,
  DEVELOPMENT: DEVELOPMENT,
  PRODUCTION: PRODUCTION,

  STATIC_URL: STATIC_URL,
  ASSETS_PATH: ASSETS_PATH,
  PORT: PORT,

  entries: entries,

  TEMPLATE_CONFIG: TEMPLATE_CONFIG,
  STYLES_CONFIG: STYLES_CONFIG,

  help: help,
};

