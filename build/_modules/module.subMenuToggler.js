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