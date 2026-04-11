import React from 'react'
import { ChevronRight } from 'lucide-react';
import "./Scheduled.scss"

function Scheduled({routineName, exerciseCount}) {
    return (
        <div className="scheduled">
            <div className="scheduled__left">
                <h2 className="scheduled__title">{routineName}</h2>
                <small className="scheduled__count">{exerciseCount} exercises</small>
            </div>
            <div className="scheduled__right">
                <ChevronRight width={20} height={20} color='#51A2FF'/>
            </div>
        </div>
    )
}

export default Scheduled;