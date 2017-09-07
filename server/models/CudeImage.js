'use strict';
const {promisify} = require('util');
const keystone = require('keystone');
const Types = keystone.Field.Types;
const FileData = keystone.list('FileUpload');
const gm = require('gm').subClass({imageMagick: true});
const path = require('path');
var fs = require('fs-extra')

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
        //whenExists: 'overwrite'        
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
    return `data:image/png;base64,${thumb.toString('base64')}`
}
const deleteFile = (filename) =>{
    if(!filename){
        throw new Error("No filename given, don't delete entire folder")
    }
    console.log(filename)
    return fs.remove(path.resolve('./public/uploads/files/'+filename))
}


CudeImage.schema.pre('save', function(next) {
     (async _ =>{     
        if(this.file.filename){
            const img = gm(path.resolve('./public/uploads/files/'+this.file.filename))
            const sizeFunc = promisify(img.size.bind(img))
            let {width, height} = await sizeFunc()
            this.thumbnail = await createThumb(img)   

            //  If the image is updated, delete old file 
            if(this.filename && this.filename !== this.file.filename){
                try {
                    await deleteFile(this.filename)
                } catch (error) {
                    console.log(error)
                }            
            }

            this.height = height
            this.width = width
            this.ratio = height/width
            this.url = '/uploads/files/'+this.file.filename
            this.filename = this.file.filename

        }else if(this.filename){
            try {
                await deleteFile(this.filename)
                this.height = null
                this.width = null
                this.ratio = null
                this.thumbnail = null
                this.url = null
                this.filename = null
            } catch (error) {
                console.log(error)
            }
        }
        
        next();
    })() 
});

CudeImage.schema.pre('remove', function(next) {
    (async _ =>{        
        if(this.filename){
           try {
               await deleteFile(this.filename)
           } catch (error) {
               console.log(error)
           }            
       }
       next();
   })() 
});

CudeImage.register();

exports = module.exports = {
    createThumb
}