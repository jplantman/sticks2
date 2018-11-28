"use strict";

var app = app || {};

app.initCamera = function(player, world){
	var c = app.cam = {
		colwidth: 10,
		rowHeight: 7,
		vw: 64 * 10,
		vh: 64 * 7
	};
	c.p = player;
	c.w = world;

	// camera follows player, but stays inside world
	c.update = function(){
		c.xmod =  Math.min(Math.max(player.x - 4*64, 0), world.cols * 64); 
		c.ymod = Math.min(Math.max(player.y - 3*64, 0), world.rows * 64); 
	}
	// console.log('camera for ', player, world);
	// console.log(c)


}