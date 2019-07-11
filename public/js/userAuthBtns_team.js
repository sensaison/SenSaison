$(document).ready((req, user) => {

	// TODO: req.user or user when that all gets fixed

	console.log("userAuthBtns_team.js >>>>>>>>>>>>>>>>>>>>>>>>>>>>");
	console.log("req:", req);
	console.log("req.user:", req.user);
	console.log("user:", user);
	console.log("END userAuthBtns_team.js >>>>>>>>>>>>>>>>>>>>>>>>>>>>");

	// if user is logged in
	if (req.user) {
		// if there is a signed in user hide the sign in button
		if ($("#signin-team").hasClass("hide")) {
			// nothing
		} else {
			$("#signin-team").addClass("hide");
		}
		// show the your account button
		if ($("#account-team").hasClass("hide")) {
			$("#account-team").removeClass("hide");
		} else {
			// nothing
		}
		// show the logout button
		if ($("#logout-team").hasClass("hide")) {
			$("#logout-team").removeClass("hide");
		} else {
			// nothing
		}
		
		// side menu

		if ($("#signin-team-side").hasClass("hide")) {
			// nothing
		} else {
			$("#signin-team-side").addClass("hide");
		}
		// show the your account button
		if ($("#account-team-side").hasClass("hide")) {
			$("#account-team-side").removeClass("hide");
		} else {
			// nothing
		}
		// show the logout button
		if ($("#logout-team-side").hasClass("hide")) {
			$("#logout-team-side").removeClass("hide");
		} else {
			// nothing
		}

	} else {
		// if there is a signed in user hide the sign in button
		if ($("#signin-team").hasClass("hide")) {
			$("#signin-team").removeClass("hide");
		} else {
			// nothing
		}
		// show the your account button
		if ($("#account-team").hasClass("hide")) {
			// nothing
		} else {
			$("#account-team").addClass("hide");
		}
		// show the logout button
		if ($("#logout-team").hasClass("hide")) {
			// nothing
		} else {
			$("#logout-team").addClass("hide");
		}
		
		// side menu

		if ($("#signin-team-side").hasClass("hide")) {
			$("#signin-team-side").removeClass("hide");
		} else {
			// nothing
		}
		// show the your account button
		if ($("#account-team-side").hasClass("hide")) {
			// nothing
		} else {
			$("#account-team-side").addClass("hide");
		}
		// show the logout button
		if ($("#logout-team-side").hasClass("hide")) {
			// nothing
		} else {
			$("#logout-team-side").addClass("hide");
		}
	}
	
});