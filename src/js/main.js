if ($.browser.mobile) $('body').addClass('mobile');
if ($.browser.safari) $('body').addClass('safari');
if ($.browser.iphone || $.browser.ipad || $.browser.ipod) $('body').addClass('ios');

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