const Passport = require("../config/passportStrategy");
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

module.exports = (app) => {

	// post user info to db
	app.post("/auth/openid-client", Passport.authenticate("openid-client"));

	// authentication
	app.get("/auth/openid-client/callback",
		Passport.authenticate("openid-client", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: "Problem with authentication, try again",
		}),	(req, res) => {
			res.setHeader("Cookie", ["set-cookie"]);
			console.log(req.isAuthenticated);
			if (req.isAuthenticated) {
				console.log("REQ.USER: ", req.user);
				window.person = req.user; // app-level variable
				window.access_token = req.access_token;
				req.session.save(() => {
					res.send({person, access_token});
					res.redirect("/useraccount")
					console.log("SUCCESSFUL AUTHENTICATION");
					// return (person, access_token);
				});
			} else {
				req.flash("error");
				res.redirect("/");
			}
		}
	);
	
	// protect user account page
	app.get("/useraccount",
		(req, res) => {
			if (req.isAuthenticated) {
				res.send(req.user);
				res.send(req.access_token);
				console.log(req.access_token);
				console.log(req.user);
			} else {
				res.redirect("/");
			}
		}
	);

	app.get("/logout", (req, res) => {
		console.log("LOGGING OUT");
		req.logout;
		req.session.destroy(() => res.redirect("/"));
	});

};