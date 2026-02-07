
(function( $ ) {
	"use strict";

	$('.bt_bb_card_icon.bt_bb_show_content_on_hover').mouseenter(function() {
		$(this).find('.bt_bb_card_icon_content_inner').stop().slideDown('slow');
	}).mouseleave(function() {
		$(this).find('.bt_bb_card_icon_content_inner').stop().slideUp('slow');
	});


})( jQuery );

