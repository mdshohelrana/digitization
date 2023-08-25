const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const users = require('../models/users');  // Your user model or database

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'yourSecretKey' // Use environment variables
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        // Get user from your database
        const user = users.find(user => user.id === jwt_payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    }));
};
