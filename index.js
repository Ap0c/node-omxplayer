'use strict';

// ----- Requires ----- //

let spawn = require('child_process').spawn;


// ----- Setup ----- //

let ALLOWED_OUTPUTS = ['hdmi', 'local', 'both'];


// ----- Functions ----- //

function buildArgs (source, givenOutput) {

	let output = '';

	if (givenOutput) {

		if (ALLOWED_OUTPUTS.indexOf(givenOutput) === -1) {
			throw new Error(`Output ${givenOutput} not allowed.`);
		}

		output = givenOutput;

	} else {
		output = 'local';
	}

	return [source, '-o', output];

}


function Omx (source, output) {

	let args = buildArgs(source, output);
	let player = spawn('omxplayer', args);

	return player;

}
