/**
 * Audio Manager for Sorting Algorithm Visualizer
 * Creates retro 56k modem-style sounds synchronized with sorting operations
 */

export class AudioManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private isEnabled: boolean = false;
  private currentOscillators: Set<OscillatorNode> = new Set();

  constructor() {
    this.initialize();
  }

  private initialize() {
    try {
      // Create audio context on first user interaction to comply with browser policies
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.connect(this.audioContext.destination);
      this.masterGain.gain.value = 0.15; // Keep volume moderate
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Resume audio context (required for browser autoplay policies)
   */
  async resume() {
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  /**
   * Enable or disable sound effects
   */
  setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopAllSounds();
    }
  }

  /**
   * Check if audio is enabled
   */
  getEnabled(): boolean {
    return this.isEnabled;
  }

  /**
   * Map array value to frequency (creates modem-like tones)
   * Lower values = lower frequencies, higher values = higher frequencies
   */
  private valueToFrequency(value: number, maxValue: number): number {
    // Map to range 200Hz - 1200Hz (similar to modem frequencies)
    const minFreq = 200;
    const maxFreq = 1200;
    const normalized = value / maxValue;
    return minFreq + (normalized * (maxFreq - minFreq));
  }

  /**
   * Play comparison sound - short beep for comparing elements
   */
  playCompareSound(value1: number, value2: number, maxValue: number) {
    if (!this.isEnabled || !this.audioContext || !this.masterGain) return;

    this.resume();

    const freq1 = this.valueToFrequency(value1, maxValue);
    const freq2 = this.valueToFrequency(value2, maxValue);

    // Create two oscillators for a richer comparison sound
    this.playTone(freq1, 0.05, 0.03, 'sine');
    setTimeout(() => {
      this.playTone(freq2, 0.05, 0.03, 'sine');
    }, 20);
  }

  /**
   * Play swap sound - distinctive tone for swapping elements
   */
  playSwapSound(value1: number, value2: number, maxValue: number) {
    if (!this.isEnabled || !this.audioContext || !this.masterGain) return;

    this.resume();

    const freq1 = this.valueToFrequency(value1, maxValue);
    const freq2 = this.valueToFrequency(value2, maxValue);

    // Create a "swoosh" effect with frequency modulation
    this.playTone(freq1, 0.08, 0.06, 'square');
    setTimeout(() => {
      this.playTone(freq2, 0.08, 0.06, 'square');
    }, 30);
  }

  /**
   * Play sorted sound - triumphant tone when element is in final position
   */
  playSortedSound(value: number, maxValue: number) {
    if (!this.isEnabled || !this.audioContext || !this.masterGain) return;

    this.resume();

    const freq = this.valueToFrequency(value, maxValue);
    this.playTone(freq, 0.1, 0.08, 'triangle');
  }

  /**
   * Play pivot sound - distinctive tone for pivot selection (QuickSort)
   */
  playPivotSound(value: number, maxValue: number) {
    if (!this.isEnabled || !this.audioContext || !this.masterGain) return;

    this.resume();

    const freq = this.valueToFrequency(value, maxValue);
    // Lower, more prominent sound for pivot
    this.playTone(freq * 0.8, 0.12, 0.1, 'sawtooth');
  }

  /**
   * Play completion sound - celebratory sequence when sorting is complete
   */
  playCompletionSound() {
    if (!this.isEnabled || !this.audioContext || !this.masterGain) return;

    this.resume();

    // Play ascending scale for completion
    const frequencies = [523.25, 587.33, 659.25, 783.99, 880.00]; // C5, D5, E5, G5, A5
    frequencies.forEach((freq, index) => {
      setTimeout(() => {
        this.playTone(freq, 0.15, 0.2, 'sine');
      }, index * 100);
    });
  }

  /**
   * Core tone generation function
   */
  private playTone(
    frequency: number,
    volume: number,
    duration: number,
    type: OscillatorType = 'sine'
  ) {
    if (!this.audioContext || !this.masterGain) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

    // Create envelope for more natural sound (attack, decay, sustain, release)
    const now = this.audioContext.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + 0.01); // Quick attack
    gainNode.gain.linearRampToValueAtTime(volume * 0.7, now + duration * 0.3); // Decay
    gainNode.gain.linearRampToValueAtTime(volume * 0.5, now + duration * 0.7); // Sustain
    gainNode.gain.linearRampToValueAtTime(0, now + duration); // Release

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);

    this.currentOscillators.add(oscillator);

    oscillator.start(now);
    oscillator.stop(now + duration);

    // Clean up
    oscillator.onended = () => {
      oscillator.disconnect();
      gainNode.disconnect();
      this.currentOscillators.delete(oscillator);
    };
  }

  /**
   * Stop all currently playing sounds
   */
  stopAllSounds() {
    this.currentOscillators.forEach(osc => {
      try {
        osc.stop();
        osc.disconnect();
      } catch (e) {
        // Oscillator may already be stopped
      }
    });
    this.currentOscillators.clear();
  }

  /**
   * Clean up audio context
   */
  dispose() {
    this.stopAllSounds();
    if (this.audioContext) {
      this.audioContext.close();
    }
  }
}

// Create singleton instance
export const audioManager = new AudioManager();
