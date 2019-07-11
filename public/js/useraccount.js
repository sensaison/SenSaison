$(document).ready(() => {

	// following four event listeners show/hide what the user can do from their account page
	$("#add-obs-btn").on("click", () => {
		if ($("#add-obs").hasClass("hidden")) {
			$("#add-obs").addClass("show");
			$("#add-obs").removeClass("hidden");

			// make sure all other div's are hidden
			$("#view-usr-obs").addClass("hidden");
			$("#view-usr-obs").removeClass("show");
			$("#view-near-obs").addClass("hidden");
			$("#view-near-obs").removeClass("show");
			$("#download-data").addClass("hidden");
			$("#download-data").removeClass("show");
		}
		// NO ELSE because if it's already showing do nothing
	});

	$("#view-usr-obs-btn").on("click", () => {
		if ($("#view-usr-obs").hasClass("hidden")) {
			$("#view-usr-obs").addClass("show");
			$("#view-usr-obs").removeClass("hidden");

			$("#add-obs").addClass("hidden");
			$("#add-obs").removeClass("show");
			$("#view-near-obs").addClass("hidden");
			$("#view-near-obs").removeClass("show");
			$("#download-data").addClass("hidden");
			$("#download-data").removeClass("show");
		}
	});

	$("#view-near-obs-btn").on("click", () => {
		if ($("#view-near-obs").hasClass("hidden")) {
			$("#view-near-obs").addClass("show");
			$("#view-near-obs").removeClass("hidden");

			$("#view-usr-obs").addClass("hidden");
			$("#view-usr-obs").removeClass("show");
			$("#add-obs").addClass("hidden");
			$("#add-obs").removeClass("show");
			$("#download-data").addClass("hidden");
			$("#download-data").removeClass("show");
		}
	});

	$("#download-data-btn").on("click", () => {
		if ($("#download-data").hasClass("hidden")) {
			$("#download-data").addClass("show");
			$("#download-data").removeClass("hidden");

			$("#view-usr-obs").addClass("hidden");
			$("#view-usr-obs").removeClass("show");
			$("#view-near-obs").addClass("hidden");
			$("#view-near-obs").removeClass("show");
			$("#add-obs").addClass("hidden");
			$("#add-obs").removeClass("show");
		}
	});

	// displaying user's observations in table mentioned above
	$.ajax("/api/userobservations", {
		type: "GET",
		xhrFields: {
			withCredentials: true
		},
		data: {
			openId: "12345" // TODO: change openId in production to user.id or whatever when that all gets fixed
		}
	}).then(data => {
		window.userObs = data;
		if (!data || !data.length) {
			// if no data then add a row saying so
			$("#all-your-obs-body").prepend("<tr class='no-data'><td></td><td></td><td>No observations to display</td><td></td></tr>"
			);
		} else {
			// remove no data row if there is such a row
			if ($("#all-your-obs-body").children("tr").hasClass("no-data")) {
				$(this).children("tr").hasClass("no-data").remove();
			}
			//prepend rows of data
			for (let i=0; i<data.length; i++) {
				let obsId = data[i].id;
				let date = data[i].dateObs;
				let category = data[i].category;
				let briefDesc = data[i].briefDescription;
        
				$("#all-your-obs-body").prepend("<tr id='" + obsId + "'><td>" + date + "</td><td>" + category + "</td><td class='desc-cell'>" + briefDesc + "</td><td><button class='btn waves-effect waves-light btn-small delete'>X</button></tr>"
				);
			}
		}
	}).then(() => {
		$("#all-your-obs").after("<br><ul class='pagination'><li class='waves-effect' id='start-pagination'><a href='#'><i class='material-icons'>chevron_left</i></a></li><li class='waves-effect' id='end-pagination'><a href='#'><i class='material-icons'>chevron_right</i></a></li></div>");
    
		let rowsShown = 10;
		let rowsTotal = $("#all-your-obs tbody tr").length;
		let numPages = rowsTotal/rowsShown;
    
		for (i = 0; i < numPages; i++) {
			let pageNum = i + 1;
			$("#end-pagination").before("<li class='btn waves-effect waves-light btn-flat'><a href='#' rel='" + i + "'>" + pageNum + "</a></li>");
		}
    
		$("#all-your-obs tbody tr").hide();
		$("#all-your-obs tbody tr").slice(0, rowsShown).show();
		$(".pagination a:first").addClass("active");
    
		$(".pagination a").bind("click", e => {
			e.preventDefault();
			$(".pagination a").parent("li").removeClass("active");
			$(this).parent("li").addClass("active");
			let currPage = $(this).attr("rel");
			let startItem = currPage * rowsShown;
			var endItem = startItem + rowsShown;
			$("#all-your-obs tbody tr").css("opacity","0.0").hide().slice(startItem, endItem).css("display","table-row").animate({opacity:1}, 300);
		});   
	});

});
