import path from 'path';

import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import BundleTracker from 'webpack-bundle-tracker';

import core from '@hub33k/frontend-starter-core';

const config = core.config;
const paths = core.paths;

// Base config
const webpackBase = {
  context: paths.appSrc,
  resolve: {
    // allow `import` from dirs below
    modules: [
      paths.appNodeModules,
      paths.appSrc,
    ],
    extensions: ['.js'],
  },
  entry: {
    // TODO: move this section to config.js
    // Scripts
    index: [
      path.resolve(paths.scriptsPath, 'index.js'),
    ],
    init: [
      path.resolve(paths.scriptsPath, 'init.js'),
    ],
    main: [
      path.resolve(paths.scriptsPath, 'main.js'),
    ],
    // Styles
    front_styles: [
      path.resolve(paths.stylesPath, 'main.sass'),
    ],
  },
  output: {
    path: config.PRODUCTION ? path.resolve(paths.appBuild, config.ASSETS_PATH) : path.resolve(paths.appTmp, config.ASSETS_PATH),
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
                paths.templatesPath,
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
    // TODO: move this section to config.js
    new HtmlWebpackPlugin({
      variables: {
        global: config.TEMPLATE_CONFIG.variables,
      },

      template: path.resolve(paths.templatesPath, 'pages', 'index', 'index.njk'),
      filename: '../index.html', // output file to .tmp root (not .tmp/assets)

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

      template: path.resolve(paths.templatesPath, 'pages', 'test', 'test.njk'),
      filename: '../test/index.html', // output file to .tmp root (not .tmp/assets)

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
