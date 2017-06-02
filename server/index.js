'use strict';
require('dotenv').config();
const keystone = require('keystone');
const routes = require('./routes');

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
  'cookie secret': process.env.COOKIE_SECRET || 's0PfvbfJ=7=GnW2Mn%IUpt7nU7d4dxTu#0e!p8hX6Csbi6mmJvtTjU/X4mkoG/)#y4680GaAVm9V5JQgZr€x5AZ4Bfb9HUI8wTE#',
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
  env: keystone.get('env'),
});

keystone.set('routes', routes);

keystone.set('nav', {
  'content':['cases', 'case-categories','skills'],
  'users': 'users',
  'pages':['HomePage'],
  'configurations': ['GeneralConfiguration', 'SocialConfiguration', 'APIsConfiguration'],
});



keystone.start();
