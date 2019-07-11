require("dotenv").config();
const Passport = require("passport"),
	db = require("../models"),
	GoogleStrategy = require("passport-google-oauth20").Strategy;

// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
Passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENTID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: "/auth/openid-client/callback"
},
function (accessToken, refreshToken, profile, cb) {
	// In this example, the user's Facebook profile is supplied as the user
	// record.  In a production-quality application, the Facebook profile should
	// be associated with a user record in the application's database, which
	// allows for account linking and authentication with other identity
	// providers.

	// db.Users.findOrCreate({
	// 	where: {
	// 		openId: accessToken.claims.sub,
	// 		firstName: accessToken.id_token.given_name,
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

	console.log(accessToken);
	console.log(refreshToken);
	console.log(profile);
	console.log("==================================================== I AM ALIVE!!!! >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	return cb(null, profile);
}));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
Passport.serializeUser(function (user, cb) {
	console.log("\nSERIALIZE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	cb(null, user);
});

Passport.deserializeUser(function (obj, cb) {
	console.log("\nDESERIALIZE USER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	cb(null, obj);
});

module.exports = Passport;