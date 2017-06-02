'use strict';
const keystone = require('keystone');
const User = keystone.list('User');

module.exports = function(done) {
  new User.model({
    name: { first: 'admin', last: 'user' },
    email: 'user@keystonejs.com',
    password: 'admin',
    canAccessKeystone: true
  }).save(done);
}