module.exports = (req, res, next) => {
	console.log("ENSUREAUTHENTICATED >>>>>>>>>>>>>>>>>")
	console.log("is authenticated?: ", req.isAuthenticated());
	console.log("user: ", req.user);

	if (req.isAuthenticated()) {
		console.log("END ENSUREAUTHENTICATED >>>>>>>>>>>>>>>>>")
		return next();
	} else {
		console.log("ENSUREAUTHENTICATED: You must be logged in first!");
		console.log("END ENSUREAUTHENTICATED >>>>>>>>>>>>>>>>>")
		req.flash("error", "You must be logged in first!");
		res.redirect("/");
	}
};

