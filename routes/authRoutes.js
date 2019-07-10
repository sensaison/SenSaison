const Passport = require("../config/passportStrategy"),
	ensureAuthenticated = require("../plugins/ensureAuthenticated");
	// db = require("../models"),
	// path = require("path");

module.exports = app => {

	app.get("/", (req, res) => {
		res.render("index", (err, html) => {
			if (err) {
				console.log(err);
			}
			res.send(html);
		});
	});

	app.get("/team", (req, res) => {
		res.render("team", (err, html) => {
			if (err) {
				console.log(err);
			}
			res.send(html);
		});
	});

	app.get("/additionalresources", (req, res) => {
		res.render("additionalresources", (err, html) => {
			if (err) {
				console.log(err);
			}
			res.send(html);
		});
	});

	app.post("/auth/openid-client", Passport.authenticate("openid-client"));
	// above not working

	app.get("/auth/openid-client/callback",
		Passport.authenticate("openid-client", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: "Problem with authentication, try again",
		}),	(req, res) => {

			console.log("======================");
			console.log("req.user:", req.user);
			console.log("user:", user);
			console.log("req.access_token:", req.access_token);
			console.log("req.user.id:", req.user.id);
			console.log("req.session:", req.session);
			console.log("======================");

			req.session.save(() => {
				res.redirect("/useraccount", { user: req.user });
			});
		}
	);
	
	// protect user account page
	app.get("/useraccount", ensureAuthenticated, (req, res) => {
		console.log("user account page");
		console.log("req.user: ", req.user);
		console.log("user:", user);

		res.render("useraccount", { user: req.user }, (err, html) => {
			if (err) {
				console.log(err);
			}
			console.log("req.user:", user);
			res.send(html);
		});
	});

	app.get("/logout", (req, res) => {
		console.log("LOGGING OUT");
		req.logout;
		req.session.destroy(() => res.redirect("/"));
	});

};