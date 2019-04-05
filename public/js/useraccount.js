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