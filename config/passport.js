const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
require("dotenv").config();
const Users = require('../models/Users')

passport.use(
    new GoogleStrategy ({

     clientID: process.env.GOOGLE_CLIENTID,

     clientSecret: process.env.GOOGLE_SECRET,
     
     callbackURL: "/auth/google/redirect"
    }, (accessToken, refreshToken, email, done) => {
        //I've console logged information I think we'll need for user creation.
        console.log("passport callback fired");
        console.log(email.emails[0].value)
        console.log(email.displayName)
        console.log(email.id)
        //Un-comment the below line to see the full tree if anymore information is needed for user creation.
        //console.log(email)

        //use the email object to pull the required info for user submission, check out the console log to reference the tree.
        //                                                             ie.  email.displayName 
        
        //need some sequilize magic here to create userData and send it to the server, 
        //Will need an if statement check to see if the user exists in the DB before adding them.


        // Catherine comments below:
        // will have to module.exports email info to another file, since this should just be config stuff
        // how to connect to Users.js model?

    })
)