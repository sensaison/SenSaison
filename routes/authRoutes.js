const Passport = require("../config/passportStrategy"),
	ensureAuthenticated = require("../plugins/ensureAuthenticated");
	// db = require("../models"),
	// path = require("path");

module.exports = app => {

	app.get("/", (req, res) => {
		res.render("index", (err, html) => {
			if (err) {
				console.log("\nerror rendering index:", err);
			}
			res.send(html);
		});
	});

	app.get("/team", (req, res) => {
		res.render("team", (err, html) => {
			if (err) {
				console.log("\nerror rendering team:", err);
			}
			res.send(html);
		});
	});

	app.get("/additionalresources", (req, res) => {
		res.render("additionalresources", (err, html) => {
			if (err) {
				console.log("\nerror rendering additional resources:", err);
			}
			res.send(html);
		});
	});

	app.post("/auth/openid-client",
		Passport.authenticate("google",
			{ scope: ["openid profile email"] }
		)
		// , (req, res) => {
		// 	console.log("post req.user:", req.user);
		// }
	);

	app.get("/auth/openid-client/callback",
		Passport.authenticate("google", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: "Problem with authentication, try again",
		}),
		(req, res) => {

			console.log("\nis authenticated?", req.isAuthenticated());

			req.session.save(() => {
				res.redirect("/useraccount", { user: req.user });
			});
		}
	);
	
	app.get("/useraccount", ensureAuthenticated, (req, res) => {
		console.log("get user account page");
		res.render("useraccount", { user: req.user }, (err, html) => {
			if (err) {
				console.log("\nerror rendering user account page:", err);
			}
			res.send(html);
		});
	});

	app.get("/logout", (req, res) => {
		console.log("\nLOGGING OUT\n");
		res.clearCookie();
		req.logout;
		req.session.destroy(() => res.redirect("/"));
	});

};