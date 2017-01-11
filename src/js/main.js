if ($.browser.mobile) $('body').addClass('mobile');
if ($.browser.safari) $('body').addClass('safari');
if ($.browser.iphone || $.browser.ipad || $.browser.ipod) $('body').addClass('ios');

var map;

function initMap() {
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
    }
}

$('article, .wysiwyg').find('table').each(function() {
    $(this).wrap('<div class="table-holder"></div>');
});

$('.site-top .dropdown').hover(function() {
    $(this).find('[data-toggle="dropdown"]').trigger('click');
}, function() {
    var $this = $(this);
    if ($this.hasClass('open')) {
        $this.find('[data-toggle="dropdown"]').trigger('click');
    }
});


// fixed navbar
(function() {
    var $siteTop = $('.site-top'),
        top,
        topSaved,
        state = 0;
    // state 0 = scroll is not started yet, or browser is in the top positi
    // state 1 = scroll is started, but navbar is visible
    // state 2 = navbar is hidden

    clearStyles = function() {
        $siteTop.removeClass('closed filled')
    }
    scrollStarted = function() {
        $siteTop.addClass('filled')
    }
    show = function() {
        $siteTop.removeClass('closed')
    }
    hide = function() {
        $siteTop.addClass('closed')
    }

    $(window).on('scroll', function() {
        top = document.body.scrollTop;
        if (top > 40) {
            if (state === 0) {
                scrollStarted();
            }
            if (top < topSaved && state !== 1) {
                show();
                state = 1;
            } else if (top > topSaved && state !== 2) {
                hide();
                state = 2;
            }
        } else {
            if (state !== 0) {
                clearStyles();
                state = 0;
            }
        }
        topSaved = top;
    });
})();