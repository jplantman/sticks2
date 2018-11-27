"use strict";

var app = app || {};
app.fishingSpotIDCount = 0;

app.generateFishingSpot = function(data){

	var type = data[0];
	var col = data[1];
	var row = data[2];

	var fishingSpot = app.sprite('fishingSpot', col*64, row*64, 64, 64, app.imgCatalog['fishingSpot-ss']);

	fishingSpot.id = app.fishingSpotIDCount++;
	fishingSpot.blocking = false;

	fishingSpot.mainActions = [
		['fish', 'Fishing Spot', fishingSpot.id]
	];
	fishingSpot.examine = ["examine", 'Fishing Spot', fishingSpot.id];
	fishingSpot.frameY = 0;
	fishingSpot.frameX = 0;

	fishingSpot.newAnim('bubble', [
		[0, 0, 200], [1, 0, 200]
	], 'bubble');
	fishingSpot.animate('bubble');

	// if ( type == 'fishingSpot-sardines' ){
	// 	fishingSpot.subtype = 'sardines';
		
	// }
	// else { // should never run
	// 	throw 'ERROR: no fishingSpot of type "'+type+'" exists';
	// }

	

	return fishingSpot;
}