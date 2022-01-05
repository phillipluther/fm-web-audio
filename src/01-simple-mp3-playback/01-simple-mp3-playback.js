let audioContext;
let audioEl;

function handleMouseDown() {
  if (!audioContext) {
    audioContext = new AudioContext();
    audioEl = document.createElement('audio');
    
    // demo purposes ... loop the thing infinitely
    audioEl.loop = true;
    audioEl.src = '../audio/piano.mp3';

    audioEl.play();

    // pipe the ^ stock HTML5 audio playback into our audioContext for fine grain controls ...
    // const source = audioContext.createMediaElementSource(audio);
    // ... and connect the source (in) with the speaker (out)
    // source.connect(audioContext.destination);
  } else {
    audioEl.pause();
    audioContext.close();
    audioContext = null;
    audioEl = null;
  }
}

// initial boilerplate/bootstrapping
function init() {
  const button = document.createElement('button');

  button.type = 'button';
  button.innerText = 'Toggle Audio';

  button.addEventListener('click', handleMouseDown);

  document.body.appendChild(button);
}

init();
