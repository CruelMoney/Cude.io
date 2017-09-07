var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * File Upload Model
 * ===========
 * A database model for uploading images to the local file system
 */

var FileUpload = new keystone.List('FileUpload',{
   
});

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    fs: {
        path: keystone.expandPath('../public/uploads/files'), // required; path where the files should be stored
        publicPath: '/uploads/files', // path where files will be served
        whenExists: 'overwrite',
        schema: { size: true,
          mimetype: true,
          path: false,
          originalname: true,
          url: true,
        },
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


FileUpload.schema.pre('save', function(next) {

    // const theFile = req.files.file_upload
    // var name = theFile.originalname.split(".")
    // name.pop()

    // var item = new FileData.model({
    //     name: name,
    //     createdTimeStamp: new Date(),
    //     url: ('/uploads/files/')
    // })

    // item.getUpdateHandler(req).process(req.files, function(err) {
    //     if (err) return res.apiError('error', err);
    //     item.url =  ('/uploads/files/'+item.file.filename)
    //     res.apiResponse(item);
    // });


  console.log(this.file)
  next()
});

FileUpload.defaultColumns = 'name';
FileUpload.register();

exports = module.export = { FileUpload }