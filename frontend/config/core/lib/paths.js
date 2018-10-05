"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _url = _interopRequireDefault(require("url"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637
// https://stackoverflow.com/questions/12238477/determine-command-line-working-directory-when-running-node-bin-script
var appDirectory = _fs.default.realpathSync(process.env.INIT_CWD); // root root dir of project
// const appDirectory = path.resolve(__dirname, '..', '..', '..', '..'); // root root dir of project


var currentDirectory = _fs.default.realpathSync(process.cwd()); // lerna/gulp can change CWD


var resolveApp = function resolveApp(relativePath) {
  return _path.default.resolve(appDirectory, relativePath);
};

var getPath = function getPath() {
  var baseDirectory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : appDirectory;
  var relativePath = arguments.length > 1 ? arguments[1] : undefined;

  // Usage
  // console.log(paths.getPath('niewiem.html'));
  // console.log(paths.getPath('aaa', 'bbb', 'ccc'));
  // console.log(paths.getPath(paths.appSrc, 'ddd', 'file.html'));
  if (relativePath) {
    for (var _len = arguments.length, params = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      params[_key - 2] = arguments[_key];
    }

    // If there are two parameters or more
    return _path.default.resolve.apply(_path.default, [baseDirectory, relativePath].concat(params));
  } // If there is only one parameter


  relativePath = baseDirectory;
  return resolveApp(relativePath);
};

var envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
  var hasSlash = inputPath.endsWith('/');

  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return "".concat(inputPath, "/");
  } else {
    return inputPath;
  }
}

var getPublicUrl = function getPublicUrl(appPackageJson) {
  return envPublicUrl || require(appPackageJson).homepage;
}; // We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.


function getServedPath(appPackageJson) {
  var publicUrl = getPublicUrl(appPackageJson);
  var servedUrl = envPublicUrl || (publicUrl ? _url.default.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

var paths = {
  appPath: resolveApp('.'),
  currentDirectory: currentDirectory,
  frontendPath: resolveApp('frontend'),
  backendPath: resolveApp('backend'),
  appNodeModules: resolveApp('node_modules'),
  dotenv: resolveApp('.env'),
  appPackageJson: resolveApp('package.json'),
  yarnLockFile: resolveApp('yarn.lock'),
  publicUrl: getPublicUrl(resolveApp('package.json')),
  servedPath: getServedPath(resolveApp('package.json')),
  // Functions
  resolveApp: resolveApp,
  ensureSlash: ensureSlash,
  getPublicUrl: getPublicUrl,
  getServedPath: getServedPath,
  getPath: getPath
};
paths.confgPath = _path.default.resolve(paths.frontendPath, 'config');
paths.appSrc = _path.default.resolve(paths.frontendPath, 'src');
paths.appBuild = _path.default.resolve(paths.frontendPath, 'dist');
paths.appTmp = _path.default.resolve(paths.frontendPath, '.tmp'); // in src

paths.dataPath = _path.default.resolve(paths.appSrc, 'data');
paths.appPublic = _path.default.resolve(paths.appSrc, 'public');
paths.scriptsPath = _path.default.resolve(paths.appSrc, 'scripts');
paths.imagesPath = _path.default.resolve(paths.appSrc, 'images');
paths.fontsPath = _path.default.resolve(paths.appSrc, 'fonts');
paths.stylesPath = _path.default.resolve(paths.appSrc, 'styles');
paths.templatesPath = _path.default.resolve(paths.appSrc, 'templates'); // Files

paths.appHtml = _path.default.resolve(paths.appPublic, 'index.html');
paths.appIndexJs = _path.default.resolve(paths.scriptsPath, 'index.js');
paths.appIndexSass = _path.default.resolve(paths.stylesPath, 'main.sass');
paths.testsSetup = _path.default.resolve(paths.scriptsPath, 'setupTests.js');
paths.proxySetup = _path.default.resolve(paths.scriptsPath, 'setupProxy.js');
var _default = paths;
exports.default = _default;