import path from 'path';

import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import webpackProd from './webpack.base.babel';
import * as config from '../config';

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
                path: path.resolve(config.FRONTEND_DIR, 'config', 'postcss.config.js'),
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
                path.resolve(config.BASE_DIR, 'node_modules'),
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
      context: config.PUBLIC_DIR,
      from: '**/*',
      to: config.DIST_DIR,
      dot: true,
    },
    // copy images from src/images to dist/assets/images
    {
      context: config.IMAGES_DIR,
      from: '**/*.{gif,png,jpg,jpeg,svg}',
      to: path.resolve(config.DIST_DIR, 'assets', 'images'),
    },
    // copy fonts from src/fonts to dist/assets/fonts
    {
      context: config.FONTS_DIR,
      from: '**/*.{eot,woff,woff2,ttf,svg}',
      to: path.resolve(config.DIST_DIR, 'assets', 'fonts'),
    },
  ]),
);


export default webpackProd;
