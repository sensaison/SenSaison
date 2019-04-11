$.get('api/swatchPics', function(data) {
  $('#animals').css('background-image', 'url(' + data.animalImage + ')');
})

$.get('api/swatchPics', function(data) {
  $('#fungus').css('background-image', 'url(' + data.fungusImage + ')');
})

$.get('api/swatchPics', function(data) {
  $('#landwater').css('background-image', 'url(' + data.landwaterImage + ')');
})

$.get('api/swatchPics', function(data) {
  $('#plants').css('background-image', 'url(' + data.plantsImage + ')');
})

$.get('api/swatcPics', function(data) {
  $('#weather').css('background-image', 'url(' + data.weatherImage + ')');
})