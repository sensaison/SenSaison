$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        // e.preventDefault(); // this line prevents front-end required validation from occurring
        console.log("clicked on submit new obs");

        let newObs = {
            // REPLACE DUMMY VALUES
            userId: 101010101,
            pictureId: 20202020202,
            dateObs: $("#date-obs").val(),
            timeObs: $("#time-obs").val(),
            latitude: 58.2,
            longitude: -121.43,
            category: $("#obs-category").val(),
            firstConfidence: $("#first-confidence").val(),
            briefDescription: $("#brief-desc").val().trim(),
            extendedDescription: $("#extended-desc").val().trim(),
            species: $("#species").val().trim(),
            speciesSciName: $("#species-sci-name").val().trim(),
            speciesConfidence: $("#species-confidence").val(),
        };
        console.log(newObs);

        $.ajax("/api/observations", {
            type: "POST",
            data: newObs
        }).then(function(err, res) {
            if (err) {
                console.log(err);
            }
            console.log(res);
        }).done(function() {
            alert("Observation successfully submitted");
            $("#obs-submission-form")[0].reset();
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
        console.log("clicked on request data");

        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-date-download").val();

        let category;
        if ($("#category-download").val() === "all") {
            category = {
                include: [{all: true}]
            };
        } else {
            category = $("#category-download").val();
        }

        // let includePics;
        // if ($("#include-pictures").is(":checked")) {
        //     includePics = true;
        // } else {
        //     includePics = false;
        // }

        $.ajax("/download", {
            type: "GET",
            query: {category, minDate, maxDate}
        }).then(function(err, res) {
            if (err) throw err;
            console.log(res);
        }).done(function() {
            console.log("Data request successfully submitted");
            $("#data-request-form")[0].reset();
        });

    });
})