import React, { useState } from "react";
import "./ExerciseBlock.scss";
import SetRow from "./../SetRow/SetRow";

/**
 * Renders on execise inside a section
 *
 * Responsible for:
 * - displaying exercise name
 * - rendering all sets for that exercise
 *
 */
import { ChevronDown, ChevronUp, Check, Trophy } from "lucide-react";

function ExerciseBlock({ exercise, onRepsBlur, onWeightBlur, onSetComplete }) {
  const [isOpen, setIsOpen] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);

  function handleSetComplete(isNowChecked) {
    setCompletedSets((prev) => (isNowChecked ? prev + 1 : prev - 1));
    onSetComplete(isNowChecked);
  }

  return (
    <div className="exercise">
      <button className="exercise__header" onClick={() => setIsOpen(!isOpen)}>
        <div className="exercise__info">
          <div className="exercise__name">{exercise.exercise.name}</div>

          <div className="exercise__meta">
            {exercise.sessionSets.length} ×{" "}
            {exercise.sessionSets[0]?.targetExactReps ??
              `${exercise.sessionSets[0]?.targetMinReps} - ${exercise.sessionSets[0]?.targetMaxReps}`}{" "}
            <span className="exercise__meta-marker">•</span> {completedSets}/
            {exercise.sessionSets.length} done
          </div>
        </div>

        <div className="exercise__chevron">
          {isOpen ? (
            <ChevronUp height={20} width={20} color="#90A1B9" />
          ) : (
            <ChevronDown height={20} width={20} color="#90A1B9" />
          )}
        </div>
      </button>

      {isOpen && (
        <div className="exercise__content">
          {exercise.sessionSets.map((set, index) => (
            <SetRow
              key={set.id}
              set={set}
              index={index}
              onRepsBlur={onRepsBlur}
              onWeightBlur={onWeightBlur}
              onSetComplete={handleSetComplete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseBlock;
