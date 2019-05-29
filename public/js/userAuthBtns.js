$(document).ready(function() {

    // if user is logged in
    if (req.user) {
        if ($("#signin-index").hasClass("hide")) {
            // nothing because user is signed in
        } else { //if no user show sign in button
            // hide sign in button
            $("#signin-index").addClass("hide");
        };

        if ($("#account-index").hasClass("hide")) {
            $("#account-index").removeClass("hide");
        } else {
            // nothing
        };

        if ($("#logout-index").hasClass("hide")) {
            $("#logout-index").removeClass("hide");
        } else { //if no user show sign in button
            // hide sign in button
        };
        









    } else if(!req.user) {
        if ($("#signin-index").hasClass("hide")) {
            $("#signin-index").removeClass("hide");
        } else {
            // nothing because no user
        };
    }




    
}