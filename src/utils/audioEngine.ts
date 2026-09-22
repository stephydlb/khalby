// Web Audio Synthesizer Engine to provide real interactive audio playback
class AudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private timerId: number | null = null;
  private gainNode: GainNode | null = null;
  private currentBeat = 0;
  private tempo = 104; // BPM for Afrobeat / R&B vibe
  private trackType: 'afro-beat' | 'melodic' | 'atmospheric' = 'afro-beat';

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.value = 0.4;
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(val: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(Math.max(0, Math.min(1, val)), this.ctx.currentTime);
    }
  }

  public play(trackType: 'afro-beat' | 'melodic' | 'atmospheric' = 'afro-beat') {
    this.initContext();
    this.trackType = trackType;
    this.isPlaying = true;
    this.currentBeat = 0;
    this.scheduleLoop();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  private scheduleLoop() {
    if (!this.isPlaying || !this.ctx || !this.gainNode) return;

    const now = this.ctx.currentTime;
    const beatInterval = 60 / this.tempo / 4; // 16th notes

    // Trigger percussion / synths based on beat
    const step = this.currentBeat % 16;

    if (this.trackType === 'afro-beat') {
      // Kick on 0, 6, 10
      if (step === 0 || step === 6 || step === 10) {
        this.playKick(now);
      }
      // Shaker / Hi-hat on every odd 16th
      if (step % 2 === 1) {
        this.playShaker(now, step % 4 === 1 ? 0.2 : 0.1);
      }
      // Snare / Rim on 4, 12
      if (step === 4 || step === 12) {
        this.playRim(now);
      }
      // Warm chord pluck
      if (step === 0 || step === 8 || step === 14) {
        const chords = [
          [220, 261.63, 329.63], // Am
          [293.66, 349.23, 440],  // Dm
          [261.63, 329.63, 392],  // C
          [196, 246.94, 293.66],  // G
        ];
        const chord = chords[Math.floor(this.currentBeat / 16) % chords.length];
        this.playPluckChord(now, chord);
      }
    } else if (this.trackType === 'melodic') {
      // Smoother R&B rhodes style
      if (step === 0 || step === 8) {
        this.playKick(now, 0.4);
      }
      if (step === 4 || step === 12) {
        this.playRim(now, 0.3);
      }
      if (step % 4 === 0) {
        const notes = [261.63, 329.63, 392.00, 493.88];
        const freq = notes[(Math.floor(this.currentBeat / 4)) % notes.length];
        this.playPluckChord(now, [freq, freq * 1.5]);
      }
    } else {
      // Atmospheric ambient pad
      if (step === 0) {
        this.playPad(now, 174.61); // F
      } else if (step === 8) {
        this.playPad(now, 220); // A
      }
    }

    this.currentBeat++;
    const nextTime = Math.max(10, beatInterval * 1000);
    this.timerId = window.setTimeout(() => this.scheduleLoop(), nextTime);
  }

  private playKick(time: number, vol = 0.5) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.frequency.setValueAtTime(140, time);
    osc.frequency.exponentialRampToValueAtTime(35, time + 0.12);

    g.gain.setValueAtTime(vol, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(time);
    osc.stop(time + 0.15);
  }

  private playRim(time: number, vol = 0.25) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, time);
    osc.frequency.exponentialRampToValueAtTime(120, time + 0.05);

    g.gain.setValueAtTime(vol, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.06);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(time);
    osc.stop(time + 0.06);
  }

  private playShaker(time: number, vol = 0.15) {
    if (!this.ctx || !this.gainNode) return;
    // White noise synth approximation for high hat / shaker
    const bufferSize = this.ctx.sampleRate * 0.04;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7000, time);

    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.04);

    noise.connect(filter);
    filter.connect(g);
    g.connect(this.gainNode);

    noise.start(time);
    noise.stop(time + 0.04);
  }

  private playPluckChord(time: number, freqs: number[]) {
    if (!this.ctx || !this.gainNode) return;
    freqs.forEach((freq) => {
      const osc = this.ctx!.createOscillator();
      const g = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, time);

      g.gain.setValueAtTime(0.12, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.5);

      osc.connect(g);
      g.connect(this.gainNode!);
      osc.start(time);
      osc.stop(time + 0.5);
    });
  }

  private playPad(time: number, freq: number) {
    if (!this.ctx || !this.gainNode) return;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    g.gain.setValueAtTime(0.01, time);
    g.gain.linearRampToValueAtTime(0.15, time + 0.4);
    g.gain.exponentialRampToValueAtTime(0.001, time + 1.8);

    osc.connect(g);
    g.connect(this.gainNode);
    osc.start(time);
    osc.stop(time + 1.8);
  }
}

export const audioEngine = new AudioEngine();
