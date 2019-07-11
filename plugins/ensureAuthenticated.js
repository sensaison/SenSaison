module.exports = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "You must be logged in first!");
		res.redirect("/");
	}
};

