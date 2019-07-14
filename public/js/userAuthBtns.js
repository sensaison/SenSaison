$(document).ready(() => {

	$.getJSON("api/userprofile", data => {
		// Make sure the data contains the username as expected before using it
		if (data.hasOwnProperty("user")) {
			// console.log("user signed in");
			// if there is a signed in user hide the sign in button
			if ($(".signin-li").hasClass("hide")) {
				// nothing
			} else {
				$(".signin-li").addClass("hide");
			}
			// show the your account button
			if ($("#account").hasClass("hide")) {
				$("#account").removeClass("hide");
			} else {
				// nothing
			}
			// show the logout button
			if ($("#logout").hasClass("hide")) {
				$("#logout").removeClass("hide");
			} else {
				// nothing
			}
						
			// side menu
			
			if ($("#signin-side").hasClass("hide")) {
				// nothing
			} else {
				$("#signin-side").addClass("hide");
			}
			// show the your account button
			if ($("#account-side").hasClass("hide")) {
				$("#account-side").removeClass("hide");
			} else {
				// nothing
			}
			// show the logout button
			if ($("#logout-side").hasClass("hide")) {
				$("#logout-side").removeClass("hide");
			} else {
				// nothing
			}
		} else {
			// console.log("no signed in user");

			if ($("#signin").hasClass("hide")) {
				$("#signin").removeClass("hide");
			} else {
				// nothing
			}
			// show the your account button
			if ($("#account").hasClass("hide")) {
				// nothing
			} else {
				$("#account").addClass("hide");
			}
			// show the logout button
			if ($("#logout").hasClass("hide")) {
				// nothing
			} else {
				$("#logout").addClass("hide");
			}
			
			// side menu

			if ($("#signin-side").hasClass("hide")) {
				$("#signin-side").removeClass("hide");
			} else {
				// nothing
			}
			// show the your account button
			if ($("#account-side").hasClass("hide")) {
				// nothing
			} else {
				$("#account-side").addClass("hide");
			}
			// show the logout button
			if ($("#logout-side").hasClass("hide")) {
				// nothing
			} else {
				$("#logout-side").addClass("hide");
			}

		}
	});
});