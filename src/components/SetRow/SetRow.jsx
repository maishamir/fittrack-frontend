import React from 'react'
import './SetRow.scss'

/**
 * 
 * Renders one individual set row
 * 
 * Displays: 
 * - Set number
 * - Target Reps
 * - Inputs for actual reps + weight
 * 
 * Does NOT:
 * - Fetch data
 * - Manage session state
 */
import { Check } from 'lucide-react';
function SetRow({ set, index, onRepsBlur, onWeightBlur }) {
    return (
        <div className="set-row">
            <div className="set-row__label">
                Set {index + 1}
            </div>

            <div className="set-row__inputs">
                <input
                    className="set-row__input"
                    type="number"
                    placeholder="kg"
                    defaultValue={set.actualWeight ?? ""}
                    onBlur={(e) => onWeightBlur(e, set.id)}
                />

                <input
                    className="set-row__input"
                    type="number"
                    placeholder="reps"
                    defaultValue={set.actualReps ?? ""}
                    onBlur={(e) => onRepsBlur(e, set.id)}
                />
            </div>

            <button className="set-row__check">
                <Check />
            </button>
        </div>
    );
}

export default SetRow