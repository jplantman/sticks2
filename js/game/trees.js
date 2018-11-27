"use strict";

var app = app || {};
app.treeIDCount = 0;

app.generateTree = function(data){

	var type = data[0];
	var col = data[1];
	var row = data[2];

	var tree = app.sprite('tree', col*64, row*64, 64, 192, app.imgCatalog['tree-pine-0'], 64, 64, 0, 128);

	tree.id = app.treeIDCount++;
	tree.blocking = true;
	tree.mainActions = [
		['chop' , 'Tree', tree.id],
		['take branches', 'Tree', tree.id]
	];
	tree.examine = ["examine", 'Tree', tree.id];

	if ( type == 'tree-pine' ){
		tree.subtype = 'pine';
		tree.frameY = 0;
	}
	else { // should never run
		throw 'ERROR: no tree of type "'+type+'" exists';
	}

	tree.frameX = 0; //Math.floor(Math.random()*3); // 3 varieties for each tree type, for visual variety

	return tree;
}