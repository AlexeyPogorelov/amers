var map,
    mapMarkers = {};

function initMap() {

    var $mapAddressesAccordion = $('#map-addresses-accordion'),
        mapWidth = $('#map').width(),
        centerMap = mapWidth / 4;

    $('.address-item[data-id]').hover(function (e) {
        $(this).data('id');
    }, function (e) {
        $(this).data('id');
    });

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.4053761, lng: 32.1087626 },
        zoom: 12,
        styles: [{ "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "landscape", "stylers": [{ saturation: -100 }] }, { "featureType": "whater", "stylers": [{ saturation: -100 }] }]
    });
    if (map && markers && markers.length) {
        for (var i = 0; i < markers.length; i++) {
            var markerCurrent = markers[i],
                markerApi = new google.maps.Marker({
                    position: { lat: markerCurrent[2], lng: markerCurrent[3] },
                    map: map,
                    // label: markerCurrent[1],
                    hookId: markerCurrent[4],
                    title: markerCurrent[0]
                });
            mapMarkers[markerCurrent[4]] = markerApi;
            map.panBy(-centerMap, 0);
            google.maps.event.addListener(markerApi, "mouseover", function() {
                console.log(this.hookId);
            });
            google.maps.event.addListener(markerApi, "mouseout", function() {
                console.log(this.hookId);
            });
        }
    }

    $('#map-addresses-accordion').on('show.bs.collapse', function(e) {
        var $target = $(e.target),
            lat = $target.data('lat'),
            lng = $target.data('lng');
        map.setCenter({ lat: lat, lng: lng });
        map.panBy(-centerMap, 0);
    });

}