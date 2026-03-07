import React, { useEffect, useState } from "react";
import "./SelectExerciseModal.scss";
import { v4 as uuidv4 } from 'uuid';
import { getExercises } from "../../api/exercises";

function SelectExerciseModal({ isOpen, onClose, onSelect }) {
    
  // HARDCODED TEST DATA - Replace with actual API call later
  // Organized by muscle group for easy browsing

  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    async function fetchExercises() {
        const data = await getExercises();
        setExercises(data)
    }
    fetchExercises();
  }, [])

  console.log("EXERCISES => ", exercises);

  const groupedExercises = Object.groupBy(exercises, ({primaryMuscleGroup}) => primaryMuscleGroup);

  console.log("Grouped exercises: ", groupedExercises);
  

  const exercisesByMuscleGroup = {
    CHEST: [
      { id: 1, name: "Bench Press" },
      { id: 2, name: "Dips" },
      { id: 3, name: "Incline Dumbbell Press" },
      { id: 4, name: "Cable Fly" },
    ],
    LEGS: [
      { id: 5, name: "Squat" },
      { id: 6, name: "Leg Press" },
      { id: 7, name: "Leg Curl" },
      { id: 8, name: "Leg Extension" },
      { id: 9, name: "Calf Raise" },
    ],
    BACK: [
      { id: 10, name: "Deadlift" },
      { id: 11, name: "Barbell Row" },
      { id: 12, name: "Pull Up" },
      { id: 13, name: "Lat Pulldown" },
    ],
    SHOULDERS: [
      { id: 14, name: "Overhead Press" },
      { id: 15, name: "Lateral Raise" },
      { id: 16, name: "Face Pull" },
    ],
    ARMS: [
      { id: 17, name: "Bicep Curl" },
      { id: 17, name: "Tricep Extension" },
    ],
  };

//   fetch all exercises



  // Don't render anything if modal is closed
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - clicking it closes the modal */}
      <div className="modal-backdrop" onClick={onClose}></div>

      {/* Modal container - slides up from bottom */}
      <div className="exercise-modal">
        {/* Header with title and close button */}
        <div className="exercise-modal__header">
          <h2 className="exercise-modal__title">Select Exercise</h2>
        </div>

        {/* Scrollable list of exercises grouped by muscle */}
        <div className="exercise-modal__content">
          {Object.entries(groupedExercises).map(
            ([muscleGroup, exercises]) => (
              <div key={muscleGroup} className="exercise-modal__group">
                <h3 className="exercise-modal__group-label">{muscleGroup}</h3>
                {exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    className="exercise-modal__exercise-btn"
                    onClick={() => onSelect(exercise)}
                  >
                    {exercise.name}
                  </button>
                ))}
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
}

export default SelectExerciseModal;
