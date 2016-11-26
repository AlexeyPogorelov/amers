
if ($.browser.mobile) $('body').addClass('mobile');
if ($.browser.safari) $('body').addClass('safari');
if ($.browser.iphone || $.browser.ipad || $.browser.ipod ) $('body').addClass('ios');


$('.dropdown').hover(function() {
	$(this).find('[data-toggle="dropdown"]').trigger('click');
}, function() {
	var $this = $(this);
	if ($this.hasClass('open')) {
		$this.find('[data-toggle="dropdown"]').trigger('click');
	}
});
