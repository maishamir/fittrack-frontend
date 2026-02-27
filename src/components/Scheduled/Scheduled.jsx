import React from 'react'
import { ChevronRight } from 'lucide-react';
import "./Scheduled.scss"

function Scheduled() {
    return (
        <div className="scheduled">
            <div className="scheduled__left">
                <h2 className="scheduled__title">Push Day</h2>
                <small className="scheduled__count">6 exercises</small>
            </div>
            <div className="scheduled__right">
                <ChevronRight width={20} height={20} color='#51A2FF'/>
            </div>
        </div>
    )
}

export default Scheduled;