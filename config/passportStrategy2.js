require("dotenv").config();
const Passport = require("passport"),
	GoogleStrategy = require("passport-google-oauth20").Strategy,
	FacebookStrategy = require("passport-facebook").Strategy,
	TwitterStrategy = require("passport-twitter").Strategy,
	db = require("../models");


// GOOGLE
Passport.use("google", new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENTID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {

	// TODO: give Team SenSaison admin account with access to all APIs
	console.log("\ngoogle profile:", profile, "\n");

	db.Users.findOrCreate({
		where: {
			openId: profile.id,
			displayName: profile.displayName,
			firstName: profile.name.givenName,
			lastName: profile.name.familyName,
			email: profile.emails[0].value
		}
	}).then((user, created, err) => {
		// console.log("findOrCreate Google:", user[0].openId);
		// console.log("user.openId:", user[0].openId);
		// console.log("created:", created);
		return user;
	}).catch(err => {
		if (err) {
			console.log("ERROR with findOrCreate GOOGLE:", err);
		}
	});

	return done(null, profile);
}));

// TODO: facebook and twitter logins

// FACEBOOK
Passport.use("facebook", new FacebookStrategy({
	clientID: process.env.FACEBOOK_APPID,
	clientSecret: process.env.FACEBOOK_SECRET,
	callbackURL: "/auth/facebook/callback"
},
(accessToken, refreshToken, profile, done) => {
	console.log("\nFacebook profile:", profile, "\n");
	db.Users.findOrCreate({
		where: {
			openId: profile.id,
			firstName: profile.first_name,
			lastName: profile.last_name,
			displayName: profile.name,
			email: profile.email
		}
	}).then((user, created) => {
		console.log("\nfindOrCreate FACEBOOK:", user[0].openId, "\n");
		return user;
	}).catch(err => {
		if (err) {
			console.log("\nERROR with findOrCreate FACEBOOK:", err, "\n");
		}
	});
	return done(null, profile);
}));

// TWITTER
Passport.use("twitter", new TwitterStrategy({
	consumerKey: process.env.TWITTER_KEY,
	consumerSecret: process.env.TWITTER_SECRET,
	userProfileURL: "https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true",
	callbackURL: "/auth/twitter/callback"
},
(accessToken, refreshToken, profile, done) => {
	console.log("\nTwitter accessToken:", accessToken, "\n");
	console.log("\nTwitter refreshToken:", refreshToken, "\n");
	console.log("\nTwitter profile:", profile, "\n");
	db.Users.findOrCreate({
		where: {
			openId: profile.id,
			displayName: profile.displayName,
			email: profile.emails[0].value
			// twitter does NOT provide first/last names!!!
		}
	}).then((user, created) => {
		console.log("\nfindOrCreate TWITTER:", user[0].openId, "\n");
		return user;
	}).catch(err => {
		if (err) {
			console.log("\nERROR with findOrCreate TWITTER:", err, "\n");
		}
	});
	return done(null, profile);
}));

// SESSIONS
Passport.serializeUser((user, done) => {
	done(null, user);
});

Passport.deserializeUser((id, done) => {
	done(null, id);
});

module.exports = Passport;