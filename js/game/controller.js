"use strict";

var app = app || {};

app.initController = function(){

	var c = app.controller = {};

	// create the menu that shows options for what to do when you click
	c.menu = document.createElement('div');
	c.menu.className = "rightClickMenu";
	
	// list item style
	var style = 'padding: 2px'; 

	c.menu.display = function( optionsList, x, y ){
		
		// clear old html
		c.menu.innerHTML = '';

		// generate html list
		c.menu.optionsList = optionsList;

		for (var i = 0; i < optionsList.length; i++) {
			(function(i){
				var optionData = optionsList[i],
				div = document.createElement('div'); // for the list item
				div.innerHTML = optionData[0]+': '+optionData[1];
				div.className = 'rightClickMenuItem';
				div.onclick = function(){
					c.menu.close();
					app.handleInput( optionData );
				}
				c.menu.appendChild(div);
			})(i);
		};

		// display menu just up and left of click location
		this.style.left = x - 10 + 'px';
		this.style.top = y - 10 + 'px';
		this.style.display = 'inline-block';
	}
	c.menu.close = function(){
		c.menu.optionsList = undefined;
		c.menu.style.display = 'none';
	}
	c.menu.addEventListener('mouseout', function(e){
		// make sure the mouseout event only fires when intended! (else it fires when it mouseovers a child element, the next list item)
		if (e.toElement.classList.contains('rightClickMenuItem') ){
			return; // false fire
		}
		c.menu.close();
		
	})
	app.gameWindow.appendChild(c.menu);


	// disable context menu, allows for right clicking
	app.canvas.oncontextmenu = function (e) {
    	e.preventDefault();
	};

	var mouseup = function(e){
		/*
			when you click, its like rs:
			you pull up that square's menu
			if right click, you show the menu
			if left click, you just do the first action

			the actions are ordered: 
				blockable main actions, 
				clickables main actions, 
				walk here,
				all the examine actions
				cancel
		*/
		if ( !app.player.isInControl ){
			console.log('You can\'t do anything right now');
			return;
		}
		// figure out which block is being clicked on
		var stretchX = app.canvas.offsetWidth / app.canvas.width
		var stretchY = app.canvas.offsetHeight / app.canvas.height
		var x = ( e.pageX - app.canvas.offsetLeft ) / stretchX ;
		var y = ( e.pageY - app.canvas.offsetTop ) / stretchY ;

		var col = Math.floor(x/64);
		var row = Math.floor(y/64);

		var block = app.world.activeInstance.grid[row][col];

		// figure out if left or right click
		var rightClick = false;
		if ( e.which == 3 ){
			var rightClick = true;
		}

		// generate a list of menu options for the click menu
		var clickMenuOptions = [];
		var tempHoldForExamineActions = []; // all examine actions will be added to the end of the menu

		// if there's a blockable, pull it up
		if (block.blockable){
			var obj = app.getObjFromID( block.blockable );

			// check if it has click options
			if (obj.mainActions){
				clickMenuOptions = clickMenuOptions.concat( obj.mainActions );
			}

			// check if it has an examine action
			if (obj.examine){
				tempHoldForExamineActions.push( obj.examine )
			}
		}

		// if there's any clickables, pull them up too
		for (var i = 0; i < block.smallClickables.length; i++) {
			// add actions for clickables
			var clickable = app.getObjFromID( block.smallClickables[i] );
			if (clickable.mainActions){
				clickMenuOptions = clickMenuOptions.concat(clickable.mainActions);
			}
			if (clickable.examine){
				tempHoldForExamineActions.push(clickable.examine);
			}
		}

		// add walk here action
		clickMenuOptions.push([ 'walk here', 'block', [col, row] ]);

		// add all the examine actions
		clickMenuOptions = clickMenuOptions.concat( tempHoldForExamineActions );

		// add debug action
		if ( app.debugMode ){
			clickMenuOptions.push( [ 'debug', 'block', [col, row] ] );
		}

		// clickMenuOptions is now ready
		// console.log(clickMenuOptions);

		// if left click, do the first thing. if right click, show the menu
		if ( rightClick ){
			c.menu.display( clickMenuOptions, e.pageX, e.pageY );
		} else {
			// left click
			c.menu.close();
			app.handleInput( clickMenuOptions[0] );
		}


	}
	// add the event listener
	app.canvas.addEventListener('mouseup', mouseup );


}

