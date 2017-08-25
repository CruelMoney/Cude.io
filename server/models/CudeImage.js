'use strict';
const {promisify} = require('util');
const keystone = require('keystone');
const Types = keystone.Field.Types;
const FileData = keystone.list('FileUpload');
const gm = require('gm').subClass({imageMagick: true});
const path = require('path');
var exec = require('child_process').exec;

var myStorage = new keystone.Storage({
    adapter: keystone.Storage.Adapters.FS,
    schema: { 
        size: true,
        mimetype: true,
        path: false,
        originalname: true,
        url: true,
    },
    fs: {
        path: keystone.expandPath('../public/uploads/files'), // required; path where the files should be stored
        publicPath: '/uploads/files', // path where files will be served
        whenExists: 'overwrite'        
    },
});

const CudeImage = new keystone.List('CudeImage');
 
CudeImage.add(
	{
    name: { type: Types.Key, index: { unique: true } },
    filename:  { type: String}, 
    height: { type: Number },
    width: { type: Number },
    ratio: { type: Number },
    file: { 
        type: Types.File,
        storage: myStorage
        },
    thumbnail: { type: String},
    url: { type: String}, 
	}
);

const createThumb = async (img) => {
    const thumbFunc = promisify(img.resize(8,8).toBuffer.bind(img))
    const thumb = await thumbFunc('PNG');
    return thumb.toString('base64')
}
const deleteFile = async (model) =>{
    return new Promise((resolve, reject)=>{
        
        exec('rm ' + path.resolve('./public/uploads/files/'+model.filename), (err, stdout, stderr)=>{
            if (err) { 
                console.log('child process exited with error code ' + err.code); 
                reject(err); 
            }
            model.height = null
            model.width = null
            model.ratio = null
            model.thumbnail = null
            model.url = null
            model.filename = null
            resolve(model)
        })        
    })
}


CudeImage.schema.pre('save', function(next) {
     (async _ =>{        
        if(this.file.filename){
            const img = gm(path.resolve('./public/uploads/files/'+this.file.filename))
            const sizeFunc = promisify(img.size.bind(img))
            let {width, height} = await sizeFunc()
            let ratio = height/width 
        
            this.height = height
            this.width = width
            this.ratio = ratio
            this.thumbnail = await createThumb(img)

            this.url = '/uploads/files/'+this.file.filename
            this.filename = this.file.filename
        }else if(this.filename){
            try {
                await deleteFile(this)
            } catch (error) {
                next(error)
                return
            }            
        }
        
        next();
    })() 
});

CudeImage.register();
