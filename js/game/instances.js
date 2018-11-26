"use strict";

var app = app || {};

app.getInstanceData = function(name){
	if ( name == 'Area One' ){
		return {
			name: 'Area One',
			playerSpawn: [3, 3],
			grid: [
					['w','w','w','w','w','w','w'],
					['w','w','w','l','l','l','w'],
					['w','w','l','l','l','l','w'],
					['w','l','l','l','l','w','w'],
					['w','l','l','l','l','w','w'],
					['w','w','l','l','l','w','w'],
					['w','w','w','w','w','w','w']
				],
			// objects in here are in format: ['id', col, row]
			// the id and position get converted into playable format
			// the ids can be like:
			// rock-plain, rock-iron, rock-tin, rock-copper, rock-coal
			// tree-pine, tree-oak, tree-willow, tree-maple
			// plant-grass, plant-cattail, plant-dandelion, plant-yarrow, plant-nightshade
			// and so on... each kind of object has an array of data for each variety of it
			// (e.g. an array for rocks, an array for trees)
			blockables: [
				['rock-iron', 4, 2],
				['tree-pine', 2, 4]
			],
			smallClickables: [
				['fishingSpot-sardines', 5, 4]
			],
			decorations: []
			
		}
	}








	console.log('ERROR: no instance by that name:', name)
}
