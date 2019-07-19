$(() => {
	$( "#sb-container" ).swatchbook( {
		center : 3,
		// number of degrees that is between each item
		angleInc : 35,
		neighbor : 15,
		// if it should be closed by default
		initclosed : true,
		// index of the element that when clicked, triggers the open/close function
		// by default there is no such element
		closeIdx : 5
	});

	var randomNumber = Math.floor(Math.random() * 11) + 1;
	$("#sb-container div:last-child").addClass("img"+randomNumber);
});