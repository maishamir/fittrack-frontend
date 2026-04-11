import React from 'react'
import { Play } from 'lucide-react'
import "./RoutineCard.scss"

function RoutineCard({ routineName, numExercises, numSets, onStart, isLoading }) {
    return (
        <div className='routineCard' onClick={onStart}> 
            <div className="routineCard__left">
                <h2 className='routineCard__name'>{routineName}</h2>
                <small className='routineCard__details'>
                    <p className=''>{numExercises} {numExercises > 1 ? "exercises" : "exercise"} </p> <span>•</span> <p>{numSets} {numSets > 1 ? "sets" : "set"}</p>
                </small>
            </div>
            <div
                className='routineCard__start'
                disabled={isLoading}
            >

                <Play color='white' height={20} width={20} />
            </div>
        </div>
    )
}

export default RoutineCard