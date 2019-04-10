$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) { // THIS WORKS NO MORE TOUCHY!!!!
        // e.preventDefault(); // this line prevents front-end required validation from occurring

        if(window.userPin !== undefined) {
            var observation = {
                user_id: 13579,
                picture_id: 20202020202,
                date_obs: $("#date-obs").val(),
                time_obs: $("#time-obs").val(),
                latitude: window.userPin.position.lat(),
                longitude: window.userPin.position.lng(),
                category: $("#obs-category").val(),
                first_confidence: $("#first-confidence").val(),
                brief_description: $("#brief-desc").val().trim(),
                extended_description: $("#extended-desc").val().trim(),
                species: $("#species").val(),
                species_sci_name: $("#species-sci-name").val(),
                species_confidence: $("#species-confidence").val(),
            };
        } else {
            $("#pin-reminder").remove();
            $("#map-wrapper").append($("<label for='map-wrapper' id='pin-reminder'>Please place a pin on the map.</label>"));
            throw "User didn't place a pin on the map.";
        }

        $.ajax("/api/observations", {
            type: "POST",
            data: newObs
        }).then(function() {
            alert("Observation successfully submitted");
            $("#obs-submission-form")[0].reset();
            // if reload then form is automatically reset and table of user's observations is reloaded too
            // or do a get request here for the table

        });
    });

    // DELETE request when deleting observation
    $("#all-your-obs-body").on("click", ".delete", function(e) {
        e.preventDefault();

        let id_delete = $(this).parents("tr").attr("id"); // check this once the table is functional
        // FIX THIS AJAX CALL (and api route)
        console.log(id_delete);
        $.ajax({
            type: "DELETE",
            url: "/api/observations/" + id_delete, // something wrong with url here
            success: function(response) {
                console.log("successful delete: "+ response);
                $(this).parents("tr").detach(); // REPLACE WITH REMOVE() WHEN GOING INTO PRODUCTION
                // don't need reload on delete because .remove() above
            }
        });
    })

    // GET request when requesting to download data
    // UGH!
    $("#request-data").on("click", function(e) {
        // e.preventDefault();

        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-date-download").val();

        let category;
        if ($("#category-download").val() === "all") {
            category = ["animal", "plant", "fungus", "weather", "land_water"];
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
            data: {
                category: category,
                minDate: minDate,
                maxDate: maxDate
            }
        }).then(function() {
            console.log("Data request successfully submitted");
            $("#data-request-form")[0].reset();
        });
    });
});
