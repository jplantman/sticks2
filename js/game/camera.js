"use strict";

var app = app || {};

app.initCamera = function(player, world){
	var c = app.cam = {
		w: 64 * 10,
		h: 64 * 7
	};
	c.p = player;
	c.w = world;
	c.x = player.x - c.w/2;
	c.y = player.y - c.h/2;


	// camera follows player, but stays inside world
	c.update = function(){
		c.x = player.x - c.w/2;
		c.y = player.y - c.h/2;
	}
	console.log('camera for ', player, world);
	console.log(c)


}