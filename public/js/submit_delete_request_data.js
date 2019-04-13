$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault(); // this line prevents front-end required validation from occurring

        // USERID CODE FIRST

        ///////////////////////////////
        let userIdVal="12345"


        
        if(window.userPin !== undefined) {

            let categoryVal = $("#obs-category").val();
            let dateObsVal = $("#date-obs").val();

            let imgFile = $("#pic-file[type=file]").files;
            // console.log("IMGFILE: " + imgFile);
    
            let newImgUpld = {
                file: imgFile,
                tagUserIdVal: userIdVal,
                tagCategoryVal: categoryVal,
                tagDateObsVal: dateObsVal
            }

            // console.log("newImgUpld: " + newImgUpld);
            
            let pictureIdVal;

            $.ajax("https://api.cloudinary.com/v1_1/sensaison/image/upload", {
                type: "POST",
                data: newImgUpld
            }).then(function(err, res) {
                if (err) throw err;
                pictureIdVal = res.public_id;
                console.log("pictureIdVal: " + pictureIdVal);
            });


            var newObs = {
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

        $.ajax("/api/observations", {
            type: "POST",
            data: newObs
        }).then(function(response) {
            console.log("response.id: " + response.id);
            // cloudinary.v2.uploader.add_tag(response.id, newObs.pictureId);
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
        }).then(function(res) {
            $(this).parents("tr").remove();
        });

        
    });

    // request to download data
    $("#request-data").on("click", function(e) {

        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-date-download").val();
        
        if ($("#include-pictures").is(":checked")) { // PICTURES IN DOWNLOAD
            console.log("pics included in download");

            if ($("#category-download").val() === "all") { // ALL categories selected
                location.href="/download-with-pictures?minDate=" + minDate + "&maxDate=" + maxDate + "&category=animal&category=plant&category=fungus&category=weather&category=land_water";

            } else { // single category selected
                let category = $("#category-download").val();
                location.href="/download-with-pictures?minDate=" + minDate + "&maxDate=" + maxDate + "&category=" + category;
            }

        } else { // NO PICTURES
            console.log("NO pics included in download");
            if ($("#category-download").val() === "all") { // ALL categories selected
                location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=animal&category=plant&category=fungus&category=weather&category=land_water";
            } else { // single category selected
                let category = $("#category-download").val();
                location.href="/download?minDate=" + minDate + "&maxDate=" + maxDate + "&category=" + category;
            }
        }
        $("#data-request-form")[0].reset();
    })
})

        
