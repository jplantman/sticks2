"use strict";

var app = app || {};
app.rockIDCount = 0;

app.generateRock = function(data){

	var type = data[0];
	var col = data[1];
	var row = data[2];

	var rock = app.sprite('rock', col*64, row*64, 64, 64, app.imgCatalog['rocks-ss']);

	rock.id = app.rockIDCount++;
	rock.blocking = true;
	rock.examine = "I don't think I could move it...";

	// if ( type == 'rock-plain' ){
	// 	rock.subtype = 'plain';
	// } else 
		if ( type == 'rock-iron' ){
		rock.subtype = 'iron';
		rock.frameY = 0; // iron is in first row of spritesheet
	}
	else { // should never run
		throw 'ERROR: no rock of type "'+type+'" exists';
	}


	rock.frameX = Math.floor(Math.random()*3); // 3 varieties for each rock type, for visual variety

	return rock;
}