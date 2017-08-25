'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;

var Instagram = new keystone.List('Instagram')

Instagram.add({
  name: { type: String, required: true },
  tags: { 
    type: String, 
    note: "Enter the hashtag to pull from instagram without the #" 
  }
});
Instagram.register();


exports = module.exports = {
    Instagram
}