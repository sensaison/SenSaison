console.log("faker.js is executing");
var categories = ["weather", "animal", "plant", "fungus", "land_water"];
var pictureIDs = ["12345001", "678910001", "678910002", "246810001", "246810002", "246810003", "13579001", "13579002", "13579003", "13579004", "13579005"];
var randomScienceWords = ["ornithology", "forestry", "permafrost", "songbird", "herpetology", "hurricane", "typhoon", "ecological niche", "fisheries", "r selected", "k selected", "life history", "fault line", "geode", "predator", "prey", "trophic level", "ecosystem", "nitrogen cycle", "carbon sequestration", "olivine", "mantle", "american robin", "walleye pollock", "laysan albatross", "white tailed deer", "bullfrog", "white pine", "red maple", "hickory", "cumulus", "galeforce", "chanterelle", "sphagnum moss", "red algae", "purple starfish", "quartz", "magma", "melting point", "spring", "fall", "winter", "summer", "p value", "rockfish", "everglades", "overfishing", "national park", "conservation", "eastern rattlesnake", "hognose snake", "axotlotl", "bearded dragon", "roadrunner", "loggerhead shrike", "loggerhead turtle", "wind", "pressure", "garnet", "metamorphic", "igneous", "sedimentary", "lightning", "thunderclap", "rain", "snow", "frost", "arctic", "evergreen", "grizzly bear", "polar bear", "yellow-rumped warbler", "black walnut", "ash", "ironwood tulip", "poplar", "tide pool", "lowbush blueberry", "highbush blueberry", "lingonberry", "dewberry", "gooseberry", "chicken", "cow", "rabbit", "coyote", "moose", "mouse", "rat", "owl", "black widow", "brown recluse", "mantis shrimp", "peacock spider", "dungeness crab", "blue kind crab", "scallop urchin", "torrential", "emergence", "caribou", "willow tree", "stratus", "nimbus", "cirrus", "frazil ice", "pancake ice", "blizzard", "sastrugi", "grease ice"];

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
			userIdVal = 678910;
		} else if(i % 51 === 2) {
			userIdVal = 246810;
		} else if(i % 51 === 3) {
			userIdVal = 13579;
		} else {
			userIdVal = Math.floor(Math.random() * 1000000);
		}
		var day = Math.ceil(Math.random() * 28);
		if(day < 10) {
			var dateObsVal = (2017 + Math.floor(Math.random() * 3)) + "-" + Math.ceil(Math.random() * 12)  + "-0" + day;
		} else {
			dateObsVal = (2017 + Math.floor(Math.random() * 3)) + "-" + Math.ceil(Math.random() * 12)  + "-" + day;
		}
		var timeObsVal = Math.floor(Math.random() * 24) + ":" + Math.floor(Math.random() * 60) + ":00";
		var latitudeVal = getRandomInRange(-180, 180, 3);
		var longitudeVal = getRandomInRange(-180, 180, 3);
		var categoryVal = categories[Math.floor(Math.random() * 5)];
		var pictureIdVal = pictureIDs[Math.floor(Math.random() * pictureIDs.length)];
		if(categoryVal === "weather" || categoryVal === "land_water") {
			var speciesVal = "";
			var speciesSciNameVal = "";
			var speciesConfidenceVal = 1;
		} else {
			speciesVal = randomWords(1, 0);
			speciesSciNameVal = randomWords(2, 0);
			speciesConfidenceVal = Math.ceil(Math.random() * 5);
		}
		console.log(dateObsVal);
		var firstConfidenceVal = Math.ceil(Math.random() * 5);
		var briefDescriptionVal = randomWords(4, 2);
		var extendedDescriptionVal = randomWords(7, 3);

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
		allowTime();
	}
});

function randomWords(numWords, range) {
	var randRange = Math.ceil(Math.random() * range);
	var randSign;
	if(Math.random() > 0.5) {
		randSign = -1;
	} else {
		randSign = 1;
	}
	var randTotal = numWords + (randRange * randSign);
	var result = "";
	for(var j = 0; j < randTotal; j++) {
		result += randomScienceWords[Math.floor(Math.random() * randomScienceWords.length)];
		result += " ";
	}
	return result;
}

function getRandomInRange(from, to, fixed) {
	return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
	// .toFixed() returns string, so ' * 1' is a trick to convert to number
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
  
async function allowTime() {
	await sleep(500);
}