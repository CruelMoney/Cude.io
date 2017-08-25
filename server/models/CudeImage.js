'use strict';
const promisify = require('util');
const keystone = require('keystone');
const Types = keystone.Field.Types;
const FileData = keystone.list('FileUpload');
const gm = require('gm').subClass({imageMagick: true});


const CudeImage = new keystone.List('CudeImage', {
	hidden: false
});
 
CudeImage.add(
	{
    height: { type: Number },
    width: { type: Number },
    ratio: { type: Number },
    file: { type: Types.Relationship, ref: 'FileUpload', many: false },
    thumbnail: { type: String},        
	}
);

const createThumb = async (img) => {
    const thumbFunc = promisify(img.resize(8,8).toBuffer.bind(img))
    const thumb = await thumbFunc('PNG');
    return thumb.toString('base64')
}


CudeImage.schema.pre('save', function(next) {
    async _ =>{
        const img = gm(this.file.url)
        const sizeFunc = promisify(img.size.bind(img))
        let {width, height} = await sizeFunc()
        let ratio = height/width 
    
        this.height = height
        this.width = width
        this.ratio = ratio
        this.thumbnail = await createThumb(img)
        next();
    } 
});

CudeImage.register();
