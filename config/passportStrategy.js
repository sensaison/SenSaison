require("dotenv").config();
const Passport = require("passport"),
	Strategy = require("openid-client").Strategy,
	Issuer = require("openid-client").Issuer,
	generators = require("openid-client").generators,
	db = require("../models");

Issuer.discover("https://accounts.google.com/.well-known/openid-configuration")
	.then(googleIssuer => {
		const client = new googleIssuer.Client({
			client_id: process.env.GOOGLE_CLIENTID,
			client_secret: process.env.GOOGLE_SECRET,
			redirect_uris: ["https://sensaison.herokuapp.com/useraccount", "https://sensaison.herokuapp.com/useraccount.html", "http://localhost:3000/useraccount", "http://localhost:3000/useraccount"],
			response_types: ["code token id_token"],
		});

		const params = {
			client_id: process.env.GOOGLE_CLIENTID,
			response_type: "code token id_token",
			scope: "openid profile email",
			nonce: generators.nonce(),
			redirect_uri: "http://localhost:3000/useraccount",
			state: generators.state(),
			prompt: "select_account",
			display: "popup",
			login_hint: "sub",
		};

		const verify = async ( access_token, id_token, expires_in, token_type, done ) => {
			console.log("access_token: ", access_token);
			console.log("id_token: ", id_token);
			console.log("expires_in: ", expires_in);
			console.log("token_type: ", token_type);
			await db.Users.findOrCreate({
				where: {
					openId: id_token.sub,
					firstName: id_token.given_name,
					lastName: id_token.family_name,
					email: id_token.email
				}
			}, (err, user) => {
				if (err) {
					console.log("ERROR LOGGING IN");
					return done(err, user);
				}
				if (!user) {
					console.log("NO USER");
					return done(null, false);
				}
				console.log("FIND OR CREATE");
				return done(null, {user, access_token, id_token});
			});
		};

		const passReqToCallback = false,
			sessionKey = generators.random(),
			usePKCE = false;
			
		const options = {
			client,
			params,
			passReqToCallback,
			sessionKey,
			usePKCE,
		};

		Passport.use("openid-client", new Strategy( options, verify ));

	}).catch(err => {
		if (err) {
			console.log(err);
		}
	});

// session stuff
Passport.serializeUser((user, done) => {
	console.log("SERIALIZED USER: ", user);
	done(null, user);
});

Passport.deserializeUser((id, done) => {
	db.Users.findOne({
		where: 
			{openid: id}
	}, (err, user) => {
		console.log("DESERIALIZED USER: ", user);
		done(err, user);
	});
});

module.exports = Passport;
