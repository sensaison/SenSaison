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
    $("#all-your-obs").after("<br><div id='pagination'></div>");
    var rowsShown = 10;
    var rowsTotal = $("#all-your-obs tbody tr").length;
    var numPages = rowsTotal/rowsShown;
    for(i = 0;i < numPages;i++) {
        var pageNum = i + 1;
        $("#pagination").append("<a class='btn waves-effect waves-light btn-small' href='#' rel='" + i + "'>" + pageNum + "</a> ");
    }
    $("#all-your-obs tbody tr").hide();
    $("#all-your-obs tbody tr").slice(0, rowsShown).show();
    $("#pagination a:first").addClass("active");
    $("#pagination a").bind("click", function(e) {
        e.preventDefault();
        $("#pagination a").removeClass("active");
        $(this).addClass("active");
        var currPage = $(this).attr("rel");
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $("#all-your-obs tbody tr").css("opacity","0.0").hide().slice(startItem, endItem).css("display","table-row").animate({opacity:1}, 300);
    });
});
