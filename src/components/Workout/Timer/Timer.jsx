import React from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";
import "./Timer.scss";

function Timer() {
  return (
    <div className="timer">
      <div className="timer__display">
        <Clock color="#51A2FF" height={20} width={20}/>
        0:00
      </div>
      <div className="timer__buttons">
        <button className="timer__buttons--play">
          <Play height={16} width={16} color="white"/>
        </button>
        <button className="timer__buttons--restart">
          <RotateCcw height={16} width={16} color="white" />
        </button>
      </div>
    </div>
  );
}

export default Timer;
