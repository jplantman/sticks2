"use strict";

var app = app || {};

app.getInstanceData = function(name){
	if ( name == 'Area One' ){
		return {
			name: 'Area One',
			playerSpawn: [4, 3],
			grid: [
					['l','l','l','l','l','l','l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['l','l','l','l','l','l','l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['l','l','l','l','l','l','l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['l','l','l','w','l','l','l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['l','l','l','w','l','w','w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['l','l','l','l','l','l','w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['w','w','w','w','w','w','w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['w','w','w','w','w','w','w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['w','w','w','w','w','w','w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l'],
					['w','w','w','w','w','w','w', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l', 'l']
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
				['rock-iron', 4, 2], ['rock-iron', 5, 2], ['rock-iron', 6, 2], ['rock-iron', 4, 4],
 				['tree-pine', 2, 4], ['tree-pine', 3, 2]
			],
			smallClickables: [
				['fishingSpot-sardines', 6, 5], ['fishingSpot-sardines', 4, 6]
			],
			decorations: []
			
		}
	}








	console.log('ERROR: no instance by that name:', name)
}
