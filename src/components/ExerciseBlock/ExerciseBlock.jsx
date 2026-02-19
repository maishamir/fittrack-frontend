import React, { useState } from 'react'
import "./ExerciseBlock.scss";
import SetRow from '../SetRow/SetRow';

/**
 * Renders on execise inside a section
 * 
 * Responsible for:
 * - displaying exercise name
 * - rendering all sets for that exercise
 * 
 */

function ExerciseBlock({ exercise, onRepsBlur, onWeightBlur }) {

    const [isOpen, setIsOpen] = useState(true);

    const totalSets = exercise.sessionSets.length;

    // hardcoded visual meta for now (no completion logic)
    const firstSet = exercise.sessionSets[0];
    const repRange = firstSet.targetExactReps ?? `${firstSet.targetMinReps}-${firstSet.targetMaxReps}`;

    return (
        <div className={`exercise ${isOpen ? 'exercise--open' : 'exercise--closed'}`}>
            <div className="exercise__header" onClick={() => setIsOpen(!isOpen)}>

                <div className="exercise__header-left">
                    <h3 className='exercise__title'>{exercise.exercise.name}</h3>
                    <div className="exercise__meta">
                        {totalSets} × {repRange} reps
                    </div>
                </div>

                <div className={`exercise__chevron ${isOpen ? 'exercise__chevron--open' : ''}`}>
                    ▾
                </div>

            </div>

            {isOpen && (
                <div className="exercise__sets">
                    {exercise.sessionSets.map((set, index) => (
                        <SetRow
                            key={set.id}
                            set={set}
                            index={index}
                            onRepsBlur={onRepsBlur}
                            onWeightBlur={onWeightBlur}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExerciseBlock