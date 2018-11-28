"use strict";

var app = app || {};

app.initPlayer = function(col, row){
	var p = app.player = app.sprite('player', col*64, row*64, 64, 128, app.imgCatalog['baseChar-ss'], 64, 64, 0, 64);	
	p.id = 1; // will be more than one, if multiplayer
	p.col = col;
	p.row = row;

	p.prevCol; // these help with sprite layering issues
	p.prevCol; // basically, if movement is going up or left, its fine but if its going down or right, the player's position in the grid has to be changed at the start of movement, instead of at the end, for sprites to layer properly

	p.isInControl = true;
	p.actionQueue = []; // list of actions to do, in order
	p.currentAction = undefined;
	p.actionTimerX = 0; // current time within action
	p.actionTimerY = 0; // total time to do that action
	p.direction = 'd'; // direction facing


	// ACTIONS
	p.setActionQueue = function(actions){
		this.actionQueue = actions;
	}

	p.actionUpdate = function(dt){
		// if an action is going on
		if (this.currentAction){
			if ( this.actionTimerX > 0 ){
				// continue the action
				if (this.currentAction[0] == 'walk here'){
					// figure out how much to move by
					var distance = 64 * dt / this.actionTimerY;
					if ( this.direction.includes('d') ){
						this.y += distance;
					} else if ( this.direction.includes('u') ){
						this.y -= distance;
					}
					if ( this.direction.includes('r') ){
						this.x += distance;
					} else if ( this.direction.includes('l') ){
						this.x -= distance;
					}
					this.actionTimerX -= dt;
				}
			} else {
				//action is over, complete it
				if ( this.currentAction[0] == 'walk here' ){
					// updating player position in the grid occurs at the start or end of movement, depending on which direction its moving. (has to be this way for layering issues)
					if ( !this.walkUpdated ){
						app.world.activeInstance.grid[ this.row ][ this.col ].blockable = undefined;
						this.col = this.currentAction[1];
						this.row = this.currentAction[2];
						app.world.activeInstance.grid[ this.row ][ this.col ].blockable = 'player'+this.id;
						// this.x = this.col * 64;
						// this.y = this.row * 64;
					}
				}
				this.currentAction = undefined;
				// console.log('done')
				this.stopAnim();
				this.frameX = 0;
				if ( this.direction == 'l' ){
					this.frameY = 1;
				} else if ( this.direction == 'r' ){
					this.frameY = 2;
				} else {
					this.frameY = 0;
				}

				// this.actionTimerX = 0;
			}
		}
		// else, (if no action is going on), but one is queued
		else if ( this.actionQueue.length ) {
			// start that action
			this.actionHandler( this.actionQueue.shift() );
		}
	}

	p.actionHandler = function(action){
		this.currentAction = action;
		if (action[0] == 'walk here'){
			//start walking
			// console.log('walking from ', this.col, this.row);
			// console.log('to     ', action[1], action[2]);
			this.prevCol = this.col;
			this.prevRow = this.row;
			this.actionTimerX = action[3]*50;
			this.actionTimerY = action[3]*50;
			this.direction = dir(this.prevCol, this.prevRow, action[1], action[2]);
			if ( this.direction == 'l' ){
				this.animate('walkLeft');
			} else if ( this.direction == 'r' ){
				this.animate('walkRight');
			} else {
				this.animate('walkDown');
			}
			// if direction contains any left or down, this part here has to happen now
			this.walkUpdated = false;
			if ( this.direction.includes('l') || this.direction.includes('d') ){
				app.world.activeInstance.grid[ this.row ][ this.col ].blockable = undefined;
				this.col = this.currentAction[1];
				this.row = this.currentAction[2];
				app.world.activeInstance.grid[ this.row ][ this.col ].blockable = 'player'+this.id;
				this.walkUpdated = true;
			}
			

		} 
		else if ( action[0] == 'debug' ){ // console log the block object thats here
			var coords = action[2];
			console.log( app.world.activeInstance.grid[ coords[1] ][ coords[0] ] );
		}
		else {
			console.log('do action ', action);
		}
	}




	// Animations
	p.newAnim('walkDown', [
		[0, 0, 200], [1, 0, 200], [0, 0, 200], [2, 0, 200]
	], 'walkDown');

	p.newAnim('walkLeft', [
		[0, 1, 200], [1, 1, 200], [0, 1, 200], [2, 1, 200]
	], 'walkLeft');

	p.newAnim('walkRight', [
		[0, 2, 200], [1, 2, 200], [0, 2, 200], [2, 2, 200]
	], 'walkRight');




	// helpers






 	// UPDATE
	p.update = function(dt){
		this.actionUpdate(dt);
	}
}