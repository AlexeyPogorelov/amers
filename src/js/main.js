
if ($.browser.mobile) $('body').addClass('mobile');
if ($.browser.safari) $('body').addClass('safari');
if ($.browser.iphone || $.browser.ipad || $.browser.ipod ) $('body').addClass('ios');

var map;
function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {lat: 49.4053761, lng: 32.1087626},
		zoom: 12,
		styles: [{"featureType": "poi.business","stylers": [{ "visibility": "off" }]},{"featureType": "poi.school","stylers": [{ "visibility": "off" }]},{},{"featureType": "landscape","stylers": [{ saturation: -100 }]},{"featureType": "whater","stylers": [{ saturation: -100 }]}]
	});
	if (map && markers && markers.length) {
		for (var i = 0; i < markers.length; i++) {
			var markerCurrent = markers[i];
			var markerApi = new google.maps.Marker({
				position: {lat: markerCurrent[2], lng: markerCurrent[3]},
				map: map,
				title: markerCurrent[0]
			});
		}
	}
}

$('article, .wysiwyg').find('table').each(function () {
	$(this).wrap('<div class="table-holder"></div>');
});

$('.dropdown').hover(function() {
	$(this).find('[data-toggle="dropdown"]').trigger('click');
}, function() {
	var $this = $(this);
	if ($this.hasClass('open')) {
		$this.find('[data-toggle="dropdown"]').trigger('click');
	}
});

