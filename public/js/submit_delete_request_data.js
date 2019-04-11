$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault(); // this line prevents front-end required validation from occurring

        // USERID CODE FIRST




        // CLOUDINARY
        let category = $("#obs-category").val();
        let dateObs = $("#date-obs").val();

        let picturesToUpload = $("input[type=file]").files; // returns a fileList object that contains the files
        let pictureIds = [];

        // need code (and cdn) for cloudinary jquery plug in?
        for (let i=0; i<picturesToUpload.length; i++) {
            Cloudinary::Uploader.upload(
                picturesToUpload.files[i],
                options = {
                    type: private,
                    folder: userId,
                    tags: [category, dateObs, userId]
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
                dateObs: dateObs,
                timeObs: $("#time-obs").val(),
                latitude: window.userPin.position.lat(),
                longitude: window.userPin.position.lng(),
                category: category,
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
            location.reload();
        }).then(function() {
            alert("Observation successfully submitted");
        });
    });

    // DELETE request when deleting observation
    $("#all-your-obs-body").on("click", ".delete", function(e) {
        e.preventDefault();

        let id_delete = $(this).parents("tr").attr("id");

        $.ajax({
            type: "DELETE",
            url: "/api/observations?id=" + id_delete
        }).then(function(response) {
            $(this).parents("tr").remove();
        });

        // $(this).parents("tr").remove();
    });

    // GET request when requesting to download data
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






        // CLOUDINARY AJAX CALL
        if ($("#include-pictures").is(":checked")) {
            console.log("pics included in download");

            let queryUrl = ;

            $.ajax({
                url:,
                data:,
            }).then(function() {
                console.log("success!");
            })
        }


        //////////////////////////

        $("#data-request-form")[0].reset();

    });
});
