var heroSlider = $('.hero-section-slider');

$currentItem = $('<div>')
	.addClass('current-item')
	.html('01');

heroSlider.find(".item").each(function (i) {
	$(this).data('owlItem', i);
});

heroSlider.owlCarousel({
		autoPlay : 5000,
		singleItem: true,
		slideSpeed: 300,
		navigation: true,
		pagination: true,
		afterAction: function () {
			var currentItem = this.currentItem + 1;
			if (currentItem < 10) {
				currentItem = '0' + currentItem;
			}
			currentItem = '<span>' + currentItem + '</span>';
			$currentItem.html(currentItem);
		}
	});

$('.categories-slider-row .owl-carousel').owlCarousel({
		singleItem: false,
		slideSpeed: 300,
		items: 3,
		responsive:{
			0:{
				items:1
			},
			1000:{
				items:2
			},
			1200:{
				items:3
			}
		},
		navigation: true,
		pagination: false
	});

$currentItem
	.prependTo(heroSlider.find('.owl-buttons'));
