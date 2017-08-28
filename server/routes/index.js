'use strict';
const keystone = require('keystone');
const {
  initErrorHandlers,
  initLocals,
  flashMessages,
  includeWebpackHot,
  requireUser,
  apiAuthenticate
} = require('./middleware');
// Pass your keystone instance to the module
var restful = require('restful-keystone')(keystone);
const webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpack = require('webpack');

const importRoutes = keystone.importer(__dirname);

console.log(process.env.NODE_ENV)
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

      // index: "/build/static/main.js",
      // // the index path for web server


      stats: {
          colors: true,
          chunks: false,
          children: false
      },
      // options for formating the statistics

      reporter: null,
      // Provide a custom reporter to change the way how logs are shown.

      serverSideRender: true,
      // Turn off the server-side rendering mode. See serverRender.js for how the bundles are injected

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
  next(err, title, message);
});

// Load Routes
const routes = {
  view: importRoutes('./view'),
  api: importRoutes('./customAPI'),
};



// Bind Routes
const controllers = (app) => {
  app.post('*', keystone.middleware.api, apiAuthenticate)
  app.put('*', keystone.middleware.api, apiAuthenticate)
  app.delete('*', keystone.middleware.api, apiAuthenticate)

  app.get('/api/configuration', routes.api.index);
  app.get('/api/instagram/:id', routes.api.instagram.getID); 
  app.get('/api/instagram', routes.api.instagram.getAll); 
  
  restful.expose({
    Case : {
    	populate : ["categories", "skills", "images"],
      filter : {
    		state: "published"
    	}
    },
    Homepage : {
      path : "homepage",
      populate : ["skills", "instagram"],
      envelop: false
    },
    Text : true,
    CudeImage: true
    //Skill : true,
  }).start();

  //File Upload Route
  app.get('/api/fileupload/list', keystone.middleware.api, routes.api.fileupload.list);
  app.get('/api/fileupload/:id', keystone.middleware.api, routes.api.fileupload.get);
  app.all('/api/fileupload/:id/update', keystone.middleware.api, routes.api.fileupload.update);
  app.all('/api/fileupload/create', keystone.middleware.api, routes.api.fileupload.create);
  app.get('/api/fileupload/:id/remove', keystone.middleware.api, routes.api.fileupload.remove);

  app.get('*', routes.view.index); // The general handler 
};

exports = module.exports = controllers;
