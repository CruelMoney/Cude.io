'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;

var BasePage = new keystone.List('BasePage', {
    map: { name: 'title' },
	autokey: { path: 'slug', from: 'title', unique: true },
	hidden: true
	});
BasePage.add(
	{
		title: { type: String, required: true },
		slug: { type: String, readonly: true },
	}
);
BasePage.register();


var HomePage = new keystone.List('HomePage', { 
    inherits: BasePage, 
	hidden: false,
	label: "Homepage",
    nocreate: true, //Single item
    nodelete: true, //Single item
});
HomePage.add({ 
   // introduction: {type: Types.Textarea},
    cases: { type: Types.Relationship, ref: 'Case', many: true },
    skills: { type: Types.Relationship, ref: 'Skill', many: true },
});

HomePage.register();