var map,
    mapMarkers = {};

function initMap() {

    var $mapAddressesAccordion = $('#map-addresses-accordion'),
        mapWidth = $('#map').width(),
        centerMap = mapWidth / 4;

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.405594, lng: 32.111898 },
        zoom: 13,
        styles: [{ "featureType": "poi.business", "stylers": [{ "visibility": "off" }] }, { "featureType": "poi.school", "stylers": [{ "visibility": "off" }] }, {}, { "featureType": "landscape", "stylers": [{ saturation: -100 }] }, { "featureType": "whater", "stylers": [{ saturation: -100 }] }]
    });
    map.panBy(-centerMap, 0);
    if (map && markers && markers.length) {
        for (var i = 0; i < markers.length; i++) {
            var markerCurrent = markers[i],
                markerApi = new google.maps.Marker({
                    position: { lat: markerCurrent[2], lng: markerCurrent[3] },
                    map: map,
                    // label: markerCurrent[1],
                    // path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z M -2,-30 a 2,2 0 1,1 4,0 2,2 0 1,1 -4,0',
                    // fillColor: '#000000',
                    hookId: markerCurrent[4],
                    title: markerCurrent[0]
                });
            mapMarkers[markerCurrent[4]] = markerApi;
            google.maps.event.addListener(markerApi, "mouseover", function() {
                $('[data-id="' + this.hookId + '"]').addClass('hover');
            });
            google.maps.event.addListener(markerApi, "mouseout", function() {
                $('[data-id="' + this.hookId + '"]').removeClass('hover');
            });
        }
    }

    $('.address-item[data-id]').hover(function(e) {
        var id = $(this).data('id');
        var id = $(this).data('id');
        map.setCenter({ lat: mapMarkers[id].position.lat(), lng: mapMarkers[id].position.lng() });
        map.panBy(-centerMap, 0);
    }, function(e) {
        mapMarkers[id];
    });

    $('#map-addresses-accordion').on('show.bs.collapse', function(e) {
        var $target = $(e.target),
            lat = $target.data('lat'),
            lng = $target.data('lng'),
            zoom = $target.data('zoom') || 12;
        map.setCenter({ lat: lat, lng: lng });
        map.setZoom(zoom);
        map.panBy(-centerMap, 0);
    });

}