/*******************************************************
					MODULE accordion
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 400
			}, params);

			var panel = options.panel;
			var panelActive = panel.attr("class") + "--isActive";
			var control = options.control;
			var controlActive = control.attr("class") + "--isActive";
			var content = options.content;
			var contentActive = content.attr("class") + "--isActive";

			panel.removeClass(panelActive);
			control.removeClass(controlActive);
			content.removeClass(contentActive);

			panel.on("click", function () {

				if ( $(this).hasClass(panelActive) ) {
					$(this).removeClass(panelActive);
					$(this).find(control).removeClass(controlActive);
					$(this).next().slideUp(options.speed);
					$(this).siblings().find(control).removeClass(controlActive);
				} else {
					$(this).addClass(panelActive).siblings().removeClass(panelActive);
					$(this).find(control).addClass(controlActive);
					$(this).siblings().find(control).removeClass(controlActive);
					$(this).next().slideDown(options.speed)
						.siblings().not(panel).slideUp(options.speed);
				}
			});
		}
	};

	$.fn.accordionModule = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}

	};
})(jQuery);
/*******************************************************
					MODULE bundlesTables
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 400
			}, params);

			var $container = $(".bundles__tables-list");
			var $item = $(".bundles__tables-item");
			var $head = $(".bundles__tables-header");
			var $content = $(".bundles__tables-content");
			var breakPoint = 1054;
			var width;

			$(window).on("load resize", function() {
				rebuildTables();
			});

				//rebuild tables items
			function rebuildTables() {
				checkWidth();
				if (width < breakPoint) {
					$container.addClass("bundles__tables-list--isRebuild");
					$item.addClass("bundles__tables-item--isRebuild");
					$head.addClass("bundles__tables-header--isRebuild");
					$content.addClass("bundles__tables-content--isRebuild");

					$item.removeClass("bundles__tables-item--isActive");
					$content.slideUp(options.speed);
				} else {
					$container.removeClass("bundles__tables-list--isRebuild");
					$item.removeClass("bundles__tables-item--isRebuild");
					$head.removeClass("bundles__tables-header--isRebuild");
					$content.removeClass("bundles__tables-content--isRebuild");

					$content.slideDown(options.speed);
				}
			}

				//add eventlistener to eneble accordion effect
			$item.on("click", function() {
				checkWidth();
				if (width < breakPoint) {
					if ( $(this).hasClass("bundles__tables-item--isActive") ) {
						$(this).removeClass("bundles__tables-item--isActive");
						$(this).find($content).slideUp(options.speed);
					} else {
						$(this).addClass("bundles__tables-item--isActive");
						$(this).find($content).slideDown(options.speed);
						$(this).siblings().removeClass("bundles__tables-item--isActive");
						$(this).siblings().find($content).slideUp(options.speed);
					}
				}
			});

				//check container width
			function checkWidth() {
				width = $container.width();
				console.log(width);
			}

			//function once() {
			//	console.log("run");
			//	enableAccordion();
			//	once = function(){};
			//}


			//function enableAccordion() {
			//	console.log("event fire");
			//	$item.on("click", function() {
			//		if ( $(this).hasClass("bundles__tables-item--isActive") ) {
			//			$(this).removeClass("bundles__tables-item--isActive");
			//			$(this).find(".bundles__tables-content").slideUp(options.speed);
			//		} else {
			//			$(this).addClass("bundles__tables-item--isActive");
			//			$(this).find(".bundles__tables-content").slideDown(options.speed);
			//			$(this).siblings().removeClass("bundles__tables-item--isActive");
			//			$(this).siblings().find(".bundles__tables-content").slideUp(options.speed);
			//		}
			//	});
			//}

			//function disableAccordion() {
			//	$item.off("click");
			//	$content.slideDown();
			//}

		}
	};

	$.fn.bundlesTables = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}
	};
})(jQuery);
/*******************************************************
					MODULE formValidation
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 100
			}, params);

			var $form = $(this);
			var $tel = $(":input[type='tel']");

			$form.each(function () {
				$(this).validate({
					rules: {
						username: {
							required: true
						},
						usermail: {
							required: true,
							email: true
						},
						usertel: {
							required: true
						},
						usermessage: {
							required: true
						}
					},
					messages: {
						username: {
							required: "Это обязательный вопрос"
						},
						usermail: {
							required: "Это обязательный вопрос",
							email: "Формат адреса example@email.com"
						},
						usertel: "Это обязательный вопрос",
						usermessage: "Это обязательный вопрос"
					}
				});
			});
			$tel.mask("+380 (99) 999 - 99 - 99");
		}
	};

	$.fn.formValidation = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}

	};
})(jQuery);
/*******************************************************
                    MODULE googleMapSetter
 *******************************************************/
