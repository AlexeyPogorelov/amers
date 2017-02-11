var map,
    mapMarkers = {};

function initMap() {

    var $mapAddressesAccordion = $('#map-addresses-accordion'),
        mapWidth = $('#map').width(),
        centerMap = mapWidth / 4,
        pinIcon = 'img/icons/location-pin.svg',
        pinIconHover = 'img/icons/location-pin-hover.svg';

    // load hovered pin
    var image = new Image();
    image.src = pinIconHover;

    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 49.405594, lng: 32.111898 },
        // disableDefaultUI: true,
        mapTypeControl: false,
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
                    icon: pinIcon,
                    hookId: markerCurrent[4],
                    title: markerCurrent[0]
                });
            mapMarkers[markerCurrent[4]] = markerApi;
            google.maps.event.addListener(markerApi, "mouseover", function() {
                $('[data-id="' + this.hookId + '"]').addClass('hover');
                this.setIcon(pinIconHover);
            });
            google.maps.event.addListener(markerApi, "mouseout", function() {
                $('[data-id="' + this.hookId + '"]').removeClass('hover');
                this.setIcon(pinIcon);
            });
        }
    }

    $('.address-item[data-id]').hover(function(e) {
        var id = $(this).data('id'),
            marker = mapMarkers[id];
        marker.setIcon(pinIconHover);
        map.setCenter({ lat: marker.position.lat(), lng: marker.position.lng() });
        map.panBy(-centerMap, 0);
    }, function(e) {
        var id = $(this).data('id'),
            marker = mapMarkers[id];
        marker.setIcon(pinIcon);
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