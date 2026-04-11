import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import "./Timer.scss";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(seconds / 60);
  const secondsToDisplay = seconds % 60;

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  function handleRestart() {
    setSeconds(0);
    setIsRunning(false);
  }

  return (
    <div className="timer">
      <div className="timer__display">
        <Clock color="#51A2FF" height={20} width={20} />
        {minutes}:
        {secondsToDisplay < 10 ? `0${secondsToDisplay}` : secondsToDisplay}
      </div>
      <div className="timer__buttons">
        {!isRunning ? (
          <button
            className="timer__buttons-btn timer__buttons-btn--play"
            onClick={() => setIsRunning(true)}
          >
            <Play height={16} width={16} color="white" />
          </button>
        ) : (
          <button
            className="timer__buttons-btn timer__buttons-btn--pause"
            onClick={() => setIsRunning(false)}
          >
            <Pause size={16} color="white" />
          </button>
        )}
        {/* <button className="timer__buttons--play">
          <Play
            height={16}
            width={16}
            color="white"
            onClick={handleStartStop}
          />
        </button> */}
        <button
          className="timer__buttons-btn timer__buttons-btn--restart"
          onClick={handleRestart}
        >
          <RotateCcw height={16} width={16} color="white" />
        </button>
        {/* <button className="timer__buttons--pause">
          <Pause height={16} width={16} color="white" />
        </button> */}
      </div>
    </div>
  );
}

export default Timer;
