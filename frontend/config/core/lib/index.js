"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _paths = _interopRequireDefault(require("./paths"));

var config = _interopRequireWildcard(require("./config"));

var _env = _interopRequireDefault(require("./env"));

var postcssConfig = _interopRequireWildcard(require("./postcss.config"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  paths: _paths.default,
  config: config,
  env: _env.default,
  postcssConfig: postcssConfig
}; // const paths = require('./src/paths');
// const config = require('./src/config');
// const env = require('./src/env');
// const postcssConfig = require('./src/postcss.config');
//
// module.exports = {
//   paths,
//   config,
//   env,
//   postcssConfig,
// };

exports.default = _default;