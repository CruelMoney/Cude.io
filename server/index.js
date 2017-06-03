'use strict';
require('dotenv').config();
const keystone = require('keystone');
const routes = require('./routes');
var webpackMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require('webpack-hot-middleware')
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const express = require("express");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var nodeExternals = require('webpack-node-externals');
var path = require('path');
var fs = require('fs');
const body = require('body-parser')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const serve = require('serve-static')
var morgan = require('morgan');
var compression = require('compression');
const backendConfig = require('../conf/webpack/webpack.dev')

const cookieSecret = 's0PfvbfJ=7=GnW2Mn%IUpt7nU7d4dxTu#0e!p8hX6Csbi6mmJvtTjU/X4mkoG/)#y4680GaAVm9V5JQgZr€x5AZ4Bfb9HUI8wTE#'

keystone.init({
  'name': 'Cude CMS',
  'brand': 'cude.io',

  // 'static': '../build',

  'auto update': true,
  'mongo': process.env.MONGO_URI || 'mongodb://localhost/keystone-beta',
  'cloudinary config':  process.env.CLOUDINARY_CONFIG || {
    cloud_name: 'dsfk4zhug',
    api_key   : '812268535114128',
    api_secret: 'VPKmNymoZ43m5EU_xoyo3B9AWEw',
  },
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': process.env.COOKIE_SECRET || cookieSecret,
  'port': process.env.SERVERPORT || 3000,

  'wysiwyg images': true,
  //'wysiwyg cloudinary images' : true, Does not seem to work
  'wysiwyg menubar': true,
  // 'wysiwyg additional buttons': 'searchreplace visualchars,'
  //   + ' charmap ltr rtl pagebreak paste, forecolor backcolor,'
  //   +' emoticons media, preview print ',
   'wysiwyg additional plugins': 'autolink, paste, contextmenu',
   // 'example, table, advlist, anchor,'
  //   + ' autolink, autosave, bbcode, charmap, contextmenu, '
  //   + ' directionality, emoticons, fullpage, hr, media, pagebreak,'
  //   + ' paste, preview, print, searchreplace, textcolor,'
  //   + ' visualblocks, visualchars, wordcount ',
 // 'wysiwyg importcss': '/main.css',
 'wysiwyg additional options': { 
   'external_plugins': { 
     'uploadimage': '/assets/js/uploadimage/plugin.min.js' 
    } 
  },

  'signin redirect': '/',
  'signout redirect': '/'
});

keystone.import('./models');

keystone.set('locals', {
  env: process.NODE_ENV,
	utils: require('keystone-utils'),
});

keystone.set('routes', routes);

keystone.set('nav', {
  'content':['cases', 'case-categories','skills'],
  'users': 'users',
  'pages':['HomePage'],
  'configurations': ['GeneralConfiguration', 'SocialConfiguration', 'APIsConfiguration'],
});


keystone.initExpressSession();


const app = express();
app.use(keystone.get('session options').cookieParser);

app.use(multer());

app.use(compression());
app.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));
app.use(keystone.expressSession);
app.use(keystone.session.persist); 
app.use(require('connect-flash')());

app.use(morgan('tiny'));
app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));

const compiler = webpack(backendConfig)
app.use(webpackHotMiddleware(compiler,{
  reload:true //Reload page when not updating
}))
app.use(webpackMiddleware(compiler, {
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
}));
    

keystone.app = app

//Setup routes
routes(app)

keystone.start({
   onMount: () => {
     console.info('----\n==> ✅  %s is running with Keystone.', "Cude CMS");    
   }
});
