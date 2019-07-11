$.get("/api/animals/mostrecentone", data => {
	let imgSrc;
	if (data.pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data.pictureId + ".jpg";
	} else {
		imgSrc = data.animalImage;
	}
	$("#sb-animals").attr("src", imgSrc);
	if (data.dateObs) {
		$("#sb-animals-date").html("Date:", data.dateObs);
	}
});
    
$.get("/api/fungus/mostrecentone", data => {
	let imgSrc;
	if (data.pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data.pictureId + ".jpg";
	} else {
		imgSrc = data.fungusImage;
	}	
	$("#sb-fungus").attr("src", imgSrc);
	if (data.dateObs) {
		$("#sb-fungus-date").html("Date:", data.dateObs);
	}
});
    
$.get("/api/land_water/mostrecentone", data => {
	let imgSrc;
	if (data.pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data.pictureId + ".jpg";
	} else {
		imgSrc = data.landwaterImage;
	}	
	$("#sb-land-water").attr("src", imgSrc);
	if (data.dateObs) {
		$("#sb-land-water-date").html("Date:", data.dateObs);
	}
});
    
$.get("/api/plants/mostrecentone", data => {
	let imgSrc;
	if (data.pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data.pictureId + ".jpg";
	} else {
		imgSrc = data.plantsImage;
	}
	$("#sb-plants").attr("src", imgSrc);
	if (data.dateObs) {
		$("#sb-plants-date").html("Date:", data.dateObs);
	}
});
    
$.get("/api/weather/mostrecentone", data => {
	let imgSrc;
	if (data.pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data.pictureId + ".jpg";
	} else {
		imgSrc = data.weatherImage;
	}
	$("#sb-weather").attr("src", imgSrc);
	if (data.dateObs) {
		$("#sb-weather-date").html("Date:", data.dateObs);
	}
});