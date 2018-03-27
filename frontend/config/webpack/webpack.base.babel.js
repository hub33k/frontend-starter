import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BundleTracker from 'webpack-bundle-tracker';
import * as config from '../config';

// Base config
const webpackBase = {
  context: config.SRC_DIR,
  resolve: {
    // allow `import` from dirs below
    modules: [
      config.NODE_MODULES_DIR,
      config.SRC_DIR,
    ],
    extensions: ['.js'],
  },
  entry: {
    init: [
      path.resolve(config.SCRIPTS_DIR, 'init.js'),
    ],
    front_styles: [
      // Vendor
      // path.resolve(config.STYLES_DIR, 'vendor', 'foundation-sites/foundation-custom.scss'),

      // Front
      path.resolve(config.STYLES_DIR, 'main.sass'),
    ],
    main: [
      path.resolve(config.SCRIPTS_DIR, 'main.js'),
    ],
  },
  output: {
    path: config.PRODUCTION ? path.resolve(config.DIST_DIR, config.ASSETS_PATH) : path.resolve(config.TMP_DIR, config.ASSETS_PATH),
    publicPath: '/' + config.ASSETS_PATH,
    filename: '[name].js',
    // http://stackoverflow.com/questions/34357489/calling-webpacked-code-from-outside-html-script-tag
    libraryTarget: 'var',
    library: ['hub33k', '[name]'], // add global variable eg. `var hub33k = hub33k || {}; hub33k["main"] = {}`
  },
  module: {
    rules: [
      // Babel + ES6
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: true,
          },
        }],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              useable: true,
            },
          },
          {
            loader: 'css-loader',
          }
        ],
      },
      // Nunjucks templates
      {
        test: /\.(njk)$/,
        use: [
          {
            // https://github.com/SudoCat/Nunjucks-Isomorphic-Loader
            loader: 'nunjucks-isomorphic-loader',
            query: {
              root: [path.resolve(config.TEMPLATES_DIR)]
            }
          }
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 10000,
            }
          }
        ],
      }
    ]
  },
  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: 'webpack-stats.json',
    }),
    new webpack.optimize.CommonsChunkPlugin({
      // minChunks: config.PRODUCTION ? 6 : Infinity,
      // adds vendors to init.js file - from package.json -> dependencies
      minChunks: (module) => {
        return module.context && module.context.indexOf("node_modules") !== -1;
      },
      name: 'init',
      filename: config.PRODUCTION ? 'init.[hash:10].js' : 'init.js',
    }),
    // index.html
    new HtmlWebpackPlugin({
      variables: {
        global: config.TEMPLATE_CONFIG.variables,
      },

      template: path.resolve(config.TEMPLATES_DIR, 'pages', 'index', 'index.njk'),
      filename: "../index.html", // output file to .tmp root (not .tmp/assets)

      // https://github.com/jantimon/html-webpack-plugin/issues/252
      // add one static to head and one to body
      inject: false,
      heads: config.TEMPLATE_CONFIG.heads,
      bodys: config.TEMPLATE_CONFIG.bodys,
      minify: config.TEMPLATE_CONFIG.minify,
    }),
    // test.html
    new HtmlWebpackPlugin({
      variables: {
        global: config.TEMPLATE_CONFIG.variables,
        data: {
          a: 1,
          b: 'testing',
        }
      },

      template: path.resolve(config.TEMPLATES_DIR, 'pages', 'test', 'test.njk'),
      filename: "../test/index.html", // output file to .tmp root (not .tmp/assets)

      // https://github.com/jantimon/html-webpack-plugin/issues/252
      inject: false,
      // add entry only to specific page
      // heads: config.TEMPLATE_CONFIG.heads.concat('entry'),
      heads: config.TEMPLATE_CONFIG.heads,
      bodys: config.TEMPLATE_CONFIG.bodys,
      minify: config.TEMPLATE_CONFIG.minify,
    }),
    // add PROD and DEV config to js scripts,
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(config.DEVELOPMENT),
      PRODUCTION: JSON.stringify(config.PRODUCTION),
    }),
  ],
};

export default webpackBase;
