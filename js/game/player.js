"use strict";

var app = app || {};

app.initPlayer = function(x, y){
	var p = app.player = app.sprite('player', x, y, 64, 128, app.imgCatalog['baseChar-ss'], 64, 64, 0, 0);	
	p.id = 1; // will be more than one, if multiplayer

	// player.newAnim('idle_d', [
	// 	[0, 0, 500], [1, 0, 500], [2, 0, 500], [1, 0, 500]
	// ], 'idle_d');
	// player.newAnim('walk_d', [
	// 	[0, 0, 500], [0, 1, 500], [0, 0, 500], [1, 1, 500]
	// ], 'walk_d');
	// player.animate('walk_d')
}