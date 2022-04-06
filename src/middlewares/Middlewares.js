exports.GlobalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;
    next();
};

exports.checkTokenError = (err, req, res, next) => {
    
    if(err) {
        return res.render('404');
    }

    next();
};

exports.createToken = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    
    if ( !req.session.user) {
        req.flash('errors', 'You Need To Login First!')
        req.session.save( () => res.redirect('/') )
        return
    }

    next()
}