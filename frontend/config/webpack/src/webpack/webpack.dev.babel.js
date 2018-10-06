import path from 'path';

import webpack from 'webpack';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import webpackDev from './webpack.base.babel';
import {paths, config} from '@hub33k/frontend-starter-core';

webpackDev.mode = 'development';
webpackDev.devtool = 'source-map';

// Rules
webpackDev.module.rules.push(
  // Styles
  {
    test: /\.s[ac]ss$/,
    use: [
      {
        loader: 'style-loader',
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          'autoprefixer': {},
        }
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          outputStyle: 'nested', // nested, compact, expanded, compressed
          includePaths: [
            paths.appNodeModules,
          ],
          data: config.STYLES_CONFIG.data,
        },
      }
    ],
  },
);


// Plugins
webpackDev.plugins.push(
  new ExtractTextPlugin('[name].css'),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new CopyWebpackPlugin([
    // copy images from src/images to dist/assets/images
    {
      context: paths.imagesPath,
      from: '**/*.{gif,png,jpg,jpeg,svg}',
      to: path.resolve(paths.appTmp, 'assets', 'images'),
    },
    // copy fonts from src/fonts to .tmp/assets/fonts
    {
      context: paths.fontsPath,
      from: '**/*.{eot,woff,woff2,ttf,svg}',
      to: path.resolve(paths.appTmp, 'assets', 'fonts'),
    },
  ]),
);

export default webpackDev;
