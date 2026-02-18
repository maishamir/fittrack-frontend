import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSession } from "../../api/sessions";
import axios from 'axios';

function Workout() {
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSession() {
      const data = await getSession(sessionId);
      setSession(data);
      setLoading(false);
    }
    fetchSession();
  }, [sessionId]);

  if (loading) return <p>Loading...</p>
  if (!session) return <p>No session found.</p>

  return (
    <div>
      <h1>{session.routineNameSnapshot}</h1>

      {session.sessionExercises.map((exercise) => (
        <div key={exercise.id} style={{ marginBottom: '2rem' }}>
          <h2>{exercise.exercise.name}</h2>

          {exercise.sessionSets.map((set, index) => (
            <div key={set.id} style={{ marginBottom: '0.5rem' }}>
              <span>Set {index + 1} - </span>
              <span>Target: {set.targetExactReps ?? `${set.targetMinReps}-${set.targetMaxReps}`} reps</span>

              <div>
                <input type="number" placeholder='Actual reps' defaultValue={set.actualReps ?? ''} />
                <input type="number" placeholder='Weight' defaultValue={set.actualWeight ?? ''} />
              </div>
            </div>
          ))}
        </div>

      ))}
    </div>
  )
}

export default Workout