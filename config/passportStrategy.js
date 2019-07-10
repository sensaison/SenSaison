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
			redirect_uris: ["https://sensaison.herokuapp.com/useraccount", "http://localhost:3000/useraccount"],
			response_types: ["code", "token", "id_token"]
		});
		
		const params = {
			client_id: process.env.GOOGLE_CLIENTID, 
			response_type: "code token id_token",
			scope: "openid profile email",
			nonce: generators.nonce(),
			redirect_uri: "http://localhost:3000/useraccount",  // REMEMBER TO CHANGE THIS BETWEEN PROD AND DEV
			state: generators.state(),
			prompt: "select_account",
			login_hint: "sub",
		};
		
		const verify = async ( tokenset, userinfo, done ) => {
			console.log("tokenset: ", tokenset);
			console.log("access_token: ", tokenset.access_token);
			console.log("id_token: ", tokenset.id_token);
			console.log("user info: ", userinfo);
			
			await db.Users.findOrCreate({
				where: {
					openId: tokenset.claims.sub,
					firstName: tokenset.id_token.given_name,
					lastName: tokenset.id_token.family_name,
					email: tokenset.id_token.email
				}
			}, (err, user) => {
				if (err) {
					console.log("ERROR LOGGING IN");
					return done(err, user);
				}
				// don't need below because findOrCreate
				// if (!user) {
				// 	console.log("NO USER");
				// 	return done(null, false);
				// }
				console.log("FIND OR CREATE");
				return done(null, { user, tokenset });
			});
		};

		const passReqToCallback = true,
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
	console.log("SERIALIZE USER: ", user);
	console.log("SERIALIZE USER.ID: ", user.id);
	console.log("SERIALIZE USER._ID: ", user._id);
	done(null, user.id);
});

Passport.deserializeUser((id, done) => {
	db.Users.findOne({
		where: { openId: id }
	}, (err, user) => {
		console.log("DESERIALIZED USER: ", user);
		done(err, user);
	});
	// db.Users.findOne({
	// 	where: 
	// 		{ openid: id }
	// }, (err, user) => {
	// 	console.log("DESERIALIZED USER: ", user);
	// 	done(err, user);
	// });
});

module.exports = Passport;