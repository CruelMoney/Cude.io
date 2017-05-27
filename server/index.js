'use strict';
require('dotenv').config();
import keystone from 'keystone';
import routes from './routes';

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
  'cookie secret': process.env.COOKIE_SECRET || 'changeme',
  'port': process.env.SERVERPORT || 3000,

  'wysiwyg images': true,

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
