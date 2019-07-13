$(document).ready(() => {	

	// make last 3 fields in submission form required if animal plant or fungus selected
	$("#obs-category").on("change", () => {
		if ($("#obs-category").val() === "animal" && $("#species-info").hasClass("hidden")) {
			$("#species-info").removeClass("hidden");
			$("#species-info").addClass("show");
			$("#species").attr("required");
			$("#species").attr("aria-required", "true");
			$("#species-confidence").attr("required");
			$("#species-confidence").attr("aria-required", "true");
		} else if ($("#obs-category").val() === "plant" && $("#species-info").hasClass("hidden")) {
			$("#species-info").removeClass("hidden");
			$("#species-info").addClass("show");
			$("#species").attr("required");
			$("#species").attr("aria-required", "true");
			$("#species-confidence").attr("required");
			$("#species-confidence").attr("aria-required", "true");
		} else if ($("#obs-category").val() === "fungus" && $("#species-info").hasClass("hidden")) {
			$("#species-info").removeClass("hidden");
			$("#species-info").addClass("show");
			$("#species").attr("required");
			$("#species").attr("aria-required", "true");
			$("#species-confidence").attr("required");
			$("#species-confidence").attr("aria-required", "true");
		} else if ($("#obs-category").val() === "weather" && $("#species-info").hasClass("show")) {
			$("#species-info").removeClass("show");
			$("#species-info").addClass("hidden");
			$("#species").removeAttr("required");
			$("#species").removeAttr("aria-required");
			$("#species-confidence").removeAttr("required");
			$("#species-confidence").removeAttr("aria-required", "true");
			// $("#species-confidence").val(null);
		} else if ($("#obs-category").val() === "land_water" && $("#species-info").hasClass("show")) {
			$("#species-info").removeClass("show");
			$("#species-info").addClass("hidden");
			$("#species").removeAttr("required");
			$("#species").removeAttr("aria-required");
			$("#species-confidence").removeAttr("required");
			$("#species-confidence").removeAttr("aria-required", "true");
			// $("#species-confidence").val(null);
		} else if ($("#obs-category").val() === "other" && $("#species-info").hasClass("show")) {
			$("#species-info").removeClass("show");
			$("#species-info").addClass("hidden");
			$("#species").removeAttr("required");
			$("#species").removeAttr("aria-required");
			$("#species-confidence").removeAttr("required");
			$("#species-confidence").removeAttr("aria-required", "true");
			// $("#species-confidence").val(null);
		}
	});

	// POST request when submitting new observation
	$("#submit-obs").on("click", event => {
		event.preventDefault;

		$.getJSON("api/user_data", data => {
			// Make sure the data contains the username as expected before using it
			if (data.hasOwnProperty("user")) {
				return data;
			} else {
				console.log("ERROR: no user data!");
			}
		}).then(dataUser => {

			const getBase64 = function(file) {
				return new Promise(function(resolve, reject) {
					var reader = new FileReader();
					reader.readAsDataURL(file);
					reader.onload = function() {
						resolve(reader.result);
					};
					reader.onerror = reject;
				});
			};	

			if (window.userPin !== undefined) {

				let img = $("#pic-file").prop("files")[0];
				let userIdVal = dataUser.user.openId;
				let categoryVal = $("#obs-category").val();
				let dateObsVal = $("#date-obs").val();
				let pictureIdVal;
				let newObs;

				getBase64(img).then(result => {
					$.ajax({
						method: "POST",
						url: "https://api.cloudinary.com/v1_1/sensaison/image/upload",
						data: {
							file: result,
							upload_preset: "default_preset",
							folder: userIdVal,
							tags: userIdVal + ", " + categoryVal + ", " +  dateObsVal,
						}
					}).then(response => {
						pictureIdVal = response.public_id;
					}).then(() => {
						let speciesCon;
						if ($("#species-confidence").val() === "") {
							speciesCon = null;
						} else {
							speciesCon = $("#species-confidence").val(); 
						}
						console.log(speciesCon);
						newObs = {
							openId: userIdVal,
							pictureId: pictureIdVal,
							dateObs: dateObsVal,
							timeObs: $("#time-obs").val(),
							latitude: window.userPin.position.lat(),
							longitude: window.userPin.position.lng(),
							category: categoryVal,
							firstConfidence: $("#first-confidence").val(),
							briefDescription: $("#brief-desc").val().trim(),
							extendedDescription: $("#extended-desc").val().trim(),
							species: $("#species").val().trim(),
							speciesSciName: $("#species-sci-name").val().trim(),
							speciesConfidence: speciesCon
						};
						$.ajax("/api/observations", {
							method: "POST",
							xhrFields: {
								withCredentials: true
							},
							data: newObs,
							async: false,
						}).then(() => {
							alert("Observation successfully submitted");
							location.reload();
						});
					}).catch(error => {
						if (error) {
							console.log(error);
						}
					});
				});
			} else {
				$("#pin-reminder").remove();
				$("#map-wrapper").append($("<label for='map-wrapper' id='pin-reminder'>Please place a pin on the map.</label>"));
				throw "User didn't place a pin on the map.";
			}
		});
	});
	
	// DELETE request when deleting observation
	$("#all-your-obs-body").on("click", ".delete", function(e) {
		e.preventDefault();
		console.log("click!");

		let idDelete = $(this).closest("tr").attr("id");
		// FIXME: WHYYYYYYYYYYYY is this DELETE no longer working?!
		console.log("deleting:", idDelete);

		$.ajax({
			method: "DELETE",
			xhrFields: {
				withCredentials: true
			},
			url: "/api/observations?id=" + idDelete
		});
		
		$(this).closest("tr").remove();
	});

	// request to download data
	$("#request-data").on("click", function(e) {
		e.preventDefault();

		let minDate = $("#start-date-download").val();
		let maxDate = $("#end-date-download").val();
        
		if ($("#include-pictures").is(":checked")) { // PICTURES IN DOWNLOAD
			console.log("pics included in download");

			if ($("#category-download").val() === "all") { // ALL categories selected
				location.href="/download-with-pictures?minDate=" + minDate + "&maxDate=" + maxDate + "&category=animal&category=plant&category=fungus&category=weather&category=land_water";

			} else { // single category selected
				let category = $("#category-download").val();
				location.href="/download-with-pictures?minDate=" + minDate + "&maxDate=" + maxDate + "&category=" + category;
			}

		} else { // NO PICTURES
			console.log("NO pics included in download");
			if ($("#category-download").val() === "all") { // ALL categories selected
				location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=animal&category=plant&category=fungus&category=weather&category=land_water";
			} else { // single category selected
				let category = $("#category-download").val();
				location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=" + category;
			}
		}
		$("#data-request-form")[0].reset();
	});
});
