const Passport = require("../config/passportStrategy");
// const ensureLoggedIn = require("connect-ensure-login").ensureLoggedIn;

module.exports = (app) => {
	app.post("/auth/openidconnect", Passport.authenticate("openid-client"));

	app.get("/auth/openidconnect/callback",
		Passport.authenticate("openid-client", {
			session: true,
			failureRedirect: "/" ,
			failureFlash: true,
		}),	(req, res) => {
			// res.setHeader("Cookie", ["set-cookie"]);
			if (req.isAuthenticated()) {
				console.log(req.user);
				req.session.save(() => {
					res.redirect("/useraccount");
					console.log("SUCCESSFUL AUTHENTICATION");
					const token = req.access_token;
					const user = req.user;
					return (user, token);
				});
			} else {
				req.flash("error");
				res.redirect("/");
			}
		}
	);

	app.get("/useraccount",
		(req, res) => {
			if (req.isAuthenticated()) {
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