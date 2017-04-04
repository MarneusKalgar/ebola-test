/*******************************************************
					MODULE Slider with Modals
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 400
			}, params);
			
			//var $slider = $(this);
			//var $slider = $(".reviews__slider");
			var $slidewrapper = $(".reviews__slider-wrap");
			var $slide = $(".reviews__slide");
			var slideWidth = $slide.outerWidth(true);
			var slideCount = $slidewrapper.children().length - 2;
			var slideNow = 1;
			var translateWidth = 0;

			console.log(slideCount);

			//var $open = $(".reviews__link");
			var $close = $(".reviews__close");
			var $modalWrap = $(".reviews__modal-wrap");
			var $modal = $(".reviews__modal");

			var $toggleVideo = $(".reviews__toggle--video");
			var $toggleText = $(".reviews__toggle--text");
			var $articleVideo = $(".reviews__article--video");
			var $articleText = $(".reviews__article--text");

			//modal btn
			var $nextBtn = $("#modalNext");
			var $prevBtn = $("#modalPrev");

			//slider btn
			var $nextSlider = $("#sliderNext");
			var $prevSlider = $("#sliderPrev");

			var viewportWidth;
			var layoutTwo = 780;
			var layoutOne = 600;

			$(window).on("load resize", function() {
				checkWidth();
			});


			//move slides
			$nextSlider.on("click", function () {
				checkWidth();

				if (viewportWidth <= layoutTwo) {
					slideCount = $slidewrapper.children().length - 1;
				}
				if (viewportWidth <= layoutOne) {
					slideCount = $slidewrapper.children().length;
				}

				if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
					$slidewrapper.css('transform', 'translate(0, 0)');
					slideNow = 1;
				} else {
					translateWidth = -slideWidth * slideNow;
					$slidewrapper.css({
						'transform': 'translate(' + translateWidth + 'px, 0)',
						'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
						'-ms-transform': 'translate(' + translateWidth + 'px, 0)'
					});
					slideNow++;
				}
			});

			$prevSlider.on("click", function () {
				checkWidth();

				if (viewportWidth <= layoutTwo) {
					slideCount = $slidewrapper.children().length - 1;
				}
				if (viewportWidth <= layoutOne) {
					slideCount = $slidewrapper.children().length;
				}

				if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
					translateWidth = -slideWidth * (slideCount - 1);
					$slidewrapper.css({
						'transform': 'translate(' + translateWidth + 'px, 0)',
						'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
						'-ms-transform': 'translate(' + translateWidth + 'px, 0)'
					});
					slideNow = slideCount;
				} else {
					translateWidth = -slideWidth * (slideNow - 2);
					$slidewrapper.css({
						'transform': 'translate(' + translateWidth + 'px, 0)',
						'-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
						'-ms-transform': 'translate(' + translateWidth + 'px, 0)'
					});
					slideNow--;
				}
			});


			//open/close modal
			$slide.on("click", 'button',  function() {
				var elem = $(this).attr("data-index");
				console.log(elem);
				$modalWrap.addClass("reviews__modal-wrap--isVisible");
				$modalWrap.find("li[data-index='" + elem + "']").addClass("reviews__modal--isVisible");
				
				$nextSlider.addClass("reviews__control--isHidden");
				$prevSlider.addClass("reviews__control--isHidden");
				$nextBtn.removeClass("reviews__control--isHidden");
				$prevBtn.removeClass("reviews__control--isHidden");
			});

			$close.on("click", function() {
				$modalWrap.removeClass("reviews__modal-wrap--isVisible");
				$modal.removeClass("reviews__modal--isVisible");

				$nextSlider.removeClass("reviews__control--isHidden");
				$prevSlider.removeClass("reviews__control--isHidden");
				$nextBtn.addClass("reviews__control--isHidden");
				$prevBtn.addClass("reviews__control--isHidden");
			});


			//toggle next/prev modal
			$nextBtn.on("click", function() {
				var $current = $(".reviews__modal--isVisible");
				var $next = $current.next();
				var $modal = $(".reviews__modal");

				if ($next.length === 0) {
					$next = $modal.first();
				}

				setTimeout(function() {
					$current.removeClass("reviews__modal--isVisible");
				}, options.speed);
				setTimeout(function() {
					$next.addClass("reviews__modal--isVisible");
				}, options.speed);
			});

			$prevBtn.on("click", function() {
				var $current = $(".reviews__modal--isVisible");
				var $prev = $current.prev();
				var $modal = $(".reviews__modal");

				if ($prev.length === 0) {
					$prev = $modal.last();
				}
				setTimeout(function () {
					$current.removeClass("reviews__modal--isVisible");
				}, options.speed);
				setTimeout(function () {
					$prev.addClass("reviews__modal--isVisible");
				}, options.speed);
			});


			//toggle video/text tabs
			$toggleVideo.on("click", function() {
				$toggleVideo.addClass("reviews__toggle--active");
				$articleVideo.addClass("reviews__article--active");
				$toggleText.removeClass("reviews__toggle--active");
				$articleText.removeClass("reviews__article--active");
			});

			$toggleText.on("click", function() {
				$toggleText.addClass("reviews__toggle--active");
				$articleText.addClass("reviews__article--active");
				$toggleVideo.removeClass("reviews__toggle--active");
				$articleVideo.removeClass("reviews__article--active");
			});

			function checkWidth() {
				viewportWidth = $(window).width();
				slideWidth = $slide.outerWidth(true);
				console.log(viewportWidth);
				console.log(slideWidth);
			}
		}
	};

	$.fn.sliderModals = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}
	};
})(jQuery);