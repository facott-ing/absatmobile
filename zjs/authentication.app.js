var passport = require('passport')

module.exports = function(app){

    // authentication interface
    app.get('/mobile', function(req, res){
        if(req.isAuthenticated('Seller')){
            res.redirect('/mblprofile');
        }else{
            res.render('mobile/authentication');
        }

    });


    // authentication POST interface
    app.post('/authentication',
        passport.authenticate('Seller', { successRedirect: '/mblprofile',
            failureRedirect: '/mobile',
            failureFlash: false })
    );

    app.get('/mblprofile', income, function(req, res){
        res.render('mobile/index', {headmenu:false});
    });

    // detect if seller is income
    function income(req, res, next){
        if(req.isAuthenticated('Seller')){
            return next();
        }
        res.redirect('/detect');
    }

    // log out
    app.get('/mblout', function(req, res){
        req.logOut();
        res.redirect('/mobile')
    });

}