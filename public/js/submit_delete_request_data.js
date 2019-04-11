$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault(); // this line prevents front-end required validation from occurring

        // USERID CODE FIRST

        ///////////////////////////////
        let userIdVal;

        // CLOUDINARY
        let categoryVal = $("#obs-category").val();
        let dateObsVal = $("#date-obs").val();

        let pictureIdVal;
        cloudinary.v2.uploader.upload(
            $("input[type=file]").files[0],
            options = {
                type: private,
                folder: userIdVal, // each user will have their own folder
                tags: [categoryVal, dateObsVal, userIdVal] // will add tag with obs ID after data is uploaded to mysql
            }).then(function(res) { // response contains the unique public_id of the uploaded file
                pictureIdVal = res.public_id;
            }
        );
        
        
        ///////////////

        let newObs;
        if(window.userPin !== undefined) {
            newObs = {
                userId: userIdVal,
                pictureId: pictureIdVal,
                dateObs: dateObsVal,
                timeObs: $("#time-obs").val(),
                latitude: window.userPin.position.lat(),
                longitude: window.userPin.position.lng(),
                category: categoryVal,
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

        var newObsId;
        $.ajax("/api/observations", {
            type: "POST",
            data: newObs
        }).then(function(response) {
            newObsId = response.id;

            // tag pic with newObsId



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
            // $(this).parents("tr").remove(); // why does this line not work here?
        });

        $(this).parents("tr").remove();
    });

    // GET request when requesting to download data
    $("#request-data").on("click", function(e) {
        // e.preventDefault();

        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-date-download").val();

        if ($("#category-download").val() === "all") {
            location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=animal&category=plant&category=fungus&category=weather&category=land_water";
        } else {
            let category = $("#category-download").val();
            location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=" + category;
        }



        // CLOUDINARY AJAX CALL
        // if ($("#include-pictures").is(":checked")) {
        //     console.log("pics included in download");

        //     let queryUrl = ;

        //     $.ajax({
        //         url:,
        //         data: {
        //
        //         },
        //     }).then(function() {
        //         console.log("success!");
        //     })
        // }


        //////////////////////////

        $("#data-request-form")[0].reset();

    });
});
