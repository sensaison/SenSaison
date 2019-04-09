$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        // e.preventDefault(); // this line prevents validation from occurring
        console.log("clicked on submit new obs");

        let newObs = {
            user_id: 101010101,
            picture_id: 20202020202,
            date_obs: $("#date-obs").val(),
            time_obs: $("#time-obs").val(),
            latitude: 58.2,
            longitude: -121.43,
            category: $("#obs-category").val(),
            first_confidence: $("#first-confidence").val(),
            brief_description: $("#brief-desc").val().trim(),
            extended_description: $("#extended-desc").val().trim(),
            species: $("#species").val(),
            species_sci_name: $("#species-sci-name").val(),
            species_confidence: $("#species-confidence").val(),
        };

        $.ajax("/api/observations", {
            type: "POST",
            data: newObs
        }).then(function(err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);
            // location.reload(true);
        }).done(function() {
            console.log("Observation successfully submitted");
        });
    });

    // DELETE request when deleting observation
    $(".delete").on("click", function(e) {
        e.preventDefault();
        console.log("delete");

        $(this).parents("tr").detach(); // REPLACE WITH REMOVE() WHEN GOING INTO PRODUCTION

        let id_delete = $(this).parents("tr").attr("id"); // check this once the table is functional
        $.ajax("/api/observations", {
            type: "DELETE",
            url: "/api/users/observations" + id_delete
        }).then(function(err, res) {
            if (err) throw err;
            console.log(res);
            // don't need reload on delete because .remove() above
        });

    });

    // GET request when requesting to download data
    $("#request-data").on("click", function(e) {
        e.preventDefault();

        let category = $("#category-download").val();
        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-date-download").val();

        if (category === "all") {
            category = {
                include: [{
                    all: true
                }]
            };
        }

        // let includePics;
        // if ($("#include-pictures").is(":checked")) {
        //     includePics = true;
        // } else {
        //     includePics = false;
        // }

        $.ajax("api/download", {
            type: "GET",
            query: {category, minDate, maxDate}
        }).then(function(err, res) {
            if (err) throw err;
        });

    });
})