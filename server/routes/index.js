'use strict';
const keystone = require('keystone');
const {
  initErrorHandlers,
  initLocals,
  flashMessages,
  includeWebpackHot
} = require('./middleware');
// Pass your keystone instance to the module
var restful = require('restful-keystone')(keystone);
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack');

const importRoutes = keystone.importer(__dirname);

if ( process.env.NODE_ENV !== 'production' ) {
  const compiler = webpack(require('../../conf/webpack/webpack.dev'))
  keystone.pre('static', webpackHotMiddleware(compiler,{
      reload:true //Reload page when not updating
  }))
  
  keystone.pre('static', 
    webpackMiddleware(compiler, {
      // publicPath is required, whereas all other options are optional

      noInfo: false,
      // display no info to console (only warnings and errors)

      quiet: false,
      // display nothing to the console

      lazy: false,
      // switch into lazy mode
      // that means no watching, but recompilation on every request

      watchOptions: {
          aggregateTimeout: 300,
          poll: true
      },
      // watch options (only lazy: false)

      publicPath: "/",
      // public path to bind the middleware to
      // use the same as in webpack

      index: "index.html",
      // the index path for web server


      stats: {
          colors: true
      },
      // options for formating the statistics

      reporter: null,
      // Provide a custom reporter to change the way how logs are shown.

      serverSideRender: true,
      // Turn off the server-side rendering mode. See Server-Side Rendering part for more info.

      hot: true
    })
  );
}


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
    HomePage : {
      path : "homepage",
      populate : ["skills"],
      envelop: false
    },
    Text : true,
    //Skill : true,
  }).start();
  app.get('*', routes.view.index); // The general handler 
};

exports = module.exports = controllers;
