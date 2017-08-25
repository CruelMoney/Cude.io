var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Upload Model
 * ===========
 * A database model for uploading images to the local file system
 */

var FileUpload = new keystone.List('FileUpload',{
    hidden: true
});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('../public/uploads/files'), // required; path where the files should be stored
        publicPath: '/uploads/files', // path where files will be served
        whenExists: 'overwrite',
        generateFilename: (file, attempt, cb)=> {
            cb(null, file.originalname)
        },
    },
});

FileUpload.add({
  name: { type: Types.Key, index: { unique: true } },
  file: { 
    type: Types.File,
    storage: myStorage
	},
  createdTimeStamp: { type: Types.Datetime, default: Date.now },
  alt1: { type: String },
  attributes1: { type: String },
  category: { type: String },      //Used to categorize widgets.
  priorityId: { type: String },    //Used to prioritize display order.
  parent: { type: String },
  children: { type: String },
  url: {type: String},
  fileType: {type: String}
});


FileUpload.defaultColumns = 'name';
FileUpload.register();

exports = module.export = { FileUpload }