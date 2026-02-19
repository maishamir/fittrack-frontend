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

function SetRow({ set, index, onRepsBlur, onWeightBlur }) {
    return (
        <div className='set-row'>
            <span className='set-row__label'>Set {index + 1}</span>

            <span className='set-row__target'>
                Target: {" "}
                {set.targetExactReps ?? `${set.targetMinReps}-${set.targetMaxReps}`} reps
            </span>

            {/* <div > */}
            <input className='set-row__input' type="number" placeholder='Reps' defaultValue={set.actualReps ?? ""} onBlur={(e) => handleRepsBlur(e, set.id)} />
            <input className='set-row__input' type="number" placeholder='Weight' defaultValue={set.actualWeight ?? ""} onBlur={(e) => handleWeightBlur(e, set.id)} />
            {/* </div> */}
        </div >
    )
}

export default SetRow