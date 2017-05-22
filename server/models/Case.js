'use strict';
import keystone from 'keystone';
const Types = keystone.Field.Types;

var Case = new keystone.List('Case', {
  autokey: { from: 'name', path: 'key', unique: true },
});

Case.add({
  name: { type: String, required: true },
  state: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
  author: { type: Types.Relationship, ref: 'User', index: true },
  publishedDate: { type: Types.Date, index: true },
  image: { type: Types.CloudinaryImage },

});

Case.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

// Post.relationship({ path: 'comments', ref: 'PostComment', refPath: 'post' });

Case.track = true;
Case.defaultColumns = 'name, state|20%, author|20%, publishedDate|20%';
Case.register();
