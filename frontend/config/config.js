import path from 'path';

// ================================================================
// Variables

export const APP_NAME = 'Frontend starter';
export const DEVELOPMENT = process.env.NODE_ENV === 'development';
export const PRODUCTION = process.env.NODE_ENV === 'production';

export const STATIC_URL = '/';
export const ASSETS_PATH = 'assets';
export const PORT = 9000;

// ================================
// Dirs
export const BASE_DIR = path.resolve(__dirname, '..', '..');

export const NODE_MODULES_DIR = path.resolve(BASE_DIR, 'node_modules');
export const FRONTEND_DIR = path.resolve(BASE_DIR, 'frontend');
export const BACKEND_DIR = path.resolve(BASE_DIR, 'backend');

export const CONFIG_DIR = path.resolve(FRONTEND_DIR, 'config');
export const TMP_DIR = path.resolve(FRONTEND_DIR, '.tmp');
export const DIST_DIR = path.resolve(FRONTEND_DIR, 'dist');
export const SRC_DIR = path.resolve(FRONTEND_DIR, 'src');

export const PUBLIC_DIR = path.resolve(SRC_DIR, 'public');
export const SCRIPTS_DIR = path.resolve(SRC_DIR, 'scripts');
export const FONTS_DIR = path.resolve(SRC_DIR, 'fonts');
export const STYLES_DIR = path.resolve(SRC_DIR, 'styles');
export const IMAGES_DIR = path.resolve(SRC_DIR, 'images');
export const TEMPLATES_DIR = path.resolve(SRC_DIR, 'templates');

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
  heads: [
    'init',
    'front_styles',
  ],
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
// TODO: check this https://github.com/planetflash/sharing_variables_js_sass
export const STYLES_CONFIG = {
  data: `$DEVELOPMENT: ${DEVELOPMENT}; $PRODUCTION: ${PRODUCTION}`,
};


// ================================================================
// Helpers
export const help = (a) => {
  console.log(a);
};
