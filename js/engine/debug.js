"use strict";

var app = app || {};

// switch on/off
app.debugMode = false;


app.initDebug = function(){

	// get gameWindow and canvas from dom
	app.gameWindow = app.gameWindow || document.getElementById('gameWindow');
	app.canvas = app.canvas || document.getElementById('canvas');

	// create the debug onscreen display
	var d = app.debug = document.createElement('div');
	d.innerHTML = "Debug mode";
	d.style.fontSize = '30px';
	d.style.textShadow = '2px 2px 2px grey';
	d.style.position = 'absolute';
	d.style.color = 'black';
	app.gameWindow.insertBefore( d, app.canvas );

	app.updateDebug = function(){

		


	}


}

if (app.debugMode){
	app.initDebug();
}