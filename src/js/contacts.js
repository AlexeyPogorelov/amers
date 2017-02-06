var map;
function initMap() {

    var mapWidth = $('#map').width(),
        centerMap = mapWidth / 4;

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.4053761, lng: 32.1087626 },
        zoom: 12,
        styles: [{ "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "landscape", "stylers": [{ saturation: -100 }] }, { "featureType": "whater", "stylers": [{ saturation: -100 }] }]
    });
    if (map && markers && markers.length) {
        for (var i = 0; i < markers.length; i++) {
            var markerCurrent = markers[i];
            var markerApi = new google.maps.Marker({
                position: { lat: markerCurrent[2], lng: markerCurrent[3] },
                map: map,
                title: markerCurrent[0]
            });
        }
        map.panBy(-centerMap, 0);
    }

    $('#map-addresses-accordion').on('show.bs.collapse', function (e) {
        var $target = $(e.target),
            lat = $target.data('lat'),
            lng = $target.data('lng');
        map.setCenter({lat: lat, lng: lng});
        map.panBy(-centerMap, 0);
    });

}
