$.get("/api/animal/mostrecentone", data => {
	let imgSrc;
	if (data[0].pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data[0].pictureId + ".jpg";
	} else {
		imgSrc = "../../images/goose.jpg";
	}
	$("#sb-animals").attr("src", imgSrc);
	if (data[0].dateObs) {
		$("#sb-animals-date").html(data[0].dateObs);
	}
});
    
$.get("/api/fungus/mostrecentone", data => {
	let imgSrc;
	if (data[0].pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data[0].pictureId + ".jpg";
	} else {
		imgSrc = "../../images/fungus.jpg";
	}	
	$("#sb-fungus").attr("src", imgSrc);
	if (data[0].dateObs) {
		$("#sb-fungus-date").html(data[0].dateObs);
	}
});
    
$.get("/api/land_water/mostrecentone", data => {
	let imgSrc;
	if (data[0].pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data[0].pictureId + ".jpg";
	} else {
		imgSrc = "../../images/permafrost.jpg";
	}	
	$("#sb-land-water").attr("src", imgSrc);
	if (data[0].dateObs) {
		$("#sb-land-water-date").html(data[0].dateObs);
	}
});
    
$.get("/api/plant/mostrecentone", data => {
	let imgSrc;
	if (data[0].pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data[0].pictureId + ".jpg";
	} else {
		imgSrc = "../../images/tulips.jpeg";
	}
	$("#sb-plants").attr("src", imgSrc);
	if (data[0].dateObs) {
		$("#sb-plants-date").html(data[0].dateObs);
	}
});
    
$.get("/api/weather/mostrecentone", data => {
	let imgSrc;
	if (data[0].pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data[0].pictureId + ".jpg";
	} else {
		imgSrc = "../../images/thunderstorm.jpg";
	}
	$("#sb-weather").attr("src", imgSrc);
	if (data[0].dateObs) {
		$("#sb-weather-date").html(data[0].dateObs);
	}
});