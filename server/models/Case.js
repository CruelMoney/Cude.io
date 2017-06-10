'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;

var Case = new keystone.List('Case', {
  autokey: { from: 'title', path: 'key', unique: true },
  map: { name: 'title' },
  sortable: true,
});

Case.add({
  title: { type: String, required: true, initial: true  },
  subtitle: { type: String },
  type: { type: String },
  role: { type: String },
  agency: { type: String },
  year: { type: String },
  primaryColor: {type: Types.Color},
  secondaryColor: {type: Types.Color},
  link: {type:Types.Url},
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true },
	images: { type: Types.CloudinaryImages },
  categories: { type: Types.Relationship, ref: 'CaseCategory', many: true },
  skills: { type: Types.Relationship, ref: 'Skill', many: true },
  content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
  },

  key: { type: Types.Key }
});

Case.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

// Post.relationship({ path: 'comments', ref: 'PostComment', refPath: 'post' });

Case.track = true;
Case.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';

Case.schema.methods.isPublished = function() {
    return this.state == 'published';
}

//automatically set published date
Case.schema.pre('save', function(next) {
    if (this.isModified('state') && this.isPublished() && !this.publishedDate) {
        this.publishedDate = new Date();
    }
    next();
});

Case.register();
