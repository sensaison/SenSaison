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

	app.post("/auth/openid-client",
		Passport.authenticate("google",
			{ scope: ["openid profile email"] }
		),
		(req, res) => {
			console.log("POST /AUTH/OPENID-CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			console.log("post req.user:", req.user);
			console.log("END POST /AUTH/OPENID-CLIENT >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n");
		}
	);

	app.get("/auth/openid-client/callback",
		Passport.authenticate("google", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: "Problem with authentication, try again",
		}),
		(req, res) => {

			console.log("\nGET /auth/openid-client/callback >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
			// console.log("req.user:", req.user);
			console.log("req.isAuthenticated", req.isAuthenticated());

			req.session.save(() => {
				res.redirect("/useraccount");
			});
		}
	);
	
	app.get("/useraccount", ensureAuthenticated, (req, res) => {
		
		console.log("GET user account page");

		res.render("useraccount", { user: req.user }, (err, html) => {
			if (err) {
				console.log(err);
			}
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