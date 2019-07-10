$.get("/api/animals/mostrecentone", data => {
	console.log(data);
	$("#animals").css("background-image", "url(" + data.animalImage + ")");
});
    
$.get("/api/fungus/mostrecentone", data => {
	$("#fungus").css("background-image", "url(" + data.fungusImage + ")");
});
    
$.get("/api/land_water/mostrecentone", data => {
	$("#landwater").css("background-image", "url(" + data.landwaterImage + ")");
});
    
$.get("/api/plants/mostrecentone", data => {
	$("#plants").css("background-image", "url(" + data.plantsImage + ")");
});
    
$.get("/api/weather/mostrecentone", data => {
	$("#weather").css("background-image", "url(" + data.weatherImage + ")");
});