(function($) {
	"use strict";

	var methods = {

		init : function(params) {
			var options = $.extend({
				styled: true,
				zoom: 15,
				disableDefaultUI: true
			}, params);

			var center = { lat: options.lat, lng: options.lng };

			var element = document.getElementById(options.element);

			var map = new google.maps.Map(element, {
				zoom: options.zoom,
				center: center,
				disableDefaultUI: options.disableDefaultUI
			});

			var icon = 'img/contacts/marker.svg';

			var marker = new google.maps.Marker({
				position: center,
				map: map,
				icon: icon
			});

			if (options.styled === true) {
				var styles = [
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f5f5"
							}
						]
					},
					{
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#f5f5f5"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#bdbdbd"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#eeeeee"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dadada"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "transit.station",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#eeeeee"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#c9c9c9"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					}
				];
				map.setOptions({styles: styles});
			}
		}
	};

	$.fn.googleMapSetter = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}

	};
})(jQuery);
/*******************************************************
					MODULE servicesChart
*******************************************************/

(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 100
			}, params);

			//categories
			var $speed = $("#speed");
			var $value = $("#value");
			var $intensity = $("#intensity");
			var $lead = $("#lead");

			//radio buttons
			var $ppc = $("#ppc");
			var $smm = $("#smm");
			var $email = $("#email");
			var $analitycs = $("#analytics");
			var $youtube = $("#youtube");

			//elements
			var $title = $("#title");
			var $btn = $("#aboutBtn");

			var $line = $(".comparison__line");
			var $cell = $(".comparison__line-cell");
			var classList = "comparison__line-cell--filled comparison__line-cell--filled1 comparison__line-cell--filled2 comparison__line-cell--filled3 comparison__line-cell--filled4 comparison__line-cell--filled5 comparison__line-cell--filled6 comparison__line-cell--filled7 comparison__line-cell--filled8 comparison__line-cell--filled9";


			//default
			renderChart(options.ppc.speed, options.ppc.value, options.ppc.intensity, options.ppc.lead);

			// ppc
			$ppc.on("click", function() {
				resetChart();

				var self = $(this);
				setAttributes(self);

				setTimeout(function () {
					renderChart(
						options.ppc.speed,
						options.ppc.value,
						options.ppc.intensity,
						options.ppc.lead
					);
				}, options.speed);
			});

			//smm
			$smm.on("click", function() {
				resetChart();

				var self = $(this);
				setAttributes(self);

				setTimeout(function () {
					renderChart(
						options.smm.speed,
						options.smm.value,
						options.smm.intensity,
						options.smm.lead
					);
				}, options.speed);
			});

			//email
			$email.on("click", function() {
				resetChart();

				var self = $(this);
				setAttributes(self);

				setTimeout(function () {
					renderChart(
						options.email.speed,
						options.email.value,
						options.email.intensity,
						options.email.lead
					);
				}, options.speed);
			});

			//analitycs
			$analitycs.on("click", function() {
				resetChart();

				var self = $(this);
				setAttributes(self);

				setTimeout(function () {
					renderChart(
						options.analitycs.speed,
						options.analitycs.value,
						options.analitycs.intensity,
						options.analitycs.lead
					);
				}, options.speed);
			});

			//youtube
			$youtube.on("click", function() {
				resetChart();

				var self = $(this);
				setAttributes(self);

				setTimeout(function () {
					renderChart(
						options.youtube.speed,
						options.youtube.value,
						options.youtube.intensity,
						options.youtube.lead
					);
				}, options.speed);
			});

			//renderChart
			function renderChart(length1, length2, length3, length4) {
				var l1 = length1;
				var l2 = length2;
				var l3 = length3;
				var l4 = length4;

				$speed.find($line).each(function() {
					for (var i = 0; i < l1; i++) {
						$(this).find($cell).eq(i).addClass("comparison__line-cell--filled comparison__line-cell--filled" + (i + 1));
					}
				});
				$value.find($line).each(function () {
					for (var i = 0; i < l2; i++) {
						$(this).find($cell).eq(i).addClass("comparison__line-cell--filled comparison__line-cell--filled" + (i + 1));
					}
				});
				$intensity.find($line).each(function () {
					for (var i = 0; i < l3; i++) {
						$(this).find($cell).eq(i).addClass("comparison__line-cell--filled comparison__line-cell--filled" + (i + 1));
					}
				});
				$lead.find($line).each(function () {
					for (var i = 0; i < l4; i++) {
						$(this).find($cell).eq(i).addClass("comparison__line-cell--filled comparison__line-cell--filled" + (i + 1));
					}
				});
			}

			//setAttributes
			function setAttributes(elem) {
				var attr = elem.attr("data-title");
				$title.text(attr);

				var val = elem.attr("value");
				$btn.attr("href", val + ".html");
			}

			//resetChart
			function resetChart() {
				$line.find($cell).removeClass(classList);
			}
		}
	};

	$.fn.servicesChart = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}

	};
})(jQuery);
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
/*******************************************************
					MODULE subMenuToggler
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 400
			}, params);

			var $nav = $(this);
			var $header = $(".header");
			var $topmenu = $nav.find(".main-nav__topmenu");
			var $submenu = $nav.find(".main-nav__submenu");
			var $link = $topmenu.find(".main-nav__link--isTopMenu");
			var $icon = $nav.find(".main-nav__icon");

			var $submenuBtn = $("#submenuBtn");
			var $sublink = $(".main-nav__sublink");
			//var $subitem = $(".main-nav__subitem").not(".main-nav__subitem--btn");
			//var $sublist = $(".main-nav__list");

			//var viewport = window.innerWidth;

			var width;
			var breakPoint = 1025;

			$link.on("click", function(e) {
				//console.log("click");
				e.preventDefault();
				$submenu.toggleClass("main-nav__submenu--isActive");
				$icon.toggleClass("main-nav__icon--isOpen");
			});

			$submenuBtn.on("click", function() {
				$submenu.removeClass("main-nav__submenu--isActive");
				$sublink.next().slideUp(options.speed);
			});

			$sublink.on("click", function(e) {
				e.preventDefault();
				checkWidth();
				if (/*width < breakPoint*/!window.matchMedia("screen and (min-width: 1025px)").matches) {
					if ( $(this).hasClass("main-nav__sublink--isActive") ) {
						$(this).removeClass("main-nav__sublink--isActive");
						$(this).next().slideUp(options.speed);
					} else {
						$(this).addClass("main-nav__sublink--isActive");
						$(this).next().slideDown(options.speed);
						$(this).parent().siblings().find($sublink)
						  .removeClass("main-nav__sublink--isActive");
						$(this).parent().siblings().find($sublink)
						  .next().slideUp(options.speed);
					}
				} /*else {
					$sublink.next().slideDown(options.speed);
				}*/
			});

			$(window).on("load resize", function () {
				checkWidth();
				if (/*width >= breakPoint*/window.matchMedia("screen and (min-width: 1025px)").matches) {
					$sublink.next().slideDown(options.speed);
				} else {
					$sublink.next().slideUp(options.speed);
				}

			});

			function checkWidth() {
				width = $(window).width();
				console.log(width);
			}

		}
	};

	$.fn.subMenuToggler = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}
	};
})(jQuery);
/*******************************************************
					MODULE topMenuToggler
*******************************************************/
(function($) {
	"use strict";
	
	var methods = {

		init : function(params) {
			var options = $.extend({
				speed: 400
			}, params);

			var $topmenu = $(".main-nav");
			var $submenu = $(".main-nav__submenu");
			var breakPoint = 1280;
			var width;

			var $elem = $(this);
			
			$(this).on("click", function() {
				checkWidth();

				if ($(this).hasClass("menu-btn--isActive")) {
					$(this).removeClass("menu-btn--isActive");
				} else {
					$(this).addClass("menu-btn--isActive");
				}

				if (width < breakPoint) {
					if ( $topmenu.hasClass("main-nav--isActive") ) {
						$topmenu.removeClass("main-nav--isActive");
						$topmenu.slideUp(options.speed);
					} else {
						$topmenu.addClass("main-nav--isActive");
						$topmenu.slideDown(options.speed);
					}

					if ($submenu.hasClass("main-nav__submenu--isActive")) {
						$submenu.removeClass("main-nav__submenu--isActive");
					}
				}
			});


			$(window).on("load resize", function () {
				checkWidth();

				//if (window.matchMedia("screen and (max-width: 1280px)").matches) {
				//	console.log("matches");
				//} else {
				//	console.log("doesn't match");
				//}

				if (/*width > breakPoint*/window.matchMedia("screen and (min-width: 1250px)").matches) {
					console.log("matches");
					$topmenu.css({"display": "block"});
					if ( $topmenu.hasClass("main-nav--isActive") ) {
						$topmenu.removeClass("main-nav--isActive");
					}
					if ($submenu.hasClass("main-nav__submenu--isActive")) {
						$submenu.removeClass("main-nav__submenu--isActive");
					}
					if ($elem.hasClass("menu-btn--isActive")) {
						$elem.removeClass("menu-btn--isActive");
					}
				} else {
					console.log("doesn't match");
					$topmenu.css({"display": "none"});
					if ($elem.hasClass("menu-btn--isActive")) {
						$elem.removeClass("menu-btn--isActive");
					}
					if ( $topmenu.hasClass("main-nav--isActive") ) {
						$topmenu.removeClass("main-nav--isActive");
						$topmenu.slideUp(options.speed);
					}
					if ($submenu.hasClass("main-nav__submenu--isActive")) {
						$submenu.removeClass("main-nav__submenu--isActive");
					}
				}
			});

			function checkWidth() {
				width = $(window).width();
				console.log(width);
			}
		}
	};

	$.fn.topMenuToggler = function(method) {
		if ( methods[method] ) {
			return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
		} else if ( typeof method === 'object' || ! method ) {
			return methods.init.apply( this, arguments );
		} else {
			$.error('Метод "' + method + '" в плагине не найден');
		}
	};
})(jQuery);