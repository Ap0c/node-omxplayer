# Node-Omxplayer

A library for controlling the Raspberry Pi omxplayer from Node.js.

## Get Started

```
// Import the module.
var Omx = require('node-omxplayer');

// Create an instance of the player with the source.
var player = Omx('my-video.mp4');

// Control video/audio playback.
player.pause();
player.volUp();
player.quit();
```

## Installation

This module does not require any third party Node.js libraries, but does rely on omxplayer being installed. On the default version of Raspbian it is installed by default, but on the Lite version you will have to install it:

```
sudo apt-get install omxplayer
```

## API

Most of the API is a simple layer over omxplayer's standard controls.

### player.play()

Resumes playback.

### player.pause()

Pauses playback.

### player.volUp()

Increases the volume.

### player.volDown()

Decreases the volume.

### player.fwd30()

Skips playback forward by 30 seconds.

### player.back30()

Skips playback backward by 30 seconds.

### player.fwd600()

Skips playback forward by 600 seconds.

### player.back600()

Skips playback backward by 600 seconds.

### player.subtitles()

Toggle subtitles.

### player.quit()

Quits the player.

### player.status

Boolean giving the playback status, `true` if the player is still active, `false` if it has ended or the player has quit.
