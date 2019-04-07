const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const keys = require('./keys')

passport.use(new GoogleStrategy ({
    clientID: "785370225233-mc4i390arqv9e4pilq7vu4tn7ncstl2n.apps.googleusercontent.com",
    clientSecret: "7LMArbMUbJLOhQ6iUOcOg-a7",
    callbackURL: '/auth/google/redirect'
 }, () => {

 })
)