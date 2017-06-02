'use strict';
const keystone = require('keystone');
const {
  initErrorHandlers,
  initLocals,
  flashMessages,
} = require('./middleware');
// Pass your keystone instance to the module
var restful = require('restful-keystone')(keystone);


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
  api: importRoutes('./customAPI'),
};



// Bind Routes
const controllers = (app) => {
  app.get('/api/configuration', routes.api.index); 
  restful.expose({
    Case : {
    	populate : ["categories", "skills"],
      filter : {
    		state: "published"
    	}
    },
    Text : true,
  }).start();
  app.get('*', routes.view.index); // The general handler 
};

exports = module.exports = controllers;
