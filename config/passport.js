const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const Sequelize = require('sequelize');
let Users = require('../models').Users;
require("dotenv").config();
let userId

passport.serializeUser((userResult, done)=> {
    done(null, userResult.userId);
});

passport.deserializeUser((id, done)=> {
    Users.findById(id).then((userResult)=>{
        done(null, userResult);
    });
  
});


passport.use(
    new GoogleStrategy ({

     clientID: process.env.GOOGLE_CLIENTID,

     clientSecret: process.env.GOOGLE_SECRET,
     
     callbackURL: "/auth/google/redirect"
    }, (accessToken, refreshToken, email, done) => {
    
        let userIdNow = email.id;
        let firstName = email.name.givenName;
        let lastName = email.name.familyName;
        let userName = email.displayName.replace(/\s+/g, '');
        let userEmail = email.emails[0].value;

        var connection = new Sequelize(process.env.MYSQLDB, process.env.MYSQLUSER, process.env.MYSQLPWD, {
            dialect: 'mysql'
        });

        connection.sync().then(function () {
            Users.sequelize.transaction(function(t){
                return Users.findOrCreate({
                    where: {
                        
                        userId: userIdNow,
                        firstName: firstName,
                        lastName: lastName,
                        username: userName,
                        email: userEmail
                    },
                    transaction: t
                })
                .spread(function(userResult, created){
                    if (created) {
                        console.log('new user created!')
                    }
                    console.log('old user logged in!')
                    console.log(userResult)
                    userId = userResult.userId;
                    module.exports = userId;
                    done(null, userResult);
                })
            });
        });
    })

)