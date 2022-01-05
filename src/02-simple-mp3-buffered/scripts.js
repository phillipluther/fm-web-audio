/**
 * pre-buffer a sound so it doesn't have to be loaded; much less noticeable lag than streaming.
 * great for sfx, UI sounds, etc.
 * no audio element required
 */

let audioContext;
let audioBuffer;

function handleMouseDown() {
  playSound();
}

async function loadSound() {
  if (!audioContext) {
    audioContext = new AudioContext();
  }

  if (!audioBuffer) {
    const soundFile = await fetch('../audio/chime.mp3');
    // web audio fun! need to deal with the MP3 file as an array buffer/binary data
    const soundFileBuffer = await soundFile.arrayBuffer();
    audioBuffer = await audioContext.decodeAudioData(soundFileBuffer);
  }
}

async function playSound() {
  await loadSound();
  await audioContext.resume(); // mobile browsers tend to suspend ... or user perms ... etc.

  const source = audioContext.createBufferSource();
  // again, wire the source up to the destination
  source.connect(audioContext.destination);
  source.buffer = audioBuffer;

  source.start(0); // play immediately
}

// initial boilerplate/bootstrapping
function init() {
  const button = document.createElement('button');

  button.type = 'button';
  button.innerText = 'Toggle Audio';

  button.addEventListener('click', playSound);

  document.body.appendChild(button);
}

init();
