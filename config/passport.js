const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
// const keys = require('./keys')
const Users = require('../models/Users')

passport.use(
    new GoogleStrategy ({

     clientID: "785370225233-mc4i390arqv9e4pilq7vu4tn7ncstl2n.apps.googleusercontent.com",
       //Don't have a good way to hide these keys yet as these specific ones will be needed to allow the app to function
       // uncomment keys to use.
     clientSecret: "7LMArbMUbJLOhQ6iUOcOg-a7",
     
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


    })
)