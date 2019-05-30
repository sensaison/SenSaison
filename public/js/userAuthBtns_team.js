$(document).ready(() => {

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

	} else if(!req.user) {
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