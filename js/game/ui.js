"use strict";

var app = app || {};

app.initUI = function(){

	var ui = app.ui = {};

	// Text
	ui.text = document.createElement('div');
	ui.text.classList.add('textLog');
	ui.text.log = function(text, color){
		ui.text.innerHTML = '<div style="color: '+(color || 'black')+'">'+text+'</div>' + ui.text.innerHTML ;
	}
	app.gameWindow.appendChild(ui.text);

	// Main Menu Buttons
	ui.mmBtns = document.createElement('div');
	ui.mmBtns.classList.add('mainMenuButtons');

	// generate the button elements from this list
	var mmBtnList = ['pack', 'worn', 'talents', 'skills', 'spells', 'prayers', 'options'];
	var size = 40; // changes the size (width and height) of the mm buttons
	ui.mmBtns.style.height = size + 'px';
	ui.mmBtns.style.width = size*mmBtnList.length + 'px';

	for (var i = 0, len = mmBtnList.length; i < len; i++) {
		(function(i){
			var name = mmBtnList[i];
			var btn = ui[name+'Btn'] = document.createElement('div');
			btn.classList.add('mmButton')
			btn.style.width = size + 'px';
			btn.style.height = size + 'px';
			btn.innerHTML = name;
			btn.onclick = function(){ // this function should switch to the appropriate tab
				ui.clickMMBtn(name);
			}

			ui.mmBtns.appendChild( btn )
		})(i);
	};

	app.gameWindow.appendChild( ui.mmBtns );

	// Main Menu Tabs
	ui.clickMMBtn = function(name){
		// this function should switch to the appropriate tab
		for (var i = ui.mmTabsList.length - 1; i >= 0; i--) {
			var tab = ui.mmTabsList[i];
			if (tab.name == name){
				if ( ui.openTab == name ){ // its actually already open, so close it instead
					tab.style.display = 'none';
					ui.openTab = undefined;
				} else {  // open the tab normally
					ui.openTab = name;
					tab.style.display = 'block';
				}
			} else {
				tab.style.display = 'none';
			}
		};
	}

	ui.mmTabsList = []; // this list will contain the divs for each tab window;
	ui.openTab; // which tab is currently open

	// here we will create each tab window individually (cus theyre each pretty different)
	// it should exactly match (by name) with mmBtnList

	// pack
	ui.pack = document.createElement('div');
	ui.pack.name = 'pack';
	ui.pack.classList.add('mainMenu');
	ui.mmTabsList.push(ui.pack);
	ui.pack.innerHTML = 'pack';

	// worn
	ui.worn = document.createElement('div');
	ui.worn.name = 'worn';
	ui.worn.classList.add('mainMenu');
	ui.mmTabsList.push(ui.worn);
	ui.worn.innerHTML = 'worn';

	// talents
	ui.talents = document.createElement('div');
	ui.talents.name = 'talents';
	ui.talents.classList.add('mainMenu');
	ui.mmTabsList.push(ui.talents);
	ui.talents.innerHTML = 'talents';

	// skills
	ui.skills = document.createElement('div');
	ui.skills.name = 'skills';
	ui.skills.classList.add('mainMenu');
	ui.mmTabsList.push(ui.skills);
	ui.skills.innerHTML = 'skills';

	// spells
	ui.spells = document.createElement('div');
	ui.spells.name = 'spells';
	ui.spells.classList.add('mainMenu');
	ui.mmTabsList.push(ui.spells);
	ui.spells.innerHTML = 'spells';

	// prayers
	ui.prayers = document.createElement('div');
	ui.prayers.name = 'prayers';
	ui.prayers.classList.add('mainMenu');
	ui.mmTabsList.push(ui.prayers);
	ui.prayers.innerHTML = 'prayers';

	// options
	ui.options = document.createElement('div');
	ui.options.name = 'options';
	ui.options.classList.add('mainMenu');
	ui.mmTabsList.push(ui.options);
	ui.options.innerHTML = 'options';

	

	app.gameWindow.appendChild(ui.pack);
	app.gameWindow.appendChild(ui.worn);
	app.gameWindow.appendChild(ui.talents);
	app.gameWindow.appendChild(ui.skills);
	app.gameWindow.appendChild(ui.spells);
	app.gameWindow.appendChild(ui.prayers);
	app.gameWindow.appendChild(ui.options);




	



}