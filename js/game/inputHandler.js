"use strict";

var app = app || {};

// handles actions done by players
app.initInputHandler = function(){
		app.handleInput = function( data ){ // data is like: ['action name', 'action type', objectID||cords]
			if ( data[0] == 'walk here' ){
				var start = [app.player.col, app.player.row];
				var end = data[2];
				var grid = app.world.activeInstance.grid;
				var totalRows = app.world.rows;
				var totalCols = app.world.cols;
				app.findPath(start, end, grid, totalRows, totalCols, app.player);
			} else {
				app.player.setActionQueue([data]);
			}
		}
}

