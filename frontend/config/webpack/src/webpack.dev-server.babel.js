import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

import webpackDev from './webpack.dev.babel';
import core from '@hub33k/frontend-starter-core';

const paths = core.paths;
const config = core.config;

// Add hot module replacement scripts to each entry js file
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
  new webpack.NoEmitOnErrorsPlugin(),
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
  contentBase: [paths.appTmp], // webpackDev.context,
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
