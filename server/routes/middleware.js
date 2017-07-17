'use strict';
const _ = require('underscore');
const keystone = require('keystone');


/**
    Initialises the standard view locals.
    Include anything that should be initialised before route controllers are executed.
*/
const initLocals = function(req, res, next) {
    var locals = res.locals;
    locals.user = req.user 
    next();
};

/**
    Inits the error handler functions into `res`
*/
const initErrorHandlers = function(req, res, next) {

    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    }

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    }

    next();

};

/**
    Fetches and clears the flashMessages before a view is rendered
*/
const flashMessages = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length }) ? flashMessages : false;

    next();

};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
const requireUser = (req, res, next) => {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};

const apiAuthenticate = (req, res, next) => {
    if(process.env.NODE_ENV !== 'development' && 
        (!res.locals.user || !res.locals.user.canAccessKeystone)){
       return res.apiNotAllowed('Authentication error', {message:"You are not authenticated to modify content."});
    }
    next()
}




exports = module.exports = {
    initLocals, 
    initErrorHandlers, 
    flashMessages,
    requireUser,
    apiAuthenticate
}