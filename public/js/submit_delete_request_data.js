$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault();
        console.log("submit");

        let newObservation = {
            // user_id: ,AURI
            // picture_id: AURI,
            date_obs: $("#date-obs").val(),
            time_obs: $("#time-obs").val(),
            // latitude: ,STEFAN
            // longitude: ,
            category: $("#obs-category").val(),
            first_confidence: $("#first-confidence").val(),
            brief_description: $("#brief-desc").val().trim(),
            extended_description: $("#extended-desc").val().trim(),
            species: $("#species").val(),
            species_sci_name: $("#species-sci-name").val(),
            species_confidence: $("#species-confidence").val(),
        };

        // $.ajax("/api/observations", {
        //     type: "POST",
        //     data: newObservation
        // }).then(function(err, res) {
        //     if (err) throw err;
        //     console.log(res);
        //     location.reload(true);
        // });
    });

    // DELETE request when deleting observation
    $(".delete").on("click", function(e) {
        e.preventDefault();
        console.log("delete");

        $(this).parents("tr").detach(); // REPLACE WITH REMOVE() WHEN GOING INTO PRODUCTION

        let id_delete = $(this).parents("tr").attr("id"); // ????
        $.ajax("/api/observations", {
            type: "DELETE",
            url: "/api/users/observations" + id_delete
        }).then(function(err, res) {
            if (err) throw err;
            console.log(res);
            location.reload(true);
        });

    });

    // GET request when requesting to download data
    $("#request-data").on("click", function(e) {
        e.preventDefault();
        console.log("request");

        let categoryRequest = $("#category-download").val();
        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-data-download").val();


        $.ajax("api/observations", {
            type: "GET",
            data: searchTerms
        }).then(function(err, res) {
            if (err) throw err;
            console.log(res);

            $.ajax({
                url: queryURL,
                method: "POST",
            }).then(function(err, res) {
                
            });
        });
    });

})