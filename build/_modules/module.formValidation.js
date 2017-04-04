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