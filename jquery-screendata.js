/**
 * jQuery Screen Control
 * Author: Crowd Favorite
 * Description: Provides a lightweight interface for detecting and storing screen properties and events.
 * Version: 1.0
 */
(function() {
	"use strict";
	if (jQuery) {
		// This is intentionally run in-line so that its values can be available from the start for anything using them.
		window.screenData = {
			"height": 0,
			"width": 0,
			"top": 0,
			"bottom": 0,
			"initialized": false,
			"resized": true,
			"scrolled": true,
			"orientation": "landscape",
			"refresh": function() {
				var $window = jQuery(window);
				// The below lines do a check based on the screen versus window because high-DPI iOS devices report different values between window and screen.
				window.screenData.height = (screen && screen.height < $window.height()) ? screen.height : $window.height(),
				window.screenData.width = (screen && screen.width < $window.width()) ? screen.width : $window.width(),
				window.screenData.top = $window.scrollTop(),
				window.screenData.bottom = window.screenData.height + window.screenData.top;
				if (window.screenData.height > window.screenData.width) {
					window.screenData.orientation = "portrait";
				}
				else {
					window.screenData.orientation = "landscape";
				}
			},
			"init": function() {
				var $window = jQuery(window);
				if (window.screenData.initialized) { return; }
				window.screenData.initialized = true;
				window.screenData.refresh();
				var changed = false;
				setInterval(function() {
					if (changed) {
						changed = false;
					
						window.screenData.scrolled = (window.screenData.top !== $window.scrollTop());
						window.screenData.resized = (window.screenData.height !== $window.height() || window.screenData.width !== $window.width());

						window.screenData.refresh();
						if (window.screenData.scrolled) {
							jQuery("body").trigger("screendata-scrolled");
						}
						if (window.screenData.resized) {
							jQuery("body").trigger("screendata-resized");
						}
						if (window.screenData.scrolled || window.screenData.resized) {
							jQuery("body").trigger("screendata-changed");
						}
					
						window.screenData.scrolled = false;
						window.screenData.resized = false;
					}
				}, 100);
				$window.on("resize scroll orientationchange", function() {
					// If any properties changed, trigger the change notice.
					changed = true;
				});
				return this;
			}
		};
	
		window.screenData.init().refresh();
	}
})();
