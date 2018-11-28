"use strict";

var app = app || {};

app.initUpdate = function(){
	app.update = function(dt){
		// app.player.draw(dt);

		var currentInstance = app.world.activeInstance;
		if (currentInstance){
			currentInstance.draw(dt);
			app.player.update(dt);
			app.cam.update();
		}
	}	
}
	