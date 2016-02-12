# Node-Omxplayer

A library for controlling the Raspberry Pi omxplayer from Node.js.

## Get Started

```js
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

### player.fastFwd()

Fast forwards playback.

### player.rewind()

Rewinds playback.

### player.fwd30()

Skips playback forward by 30 seconds.

### player.back30()

Skips playback backward by 30 seconds.

### player.fwd600()

Skips playback forward by 600 seconds.

### player.back600()

Skips playback backward by 600 seconds.

### player.quit()

Quits the player.

### player.subtitles()

Toggle subtitles.

### player.info()

Provides info on the currently playing file.

### player.incSpeed()

Increases playback speed.

### player.decSpeed()

Decreases playback speed.

### player.prevChapter()

Skips to previous chapter.

### player.nextChapter()

Skips to next chapter.

### player.prevAudio()

Skips to previous audio stream.

### player.nextAudio()

Skips to next audio stream.

### player.prevSubtitle()

Skips to previous subtitle stream.

### player.nextSubtitle()

Skips to next subtitle stream.

### player.decSubDelay()

Decrease subtitle delay by 250ms.

### player.incSubDelay()

Increase subtitle delay by 250ms.

### player.running

Boolean giving the playback status, `true` if the player is still active, `false` if it has ended or the player has quit.

## Events

### 'close'

Fired when playback has finished.
