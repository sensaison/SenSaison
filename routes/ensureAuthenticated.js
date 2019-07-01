module.exports = (req, res, next) => {
	console.log("is authenticated?: ", req.isAuthenticated);

	if (req.isAuthenticated) {
		return next();
	} else {
		req.flash("error", "You must be logged in first!");
		res.redirect("/");
	}
};

