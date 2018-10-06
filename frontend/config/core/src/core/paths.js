import path from 'path';
import fs from 'fs';
import url from 'url';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebook/create-react-app/issues/637

// https://stackoverflow.com/questions/12238477/determine-command-line-working-directory-when-running-node-bin-script
const appDirectory = fs.realpathSync(process.env.INIT_CWD); // root root dir of project
// const appDirectory = path.resolve(__dirname, '..', '..', '..', '..'); // root root dir of project
const currentDirectory = fs.realpathSync(process.cwd()); // lerna/gulp can change CWD
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
const getPath = (baseDirectory = appDirectory, relativePath, ...params) => {
  // Usage
  // console.log(paths.getPath('niewiem.html'));
  // console.log(paths.getPath('aaa', 'bbb', 'ccc'));
  // console.log(paths.getPath(paths.appSrc, 'ddd', 'file.html'));

  if (relativePath) {
    // If there are two parameters or more
    return path.resolve(baseDirectory, relativePath, ...params);
  }

  // If there is only one parameter
  relativePath = baseDirectory;

  return resolveApp(relativePath);
};

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/');
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

const getPublicUrl = appPackageJson =>
  envPublicUrl || require(appPackageJson).homepage;

// We use `PUBLIC_URL` environment variable or "homepage" field to infer
// "public path" at which the app is served.
// Webpack needs to know it to put the right <script> hrefs into HTML even in
// single-page apps that may serve index.html for nested URLs like /todos/42.
// We can't use a relative path in HTML because we don't want to load something
// like /todos/42/static/js/bundle.7289d.js. We have to know the root.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl =
    envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

const paths = {
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
  getPath: getPath,
};


paths.confgPath = path.resolve(paths.frontendPath, 'config');

paths.appSrc = path.resolve(paths.frontendPath, 'src');
paths.appBuild = path.resolve(paths.frontendPath, 'dist');
paths.appTmp = path.resolve(paths.frontendPath, '.tmp');

// in src
paths.dataPath = path.resolve(paths.appSrc, 'data');
paths.appPublic = path.resolve(paths.appSrc, 'public');
paths.scriptsPath = path.resolve(paths.appSrc, 'scripts');
paths.imagesPath = path.resolve(paths.appSrc, 'images');
paths.fontsPath = path.resolve(paths.appSrc, 'fonts');
paths.stylesPath = path.resolve(paths.appSrc, 'styles');
paths.templatesPath = path.resolve(paths.appSrc, 'templates');

// Files
paths.appHtml = path.resolve(paths.appPublic, 'index.html');
paths.appIndexJs = path.resolve(paths.scriptsPath, 'index.js');
paths.appIndexSass = path.resolve(paths.stylesPath, 'main.sass');
paths.testsSetup = path.resolve(paths.scriptsPath, 'setupTests.js');
paths.proxySetup = path.resolve(paths.scriptsPath, 'setupProxy.js');

export default paths;
