import React, { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import "./Timer.scss";

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const minutes = Math.floor(seconds / 60);
  const secondsToDisplay = seconds % 60;
  //// Add seconds state initialized to 0 and isRunning state initialized to false
  //// Add a useEffect that runs whenever isRunning changes — if isRunning is true, start a setInterval that increments seconds by 1 every 1000ms.
  //// If isRunning is false, clear the interval. Return a cleanup function that clears the interval so it doesn't keep running when the component unmounts
  // Derive minutes and displaySeconds from seconds using the math above
  // In the display, show minutes:displaySeconds — use a ternary to prepend a 0 to displaySeconds if it's less than 10
  // The play button's onClick toggles isRunning — if it's running show a Pause icon, if not show a Play icon
  // The reset button sets seconds back to 0 and isRunning to false

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    const timerId = setInterval(() => {
      setSeconds((prev) => prev + 1);
      console.log(seconds);
    }, 1000);
    return () => clearInterval(timerId);
  }, [isRunning]);

  function handleRestart(){
    setSeconds(0)
    setIsRunning(false)
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
          <button className="timer__buttons-btn timer__buttons-btn--play" onClick={() => setIsRunning(true)}>
            <Play
              height={16}
              width={16}
              color="white"
              
            />
          </button>
        ) : (
          <button className="timer__buttons-btn timer__buttons-btn--pause" onClick={() => setIsRunning(false)}>
            <Pause
              size={16}
              color="white"
              
            />
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
        <button className="timer__buttons-btn timer__buttons-btn--restart" onClick={handleRestart}>
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
