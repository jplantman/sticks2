"use strict";

var app = app || {};

app.initController = function(){

	var c = app.controller = {};

	// disable context menu, allows for right clicking
	app.canvas.oncontextmenu = function (e) {
    	e.preventDefault();
	};

	var mouseup = function(e){
		/*
			when you click, its like rs:
			you pull up that square's menu
			if right click, you show the menu
			if left click, you just do the first action
		*/

		// figure out which block is being clicked on
		var stretchX = app.canvas.offsetWidth / app.canvas.width
		var stretchY = app.canvas.offsetHeight / app.canvas.height
		var x = ( e.pageX - app.canvas.offsetLeft ) / stretchX ;
		var y = ( e.pageY - app.canvas.offsetTop ) / stretchY ;

		var col = Math.floor(x/64);
		var row = Math.floor(y/64);

		var block = app.activeInstance.grid[row][col];
	}
	app.canvas.addEventListener('mouseup', mouseup );


}

