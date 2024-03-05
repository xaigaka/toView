import React, { useState, useRef } from 'react';
import StopWatch from "../StopWatchForLaps/StopWatch";

export default function RunningExercise({ exercise, setMenuScreen }) {
  const [laps, setLaps] = useState([]);
  const stopWatchRef = useRef(null);

  const recordLap = (lapTime) => {
    setLaps([...laps, lapTime]);
  };

  return (
    <div>
      <p>{exercise.name}</p>
      <StopWatch recordLap={recordLap} ref={stopWatchRef} />
      <div>
        {laps.map((lapTime, index) => (
          <p key={index}>Lap {index + 1}: {formatTime(lapTime)}</p>
        ))}
      </div>
      <br />
      <button style={{ fontSize: "1em" }} onClick={setMenuScreen}>Back to Menu</button>
    </div>
  );
}

function formatTime(time) {
  const mins = Math.floor((time / (1000 * 60)) % 60).toString().padStart(2, "0");
  const secs = Math.floor((time / 1000) % 60).toString().padStart(2, "0");
  const mills = Math.floor((time % 1000)).toString().padStart(3, "0");
  return `${mins}:${secs}.${mills}`;
}