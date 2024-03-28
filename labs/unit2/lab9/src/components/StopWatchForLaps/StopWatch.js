import React, { useCallback, useEffect, useState } from 'react';

export default function StopWatch({ recordLap }) {
    const [running, setRunning] = useState(false);
    const [timer, setTimer] = useState(0);

    const updateTimer = useCallback(() => {
        if (running) {
            setTimer(prevTimer => prevTimer + 10);
        }
    }, [running]);

    useEffect(() => {
        let currentTimer;
        if (running) {
            currentTimer = setInterval(updateTimer, 10);
        }
        return () => clearInterval(currentTimer);
    }, [running, updateTimer]);

    const startStop = () => {
        setRunning(!running);
    };

    const reset = () => {
        setTimer(0);
    };

    const recordLapHandler = () => {
        if (running) {
            recordLap(timer);
        }
    };

    const mins = (Math.floor((timer / (1000 * 60)) % 60)).toString().padStart(2, "0");
    const secs = (Math.floor((timer / 1000) % 60)).toString().padStart(2, "0");
    const mills = (timer % 1000).toString().padStart(3, "0");

    return (
        <div style={{ width: "100vw", textAlign: "center" }}>
            <p style={{ fontSize: "7em", margin: "auto", fontFamily: "monospace" }}>
                {mins}:{secs}.{mills}
            </p>
            <button style={{ fontSize: "3em" }} onClick={startStop}>
                {running ? "Pause" : "Start"}
            </button>
            <button style={{ fontSize: "3em" }} onClick={reset}>
                Reset
            </button>
            <button style={{ fontSize: "3em"}} onClick={recordLapHandler}>
                Record Lap
            </button>
        </div>
    );
}