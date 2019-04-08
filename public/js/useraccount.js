$(document).ready(function() {

    $("#add-obs-btn").on("click", function() {
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

    $("#view-usr-obs-btn").on("click", function() {
        if ($("#view-usr-obs").hasClass("hidden")) {
            $("#view-usr-obs").addClass("show");
            $("#view-usr-obs").removeClass("hidden");

            // make sure all other div's are hidden
            $("#add-obs").addClass("hidden");
            $("#add-obs").removeClass("show");
            $("#view-near-obs").addClass("hidden");
            $("#view-near-obs").removeClass("show");
            $("#download-data").addClass("hidden");
            $("#download-data").removeClass("show");
        }
    });

    $("#view-near-obs-btn").on("click", function() {
        if ($("#view-near-obs").hasClass("hidden")) {
            $("#view-near-obs").addClass("show");
            $("#view-near-obs").removeClass("hidden");

            // make sure all other div's are hidden
            $("#view-usr-obs").addClass("hidden");
            $("#view-usr-obs").removeClass("show");
            $("#add-obs").addClass("hidden");
            $("#add-obs").removeClass("show");
            $("#download-data").addClass("hidden");
            $("#download-data").removeClass("show");
        }
        // NO ELSE because if it's already showing do nothing
    });

    $("#download-data-btn").on("click", function() {
        if ($("#download-data").hasClass("hidden")) {
            $("#download-data").addClass("show");
            $("#download-data").removeClass("hidden");

            // make sure all other div's are hidden
            $("#view-usr-obs").addClass("hidden");
            $("#view-usr-obs").removeClass("show");
            $("#view-near-obs").addClass("hidden");
            $("#view-near-obs").removeClass("show");
            $("#add-obs").addClass("hidden");
            $("#add-obs").removeClass("show");
        }
        // NO ELSE because if it's already showing do nothing
    });

    // below code is for pagination of table showing all of the user's observations
    function paginate() {
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

        $(".pagination a").bind("click", function(e) {
            e.preventDefault();
            $(".pagination a").parent("li").removeClass("active");
            $(this).parent("li").addClass("active");
            let currPage = $(this).attr("rel");
            let startItem = currPage * rowsShown;
            var endItem = startItem + rowsShown;
            $("#all-your-obs tbody tr").css("opacity","0.0").hide().slice(startItem, endItem).css("display","table-row").animate({opacity:1}, 300);
        });   
    }
    paginate();

    // below code is for displaying user's observations
    function getUserObs(User) {
        // let userID = User || "";
        // how to get userId from page? AURI!!

        $.get("/api/users" + User, function(data) {
            console.log("Observations: ", data);
            let observations = data;
            if (!observations || !observations.length) {
              // DISPLAY EMPTY TABLE
            } else {
                for (let i=0; i<data.length; i++) {
            
                    let obsId = data[i].id;
                    let date = data[i].dateObs;
                    let category = data[i].category;
                    let briefDesc = data[i].briefDescription;
        
                    $("#all-your-obs-body").prepend("<tr id='" + obsId + "'><td>" + date + "</td><td>" + category + "</td><td>" + briefDesc + "</td><td><button class='btn waves-effect waves-light btn-small delete'>X</button></tr>"
                    );
                }
            }
        });
    }

});
