// import { picture } from "cloudinary/lib-es5/cloudinary";

$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        // e.preventDefault(); // this line prevents front-end required validation from occurring

        // USERID CODE FIRST

        let userIdVal="12345"

        ///////////////////////////////

        
        if(window.userPin !== undefined) {

            let categoryVal = $("#obs-category").val();
            let dateObsVal = $("#date-obs").val();




            
            let reader = new FileReader();
            let arrayBuffer = $("#pic-file").result;
            let array = new Uint8Array(arrayBuffer);
            let binaryString = String.fromCharCode.apply(null, array);
            let pictureData = binaryString;
            console.log("pictureData 1: " + pictureData);
            reader.readAsArrayBuffer($("#pic-file").prop("files")[0]);

            console.log("picturedata 2: " + pictureData);


            // let imgFile = $("#pic-file").prop("files")[0];
            // console.log("IMGFILE: " + imgFile);

            let pictureIdVal;

            $.ajax({
                method: "POST",
                url: "https://api.cloudinary.com/v1_1/sensaison/image/upload",
                data: {
                    file: pictureData,
                    upload_preset: "default_preset",
                    folder: userIdVal,
                    tags: [categoryVal, dateObsVal, userIdVal] 
                },
                error: function(xhr, err) {
                    console.log(xhr);
                    console.log(err);
                }
            }).then(function(res) {
                pictureIdVal = res.public_id;
                console.log("pictureIdVal: " + pictureIdVal);
            }).then(function() {
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
                $.ajax("/api/observations", {
                    method: "POST",
                    data: newObs
                }).then(function(response) {
                    console.log("response.id: " + response.id);
                    // cloudinary.v2.uploader.add_tag(response.id, newObs.pictureId);
                    location.reload();
                }).then(function() {
                    alert("Observation successfully submitted");
                });
            })



        } else {
            $("#pin-reminder").remove();
            $("#map-wrapper").append($("<label for='map-wrapper' id='pin-reminder'>Please place a pin on the map.</label>"));
            throw "User didn't place a pin on the map.";
        }


    });

    // DELETE request when deleting observation
    $("#all-your-obs-body").on("click", ".delete", function(e) {
        e.preventDefault();

        let id_delete = $(this).parents("tr").attr("id");

        $.ajax({
            method: "DELETE",
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

        
