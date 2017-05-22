'use strict';
import keystone from 'keystone';
import {
  initErrorHandlers,
  initLocals,
  flashMessages,
} from './middleware';

const importRoutes = keystone.importer(__dirname);


// Common Middleware
keystone.pre('routes', initErrorHandlers);
keystone.pre('routes', initLocals);
keystone.pre('render', flashMessages);

// Handle 404 errors
keystone.set('404', (req, res, next) => res.notfound());

// Handle other errors
keystone.set('500', (err, req, res, next) => {
  let title, message;
  if (err instanceof Error) {
    message = err.message;
    err = err.stack;
  }
  res.err(err, title, message);
});

// Load Routes
const routes = {
  view: importRoutes('./view'),
};

// Pass your keystone instance to the module
var restful = require('restful-keystone')(keystone);

// Bind Routes
const controllers = (app) => {
  restful.expose({
    Case : true,
    User : true
  }).start();
  app.get('*', routes.view.index); // The general handler 
};

export default controllers;
