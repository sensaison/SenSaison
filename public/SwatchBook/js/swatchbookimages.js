$.get("/api/animal/mostrecentone", data => {
	let imgSrc;
	if (data[0].pictureId) {
		imgSrc = "https://res.cloudinary.com/sensaison/image/upload/"+ data[0].pictureId + ".jpg";
	} else {
		imgSrc = "../../images/goose.jpg";
	}
	$("#sb-animals").attr("src", imgSrc);
	if (data[0].dateObs) {
		let date = moment(data[0].dateObs).format("MMM Do[,] YYYY");
		$("#sb-animals-date").html(date);
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
		let date = moment(data[0].dateObs).format("MMM Do[,] YYYY");
		$("#sb-fungus-date").html(date);
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
		let date = moment(data[0].dateObs).format("MMM Do[,] YYYY");
		$("#sb-land-water-date").html(date);
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
		let date = moment(data[0].dateObs).format("MMM Do[,] YYYY");
		$("#sb-plants-date").html(date);
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
		let date = moment(data[0].dateObs).format("MMM Do[,] YYYY");
		$("#sb-weather-date").html(date);
	}
});