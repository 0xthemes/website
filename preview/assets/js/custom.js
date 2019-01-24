(function ($) {
    "use strict";
	
	var set_preview_frame_height = function(){
		var win_height = $(window).height();
		var header_height = $(".preview-header").height();
		$(".full-screen-preview-frame").height(win_height - header_height);
	}
	
	$(document).ready(function () {
		//Set preview frame height
		set_preview_frame_height();
	});
	
	$(window).on('load resize', function () {
		set_preview_frame_height();
	});
	
}(jQuery));