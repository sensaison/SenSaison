/* eslint-disable no-unused-vars */
// This example adds a search box to a map, using the Google Place Autocomplete
// feature. People can enter geographical searches. The search box will return a
// pick list containing a mix of places and predicted search terms.

// This example requires the Places library. Include the libraries=places
// parameter when you first load the API. For example:
// <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

console.log("googleMaps.js has executed.");

var map;
var startingPos;
var userPin;
getLocation();

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        console.log("Geolocation is not supported by this browser.");
        generateMap();
    }
}

function showPosition(position) {
    console.log("Latitude: " + position.coords.latitude);
    console.log("Longitude: " + position.coords.longitude);
    startingPos = position;
    generateMap();
}

function showError(error) {
    generateMap();
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

function generateMap() {
    var latitude = 47.1585;
    var longitude = 27.6014;
    if(startingPos !== undefined) {
        latitude = startingPos.coords.latitude;
        longitude = startingPos.coords.longitude;
        console.log("Centering map on user's pos");
    }
    var centerPlace = { lat: latitude, lng: longitude};
    map = new google.maps.Map(document.getElementById("map"), {
        center: centerPlace,
        zoom: 13,
        clickableIcons: false,
        mapTypeControl: false
    });

    map.addListener("click", function(event) {
        console.log(userPin);
        if(userPin === undefined) {
            placeMarkerAndPanTo(event.latLng, map);
        } else {
            console.log("A pin has already been placed. Add a way to delete the pin and pick another later.");
        }
    });
}

function placeMarkerAndPanTo(latLng, map) {
    var marker = new google.maps.Marker({
        position: latLng,
        map: map
    });
    map.panTo(latLng);
    userPin = latLng;
    console.log(userPin.lat());
    console.log(userPin.lng());
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
