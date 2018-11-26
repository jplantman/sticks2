"use strict";

var app = app || {};

app.initSprites = function(){

	// get gameWindow and canvas from dom
	app.gameWindow = app.gameWindow || document.getElementById('gameWindow');
	app.canvas = app.canvas || document.getElementById('canvas');

	// set width and height
	app.canvas.width = Math.min(64*7, window.innerWidth);
	app.canvas.height = Math.min(64*7, window.innerHeight);


	// context
	var c = app.ctx = app.canvas.getContext('2d');

	// sprite constructor
	function Sprite(type, x, y, vw, vh, img, pw, ph, dw, dh){
		this.type = type;
		this.x = x;
		this.y = y;
		this.vw = vw; // visual width and height
		this.vh = vh;
		this.pw = pw || vw; // physics width n height (for collisions)
		this.ph = ph || vh;
		this.dw = dw || 0; // difference between v and p dimentions
		this.dh = dh || 0;
		this.img = img;
		this.frameX = 0;
		this.frameY = 0;

		this.alive = true;
	}

	// sprite creation function
	app.sprite = function(type, x, y, vw, vh, img, pw, ph, dw, dh){
		return new Sprite(type, x, y, vw, vh, img, pw, ph, dw, dh);
	}

	Sprite.prototype.draw = function(dt){
		// images are all uniformly a 64 pixels ratio
		c.drawImage(this.img, 
			this.vw * this.frameX, // source
			this.vh * this.frameY,
			this.vw,
			this.vh,
			this.x - this.dw, // destination
			this.y - this.dh,
			this.vw,
			this.vh
			);
		if (this.currentAnim){
			this.animTime -= dt;
			if (this.animTime <= 0){
				this.animStep();
			}	
		}
	}

	Sprite.prototype.initAnims = function(){ // sets up sprite obj for animations. 
		this.anims = {}; // list of added animations
		this.animTime = 0;
		this.currentAnim = undefined;
		this.currentAnimStep = 0;
	}
	Sprite.prototype.newAnim = function(name, data, doAfter){
		/*
		'data' is an array of 'frame data arrays', 
		each of which look like this: 
		[x, y, z]
		where... 
		x is the frame column
		y is the frame row
		z is the frame duration, in milliseconds

		'doAfter' is what happens after the animation is done. 
		if it is a string, the animation by that name will run next.
		if it is an array, it is assumed its an array of 2 integers, for the x and y frames to sit on after
		if its undefined, nothing special will happen after
		*/
		if (!this.anims){ // automatically runs if it is not already set up
			this.initAnims();
		}
		this.anims[name] = { name: name, data: data, doAfter: doAfter };
	}
	Sprite.prototype.animate = function(name){ // set up an animation to run (use this in game code)
		this.currentAnim = this.anims[name];
		this.currentAnimStep = 0;
		this.animTime = this.currentAnim.data[0][2];
		this.frameX = this.currentAnim.data[0][0];
		this.frameY = this.currentAnim.data[0][1];
	}
	Sprite.prototype.animStep = function(){
		// figure out which is next frame in animation
		this.currentAnimStep++;
		var nextFrame = this.currentAnim.data[ this.currentAnimStep ];
		if ( nextFrame ){ // advance animation step
			this.frameX = nextFrame[0];
			this.frameY = nextFrame[1];
			this.animTime = nextFrame[2];
		} else { // animation is done, run doAfter
			var doAfter = this.currentAnim.doAfter;
			this.stopAnim();
			if ( typeof doAfter == 'string' ){
				this.animate(doAfter);
			} else if ( Array.isArray( doAfter ) ){
				this.frameX = doAfter[0];
				this.frameY = doAfter[1];
			}
		}
	}
	Sprite.prototype.stopAnim = function(){
		this.currentAnim = undefined;
		this.currentAnimStep = 0;
		this.animTime = 0;
	}


}