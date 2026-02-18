import React, { useState, useEffect } from 'react';
import { getRoutines, startSession } from '../../api/routines';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [routines, setRoutines] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchRoutines() {
            const data = await getRoutines();
            setRoutines(data);
        }

        fetchRoutines();

    }, []);

    async function handleStart(routineId) {
        try {
            setLoadingId(routineId);
            const session = await startSession(routineId);

            const sessionId = session.id ?? session.session.Id;
            navigate(`/workout/${sessionId}`);
        } finally {
            setLoadingId(null);
        }
    }
    return (
        <div>
            <h1>Routines</h1>
            {routines.map(routine => (
                <div key={routine.id}
                    style={{ display: 'flex', gap: 12, alignItems: 'center' }}
                >
                    <div>{routine.name}</div>
                    <button onClick={() => handleStart(routine.id)} disabled={loadingId == routine.id} >
                        {loadingId === routine.id ? 'Starting...' : 'Play'}
                    </button>
                </div>


            ))}
        </div>
    )
}

export default Home