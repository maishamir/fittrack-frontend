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
import { ChevronDown, ChevronUp, Check, Trophy, Plus } from "lucide-react";



function ExerciseBlock({ exercise, onRepsBlur, onWeightBlur, onSetComplete, onSetAdded }) {
  const [isOpen, setIsOpen] = useState(false);
  const [completedSets, setCompletedSets] = useState(0);
  const [sessionSets, setSessionSets] = useState(exercise.sessionSets);
  function handleSetComplete(isNowChecked) {
    setCompletedSets((prev) => (isNowChecked ? prev + 1 : prev - 1));
    onSetComplete(isNowChecked);
  }


  function handleAddSet() {
    // console.log(sessionSets);
    const newSet = {
      id: null,
      orderIndex: sessionSets.length,
      actualReps: null,
      actualWeight: null,
      targetExactReps: null,
      isNew: true
    };
    setSessionSets(prev => [...prev, newSet])
    onSetAdded()
  }

  return (
    <div className="exercise">
      <button className="exercise__header" onClick={() => setIsOpen(!isOpen)}>
        <div className="exercise__info">
          <div className="exercise__name">{exercise.exercise.name}</div>

          <div className="exercise__meta">
            {sessionSets.length} ×{" "}
            {sessionSets[0]?.targetExactReps ??
              `${sessionSets[0]?.targetMinReps} - ${sessionSets[0]?.targetMaxReps}`}{" "}
            <span className="exercise__meta-marker">•</span> {completedSets}/
            {sessionSets.length} done
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
          {sessionSets.map((set, index) => (
            <SetRow
              key={set.id}
              set={set}
              index={index}
              onRepsBlur={onRepsBlur}
              onWeightBlur={onWeightBlur}
              onSetComplete={handleSetComplete}
            />
          ))}
          <button onClick={handleAddSet} ><Plus /></button>
        </div>
      )}
    </div>
  );
}

export default ExerciseBlock;
