"use strict";

var app = app || {};

app.initLoad = function(callback, images){

	// array of loaded images, for access in game code
	app.imgCatalog = {};
	// function that handles loading of imgs
	app.loadImgs = function(arrayOfImgs){ // array entries should be: ['key', 'value']
		var len = arrayOfImgs.length;
		var imgsLoaded = 0;
		var imgLoadedCallback = function(){
			imgsLoaded++;
			console.log("loaded imgs: "+imgsLoaded+" / "+len);
			if (imgsLoaded == len){ // if all imgs r loaded
				// callback for when all images are loaded
				console.log('all imgs loaded');
				setTimeout(function(){ 
					/* 
					for some dumb reason, this delay is 
					required for the images to REALLY be loaded,
					even though they happen after the onload event is fired
					*/
					callback();

				}, 10)

				
			}
		}
		for (var i = 0; i < len; i++) { // load images one by one
			(function(i){
				var img = arrayOfImgs[i];
				app.imgCatalog[img[0]] = new Image();
				app.imgCatalog[img[0]].src = img[1];
				app.imgCatalog[img[0]].onload = imgLoadedCallback();
			})(i);
		};
	}

	// run img loading func
	app.loadImgs(images);
}
