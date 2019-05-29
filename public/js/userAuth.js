function onSignIn(user) {
    // Useful data for your client-side scripts:
    var profile = user.id_token;
    console.log(user);
    console.log("ID: " + profile.sub); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.name);
    console.log('Given Name: ' + profile.givenName);
    console.log('Family Name: ' + profile.familyName);
    console.log("Email: " + profile.email);

    // The ID token you need to pass to your backend:
    // var id_token = googleUser.getAuthResponse().id_token;
//	console.log("ID Token: " + id_token);
};
