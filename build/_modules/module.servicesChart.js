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