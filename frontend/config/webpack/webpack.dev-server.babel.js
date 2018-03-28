// https://webpack.js.org/configuration/dev-server/#devserver

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import * as config from './../config';
import webpackDev from './webpack.dev.babel';

// Add hot module replacement scripts
const tempEntry = {};

for (let key in webpackDev.entry) {
  if (webpackDev.entry.hasOwnProperty(key)) {
    const item = webpackDev.entry[key].slice();
    item.unshift(
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:' + config.PORT,
    );
    tempEntry[key] = item;
  }
}

webpackDev.entry = tempEntry;

webpackDev.plugins.push(
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
);

// Webpack dev server
const compiler = webpack(webpackDev);
const server = new WebpackDevServer(compiler, {
  open: true,
  hot: true,
  inline: true,
  overlay: {
    warnings: false,
    errors: true
  },
  historyApiFallback: true,
  contentBase: [config.TMP_DIR], // webpackDev.context,
  filename: webpackDev.output.filename,
  publicPath: webpackDev.output.publicPath,
  stats: {
    colors: true
  },
  proxy: {
    // "/": "http://localhost:8000" // get django website
  },
  headers: {
    'Access-Control-Allow-Origin': '*',
  },

  // watchContentBase: true, // reload html only todo separate folder for templates
  // Logs
  // clientLogLevel: "none",
  // noInfo: true,
  // quiet: true,
});

server.listen(config.PORT, 'localhost', () => {
});

webpackDev.devServer = server;

export default webpackDev;
