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

function calcH(c, r, ec, er){ // col, row, endcol, endrow
	// console.log('CALC H', c, r, ec, er);
	// find c and r distance
	var cdist = Math.abs(c-ec);
	var rdist = Math.abs(r-er);
	// the smallest number == number of 14's
	// the biggest - smallest == number of 10's
	var smallest = cdist <= rdist ? cdist : rdist;
	var biggest = cdist > rdist ? cdist : rdist;
	// console.log( 'h = ',smallest*14 + ( biggest-smallest )*10 );
	return smallest*14 + ( biggest-smallest )*10;
}

