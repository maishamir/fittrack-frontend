import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getSession, updateSet } from "../../api/sessions";
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

  return (
    <div>
      <h1>{session.routineNameSnapshot}</h1>

      {Object.entries(groupedExercises).map(([sectionName, exercises]) => (
        <div key={sectionName} style={{ marginBottom: "2rem" }}>
          <h2>{sectionName}</h2>

          {exercises.map((exercise) => (
            <div key={exercise.id} style={{ marginBottom: "2rem" }}>
              <h3>{exercise.exercise.name}</h3>

              {exercise.sessionSets.map((set, index) => (
                <div key={set.id} style={{ maginBottom: "0.5rem" }}>
                  <span>Set {index + 1} - </span>
                  <span>
                    Target: {" "}
                    {set.targetExactReps ?? `${set.targetMinReps} - ${set.targetMaxReps}`} reps
                  </span>

                  <div>
                    <input type="number" placeholder='Reps' defaultValue={set.actualReps ?? ""} onBlur={(e) => handleRepsBlur(e, set.id)} />
                    <input type="number" placeholder='Weight' defaultValue={set.actualWeight ?? ""} onBlur={(e) => handleWeightBlur(e, set.id)} />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default Workout