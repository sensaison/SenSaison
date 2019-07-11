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

	db.Users.findOrCreate({
		where: {
			openId: profile.id,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value
		}
	}).then((user, created, err) => {
		if (err) {
			console.log("ERROR with FINDORCREATE:", err);
		}
		// console.log("FINDORCREATE");
		// console.log("user.openId:", user[0].openId);
		// console.log("created:", created);
		return (user);
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