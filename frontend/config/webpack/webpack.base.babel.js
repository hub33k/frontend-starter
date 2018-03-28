import path from 'path';

import webpack from "webpack";
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
            compact: true,
            babelrc: true,
          },
        }],
      },
      {
        test: /\.(html)$/,
        use: [
          {
            loader: 'html-loader',
          }
        ]
      },
      // Nunjucks templates
      {
        test: /\.(njk)$/,
        use: [
          {
            loader: 'nunjucks-isomorphic-loader',
            query: {
              root: [
                config.TEMPLATES_DIR,
              ]
            }
          }
        ]
      },
      // Styles
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }
        ],
      },
      // Images
      {
        test: /\.(gif|png|jpe?g|svg)$/i, // |svg
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'images/[name].[ext]',
              limit: 10000,
            }
          }
        ],
      },
    ]
  },
  plugins: [
    new BundleTracker({
      path: __dirname,
      filename: 'webpack-stats.json',
    }),
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
    new webpack.DefinePlugin({
      DEVELOPMENT: JSON.stringify(config.DEVELOPMENT),
      PRODUCTION: JSON.stringify(config.PRODUCTION),
    }),
  ]
};

export default webpackBase;
