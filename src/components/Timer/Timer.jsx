import React from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

function Timer() {
  return (
    <div className="timer">
      <div className="timer__left">
        <Clock />
        0:00
      </div>
      <div className="timer__right">
        <Play />
        <RotateCcw />
      </div>
    </div>
  );
}

export default Timer;
