const ensureAuthenticated = (req, res, next) => {
	if (res.isAuthenticated) {
		return next();
	} else {
		req.flash("error", "You must be logged in first!");
		res.redirect("/");
	}
};

module.exports = ensureAuthenticated;