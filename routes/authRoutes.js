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

	// this partially works?
	app.post("/auth/openid-client",
		Passport.authenticate("google", { scope: ["profile"] }),
		(req, res) => {
			console.log("POST /AUTH/OPENID-CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("login post");
			console.log("post req.user:", req.user);
			console.log("END POST /AUTH/OPENID-CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
		}
	);

	// this partially works
	app.get("/auth/openid-client/callback",
		// Passport.authenticate("openid-client", {
		// 	session: true,
		// 	failureRedirect: "/" ,
		// 	failureFlash: "Problem with authentication, try again",
		// }),
		Passport.authenticate("google", { failureRedirect: "/" }),
		(req, res) => {

			console.log("\nGET /auth/openid-client/callback >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("req.query:", req.query);
			// console.log("req.user:", req.user);
			// console.log("user:", user);
			// console.log("req.access_token:", req.access_token);
			// console.log("req.user.id:", req.user.id);
			// console.log("req.session:", req.session);
			// console.log("callback url isAuthenticated?:", req.isAuthenticated());
			console.log("END GET /auth/openid-client/callback >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");

			// req.session.save(() => {
			// 	res.redirect("/useraccount", { user: req.user });
			// });
			res.send("OK");
		}
	);
	
	// protect user account page
	// ensureAuthenticated returns false
	app.get("/useraccount", ensureAuthenticated, (req, res) => {
		
		console.log("\nGET /USERACCOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		console.log("user account page");
		console.log("req:", req);
		console.log("req.user: ", req.user);
		console.log("user:", user);
		console.log("END GET /USERACCOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");

		res.render("useraccount", { user: req.user }, (err, html) => {
			if (err) {
				console.log(err);
			}
			console.log("req.user:", user);
			console.log("RENDER GET /USERACCOUNT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
			res.send(html);
		});
	});

	// logout works
	app.get("/logout", (req, res) => {
		console.log("\nLOGGING OUT\n");
		res.clearCookie();
		req.logout;
		req.session.destroy(() => res.redirect("/"));
	});

};