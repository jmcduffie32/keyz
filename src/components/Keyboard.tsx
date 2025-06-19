import * as Tone from 'tone';
import { useMemo } from 'react';

export const Keyboard = () => {
  const synth = useMemo(() => new Tone.PolySynth(Tone.Synth).toDestination(), []);

  const handleKeyDown = (note: string) => {
    synth.triggerAttack(note)
  }

  const handleKeyUp = (note: string) => {
    synth.triggerRelease(note, Tone.now())
  }

  // Generate the full 88-key piano (A0 to C8)
  const noteNames = ["A", "A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"];
  const keys: { note: string; color: "white" | "black" }[] = [];

  let octave = 0;
  for (let i = 0, midi = 21; i < 88; i++, midi++) {
    // MIDI 21 = A0, MIDI 108 = C8
    const noteIndex = (midi - 21) % 12;
    const noteName = noteNames[noteIndex];
    // Octave calculation: C changes octave
    if (noteName === "C" && midi !== 21) octave++;
    const note = `${noteName}${octave}`;
    const color = noteName.includes("#") ? "black" : "white";
    keys.push({ note, color });
  }

  return (
    <div className="piano-keyboard">
      {keys.map(({ note, color }) => (
        <div
          key={note}
          className={`key ${color}`}
          onMouseDown={() => handleKeyDown(note)}
          onMouseUp={() => handleKeyUp(note)}
          onMouseLeave={() => handleKeyUp(note)}
        ></div>
      ))}
    </div>
  )
}
