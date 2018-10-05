import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import webpackProd from './webpack.base.babel';
import core from '@hub33k/frontend-starter-core';

const paths = core.paths;
const config = core.config;

const extractCSS = new ExtractTextPlugin('[name].[hash:10].css');

webpackProd.mode = 'production';
webpackProd.output.filename = '[name].[hash:10].js';

webpackProd.module.rules.push(
  {
    test: /\.s[ac]ss$/,
    use: extractCSS.extract({
        fallback: 'style-loader',
        use: [{
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 1,
          },
        },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              config: {
                path: path.resolve(paths.frontendPath, 'config', 'postcss.config.js'),
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              sourceMapContents: true,
              outputStyle: 'compressed', // nested, compact, expanded, compressed
              includePaths: [
                paths.appNodeModules,
              ],
              data: config.STYLES_CONFIG.data,
            },
          }],
      }
    )
  },
);

// Plugins
webpackProd.plugins.push(
  // split CSS files
  extractCSS,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }),
  new CopyWebpackPlugin([
    // copy public folder to dist root
    {
      context: paths.appPublic,
      from: '**/*',
      to: paths.appBuild,
      dot: true,
    },
    // copy images from src/images to dist/assets/images
    {
      context: paths.imagesPath,
      from: '**/*.{gif,png,jpg,jpeg,svg}',
      to: path.resolve(paths.appBuild, 'assets', 'images'),
    },
    // copy fonts from src/fonts to dist/assets/fonts
    {
      context: paths.fontsPath,
      from: '**/*.{eot,woff,woff2,ttf,svg}',
      to: path.resolve(paths.appBuild, 'assets', 'fonts'),
    },
  ]),
);


export default webpackProd;
