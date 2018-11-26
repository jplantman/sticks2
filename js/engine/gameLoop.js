"use strict";

var app = app || {};

/*
	requires an app.update(dt) function to be set
*/

app.initGameLoop = function(){
	var before = Date.now();

	app.loop = function(){
		var now = Date.now();
		var dt = now - before;
		before = now;
		app.ctx.clearRect(0, 0, app.canvas.width, app.canvas.height);
		app.update(dt);
		if ( !app.paused ){
			requestAnimationFrame( app.loop )
		}
	}

	app.loop();

}