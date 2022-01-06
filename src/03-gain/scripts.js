/**
 * 
 */

let audioContext;
let audioEl;
let gainNode;
let currentVolume = 50;

function handleMouseDown() {
  if (!audioContext) {
    audioContext = new AudioContext();
    audioEl = document.createElement('audio');
    
    audioEl.loop = true;
    audioEl.src = '../audio/piano.mp3';
    // not a worry for local but good practice for on-the-web
    audioEl.crossOrigin = 'Anonymous';

    audioEl.play();

    // chain some nodes
    const source = audioContext.createMediaElementSource(audioEl);
    gainNode = audioContext.createGain(); // for volume
    source.connect(gainNode);
    gainNode.connect(audioContext.destination);

  } else {
    audioEl.pause();
    audioContext.close();
    audioContext = null;
    audioEl = null;
  }
}

function updateVolume() {
  console.log('Volume change', currentVolume);
  gainNode.gain.setTargetAtTime(currentVolume / 100, audioContext.currentTime, 0.01);
}

// initial boilerplate/bootstrapping
function init() {
  const button = document.createElement('button');
  const volUp = document.createElement('button');
  const volDown = document.createElement('button');

  button.innerText = 'Toggle Audio';
  volUp.innerText = 'Volume Up';
  volDown.innerText = 'Volume Down';

  button.addEventListener('click', handleMouseDown);

  volUp.addEventListener('click', () => {
    currentVolume = currentVolume + 10;

    if (currentVolume > 100) {
      currentVolume = 100;
    }

    updateVolume();
  });

  volDown.addEventListener('click', () => {
    currentVolume = currentVolume - 10;

    if (currentVolume < 0) {
      currentVolume = 0;
    }

    updateVolume();
  });

  document.body.appendChild(button);
  document.body.appendChild(volUp);
  document.body.appendChild(volDown);
}

init();
