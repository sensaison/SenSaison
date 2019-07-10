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

	// this doesn't work?
	app.post("/auth/openid-client",
		Passport.authenticate("openid-client"),
		(req, res) => {
			console.log("POST /AUTH/OPENID-CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("login post");
			console.log("post req.user:", req.user);
			console.log("END POST /AUTH/OPENID-CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		}
	);

	// this doesn't work
	app.get("/auth/openid-client/callback",
		Passport.authenticate("openid-client", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: "Problem with authentication, try again",
		}),	(req, res) => {

			console.log("GET /auth/openid-client/callback >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("req.user:", req.user);
			console.log("user:", user);
			console.log("req.access_token:", req.access_token);
			console.log("req.user.id:", req.user.id);
			console.log("req.session:", req.session);
			console.log("callback url isAuthenticated?:", req.isAuthenticated());
			console.log("END GET /auth/openid-client/callback >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

			req.session.save(() => {
				res.redirect("/useraccount", { user: req.user });
			});
		}
	);
	
	// protect user account page
	// ensureAuthenticated returns false
	app.get("/useraccount", ensureAuthenticated, (req, res) => {
		
		console.log("GET /USERACCOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		console.log("user account page");
		console.log("req.user: ", req.user);
		console.log("user:", user);
		console.log("END GET /USERACCOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");

		res.render("useraccount", { user: req.user }, (err, html) => {
			if (err) {
				console.log(err);
			}
			console.log("req.user:", user);
			console.log("RENDER GET /USERACCOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			res.send(html);
		});
	});

	// logout works
	app.get("/logout", (req, res) => {
		console.log("LOGGING OUT");
		req.logout;
		req.session.destroy(() => res.redirect("/"));
	});

};