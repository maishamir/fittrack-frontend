import React, { useState, useEffect } from 'react';
import { getRoutines } from '../../api/routines';


function Home() {
    const [routines, setRoutines] = useState([]);

    useEffect(() => {
        async function fetchRoutines() {
            const data = await getRoutines();
            setRoutines(data);

        }

        fetchRoutines();

    }, [])
    return (
        <div>
            <h1>Routines</h1>
            {routines.map(routine => (
                <div key={routine.id}>{routine.name}</div>
            ))}
        </div>
    )
}

export default Home