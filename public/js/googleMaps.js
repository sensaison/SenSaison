const apiKey = "AIzaSyDexLO6StKoAhSrxypz3E6neGfT9PpJSlM";

var startingPos;
var userPin;
var mapType = 0;
var selectedLocationID;
var coordinates = {};
var nearbyMap;
var userMap;
var userObs;
allowTime();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(usePosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        generateMaps();
        setUpForm();
        enableButtons();
    }
}

const enableButtons = () => {
    $(".g1").each(() => {
        $(this).removeAttr("disabled");
        $(this).attr("class", "btn waves-effect waves-light g1");
    });
}

const setUpForm = () => {
    if(startingPos === undefined) {
        $("#near-me").css("display", "none");
    }
}

$("#me").click(() => {
    $("#city-select").css("display", "none");
});

$("#city").click(() => {
    $("#city-select").css("display", "block");
});

const usePosition = position => {
    startingPos = position;
    generateMaps();
    setUpForm();
    enableButtons();
}

const showError = error => {
    generateMaps();
    setUpForm();
    enableButtons();
    switch(error.code) {
    case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation.");
        break;
    case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable.");
        break;
    case error.TIMEOUT:
        console.log("The request to get user location timed out.");
        break;
    case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred.");
        break;
    }
}

const generateMaps = () => {
    generateMap();
    generateMap();
    generateMap();
}

const generateMap = () => {
    var latitude = 47.1585;
    var longitude = 27.6014;
    if(startingPos !== undefined) {
        latitude = startingPos.coords.latitude;
        longitude = startingPos.coords.longitude;
    }
    var centerPlace = { lat: latitude, lng: longitude};
    var map = new google.maps.Map(document.getElementById("map-" + mapType), {
        center: centerPlace,
        zoom: 12,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });
    // Do some stuff to prepare a map where the user can indicate a choice of location.
    if(mapType === 0) {
        map.addListener("click", event => {
            if(userPin === undefined) {
                $("#pin-reminder").remove();
                placeMarkerAndPanTo(event.latLng, map);
            } else {
                console.log("A pin has already been placed. Click 'clear pins' to clear them first.");
            }
        });
    } else if(mapType === 1) {
        // Do some stuff to pin all user observations
        userMap = map;
        // console.log(userObs);
        for(var i = 0; i < userObs.length; i++) {
            placeYourMarker(new google.maps.LatLng(userObs[i].latitude, userObs[i].longitude), userMap);
            if(i === 0) {
                userMap.panTo(new google.maps.LatLng(userObs[i].latitude, userObs[i].longitude));
            }
        }
    } else if(mapType === 2) {
        // Do some stuff to pin all nearby observations
        nearbyMap = map;
    }
    mapType++;
}

const placeMarkerAndPanTo = (latLng, map) => {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
    userPin = marker;
}

