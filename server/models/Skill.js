'use strict';
import keystone from 'keystone';
const Types = keystone.Field.Types;

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
});

Skill.register();