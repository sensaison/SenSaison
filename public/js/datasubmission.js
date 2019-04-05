$("#submit-obs").on("click", function() {

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

    $.ajax({
        method: "POST",
        data: observation
    }).then(function() {

    })
})