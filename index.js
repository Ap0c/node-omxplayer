'use strict';

// ----- Requires ----- //

let spawn = require('child_process').spawn;


// ----- Setup ----- //

// The permitted audio outputs, local means via the 3.5mm jack.
let ALLOWED_OUTPUTS = ['hdmi', 'local', 'both'];


// ----- Functions ----- //

// Creates an array of arguments to pass to omxplayer.
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


// ----- Omx Class ----- //

function Omx (source, output) {

	let args = buildArgs(source, output);
	let player = spawn('omxplayer', args);
	let open = true;

	player.on('close', () => {
		open = false;
	});

	player.stdin.setEncoding('utf-8');

	// Simulates keypress to provide control.
	function writeStdin (value) {

		if (open) {
			player.stdin.write(value);
		} else {
			throw new Error('Player is closed.');
		}

	}

	return {
		play: () => { writeStdin('p'); },
		pause: () => { writeStdin('p'); },
		volUp: () => { writeStdin('+'); },
		volDown: () => { writeStdin('-'); },
		fastFwd: () => { writeStdin('>'); },
		rewind: () => { writeStdin('<'); },
		fwd30:() => { writeStdin('\u001b[C'); },
		back30: () => { writeStdin('\u001b[D'); },
		fwd600: () => { writeStdin('\u001b[A'); },
		back600: () => { writeStdin('\u001b[B'); },
		quit: () => { writeStdin('q'); },
		subtitles: () => { writeStdin('s'); },
		info: () => { writeStdin('z'); },
		incSpeed: () => { writeStdin('1'); },
		decSpeed: () => { writeStdin('2'); },
		prevChapter: () => { writeStdin('i'); },
		nextChapter: () => { writeStdin('o'); },
		prevAudio: () => { writeStdin('j'); },
		nextAudio: () => { writeStdin('k'); },
		prevSubtitle: () => { writeStdin('n'); },
		nextSubtitle: () => { writeStdin('m'); },
		decSubDelay: () => { writeStdin('d'); },
		incSubDelay: () => { writeStdin('f'); },
		get status () { return open; }
	};

}


// ----- Module Exports ----- //

module.exports = Omx;
