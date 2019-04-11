$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault(); // this line prevents front-end required validation from occurring

        // USERID CODE FIRST




        // CLOUDINARY
        var picturesToUpload = $("input[type=file]").files; // returns a fileList object that contains the files
        var pictureIds = [];

        for (let i=0; i<picturesToUpload.length; i++) {
            Cloudinary::Uploader.upload(
                picturesToUpload.files[i],
                options = {
                    type: private,
                    folder: userId    
                }
            ).then(function(response) { // response contains the unique public_id of the uploaded file
                pictureIds.push(response);
            })
        };

        
        ///////////////


        if(window.userPin !== undefined) {
            var newObs = {
                userId: 13579,
                pictureId: pictureIds, // will this work? if more than one, parses as csv
                dateObs: $("#date-obs").val(),
                timeObs: $("#time-obs").val(),
                latitude: window.userPin.position.lat(),
                longitude: window.userPin.position.lng(),
                category: $("#obs-category").val(),
                firstConfidence: $("#first-confidence").val(),
                briefDescription: $("#brief-desc").val().trim(),
                extendedDescription: $("#extended-desc").val().trim(),
                species: $("#species").val().trim(),
                speciesSciName: $("#species-sci-name").val().trim(),
                speciesConfidence: $("#species-confidence").val(),
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
            // $("#obs-submission-form")[0].reset();
            location.reload();
        }).then(function() {
            alert("Observation successfully submitted");
        });
    });

    // DELETE request when deleting observation
    $("#all-your-obs-body").on("click", ".delete", function(e) {
        e.preventDefault();

        let id_delete = $(this).parents("tr").attr("id");
        // FIX THIS AJAX CALL (and api route)
        console.log(id_delete);
        $.ajax({
            type: "DELETE",
            url: "/api/observations?id=" + id_delete
        }).then(function(response) {
            console.log("delete: "+ response);
        });

        $(this).parents("tr").detach(); // REPLACE WITH REMOVE() WHEN GOING INTO PRODUCTION)
    });

    // GET request when requesting to download data
    // UGH!
    $("#request-data").on("click", function(e) {
        // e.preventDefault();

        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-date-download").val();

        let category;
        if ($("#category-download").val() === "all") {
            category = ["animal%20plant%20fungus%20weather%20land_water"];
            location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=animal&category=plant&category=fungus&category=weather&category=land_water";
        } else {
            category = $("#category-download").val();
            location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=" + category;
        }

        let includePics;
        if ($("#include-pictures").is(":checked")) {
            includePics = true;
        } else {
            includePics = false;
        }

        console.log("includepics: " + includePics);

        $("#data-request-form")[0].reset();

    });
});
