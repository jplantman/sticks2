"use strict";

var app = app || {};

app.initUpdate = function(){
	app.update = function(dt){
		// app.player.draw(dt);

		var currentInstance = app.activeInstance;
		if (currentInstance){
			currentInstance.draw(dt);
		}
	}	
}
	