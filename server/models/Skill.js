'use strict';
const keystone = require( 'keystone');
const Types = keystone.Field.Types;
const storage = new keystone.Storage({
	adapter: keystone.Storage.Adapters.FS,
	fs: {
		path: keystone.expandPath('../public/uploads'), // required; path where the files should be stored
  		publicPath: '/uploads', // path where files will be served
	}
});

var Skill = new keystone.List('Skill');
Skill.add({ 
   name: { type: String, required: true },
   level: { type: Types.Select, numeric: true, 
       options: [
       { value: 1, label: 'Knows' }, 
       { value: 2, label: 'Likes' }, 
       { value: 3, label: 'Loves' }
       ]
    },
    icon: { 
        type: Types.File,
        storage: storage,
        format: function(item, file){
            return '<img src="/uploads/'+file.filename+'" style="max-width: 300px">'
        }
    },
    description: {type: Types.Textarea}
});

Skill.register();