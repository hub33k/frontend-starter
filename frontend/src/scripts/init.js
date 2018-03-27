import jQuery from 'jquery';

window.$ = jQuery; // make jquery global

/* eslint-disable */
if (DEVELOPMENT) {
  // Enable hot module replacement
  if (module.hot) {
    module.hot.accept();
  }
}
