import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSession, updateSet } from "../../api/sessions";
import SetRow from '../../components/SetRow/SetRow';
import axios from 'axios';
import "./Workout.scss";
import ExerciseBlock from '../../components/ExerciseBlock/ExerciseBlock';
import { X } from 'lucide-react';

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

  /**
   * When user finishes typing reps and clicks away, send that number to the backend to save it
   */

  async function handleRepsBlur(event, setId) {
    const rawValue = event.target.value;
    console.log("Reps blur triggered for set:", setId);


    // convet empty string to null
    const parsedReps = rawValue === "" ? null : Number(rawValue);

    try {
      console.log("Sending value:", parsedReps);

      await updateSet(setId, {
        actualReps: parsedReps,
      })
    } catch (error) {
      console.error("Failed to update reps: ", error)
    }
  }

  /**
   * when user finishes typing reps and clicks away, send it to the backend
   */

  async function handleWeightBlur(event, setId) {
    const rawValue = event.target.value;

    const parsedWeight = rawValue === "" ? null : Number(rawValue);

    try {
      await updateSet(setId, {
        actualWeight: parsedWeight,
      })
    } catch (error) {
      console.error("Failed to update weight: ", error)
    }
  }

  /**
   * function that groups exercises by sectionLabel
   */

  function groupExercisesBySection(exercises) {
    const grouped = {};

    exercises.forEach((exercise) => {
      const section = exercise.sectionLabel || "Uncategorized";

      if (!grouped[section]) {
        grouped[section] = [];
      }

      grouped[section].push(exercise);
    })

    return grouped;
  }

  const groupedExercises = groupExercisesBySection(session.sessionExercises);
  const totalSets = session.sessionExercises.reduce(
    (total, exercise) => total + exercise.sessionSets.length,
    0
  );

  return (
    <div className='workout'>
      <div className="workout__header">
        <div className="workout__header-left">
          <h2 className='workout__title'>{session.routineNameSnapshot}</h2>
          <p className="workout__progress">0/{totalSets} sets completed</p>
        </div>
        <button className='workout__close-button'><X className='close__icon'/></button>
      </div>



      {Object.entries(groupedExercises).map(([sectionName, exercises]) => (
        <div key={sectionName} className="section-card">

          <div className="section-card__header">
            <h3 className="section-card__title">{sectionName}</h3>
          </div>

          <div className="section-card__body">
            {exercises.map((exercise) => (
              <ExerciseBlock
                key={exercise.id}
                exercise={exercise}
                onRepsBlur={handleRepsBlur}
                onWeightBlur={handleWeightBlur}
              />
            ))}
          </div>

        </div>
      ))}
    </div>
  )
}

export default Workout