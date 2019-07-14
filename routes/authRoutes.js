const Passport = require("../config/passportStrategy"),
	ensureAuthenticated = require("../plugins/ensureAuthenticated"),
	Sqrl = require("squirrelly");

module.exports = app => {

	app.get("/", (req, res) => {
		res.render("index", (err, html) => {
			if (err) {
				console.log("\nerror rendering index:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/team", (req, res) => {
		res.render("team", (err, html) => {
			if (err) {
				console.log("\nerror rendering team:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/additionalresources", (req, res) => {
		res.render("additionalresources", (err, html) => {
			if (err) {
				console.log("\nerror rendering additional resources:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/about", (req, res) => {
		res.render("about", (err, html) => {
			if (err) {
				console.log("\nerror rendering about:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/help", (req, res) => {
		res.render("help", (err, html) => {
			if (err) {
				console.log("\nerror rendering about:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/communityguidelines", (req, res) => {
		res.render("communityguidelines", (err, html) => {
			if (err) {
				console.log("\nerror rendering community guidelines:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/login", (req, res) => {
		res.render("login", (err, html) => {
			if (err) {
				console.log("\nerror rendering login:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/privacypolicy", (req, res) => {
		res.render("privacypolicy", (err, html) => {
			if (err) {
				console.log("\nerror rendering privacy policy:", err, "\n");
			}
			res.send(html);
		});
	});

	app.get("/termsofservice", (req, res) => {
		res.render("termsofservice", (err, html) => {
			if (err) {
				console.log("\nerror rendering terms of service:", err, "\n");
			}
			res.send(html);
		});
	});


	app.get("/auth/google",
		Passport.authenticate("google",
			{ 
				scope: "openid profile email"
			}
		)
	);

	app.get("/auth/google/callback",
		Passport.authenticate("google", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: "Problem with authentication, try again",
		}),
		(req, res) => {
			req.session.save(() => res.redirect("/useraccount"));
		}
	);
	
	app.get("/useraccount", ensureAuthenticated, (req, res) => {
		res.render("useraccount",
			{
				userFirstName: req.user.dataValues.firstName,
				userLastName: req.user.dataValues.lastName,
				userOpenId: req.user.dataValues.openId
			},
			(err, html) => {
				if (err) {
					console.log("\nerror rendering user account page:", err, "\n");
				}
				res.send(html);
			});
	});

	app.get("/logout", (req, res) => {
		res.clearCookie();
		req.logout;
		req.session.destroy(() => res.redirect("/"));
	});

	// for sending user data to client
	app.get("/api/user_data", (req, res) => {
		if (req.user === undefined || req.user === null) {
			// The user is not logged in
			res.json({});
		} else {
			res.json({
				user: req.user
			});
		}
	});

};