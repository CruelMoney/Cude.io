require('../../models/FileUpload')
var async = require('async'),
keystone = require('keystone');
var exec = require('child_process').exec;
var fs = require('fs');
var FileData = keystone.list('FileUpload');

/**
 * List Files
 */
exports.list = function(req, res) {
  FileData.model.find(function(err, items) {

    if (err) return res.apiError('database error', err);

    res.apiResponse({
      collections: items.map(item=>{
        item.url =  ('/uploads/files/'+item.file.filename)
        return item
      })
    });
  });
}

/**
 * Get File by ID
 */
exports.get = function(req, res) {

  FileData.model.findById(req.params.id).exec(function(err, item) {

    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');
    item.url =  ('/uploads/files/'+item.file.filename)
    res.apiResponse(item);

  });
}


/**
 * Update File by ID
 */
exports.update = function(req, res) {
  FileData.model.findById(req.params.id).exec(function(err, item) {
    if (err) return res.apiError('database error', err);
    if (!item) return res.apiError('not found');

    var data = (req.method == 'POST') ? req.body : req.query;
    
    // Delete existing file
    var path = keystone.expandPath('../public/uploads/files/'+item.file.filename);
    fs.unlink(path, ()=>{

      //Updating image
      item.getUpdateHandler(req).process(data, function(err) {
        if (err) return res.apiError('create error', err);
        
        item.url =  ('/uploads/files/'+item.file.filename)
        res.apiResponse(item);
      });

    }); 
   
 

    
  });
}

/**
 * Upload a New File
 */
exports.create = function(req, res) {

    const theFile = req.files.file_upload
    var name = theFile.originalname.split(".")
    name.pop()

    var item = new FileData.model({
        name: name,
        createdTimeStamp: new Date(),
        url: ('/uploads/files/')
    })
    
    item.getUpdateHandler(req).process(req.files, function(err) {
        if (err) return res.apiError('error', err);
        item.url =  ('/uploads/files/'+item.file.filename)
        res.apiResponse(item);
    });
}

/**
 * Delete File by ID
 */
exports.remove = function(req, res) {
  var fileId = req.params.id;
  FileData.model.findById(req.params.id).exec(function (err, item) {

    if (err) return res.apiError('database error', err);
    
    if (!item) return res.apiError('not found');

      item.remove(function (err) {

        if (err) return res.apiError('database error', err);
        
        //Delete the file
        exec('rm/uploads/files/'+fileId+'.*', function(err, stdout, stderr) { 
          if (err) { 
              console.log('child process exited with error code ' + err.code); 
              return; 
          } 
          console.log(stdout); 
        });

        return res.apiResponse({
          success: true
        });
    });

  });
}