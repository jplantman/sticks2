"use strict";

var app = app || {};

function dir(x1, y1, x2, y2){
	var dir = '';
	if ( y1 > y2 ){
		dir += 'u';
	} else if ( y1 < y2 ){
		dir += 'd';
	}
	if ( x1 > x2 ){
		dir += 'l';
	} else if ( x1 < x2 ){
		dir += 'r';
	}
	return dir;
}

