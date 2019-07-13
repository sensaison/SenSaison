require("dotenv").config();
const Passport = require("passport"),
	GoogleStrategy = require("passport-google-oauth20").Strategy,
	// FacebookStrategy = require("passport-facebook").Strategy,
	// TwitterStrategy = require("passport-twitter").Strategy,
	db = require("../models");


// GOOGLE
Passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENTID,
	clientSecret: process.env.GOOGLE_SECRET,
	callbackURL: "/auth/google/callback"
},
(accessToken, refreshToken, profile, done) => {

	db.Users.findOrCreate({
		// findOrCreate is inconsistent about how it handles duplicates - clearing out the db seems to fix the issue?
		// prob related to having email being duplicated but other unique keys not being duplicated (specifically openId)
		where: {
			openId: profile.id,
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

	return done(null, { accessToken, refreshToken, profile });
}));

// TODO: facebook and twitter logins

// FACEBOOK
// Passport.use(new FacebookStrategy({
// 	clientID: process.env.FACEBOOK_CLIENTID,
// 	clientSecret: process.env.FACEBOOK_SECRET,
// 	callbackURL: "/auth/facebook/callback"
// },
// (accessToken, refreshToken, profile, done) => {
// 	console.log("\nFacebook accessToken:", accessToken, "\n");
// 	console.log("\nFacebook refreshToken:", refreshToken, "\n");
// 	console.log("\nFacebook profile:", profile, "\n");
// 	db.Users.findOrCreate({
// 		where: {
// 			openId: profile.id,
// 			firstName: profile.name.givenName,
// 			lastName: profile.name.familyName,
// 			email: profile.emails[0].value
// 		}
// 	}).then((user, created) => {
// 		console.log("\nfindOrCreate FACEBOOK:", user[0].openId, "\n");
// 		return user;
// 	}).catch(err => {
// 		if (err) {
// 			console.log("\nERROR with findOrCreate FACEBOOK:", err, "\n");
// 		}
// 	});
// 	return done(null, { accessToken, refreshToken, profile });
// }));

// TWITTER
// Passport.use(new TwitterStrategy({
// 	clientID: process.env.TWITTER_CLIENTID,
// 	clientSecret: process.env.TWITTER_SECRET,
// 	callbackURL: "/auth/twitter/callback"
// },
// (accessToken, refreshToken, profile, done) => {
// 	console.log("\nTwitter accessToken:", accessToken, "\n");
// 	console.log("\nTwitter refreshToken:", refreshToken, "\n");
// 	console.log("\nTwitter profile:", profile, "\n");
// 	db.Users.findOrCreate({
// 		where: {
// 			openId: profile.id,
// 			firstName: profile.name.givenName,
// 			lastName: profile.name.familyName,
// 			email: profile.emails[0].value
// 		}
// 	}).then((user, created) => {
// 		console.log("\nfindOrCreate TWITTER:", user[0].openId, "\n");
// 		return user;
// 	}).catch(err => {
// 		if (err) {
// 			console.log("\nERROR with findOrCreate TWITTER:", err, "\n");
// 		}
// 	});
// 	return done(null, { accessToken, refreshToken, profile });
// }));

// SESSIONS
Passport.serializeUser((user, done) => {
	done(null, user);
});

Passport.deserializeUser((id, done) => {
	done(null, id);
});

module.exports = Passport;