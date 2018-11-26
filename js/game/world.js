"use strict";

var app = app || {};

app.initWorld = function(){

	// the large game world will be split up into separate instances.
	// each instance contains data for everything in it.
	// each block can contain up to 1 big object (that's blocking movement)
	// and as many small clickable objects
	// and as many decoration objects
	

	var w = app.world = {
		activeInstance: undefined,
		getObjFromID: function(id){
			if ( id.startsWith('player') ){ // it's a player
				return app.player; // theres only 1 player so far. no further checks
			} else if ( id.startsWith('rock') ){ // it's a rock
				var idNum = id.substring(4); // strip away the 'rock', leaving just the numbers
				for (var i = instance.rocks.length - 1; i >= 0; i--) {
					if ( instance.rocks[i].id == idNum ){
						return instance.rocks[i];
					}
				};
			} 
		}
	};

	// instance data objects hold all the data for an instance. this function generates the instance
	app.loadInstance = function( name ){

		// the instance data is loaded, but needs to be processed into a playable format
		var instance = app.getInstanceData(name);

		// first, the grid cells need to be all turned into the proper block objects
		var g = instance.grid;

		// here we go, processing the grid
		for (var r = g.length - 1; r >= 0; r--) {
			for (var c = g[r].length - 1; c >= 0; c--) {
				// based on what letter the block key says, we make it into a complete game block
				var block = {
					blockable: undefined,
					smallClickables: [],
					decorations: []
				}, blockKey = g[r][c];
				
				if (blockKey == 'w'){ // turn it into a water block
					block.type = 'water';
				} else if (blockKey == 'l'){ // turn it into a land block.
					block.type = 'land';
				} else {
					// no other block types
				}
				g[r][c] = block;

			};
		};

		// add blockables, small-clickables, and decorations are dividied down into more specific categories, for faster searching
		instance.rocks = [];
		instance.players = []; // in case multiplayer. unused for now

		// now, the objects and players must be placed

		// adding blockables
		for (var i = 0; i < instance.blockables.length; i++) {
			var data = instance.blockables[i]; // this is expected to be like: ['type', col, row]
			if ( data[0].startsWith('rock') ){ // its a rock
				var col = data[1];
				var row = data[2];
				var obj = app.generateRock( data[0] );

				// quick error check:
				if ( g[row][col].blockable ){ 
					throw ('ERROR: multiple blockables in same spot at:'+ col+', ' + row);
				}

				// make the corresponding block refer to this obj's type-id
				g[row][col].blockable = obj.type+obj.id;

				// add the obj to the right array
				instance.rocks.push( obj );


				
				
			} 
			// continue adding the rest of stuff, HERE
		};

		// adding the player
		var px = instance.playerSpawn[0], py = instance.playerSpawn[1];
		app.initPlayer(px*64, py*64-64);
		g[py][px].blockable = 'player'+app.player.id;

		// instance draw function
		instance.draw = function(){

			for (var r = 0, rlen = g.length; r < rlen; r++) {
				for (var c = 0, clen = g[r].length; c < clen; c++) {
					var block = g[r][c];
					// now draw the block's contents
					if (block.type == 'water'){
						app.ctx.fillStyle = 'lightblue';
						
					} else if (block.type == 'land'){
						app.ctx.fillStyle = 'green';
						// app.ctx.strokeStyle = 'black';
						// app.ctx.fillRect(c*64, r*64, 64, 64);
						// app.ctx.strokeRect(c*64, r*64, 64, 64);
					}
					app.ctx.strokeStyle = 'black';
					app.ctx.fillRect(c*64, r*64, 64, 64);
					app.ctx.strokeRect(c*64, r*64, 64, 64);
					//blah blah

					if (block.blockable){ // draw the blockable, if theres any
						var blockable = w.getObjFromID( block.blockable );
						
						// app.ctx.fillStyle = 'red';
						// app.ctx.strokeStyle = 'black';
						// app.ctx.fillRect(c*64, r*64, 64, 64);
						// app.ctx.strokeRect(c*64, r*64, 64, 64);
						blockable.draw();
					}
				};
			};

		}



		app.activeInstance = instance;
	
	}





}