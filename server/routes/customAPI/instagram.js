var {Instagram} = require('../../models/Instagram'); // need to import otherwise it cant find list
var keystone = require('keystone'),
	Instagram = keystone.list('Instagram'),

exports = module.exports = function(req, res, next) { 
  Instagram.model
    .findById(req.params.id)
    .exec((err, result) => {

      if (err) return next('database error', err);
      if (!result) return next('not found');

      const url = `https://www.instagram.com/explore/tags/${result.tags}/?__a=1`

      fetch(url)
        .then(instaRes=>{
        instaRes.json()
        .then(data=>{
          return res.send(JSON.stringify(data))
          })
      })
        .catch(err=>{return next(err)})

  })
}