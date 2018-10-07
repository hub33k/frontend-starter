// import {paths} from '@hub33k/frontend-starter-config';
const paths = require('@hub33k/frontend-starter-config').paths;
const env = require('@hub33k/frontend-starter-config').env;
const config = require('@hub33k/frontend-starter-config').config;

const webpackDev = require('./webpack/webpack.dev.config');

console.log(paths.appPath);
console.log(paths.currentDirectory);
