$(document).ready(function() {

    // // show user's observations on document ready
    // $.ajax("/api/users", function(req, res) {
    //     type: "GET",
    //     data: kjgh
    // }).then(function(usrdata){
    //     // HANDLEBAR HERE
    //      res.render("something", usrdata)
    // })

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault();
        console.log("submit");

        if(window.userPin !== undefined) {
            var observation = {
                // user_id: AURI,
                // picture_id: AURI,
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


        // $.ajax("/api/observations", {
        //     type: "POST",
        //     data: observation
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

        // let id_delete = $(this).attr("id"); // ????
        // $.ajax("/api/observations", {
        //     type: "DELETE",
        //     id: id_delete
        // }).then(function(err, res) {
        //     if (err) throw err;
        //     console.log(res);
        //     location.reload(true);
        // });

    });

    // GET request when requesting to download data
    $("#request-data").on("click", function(e) {
        e.preventDefault();
        console.log("request");

        let categoryRequest = $("#category-download").val();
        let minDate = $("#start-date-download").val();
        let maxDate = $("#end-data-download").val();
        

        // let queryURL = "https://www.rebasedata.com/api/v1/convert?outputFormat=csv&errorResponse=json";
        // output to csv, if error then error response format is json


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

});