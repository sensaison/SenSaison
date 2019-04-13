var faker = require("faker");
var categories = ["weather", "animal", "plant", "fungus", "land_water"];
var pictureIDs = ["12345001", "678910001", "678910002", "246810001", "246810002", "246810003", "13579001", "13579002", "13579003", "13579004", "13579005"];

$.ajax("/api/observations", {
    type: "GET"
}).then(function(res) {
    if(res.length > 3000) {
        throw "Dummy data was already created once";
    }
    for(var i = 0; i <= 3000; i++) {
        if(i % 51 === 0) {
            var userIdVal = 12345;
        } else if(i % 51 === 1) {
            var userIdVal = 678910;
        } else if(i % 51 === 2) {
            var userIdVal = 246810;
        } else if(i % 51 === 3) {
            var userIdVal = 13579;
        } else {
            var userIdVal = Math.floor(Math.random() * 1000000);
        }
        var dateObsVal = faker.date.recent();
        var timeObsVal = Math.floor(Math.random() * 24) + ":" + Math.floor(Math.random() * 60) + ":00";
        var latitudeVal = faker.address.latitude;
        var longitudeVal = faker.address.longitude;
        var categoryVal = categories[Math.floor(Math.random() * 5)];
        var pictureIdVal = pictureIDs[Math.floor(Math.random() * pictureIDs.length())];
        if(categoryVal === "weather" || categoryVal === "land_water") {
            var speciesVal = null;
            var speciesSciNameVal = null;
            var speciesConfidenceVal = null;
        } else {
            var speciesVal = faker.random.word();
            var speciesSciNameVal = faker.random.words();
            var speciesConfidenceVal = Math.ceil(Math.random() * 5);
        }
        var firstConfidenceVal = Math.ceil(Math.random() * 5);
        var briefDescriptionVal = faker.random.words();
        var extendedDescriptionVal = faker.random.words();

        var newObs = {
            userId: userIdVal,
            pictureId: pictureIdVal,
            dateObs: dateObsVal,
            timeObs: timeObsVal,
            latitude: latitudeVal,
            longitude: longitudeVal,
            category: categoryVal,
            firstConfidence: firstConfidenceVal,
            briefDescription: briefDescriptionVal,
            extendedDescription: extendedDescriptionVal,
            species: speciesVal,
            speciesSciName: speciesSciNameVal,
            speciesConfidence: speciesConfidenceVal,
        };

        $.ajax("/api/observations", {
            type: "POST",
            data: newObs
        }).then(function(response) {
            console.log("Successfully pushed a dummy entry");
        });
    }
});