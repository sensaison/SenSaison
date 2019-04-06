$(document).ready(function() {

    // POST request when submitting new observation
    $("#submit-obs").on("click", function(e) {
        e.preventDefault();

        let observation = {
            date_obs: $("#date-obs").val(),
            time_obs: $("#time-obs").val(),
            // latitude: ,STEFAN
            // longitude: ,
            category: $("#obs=category").val(),
            first_confidence: $("#first-confidence").val(),
            brief_description: $("#brief-desc").val().trim(),
            extended_description: $("#extended-desc").val().trim(),
            species: $("#species").val(),
            species_sci_name: $("#species-sci-name").val(),
            species_confidence: $("#species-confidence").val(),
            // picture_id: AURI
        }

        $.ajax("/api/observations", {
            type: "POST",
            data: observation
        }).then(function(err, res) {
            if (err) throw err;
            console.log(res);
            location.reload(true);
        });
    });

    // DELETE request when deleting observation
    $(".delete").on("click", function(e) {
        e.preventDefault();

        let id_delete = $(this).attr("id"); // ????
        $(this).closest("tr").remove();

        $.ajax("/api/observations", {
            type: "DELETE",
            id: id_delete
        }).then(function(err, res) {
            if (err) throw err;
            console.log(res);
            location.reload(true);
        });

    });

    // GET request when requesting to download data
    $("#request-data").on("click", function(e) {
        e.preventDefault();

        let categoryRequest = $("#category-download").val();
        let dateRangeRequest = {
            minDate: $("#start-date-download").val(),
            maxDate: $("#end-data-download").val()
        }

        let searchTerms = {
            category: categoryRequest,
            // date_obs: new Date(dateRangeRequest); // ???
        }

        // let queryURL = "https://www.rebasedata.com/api/v1/convert" + ; // ???


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
                
            })
        })
    })

}