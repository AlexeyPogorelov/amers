
// OWL slider
(function () {
	var owlMain, owlHelper, owlOtherItems;

	// add styles to materials labels
	$('.materials-list').find('label').each(function () {
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
		$this.attr('style', style);
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
		navigation: false,
		pagination: false
	});

	owlHelper.find(".item").eq(0).addClass("synced");
	owlHelper.find(".item").each(function (i) {
		$(this).data('owlItem', i);
	});

	function syncPosition () {
		owlHelper.find('.item')
			.eq(this.currentItem)
			.addClass("synced")
			.siblings()
			.removeClass("synced");
	}

	owlHelper.on("click", ".item", function(e){
		e.preventDefault();
		var $self = $(this),
			number = $self.data("owlItem");
		$self.addClass("synced").siblings().removeClass("synced");
		owlMain.trigger("owl.goTo", number);
	});


	// magnific popup
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

	// smart form
	(function () {
		var $form = $('#js-item-card-main-form'),
			$priceTarget = $form.find('[data-base-price]'),
			$chosenMaterial = $form.find('#js-chosen-material'),
			methods = {
				changeMaterial: function () {
					var $material = $(this).closest('li').clone();
					$material.find('input').remove();
					$chosenMaterial
						.empty()
						.append( $material );
				}
			};
		$form.on('change', function (e) {
			var i,
				$target = $(':checked'),
				price,
				priceSumm = 0;
			$target.each(function () {
				var $currentTarget = $(this),
					method;
				price = $currentTarget.data('price');
				price = parseInt(price) || 0;
				method = $currentTarget.data('method');
				if (method && typeof methods[method] === 'function') {
					methods[method].call(this);
				}
				if (!price) return;
				priceSumm += price;
			});
			$priceTarget.each(function () {
				var $this = $(this),
					basePrice = $this.data('base-price'),
					currency = $this.data('currency');
				basePrice = parseInt(basePrice) || 0;
				$this.html(priceSumm + basePrice + '<small>' + currency + '</small>');
			});
		}).trigger('change');
	})();
})(jQuery);
