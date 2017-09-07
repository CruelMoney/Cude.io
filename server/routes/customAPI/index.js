var {GeneralConfiguration, SocialConfiguration, TwitterConfiguration} = require('../../models/Configuration'); // need to import otherwise it cant find list
var keystone = require('keystone'),
	GeneralConfiguration = keystone.list('GeneralConfiguration'),
    SocialConfiguration = keystone.list('SocialConfiguration'),
    APIsConfiguration = keystone.list('APIsConfiguration');
    

exports = module.exports = function(req, res, next) {

	SocialConfiguration.model.findOne({}, (err, social)=>{
        if (err) return next(err)
        GeneralConfiguration.model.findOne({}, (err, general)=>{
            if (err) return next(err)
            APIsConfiguration.model.findOne({}, (err, apis)=>{
                if (err) return next(err)
                const result = {
                data:{
                    general,
                    social,
                    apis
                }}
                return res.send(JSON.stringify(result));
            })
        })
        
    });
}