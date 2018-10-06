// ================================================================
// Variables
export const APP_NAME = 'Frontend starter';
export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';

export const STATIC_URL = '/';
export const ASSETS_PATH = 'assets';
export const PORT = 1337;

// ================================
// Template config
export const TEMPLATE_CONFIG = {
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
export const STYLES_CONFIG = {
  data: `$DEVELOPMENT: ${DEVELOPMENT}; $PRODUCTION: ${PRODUCTION}`,
};


// ================================================================
// Helpers
export const help = (a) => {
  console.log(a);
};
