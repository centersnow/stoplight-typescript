import { useEffect, useState } from 'react';

// Only these three strings are valid light colors.
type LightColor = 'red' | 'yellow' | 'green';

interface Phase {
  color: LightColor;
  duration: number;
  // Optional, so instruction labels can stay commented out below.
  instruction?: string;
}

// The sequence starts on green. Durations are in milliseconds.
const PHASES: readonly Phase[] = [
  { color: 'green', duration: 5000/*, instruction: 'Go'*/ },
  { color: 'yellow', duration: 1000/*, instruction: 'Slow down'*/ },
  { color: 'red', duration: 2000/*, instruction: 'Stop'*/ },
];

// Physical order is different from the order in which the lights turn on.
const LIGHTS: readonly LightColor[] = ['red', 'yellow', 'green'];

export default function Stoplight() {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const activePhase = PHASES[phaseIndex];

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setPhaseIndex((index) => (index + 1) % PHASES.length);
    }, activePhase.duration);

    // Clean up on a phase change or unmount, including in StrictMode.
    return () => window.clearTimeout(timeoutId);
  }, [activePhase]);

  return (
    <section className="stoplight" aria-label="Automatic stoplight">
      <div className="signal-scene" aria-hidden="true">
        <div className="signal-housing">
          {LIGHTS.map((color) => {
            const isOn = activePhase.color === color;

            return (
              <div className="signal-row" key={color}>
                <div
                  className={`light light--${color}${isOn ? ' light--on' : ''}`}
                  data-color={color}
                  data-active={isOn}
                />
                <div className={`light-label${isOn ? ' light-label--on' : ''}`}>
                  <span className="label-line" />
                  <div>
                    <span className="color-name">{color}</span>
                    <span className="light-state">{isOn ? 'On' : 'Off'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="current-state" role="status" aria-live="polite" aria-atomic="true">
        <span className={`status-dot status-dot--${activePhase.color}`} aria-hidden="true" />
        {activePhase.instruction && <span>{activePhase.instruction}</span>}
        <span className="current-state-detail">{activePhase.color} light is on</span>
      </div>

      <ol className="sequence" aria-label="Repeating light sequence">
        {PHASES.map((phase) => (
          <li
            key={phase.color}
            className={`sequence-step${activePhase.color === phase.color ? ' sequence-step--active' : ''}`}
          >
            <span className={`status-dot status-dot--${phase.color}`} aria-hidden="true" />
            <span className="sequence-name">{phase.color}</span>
            <span className="sequence-duration">{phase.duration / 1000}s</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
