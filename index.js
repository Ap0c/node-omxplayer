'use strict';

// ----- Requires ----- //

let spawn = require('child_process').spawn;
let EventEmitter = require('events');


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

	// ----- Local Vars ----- //

	let omxplayer = new EventEmitter();

	let args = buildArgs(source, output);
	let player = spawn('omxplayer', args);
	let open = true;

	// ----- Setup ----- //

	player.stdin.setEncoding('utf-8');

	player.on('close', () => {

		open = false;
		omxplayer.emit('close');

	});

	// Simulates keypress to provide control.
	function writeStdin (value) {

		if (open) {
			player.stdin.write(value);
		} else {
			throw new Error('Player is closed.');
		}

	}

	// ----- Methods ----- //

	omxplayer.play = () => { writeStdin('p'); };
	omxplayer.pause = () => { writeStdin('p'); };
	omxplayer.volUp = () => { writeStdin('+'); };
	omxplayer.volDown = () => { writeStdin('-'); };
	omxplayer.fastFwd = () => { writeStdin('>'); };
	omxplayer.rewind = () => { writeStdin('<'); };
	omxplayer.fwd30 =() => { writeStdin('\u001b[C'); };
	omxplayer.back30 = () => { writeStdin('\u001b[D'); };
	omxplayer.fwd600 = () => { writeStdin('\u001b[A'); };
	omxplayer.back600 = () => { writeStdin('\u001b[B'); };
	omxplayer.quit = () => { writeStdin('q'); };
	omxplayer.subtitles = () => { writeStdin('s'); };
	omxplayer.info = () => { writeStdin('z'); };
	omxplayer.incSpeed = () => { writeStdin('1'); };
	omxplayer.decSpeed = () => { writeStdin('2'); };
	omxplayer.prevChapter = () => { writeStdin('i'); };
	omxplayer.nextChapter = () => { writeStdin('o'); };
	omxplayer.prevAudio = () => { writeStdin('j'); };
	omxplayer.nextAudio = () => { writeStdin('k'); };
	omxplayer.prevSubtitle = () => { writeStdin('n'); };
	omxplayer.nextSubtitle = () => { writeStdin('m'); };
	omxplayer.decSubDelay = () => { writeStdin('d'); };
	omxplayer.incSubDelay = () => { writeStdin('f'); };

	Object.defineProperty(omxplayer, 'running', {
		get: () => { return open; }
	});

	return omxplayer;

}


// ----- Module Exports ----- //

module.exports = Omx;
