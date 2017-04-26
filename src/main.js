import module from './module.js';

window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

const audioCtx = new AudioContext();

const filter = audioCtx.createBiquadFilter();
filter.type = "lowpass";
filter.frequency.value = 200;
filter.Q.value = 100; //bandwith

const osc = audioCtx.createOscillator();
osc.type = 'sawtooth';
osc.frequency.value = 100;
// osc.detune.value = 50;

const osc2 = audioCtx.createOscillator();
osc2.type = 'square';
osc2.frequency.value = 50;
// osc2.detune.value = 50;

const gainOsc = audioCtx.createGain();
const gainOsc2 = audioCtx.createGain();
const gainMix = audioCtx.createGain();

gainOsc.gain.value = 1;
gainOsc2.gain.value = 0.5;

osc.connect(gainOsc)
osc2.connect(gainOsc2)

gainOsc.connect(filter);
filter .connect(gainMix);
gainOsc2.connect(gainMix);

gainMix.connect(audioCtx.destination)
// osc.start(audioCtx.currentTime);
// osc2.start(audioCtx.currentTime);
