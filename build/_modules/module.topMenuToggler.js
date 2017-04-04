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