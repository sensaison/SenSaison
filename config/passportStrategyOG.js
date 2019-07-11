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
			redirect_uris: ["https://sensaison.herokuapp.com/useraccount", "http://localhost:3000/useraccount", "http://localhost:3000/auth/openid-client/callback"], // FIXME: remove localhost for production
			response_types: ["code", "token", "id_token"]
		});

		const params = {
			client_id: process.env.GOOGLE_CLIENTID,
			response_type: "code token id_token",
			scope: "openid profile email",
			nonce: generators.nonce(),
			redirect_uri: "http://localhost:3000/auth/openid-client/callback",  // FIXME: REMEMBER TO CHANGE THIS BETWEEN PROD AND DEV
			state: generators.state(),
			prompt: "select_account",
			login_hint: "sub",
		};

		const verify = (tokenset, userinfo, done) => {

			console.log("==================================================== I AM ALIVE!!!! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("VERIFY CALLBACK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("tokenset: ", tokenset);
			console.log("access_token: ", tokenset.access_token);
			console.log("id_token: ", tokenset.id_token);
			console.log("user info: ", userinfo);
			console.log("END VERIFY CALLBACK >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

			// await db.Users.findOrCreate({
			// 	where: {
			// 		openId: tokenset.claims.sub,
			// 		firstName: tokenset.id_token.given_name,
			// 		lastName: tokenset.id_token.family_name,
			// 		email: tokenset.id_token.email
			// 	}
			// }, (err, user) => {
			// 	if (err) {
			// 		console.log("ERROR LOGGING IN");
			// 		return done(err, user);
			// 	}
			// 	// don't need below because findOrCreate
			// 	// if (!user) {
			// 	// 	console.log("NO USER");
			// 	// 	return done(null, false);
			// 	// }
			// 	console.log("FIND OR CREATE");
			// 	return done(null, { user, tokenset });
			// });
			return done(null, tokenSet);
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

		Passport.use("openid-client", new Strategy(options, verify));

	}).catch(err => {
		if (err) {
			console.log(err);
		}
	});

// session stuff
Passport.serializeUser((user, done) => {
	console.log("\nSERIALIZE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	// console.log("user: ", user);
	// console.log("user.id: ", user.id);
	// console.log("user._id: ", user._id);
	console.log("END SERIALIZE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
	done(null, user.id);
});

Passport.deserializeUser((id, done) => {

	console.log("\nDESERIALIZE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	// console.log("id: ", id);

	db.Users.findOne({
		where: { openId: id }
	}, (err, user) => {
		// console.log("DESERIALIZED USER: ", user);
		console.log("END DESERIALIZE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
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