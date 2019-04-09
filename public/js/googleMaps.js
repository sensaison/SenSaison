const apiKey = "AIzaSyDexLO6StKoAhSrxypz3E6neGfT9PpJSlM";

/* eslint-disable no-unused-vars */
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

var startingPos;
var userPin;
var mapType = 0;
var selectedLocationID;
var coordinates = {};
var nearbyMap;
var userMap;
getLocation();

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

function enableButtons() {
    $(".g1").each(function() {
        $(this).removeAttr("disabled");
        $(this).attr("class", "btn waves-effect waves-light g1");
    });
}

function setUpForm() {
    if(startingPos === undefined) {
        $("#near-me").css("display", "none");
    }
}

$("#me").click(function() {
    $("#city-select").css("display", "none");
});

$("#city").click(function() {
    $("#city-select").css("display", "block");
});

function usePosition(position) {
    startingPos = position;
    generateMaps();
    setUpForm();
    enableButtons();
}

function showError(error) {
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

function generateMaps() {
    generateMap();
    generateMap();
    generateMap();
}

function generateMap() {
    // TODO Figure out some kind of handler that distinguishes between map types 0 and 1 on the page.
    var pageName = document.location.href.match(/[^\/]+$/)[0];
    console.log(pageName);

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
        mapTypeControl: false
    });
    if(mapType === 0) {
        map.addListener("click", function(event) {
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
    } else if(mapType === 2) {
        // Do some stuff to pin all nearby observations
        nearbyMap = map;
    }
    mapType++;
}

function placeMarkerAndPanTo(latLng, map) {
    console.log("placeMarkerAndPanTo Fired");
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
    userPin = marker;
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
    console.log(radiusMeters);
    $.ajax("/api/observations", {
        type: "GET"
    }).then(function(err, res) {
        if(err) {
            throw err;
        }
        console.log(res.json());
    });
    if($("#me").is(":checked")) { 
        console.log(startingPos.coords);
    } else {
        if(coordinates.lat !== undefined) {
            console.log(coordinates);
        } else {
            console.log("User needs to pick a city");
        }
    }
});

$("#locationInput").keyup(function(){
    $(".predictionButtons").remove();
    var locationInput = $(this).val();    
    var autoLocationUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" 
                            + locationInput + "&types=(cities)&key=" + apiKey;
    $.ajax({
        url : autoLocationUrl,
        method : "GET"
    }).then(function(autoLocationResponse){
        autoLocationResponse.predictions.forEach(function(locationPrediction){
            var predictionLink = $("<div>");
            predictionLink.attr("data-placeId", locationPrediction.place_id);
            predictionLink.attr("class", "predictionButtons");
            predictionLink.text(locationPrediction.description);  
            //console.log(predictionLink);
            $(".autoComplete").append(predictionLink[0]);
            //console.log(predictionLink[0]);
        });
    });
});

$(document).on("click", ".predictionButtons", function(event){
    //console.log($(this).attr('data-placeId'));
    selectedLocationID = $(this).attr("data-placeId");
    coordinateUrl = "https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=" 
                    + selectedLocationID + "&key=" + apiKey;
    //console.log(coordinateUrl);
    $.ajax({
        url : coordinateUrl,
        method : "GET"
    }).then(function(selectedCoordinate){
        //console.log(selectedCoordinate.result.geometry.location);
        coordinates = selectedCoordinate.result.geometry.location;
        console.log(coordinates);
    });
    document.getElementById("locationInput").value = $(this).text();
    $(".predictionButtons").remove();
    return false;
});

function getDistance(lat1, lon1, lat2, lon2) {
    var R = 6371e3; // metres
    var φ1 = lat1.toRadians();
    var φ2 = lat2.toRadians();
    var Δφ = (lat2-lat1).toRadians();
    var Δλ = (lon2-lon1).toRadians();

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    var d = R * c;
    return Math.abs(d);
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
