export class Speaker {
  audioCtx: AudioContext;
  gain: GainNode;
  finish: AudioDestinationNode;
  oscillator: OscillatorNode | null;

  constructor() {
    const AudioContext = window.AudioContext;

    this.oscillator = null;
    this.audioCtx = new AudioContext();

    // Create a gain, which will allow us to control the volume
    this.gain = this.audioCtx.createGain();
    this.finish = this.audioCtx.destination;

    // Connect the gain to the audio context
    this.gain.connect(this.finish);
  }

  play(frequency: number) {
    if (this.audioCtx && !this.oscillator) {
      this.oscillator = this.audioCtx.createOscillator();
      this.gain.gain.setValueAtTime(0.05, this.audioCtx.currentTime);
      // Set the frequency
      this.oscillator.frequency.setValueAtTime(
        frequency || 440,
        this.audioCtx.currentTime
      );

      // Square wave
      this.oscillator.type = "square";

      // Connect the gain and start the sound
      this.oscillator.connect(this.gain);
      this.oscillator.start();
    }
  }

  stop() {
    if (this.oscillator) {
      this.oscillator.stop();
      this.oscillator.disconnect();
      this.oscillator = null;
    }
  }
}
