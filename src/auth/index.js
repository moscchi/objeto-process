const passport = require('passport');
const bcrypt = require('bcrypt')
const UsuariosModel = require('../models/users');
const LocalStrategy = require('passport-local').Strategy;

/**
 * Seccion Login
 */

passport.use('signin', new LocalStrategy(
    (username, password, done) => {
    UsuariosModel.findOne({ username }, (err, user) => {
        if(err)
            return done(err);
        
        if(!user){
            console.log('user not found: ' + username);
            return done(null, false)
        }
        if(!isValidPassword(user, password)){
            console.log('invalid pass');
            return done(null, false);
        }

        return done(null, user);
    })
}));

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

/**
 * Sección signup
 */

passport.use('signup', new LocalStrategy({
    passReqToCallback: true
}, 
(req, username, password, done) => {
    UsuariosModel.findOne({'username': username}, (err, user) => {
        if(err){
            console.log('Error in signup: ' + err);
            return done(err);
        }
        if(user){
            console.log('User already exists');
            return done(null, false);
        }

        const newUser = {
            username: username,
            password: createHash(password),
        }
        UsuariosModel.create(newUser, (err, userWithId) => {
            if(err){
                console.log('Error in saving user: ' + err);
                return done(err);
            }
            console.log(user);
            console.log('User registration succesful');
            return done(null, userWithId);
        })
    })
}))

const createHash = (password) => {
    return bcrypt.hashSync(
                            password,
                            bcrypt.genSaltSync(10),
                            null
    );
}

/**
 * Serializar y deserializar
 */

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    UsuariosModel.findById(id, done);
})