const placeNearbyMarker = (latLng, map, obsValues) => {
    // console.log("Nearby Observation Deets:");
    // console.log(obsValues);
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

const placeYourMarker = (latLng, map) => {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
}

$("#clear-pins").click(function deletePin() {
    event.preventDefault();
    if(userPin !== undefined) {
        userPin.setMap(null);
        userPin = undefined;
    }
});

$("#get-nearby").click(function getNearby() {
    event.preventDefault();
    var radiusMeters = $("#location-radius").children("option:selected").val() * 1000;
    var pointsToMark;
    $.ajax("/api/observations", {
        type: "GET"
    }).then(res => {
        if($("#me").is(":checked")) {
            nearbyMap.panTo(new google.maps.LatLng(startingPos.coords.latitude, startingPos.coords.longitude));
            pointsToMark = doCalcs(res, startingPos.coords.latitude, startingPos.coords.longitude, radiusMeters);
        } else {
            if(coordinates.lat !== undefined) {
                nearbyMap.panTo(new google.maps.LatLng(coordinates.lat, coordinates.lng));
                pointsToMark = doCalcs(res, coordinates.lat, coordinates.lng, radiusMeters);
            } else {
                console.log("User needs to pick a city");
            }
        }
        if(pointsToMark !== undefined) {
            for(var i = 0; i < pointsToMark.length; i++) {
                placeNearbyMarker(new google.maps.LatLng(pointsToMark[i].latitude, pointsToMark[i].longitude), nearbyMap, pointsToMark[i]);
            }
        }
        switch(radiusMeters) {
        case 1000: 
            nearbyMap.setZoom(13);
            break;
        case 10000:
            nearbyMap.setZoom(11);
            break;
        case 50000:
            nearbyMap.setZoom(9);
            break;
        case 100000:
            nearbyMap.setZoom(8);
            break;
        case 500000:
            nearbyMap.setZoom(6);
            break;
        case 1000000:
            nearbyMap.setZoom(5);
            break;
        }
    });
});

const doCalcs = (obs, lat, long, radius) => {
    var validSet = [];
    for(var i = 0; i < obs.length; i++) {
        var lat2 = obs[i].latitude;
        var long2 = obs[i].longitude;
        var distance = getDistance(lat, long, lat2, long2);
        console.log("Distance: " + distance);
        if(distance <= radius) {
            validSet.push(obs[i]);
        }
    }
    return validSet;
}

const degreesToRadians = degrees => {
    var pi = Math.PI;
    return degrees * (pi/180);
}

$("#locationInput").keyup(() => {
    $(".predictionButtons").remove();
    var locationInput = $(this).val();    
    var autoLocationUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + locationInput + "&types=(cities)&key=" + apiKey;
    $.ajax({
        url : autoLocationUrl,
        method : "GET"
    }).then(autoLocationResponse => {
        autoLocationResponse.predictions.forEach(function(locationPrediction) {
            var predictionLink = $("<option>");
            predictionLink.attr("data-placeId", locationPrediction.place_id);
            predictionLink.attr("class", "predictionButtons");
            predictionLink.text(locationPrediction.description);  
            $("#suggestion-list").append(predictionLink[0]);
        });
    });
});

/*
    $(document).on("click", ".predictionButtons", function(event){
        console.log("Clicked a prediction button.");
        selectedLocationID = $(this).attr("data-placeId");
        coordinateUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" 
                        + selectedLocationID + "&key=" + apiKey;
        $.ajax({
            url : coordinateUrl,
            method : "GET"
        }).then(function(selectedCoordinate){
            coordinates = selectedCoordinate.result.geometry.location;
        });
        document.getElementById("locationInput").value = $(this).text();
        $(".predictionButtons").remove();
        return false;
    });
*/

$("#locationInput").bind('input', () => {
    if(checkExists($('#locationInput').val()) === true){
        coordinateUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" + selectedLocationID + "&key=" + apiKey;
        $.ajax({
            url : coordinateUrl,
            method : "GET"
        }).then(selectedCoordinate => {
            coordinates = selectedCoordinate.result.geometry.location;
        });
        $(".predictionButtons").remove();
        return false;
    }
});

const checkExists = inputValue => {
    var x = document.getElementById("suggestion-list");
    for (var i = 0; i < x.options.length; i++) {
        if(inputValue == x.options[i].value){
            selectedLocationID = x.options[i].getAttribute("data-placeId");
            return true;
        }
    }
    return false;
}

const getDistance = (lat1, lon1, lat2, lon2) => {
    var R = 6371e3; // metres
    var φ1 = degreesToRadians(lat1);
    var φ2 = degreesToRadians(lat2);
    var Δφ = degreesToRadians(lat2 - lat1);
    var Δλ = degreesToRadians(lon2 - lon1);

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return Math.abs(d);
}

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  
const allowTime = async () => {
    // console.log('Give Google time to respond...');
    await sleep(250);
    // console.log('One quarter of a second later. Maps can load now.');
    getLocation();
}

/*
function initAutocomplete() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 47.6062, lng: -122.3321 },
    zoom: 13,
    mapTypeId: "roadmap"
  });
  
  // Create the search box and link it to the UI element.
  var input = document.getElementById("event-location");
  var searchBox = new google.maps.places.SearchBox(input);
  // map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

  // Bias the SearchBox results towards current map's viewport.
  map.addListener("bounds_changed", function() {
    searchBox.setBounds(map.getBounds());
  });

  var markers = [];
  // Listen for the event fired when the user selects a prediction and retrieve
  // more details for that place.
  searchBox.addListener("places_changed", function() {
    var places = searchBox.getPlaces();

    if (places.length === 0) {
      return;
    }

    // Clear out the old markers.
    markers.forEach(function(marker) {
      marker.setMap(null);
    });
    markers = [];

    // For each place, get the icon, name and location.
    var bounds = new google.maps.LatLngBounds();
    places.forEach(function(place) {
      if (!place.geometry) {
        console.log("Returned place contains no geometry");
        return;
      }
      var icon = {
        url: place.icon,
        size: new google.maps.Size(71, 71),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(17, 34),
        scaledSize: new google.maps.Size(25, 25)
      };

      // Create a marker for each place.
      markers.push(
        new google.maps.Marker({
          map: map,
          icon: icon,
          title: place.name,
          position: place.geometry.location
        })
      );

      if (place.geometry.viewport) {
        // Only geocodes have viewport.
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  });
}
  */
