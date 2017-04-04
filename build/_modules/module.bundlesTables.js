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