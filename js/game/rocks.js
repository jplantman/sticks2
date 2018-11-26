"use strict";

var app = app || {};
app.rockIDCount = 0;

app.generateRock = function(type){

	var rock = {
		id: app.rockIDCount++,
		type: 'rock',
		img: 'rocks-ss',
		blocking: true,
		examine: "I don't think I could move it..."
	}
	if ( type == 'rock-plain' ){
		rock.subtype = 'plain';
	}
	else if ( type == 'rock-iron' ){
		rock.subtype = 'iron';
		rock.frameY = 0; // iron is in first row of spritesheet


	}

	rock.frameX = Math.floor(Math.random()*3); // 3 varieties for each rock type, for visual variety

	return rock;
}