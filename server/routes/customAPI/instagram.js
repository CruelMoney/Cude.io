var {
  Instagram
} = require('../../models/Instagram'); // need to import otherwise it cant find list
var keystone = require('keystone'),
  Instagram = keystone.list('Instagram');
const {createThumb} = require('../../models/CudeImage');
const gm = require('gm').subClass({imageMagick: true});

exports.getID = function (req, res, next) {
  Instagram.model
    .findById(req.params.id)
    .exec((err, result) => {

      if (err) return next('database error', err);
      if (!result) return next('not found');

      const url = `https://www.instagram.com/explore/tags/${result.tags}/?__a=1`

      fetch(url)
        .then(instaRes => {
          instaRes.json()
            .then(data => {
              return res.send(JSON.stringify(data))
            })
        })
        .catch(err => {
          return next(err)
        })

    })
}

exports.getAll = function (req, res, next) {
  Instagram.model
    .find()
    .exec((err, result) => {

      if (err) return next('database error', err);
      if (!result) return next('not found');

      const fetchers = result.map(tag => {
        const url = `https://www.instagram.com/explore/tags/${tag.tags}/?__a=1`

        return new Promise((resolve, reject) => {
          fetch(url)
            .then(instaRes => {
              return instaRes.json()
            })
            .then(data=>{
              const instas = data.tag.media.nodes
              const thumbGens = instas.map(processImage)
              return Promise.all(thumbGens)
            })
            .then(data => {
              resolve(data)
            })
            .catch(err => {
              reject(err)
            })
        })
      });

      Promise.all(fetchers)
        .then(allTags => {
          //flattening array
          const data = allTags.reduce((acc, val)=>{return [...acc, ...val]},[])
          return res.send(JSON.stringify(data))
        })
        .catch(err => {
          return next(err)
        })

    })
}


/**
 * Function to add additional information to images
 * @param  {object} im: the image
 */
const processImage = async (img) =>{
  //const gmimg = gm(img.display_src);
  //img.thumbnail = await createThumb(gmimg);
  img.thumbnail = 'data:image/jpg;charset=utf-8;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/7QB8UGhvdG9…MBAAAAAAAAAAAAAAAAAAECEQD/2gAMAwEAAhEDEQA/AJ41dlWuXUz0Z5WNvI5AAt1AmOpt3//Z';
  return img;
}

