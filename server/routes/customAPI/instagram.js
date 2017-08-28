var {
  Instagram
} = require('../../models/Instagram'); // need to import otherwise it cant find list
var keystone = require('keystone'),
  Instagram = keystone.list('Instagram');

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
              instaRes.json()
                .then(data => {
                  resolve(data)
                })
            })
            .catch(err => {
              reject(err)
            })
        })
      });

      Promise.all(fetchers)
        .then(data => {
          return res.send(JSON.stringify(data))
        })
        .catch(err => {
          return next(err)
        })

    })
}