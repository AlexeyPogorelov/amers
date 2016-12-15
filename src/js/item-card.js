
// OWL slider
(function () {
	var owlMain, owlHelper, owlOtherItems;

	$('.material-link').each(function () {
		var $this = $(this),
			style = '',
			color = $this.data('color') || '',
			image = $this.data('image') || '';
		if (color) {
			color = 'background-color:'+ color;
			style = color;
		}
		if (image) {
			style = style + ';';
			image = 'background-image:url('+ image +')';
			style = style + image;
		}
		$this.tooltip({
			viewport: { selector: 'body', padding: 20 },
			template: "<div class='color-tooltip-wrapper'><div class='color-tooltip' style='" + style + "'></div></div>"
		});
	});

	owlMain = $("#owl-main");
	owlHelper = $('#js-product-slide-pages');
	owlOtherItems = $("#owl-other-items");

	if ($(window).width() > 480) {
		owlHelper.html(owlMain.html());
	}

	owlMain.owlCarousel({
		singleItem: true,
		slideSpeed: 300,
		navigation: true,
		pagination: false,
		afterAction: syncPosition,
		responsiveRefreshRate: 200,
	});

	if ($(window).width() <= 480) {
		owlHelper.remove();
		owlOtherItems.remove();
		return;
	}

	owlOtherItems.owlCarousel({
		items: 4,
		navigation: true
	});

	owlHelper.find(".item").eq(0).addClass("synced");
	owlHelper.find(".item").each(function (i) {
		$(this).data('owlItem', i);
	});

	function syncPosition () {
		owlHelper.find('.item').eq(this.currentItem).addClass("synced").siblings().removeClass("synced");
	}

	owlHelper.on("click", ".item", function(e){
		e.preventDefault();
		var $self = $(this),
			number = $self.data("owlItem");
		$self.addClass("synced").siblings().removeClass("synced");
		owlMain.trigger("owl.goTo", number);
	});


	$('#owl-main').find('.item a').magnificPopup({
		type:'image',
		zoom: {
			enabled: true,

			duration: 300,
			easing: 'ease-in-out',

			opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});

	$('.item-card-main-description').find('a').magnificPopup({
		type:'image',
		zoom: {
			enabled: true,

			duration: 300,
			easing: 'ease-in-out',

			opener: function(openerElement) {
				return openerElement.is('img') ? openerElement : openerElement.find('img');
			}
		}
	});
})(jQuery);
