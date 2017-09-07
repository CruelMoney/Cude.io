var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Text = new keystone.List('Text', {
    hidden: true
});
 
Text.add({
    key: { 
        type: String, 
        required: true, 
        initial: true, 
        index: { unique: true }  //only one of each key
    },
    content: { type: String }
});


Text.register();