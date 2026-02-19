import React from 'react'
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
    return (
        <div className='exercise'>
            <h3 className='exercise__title'>{exercise.exercise.name}</h3>

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

        </div>
    )
}

export default ExerciseBlock