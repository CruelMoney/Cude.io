'use strict';
import {promisify} from 'util'
const keystone = require('keystone');
const Types = keystone.Field.Types;
const FileData = keystone.list('FileUpload');
const gm = require('gm').subClass({imageMagick: true});


const CudeImage = new keystone.List('CudeImage', {
	hidden: false
});
 
CudeImage.add(
	{
    height: { type: Number, required: true },
    width: { type: Number, required: true },
    ratio: { type: Number, required: true },
    file: { type: Types.Relationship, ref: 'FileUpload', many: false, required: true },
    thumbnail: { type: String, required: true},        
	}
);

const createThumb = (img) => {
    const thumbFunc = promisify(img.resize(8,8).toBuffer.bind(img))
    const thumb = await thumbFunc('PNG');
    return thumb.toString('base64')
}


CudeImage.schema.pre('save', function(next) {
    const img = gm(this.file.url)
    const sizeFunc = promisify(img.size.bind(img))
    let {width, height} = await sizeFunc()
    let ratio = height/width 

    this.height = height
    this.width = width
    this.ratio = ratio
    this.thumbnail = createThumb(img)

    next();
});

CudeImage.register();
