import React from 'react'

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

function SetRow({ set, index, onRepsBlur, onWeightBlur }) {
    return (
        <div style={{ marginBottom: "0.5rem" }}>
            <span>Set {index + 1}</span>

            <span>
                Target: {" "}
                {set.targetExactReps ?? `${set.targetMinReps}-${set.targetMaxReps}`} reps
            </span>

            <div>
                <input type="number" placeholder='Reps' defaultValue={set.actualReps ?? ""} onBlur={(e) => handleRepsBlur(e, set.id)} />
                <input type="number" placeholder='Weight' defaultValue={set.actualWeight ?? ""} onBlur={(e) => handleWeightBlur(e, set.id)} />
            </div>
        </div>
    )
}

export default SetRow