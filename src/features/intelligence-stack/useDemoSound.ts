import { useCallback, useEffect, useRef, useState } from "react";
import type { GameEvent } from "./types";

const BEAT_SECONDS = 0.132;
const KOROBEINIKI_PHRASE: ReadonlyArray<readonly [string, number]> = [
  ["E5", 1],
  ["B4", 0.5],
  ["C5", 0.5],
  ["D5", 1],
  ["C5", 0.5],
  ["B4", 0.5],
  ["A4", 1],
  ["A4", 0.5],
  ["C5", 0.5],
  ["E5", 1],
  ["D5", 0.5],
  ["C5", 0.5],
  ["B4", 1.5],
  ["C5", 0.5],
  ["D5", 1],
  ["E5", 1],
  ["C5", 1],
  ["A4", 1],
  ["A4", 1],
];

function noteFrequency(note: string) {
  const pitchClasses: Record<string, number> = {
    C: 0,
    "C#": 1,
    D: 2,
    "D#": 3,
    E: 4,
    F: 5,
    "F#": 6,
    G: 7,
    "G#": 8,
    A: 9,
    "A#": 10,
    B: 11,
  };
  const match = note.match(/^([A-G]#?)(\d)$/);
  if (!match) return 440;
  const [, pitchClass, octaveValue] = match;
  const midi = (Number(octaveValue) + 1) * 12 + pitchClasses[pitchClass];
  return 440 * Math.pow(2, (midi - 69) / 12);
}

export function useDemoSound() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const enabledRef = useRef(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const loopTimeoutRef = useRef<number | null>(null);

  const getContext = useCallback(() => {
    if (!contextRef.current) {
      const context = new window.AudioContext();
      const masterGain = context.createGain();
      masterGain.gain.value = 0.18;
      masterGain.connect(context.destination);
      contextRef.current = context;
      masterGainRef.current = masterGain;
    }
    if (contextRef.current.state === "suspended") void contextRef.current.resume();
    return contextRef.current;
  }, []);

  const scheduleTone = useCallback(
    (
      context: AudioContext,
      frequency: number,
      startsAt: number,
      duration: number,
      volume: number,
      type: OscillatorType = "square",
    ) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = type;
      oscillator.frequency.setValueAtTime(frequency, startsAt);
      gain.gain.setValueAtTime(0.0001, startsAt);
      gain.gain.exponentialRampToValueAtTime(volume, startsAt + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, startsAt + Math.max(0.04, duration));
      oscillator.connect(gain);
      gain.connect(masterGainRef.current ?? context.destination);
      oscillator.start(startsAt);
      oscillator.stop(startsAt + duration + 0.025);
    },
    [],
  );

  const scheduleTheme = useCallback(
    (context: AudioContext, startsAt: number) => {
      let cursor = startsAt;
      KOROBEINIKI_PHRASE.forEach(([note, beats], index) => {
        const duration = BEAT_SECONDS * beats * 0.91;
        scheduleTone(context, noteFrequency(note), cursor, duration, 0.12);
        if (index % 2 === 0) {
          scheduleTone(
            context,
            noteFrequency(note) / 2,
            cursor,
            duration * 0.72,
            0.045,
            "triangle",
          );
        }
        cursor += BEAT_SECONDS * beats;
      });
      return cursor - startsAt;
    },
    [scheduleTone],
  );

  const stopTheme = useCallback(() => {
    if (loopTimeoutRef.current !== null) {
      window.clearTimeout(loopTimeoutRef.current);
      loopTimeoutRef.current = null;
    }
    const context = contextRef.current;
    if (context?.state === "running") void context.suspend();
  }, []);

  const startTheme = useCallback(() => {
    if (loopTimeoutRef.current !== null) return;
    const context = getContext();
    const playLoop = () => {
      if (!enabledRef.current) return;
      const loopDuration = scheduleTheme(context, context.currentTime + 0.045);
      loopTimeoutRef.current = window.setTimeout(playLoop, loopDuration * 1000);
    };
    playLoop();
  }, [getContext, scheduleTheme]);

  const toggleSound = useCallback(() => {
    const next = !enabledRef.current;
    enabledRef.current = next;
    setSoundEnabled(next);
    if (next) startTheme();
    else stopTheme();
  }, [startTheme, stopTheme]);

  const playCue = useCallback(
    (event: GameEvent) => {
      if (!enabledRef.current) return;
      const context = getContext();
      const config =
        event === "complete"
          ? { note: "E6", duration: 0.3, volume: 0.17 }
          : event === "activate"
            ? { note: "C6", duration: 0.13, volume: 0.11 }
            : event === "invalid"
              ? { note: "C4", duration: 0.12, volume: 0.08 }
              : { note: "G5", duration: 0.075, volume: 0.075 };
      scheduleTone(
        context,
        noteFrequency(config.note),
        context.currentTime,
        config.duration,
        config.volume,
        event === "invalid" ? "triangle" : "square",
      );
    },
    [getContext, scheduleTone],
  );

  useEffect(
    () => () => {
      enabledRef.current = false;
      stopTheme();
      if (contextRef.current && contextRef.current.state !== "closed") {
        void contextRef.current.close();
      }
    },
    [stopTheme],
  );

  return { playCue, soundEnabled, toggleSound };
}
