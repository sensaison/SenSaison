require("dotenv").config();
const Passport = require("passport"),
    Issuer = require("openid-client").Issuer,
    Strategy = require("openid-client").Strategy,
    generators = require("openid-client").generators,
    User = require('../models/Users');

Issuer.discover('https://accounts.google.com/.well-known/openid-configuration')
    .then(googleIssuer => {

        const client = new googleIssuer.Client({
            client_id: process.env.GOOGLE_CLIENTID,
            client_secret: process.env.GOOGLE_SECRET,
            redirect_uris: ['https://sensaison.herokuapp.com/useraccount', 'https://sensaison.herokuapp.com/useraccount.html', 'http://localhost:3000/useraccount', 'http://localhost:3000/useraccount.html'],
            response_types: ['code token id_token'],
        });

        const params = {
            client_id: process.env.GOOGLE_CLIENTID,
            response_type: 'code token id_token',
            scope: 'openid profile email',
            nonce: generators.nonce(),
            redirect_uri: 'https://sensaison.herokuapp.com/useraccount.html',
            state: generators.state(),
            prompt: 'select_account',
            display: 'popup',
            login_hint: 'sub',
        };

        const verify = async ( access_token, id_token, expires_in, token_type, done ) => {
            console.log('access_token: ', access_token);
            console.log('id_token: ', id_token);
            console.log('expires_in: ', expires_in);
            console.log('token_type: ', token_type);
            User.findOrCreate({
                openId: id_token.sub,
                firstName: id_token.given_name,
                lastName: id_token.family_name,
                email: id_token.email
            }, (err, user) => {
                if (err) {
                    done(err, user);
                }
                if (!user) {
                    done(null, false);
                }
                done(null, {user, access_token, id_token});
            });
        };

        const passReqToCallback = false;
        const sessionKey = generators.random();
        const usePKCE = false;
        const options = {
            client,
            params,
            passReqToCallback,
            sessionKey,
            usePKCE,
        };

        Passport.use('openid-client', new Strategy( options, verify ));

    }).catch(err => {
        if (err) {
            console.log(err);
        }
    });

Passport.serializeUser((user, done) => {
        console.log('SERIALIZED USER: ', user);
        done(null, user);
    },
);

Passport.deserializeUser((openId, done) => {
        User.findById(openId, (err, user) => {
            console.log('DESERIALIZED USER: ', user);
            done(err, user);
            });
});

module.exports = Passport;
