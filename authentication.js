
var LocalEstrategy=require('passport-local').Strategy;

module.exports = function(passport){


    passport.use('Seller', new LocalEstrategy(
        {
            usernameField: 'username',
            passwordField: 'pass'
        },
        function(username, pass, done) {
            Seller.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Nombre de usuario incorrecto' });
                }
                if (user.pass !== pass) {
                    return done(null, false, { message: 'Contraseña incorrecta' });
                }
                return done(null, user);
            });
        }
    ));

// SERIALIZE SELLER AUTHENTICATION
// --------------------- + --------------------------------------------------
// --------------------- + -------------------------------------------
// --------------------- + -------------------------------
// --------------------- + ---------------------

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Seller.findById(id, function(err, user) {
            done(err, user);
        });
    });


// --------------------- + ---------------------
// --------------------- + -------------------------------
// --------------------- + -------------------------------------------
// --------------------- + --------------------------------------------------



}


