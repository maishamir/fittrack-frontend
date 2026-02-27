import React from 'react'
import { Play } from 'lucide-react'
import "./RoutineCard.scss"

function RoutineCard({ routineName, numExercises, numSets, onStart, isLoading }) {
    return (
        <div className='routineCard'>
            <div className="routineCard__left">
                <h2 className='routineCard__name'>{routineName}</h2>
                <small className='routineCard__details'>
                    <p className=''>{numExercises} exercises</p> <span>•</span> <p>{numSets} sets</p>
                </small>
            </div>
            <button
                className='routineCard__start'
                onClick={onStart}
                disabled={isLoading}
            >

                <Play color='white' height={20} width={20} />
            </button>
        </div>
    )
}

export default RoutineCard