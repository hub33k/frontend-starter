import 'babel-polyfill';

/* eslint-disable */
if (DEVELOPMENT) {
  console.log(`Main webpack\nDEV: ${DEVELOPMENT}\nPROD: ${PRODUCTION}`);

  // Enable hot module replacement
  if (module.hot) {
    // flow-disable-next-line
    module.hot.accept();
  }
}
