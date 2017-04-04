/*******************************************************
					MODULE Slider
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({}, params);

			//var slider = options.slider;
			var $slider = $(this);
			var $wrapper = options.wrapper;
			var $slide = options.slide;
			var curSlide = options.curSlide;
			var enableMargin = options.enableMargin;
			var duration = options.duration;
			var $next = options.next;
			var $prev = options.prev;

			var $slideWidth;

			$(window).on("load resize", function() {
				checkWidth();
			});
			
			$next.on("click", function () {
				//checkWidth();

				$slider.find($wrapper).animate({ 'left': '-' + $slideWidth + 'px' }, duration, function() {
					$slider.find($wrapper).find(curSlide).eq(0).clone().appendTo($slider.find($wrapper));
					$slider.find($wrapper).find(curSlide).eq(0).remove();
					$slider.find($wrapper).css({'left': 0});
				});
			});

			$prev.on("click", function () {
				//checkWidth();

				$slider.find($wrapper).find(curSlide).eq(-1).clone().prependTo($slider.find($wrapper));
				$slider.find($wrapper).css({'left': '-' + $slideWidth + 'px' });
				$slider.find($wrapper).find(curSlide).eq(-1).remove();
				$slider.find($wrapper).animate({ 'left': 0 }, duration);
			});

			function checkWidth() {
				$slideWidth = $slider.find(curSlide).outerWidth(enableMargin);
				console.log("slideWidth = " + $slideWidth);
			}
		}
	};

	$.fn.sliderModule = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}

	};
})(jQuery);