'use strict';
require('dotenv').config();
const keystone = require('keystone');
const routes = require('./routes');

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

const cookieSecret = 's0PfvbfJ=7=GnW2Mn%IUpt7nU7d4dxTu#0e!p8hX6Csbi6mmJvtTjU/X4mkoG/)#y4680GaAVm9V5JQgZr€x5AZ4Bfb9HUI8wTE#'

keystone.init({
  'name': 'Cude CMS',
  'brand': 'cude.io',

  'static': '../build',

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
  'compress': true,

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


// keystone.initExpressSession();


// const app = express();
// app.use(keystone.get('session options').cookieParser);

// 

// app.use(compression());
// app.use('/keystone', keystone.Admin.Server.createStaticRouter(keystone));
// app.use(keystone.expressSession);
// app.use(keystone.session.persist); 
// app.use(require('connect-flash')());

// app.use(morgan('tiny'));
// app.use('/keystone', keystone.Admin.Server.createDynamicRouter(keystone));

// const app = express();


// keystone.app = app

keystone.start({
   onMount: () => {
     console.info('----\n==> ✅  %s is running with Keystone.', "Cude CMS");

    
    
    //routes(keystone.app)


   }
});
