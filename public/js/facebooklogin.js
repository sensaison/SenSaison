window.fbAsyncInit = () => {
	FB.init({
		appId : "2424152161004698",
		cookie : true,
		xfbml : true,
		version : "v3.3"
	});
	FB.AppEvents.logPageView();
};

((d, s, id) => {
	let js, fjs = d.getElementsByTagName(s)[0];
	if (d.getElementById(id)) {
		return;
	}
	js = d.createElement(s); js.id = id;
	js.src = "https://connect.facebook.net/en_US/sdk.js";
	fjs.parentNode.insertBefore(js, fjs);
}(document, "script", "facebook-jssdk"));