$(document).ready(() => {

	// following five event listeners show/hide what the user can do from their account page
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
			$("#modify-account").addClass("hidden");
			$("#modify-account").removeClass("show");
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
			$("#modify-account").addClass("hidden");
			$("#modify-account").removeClass("show");
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
			$("#modify-account").addClass("hidden");
			$("#modify-account").removeClass("show");
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
			$("#modify-account").addClass("hidden");
			$("#modify-account").removeClass("show");

		}
	});

	$("#modify-account-btn").on("click", () => {
		if ($("#modify-account").hasClass("hidden")) {
			$("#modify-account").addClass("show");
			$("#modify-account").removeClass("hidden");

			$("#download-data").addClass("hidden");
			$("#download-data").removeClass("show");
			$("#view-usr-obs").addClass("hidden");
			$("#view-usr-obs").removeClass("show");
			$("#view-near-obs").addClass("hidden");
			$("#view-near-obs").removeClass("show");
			$("#add-obs").addClass("hidden");
			$("#add-obs").removeClass("show");

		}
	});

	// displaying user's observations in table mentioned above
	$.getJSON("api/userprofile", data => {
		// Make sure the data contains the username as expected before using it
		if (data.hasOwnProperty("user")) {
			return data;
		} else {
			console.log("ERROR: no user data!");
		}
	}).then(dataUser => {
		$.ajax("/api/userobservations", {
			type: "GET",
			xhrFields: {
				withCredentials: true
			},
			data: {
				openId: dataUser.user.openId
			}
		}).then(dataUserObs => {	
			window.userObs = dataUserObs;
			
			if ( !dataUserObs || !dataUserObs.length || dataUserObs.length === 0 ) {
				// if no data then add a row saying so
				$("#all-your-obs-body").prepend("<tr class='no-data'><td></td><td></td><td>No observations to display</td><td></td></tr>"
				);
			} else {
				// remove no data row if there is such a row
				if ($("#all-your-obs-body").children("tr").hasClass("no-data")) {
					$(this).children("tr").hasClass("no-data").remove();
				}
				//prepend rows of data
				for (let i=0; i<dataUserObs.length; i++) {
					let obsId = dataUserObs[i].id;
					let date = moment(dataUserObs[i].dateObs).format("MMM Do, YYYY");
					let category = dataUserObs[i].category;
					let briefDesc = dataUserObs[i].briefDescription;
			
					$("#all-your-obs-body").prepend("<tr id='" + obsId + "'><td>" + date + "</td><td>" + category + "</td><td class='desc-cell'>" + briefDesc + "</td><td><button class='btn waves-effect waves-light btn-small delete'>X</button></td></tr>"
					);
				}
			}
	
			$("#all-your-obs").after("<br><ul class='pagination'><li class='waves-effect' id='start-pagination'><a href='#'><i class='material-icons'>chevron_left</i></a></li><li class='waves-effect' id='end-pagination'><a href='#'><i class='material-icons'>chevron_right</i></a></li></div>");
		
			let rowsShown = 10;
			let rowsTotal = $("#all-your-obs tbody tr").length;
			let numPages = rowsTotal/rowsShown;
			for (let i = 0; i < numPages; i++) {
				let pageNum = i + 1;
				$("#end-pagination").before("<li class='btn waves-effect waves-light btn-flat'><a href='#' rel='" + i + "'>" + pageNum + "</a></li>");
			}
		
			$("#all-your-obs tbody tr").hide();
			$("#all-your-obs tbody tr").slice(0, rowsShown).show();
			$(".pagination a:first").addClass("active");
		
			$(".pagination a").bind("click", function(e) {
				e.preventDefault();
	
				$(".pagination a").parent("li").removeClass("active");
				$(this).parent("li").addClass("active");
	
				let currPage = $(this).attr("rel");
				let startItem = currPage * rowsShown;
				let endItem = startItem + rowsShown;
				
				$("#all-your-obs tbody tr").css("opacity","0.0").hide().slice(startItem, endItem).css("display","table-row").animate({opacity:1}, 300);
			});   
	
		});
	
	});

	// delete user account show buttons
	$("#delete-account-btn-1").on("click", e => {
		e.preventDefault();
		$("#delete-account-1").removeClass("show");
		$("#delete-account-1").addClass("hidden");
		$("#delete-account-2").removeClass("hidden");
		$("#delete-account-2").addClass("show");
	});

	$("#delete-account-btn-2").on("click", e => {
		e.preventDefault();
		$("#delete-account-2").removeClass("show");
		$("#delete-account-2").addClass("hidden");
		$("#delete-account-3").removeClass("hidden");
		$("#delete-account-3").addClass("show");
	});

});
