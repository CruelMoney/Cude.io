'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;

var CaseCategory = new keystone.List('CaseCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  label: 'Categories',
});

CaseCategory.add({
  name: { type: String, required: true },
});

CaseCategory.relationship({ ref: 'Case', refPath: 'categories' });

CaseCategory.track = true;
CaseCategory.register();
