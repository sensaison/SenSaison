$(document).ready(() => {

	// if user is logged in
	if (req.user) {
		// if there is a signed in user hide the sign in button
		if ($("#signin-resources").hasClass("hide")) {
			// nothing
		} else {
			$("#signin-resources").addClass("hide");
		}
		// show the your account button
		if ($("#account-resources").hasClass("hide")) {
			$("#account-resources").removeClass("hide");
		} else {
			// nothing
		}
		// show the logout button
		if ($("#logout-resources").hasClass("hide")) {
			$("#logout-resources").removeClass("hide");
		} else {
			// nothing
		}
		
		// side menu

		if ($("#signin-resources-side").hasClass("hide")) {
			// nothing
		} else {
			$("#signin-resources-side").addClass("hide");
		}
		// show the your account button
		if ($("#account-resources-side").hasClass("hide")) {
			$("#account-resources-side").removeClass("hide");
		} else {
			// nothing
		}
		// show the logout button
		if ($("#logout-resources-side").hasClass("hide")) {
			$("#logout-resources-side").removeClass("hide");
		} else {
			// nothing
		}

	} else if(!req.user) {
		// if there is a signed in user hide the sign in button
		if ($("#signin-resources").hasClass("hide")) {
			$("#signin-resources").removeClass("hide");
		} else {
			// nothing
		}
		// show the your account button
		if ($("#account-resources").hasClass("hide")) {
			// nothing
		} else {
			$("#account-resources").addClass("hide");
		}
		// show the logout button
		if ($("#logout-resources").hasClass("hide")) {
			// nothing
		} else {
			$("#logout-resources").addClass("hide");
		}
		
		// side menu

		if ($("#signin-resources-side").hasClass("hide")) {
			$("#signin-resources-side").removeClass("hide");
		} else {
			// nothing
		}
		// show the your account button
		if ($("#account-resources-side").hasClass("hide")) {
			// nothing
		} else {
			$("#account-resources-side").addClass("hide");
		}
		// show the logout button
		if ($("#logout-resources-side").hasClass("hide")) {
			// nothing
		} else {
			$("#logout-resources-side").addClass("hide");
		}
	}
	
});