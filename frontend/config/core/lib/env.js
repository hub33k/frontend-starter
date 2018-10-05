"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

var _paths = _interopRequireDefault(require("./paths"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make sure that including paths.js after env.js will read .env variables.
delete require.cache[require.resolve('./paths')];
var NODE_ENV = process.env.NODE_ENV;

if (!NODE_ENV) {
  throw new Error('The NODE_ENV environment variable is required but was not specified.');
} // https://github.com/bkeepers/dotenv#what-other-env-files-can-i-use


var dotenvFiles = ["".concat(_paths.default.dotenv, ".").concat(NODE_ENV, ".local"), "".concat(_paths.default.dotenv, ".").concat(NODE_ENV), // Don't include `.env.local` for `test` environment
// since normally you expect tests to produce the same
// results for everyone
NODE_ENV !== 'test' && "".concat(_paths.default.dotenv, ".local"), _paths.default.dotenv].filter(Boolean); // Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand

dotenvFiles.forEach(function (dotenvFile) {
  if (_fs.default.existsSync(dotenvFile)) {
    require('dotenv-expand')(require('dotenv').config({
      path: dotenvFile
    }));
  }
}); // We support resolving modules according to `NODE_PATH`.
// This lets you use absolute paths in imports inside large monorepos:
// https://github.com/facebook/create-react-app/issues/253.
// It works similar to `NODE_PATH` in Node itself:
// https://nodejs.org/api/modules.html#modules_loading_from_the_global_folders
// Note that unlike in Node, only *relative* paths from `NODE_PATH` are honored.
// Otherwise, we risk importing Node.js core modules into an app instead of Webpack shims.
// https://github.com/facebook/create-react-app/issues/1023#issuecomment-265344421
// We also resolve them to make sure all tools using them work consistently.

var appDirectory = _fs.default.realpathSync(process.cwd());

process.env.NODE_PATH = (process.env.NODE_PATH || '').split(_path.default.delimiter).filter(function (folder) {
  return folder && !_path.default.isAbsolute(folder);
}).map(function (folder) {
  return _path.default.resolve(appDirectory, folder);
}).join(_path.default.delimiter); // Grab NODE_ENV and REACT_APP_* environment variables and prepare them to be
// injected into the application via DefinePlugin in Webpack configuration.

var REACT_APP = /^REACT_APP_/i;

function getClientEnvironment(publicUrl) {
  var raw = Object.keys(process.env).filter(function (key) {
    return REACT_APP.test(key);
  }).reduce(function (env, key) {
    env[key] = process.env[key];
    return env;
  }, {
    // Useful for determining whether we’re running in production mode.
    // Most importantly, it switches React into the correct mode.
    NODE_ENV: process.env.NODE_ENV || 'development',
    // Useful for resolving the correct path to static assets in `public`.
    // For example, <img src={process.env.PUBLIC_URL + '/img/logo.png'} />.
    // This should only be used as an escape hatch. Normally you would put
    // images into the `src` and `import` them in code to get their paths.
    PUBLIC_URL: publicUrl
  }); // Stringify all values so we can feed into Webpack DefinePlugin

  var stringified = {
    'process.env': Object.keys(raw).reduce(function (env, key) {
      env[key] = JSON.stringify(raw[key]);
      return env;
    }, {})
  };
  return {
    raw: raw,
    stringified: stringified
  };
}

var _default = getClientEnvironment;
exports.default = _default;