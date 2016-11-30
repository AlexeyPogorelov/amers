
// OWL slider
(function () {
	'use strict';
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
			style = style + ';'
			image = 'background-image:url('+ image +')';
			style = style + image;
		}
		$this.tooltip({
			viewport: { selector: 'body', padding: 20 },
			template: "<div class='color-tooltip-wrapper'><div class='color-tooltip' style='" + style + "'></div></div>"
		});
	});

	owlMain = $("#owl-main");
	owlHelper = $("#owl-helper");
	owlOtherItems = $("#owl-other-items");

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

	owlHelper.owlCarousel({
		items: 4,
		navigation: true,
		responsiveRefreshRate: 100,
		afterInit: function(el){
			el.find(".owl-item").eq(0).addClass("synced");
		}
	});

	function syncPosition(el){
		var current = this.currentItem;
		owlHelper
			.find(".owl-item")
			.removeClass("synced")
			.eq(current)
			.addClass("synced");
		if(owlHelper.data("owlCarousel") !== undefined){
			center(current);
		}
	}

	owlHelper.on("click", ".owl-item", function(e){
		e.preventDefault();
		var number = $(this).data("owlItem");
		owlMain.trigger("owl.goTo", number);
	});

	function center(num){
		var owlHelpervisible = owlHelper.data("owlCarousel").owl.visibleItems;
		var found = false;
		for(var i in owlHelpervisible){
			if(num === owlHelpervisible[i]){
				found = true;
			}
		}

		if( found===false ) {
			if( num>owlHelpervisible[owlHelpervisible.length-1] ) {
				owlHelper.trigger( "owl.goTo", num - owlHelpervisible.length+2 );
			}else{
				if( num - 1 === -1 ) {
					num = 0;
				}
				owlHelper.trigger("owl.goTo", num);
			}
		} else if( num === owlHelpervisible[owlHelpervisible.length-1] ) {
			owlHelper.trigger("owl.goTo", owlHelpervisible[1]);
		} else if( num === owlHelpervisible[0] ) {
			owlHelper.trigger("owl.goTo", num-1);
		}
	}

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
