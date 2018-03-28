import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpackDev from './webpack.base.babel';
import * as config from './../config';

// This turns on the creation of map files, in addition to turning on sourcemaps in plugins, this MUST be specified
webpackDev.devtool = 'source-map';

// Rules
webpackDev.module.rules.push(
  // Styles
  {
    test: /\.s[ac]ss$/,
    use: [
      {
        loader: 'style-loader',
        options: {
          useable: true,
        }
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
          sourceMap: true,
          config: {
            path: path.resolve(config.FRONTEND_DIR, 'config', 'postcss.config.js'),
          },
        },
      },
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
          outputStyle: 'nested', // nested, compact, expanded, compressed
          includePaths: [
            path.resolve(config.BASE_DIR, 'node_modules'),
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
  // keeps hashes consistent between compilations
  new webpack.optimize.OccurrenceOrderPlugin(),
  new CopyWebpackPlugin([
    // copy images from src/images to dist/assets/images
    {
      context: config.IMAGES_DIR,
      from: '**/*.{gif,png,jpg,jpeg,svg}',
      to: path.resolve(config.TMP_DIR, 'assets', 'images'),
    },
    // copy fonts from src/fonts to .tmp/assets/fonts
    {
      context: config.FONTS_DIR,
      from: '**/*.{eot,woff,woff2,ttf,svg}',
      to: path.resolve(config.TMP_DIR, 'assets', 'fonts'),
    },
  ]),
);

export default webpackDev;
