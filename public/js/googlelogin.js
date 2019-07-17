$(document).ready(() => {
	$("#google-button").on("click", () => {
		$("#google-button").child("img").attr("src", "/images/btn_google_signin_dark_pressed_web@2x.png");
	});
	$("#google-button").hover(() => {
		$("#google-button").child("img").attr("src", "/images/bbtn_google_signin_dark_focus_web@2x.png");
	});
});