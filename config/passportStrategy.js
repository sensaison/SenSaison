require("dotenv").config();
const Passport = require("passport"),
	GoogleStrategy = require("passport-google-oauth20").Strategy,
	db = require("../models");

Passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENTID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: "/auth/openid-client/callback"
},
(accessToken, refreshToken, profile, done) => {

	// console.log(accessToken);
	// console.log(refreshToken);
	// console.log(profile.id);
	// console.log(profile.name.givenName);
	// console.log(profile.name.familyName);
	// console.log(profile.emails[0].value);

	db.Users.findOrCreate({
		where: {
			openId: profile.id,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value
		}
	}).then((user, created, err, done) => {
		if (err) {
			console.log("ERROR LOGGING IN");
			return done(err, user);
		}
		console.log("FINDORCREATE");
		console.log("user:", user);
		console.log("created:", created);
		return done(null, user);
	}).catch(err => {
		if (err) {
			console.log(err);
		}
	});

	return done(null, { accessToken, refreshToken, profile });
}));


Passport.serializeUser((user, done) => {
	done(null, user);
});

Passport.deserializeUser((id, done) => {
	done(null, id);
});

module.exports = Passport;