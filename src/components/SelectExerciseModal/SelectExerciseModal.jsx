import React, { useEffect, useState } from "react";
import "./SelectExerciseModal.scss";
import { v4 as uuidv4 } from 'uuid';
import { getExercises } from "../../api/exercises";

function SelectExerciseModal({ isOpen, onClose, onSelect }) {

  // HARDCODED TEST DATA - Replace with actual API call later
  // Organized by muscle group for easy browsing

  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("abs")
  const [filteredExercises, setFilteredExercises] = useState(null);
  const [loading, setLoading] = useState(false)
  const [allMuscleGroups, setAllMuscleGroups] = useState([])

  useEffect(() => {
    async function fetchExercises() {
      const data = await getExercises();
      setExercises(data)
    }
    fetchExercises();
  }, [])

  // useEffect for when exercises first loads to get the default values
  useEffect(() => {
    function getDefaultMuscleGroup() {
      if (!exercises) {
        setLoading(true);
        return;
      }
      setLoading(false)
      let muscles = new Set(exercises.map(ex => ex.primaryMuscleGroup))
      muscles = Array.from(muscles);
      muscles = muscles.sort();
      setAllMuscleGroups(muscles)
      setMuscleGroup(muscles[0])
    }
    getDefaultMuscleGroup();
  }, [exercises])

  // console.log("muscle group ==> ", muscleGroup);
  // console.log("=== EXERCISE NAME ===", exerciseName)
  console.log(allMuscleGroups);


  const groupedExercises = Object.groupBy(exercises, ({ primaryMuscleGroup }) => primaryMuscleGroup);

  // useEffect to filter by search or selected muscle group filter
  useEffect(() => {
    function filterBySearch() {
      const filteredExercises = exercises.filter(ex => (ex.name.toLowerCase().split(" ").some(exWord => exWord.startsWith(exerciseName.toLowerCase()))) || (ex.primaryMuscleGroup === muscleGroup));
      // const filteredExercisesByMuscle = exercises.filter(ex => ex.primaryMuscleGroup === muscleGroup)
      setFilteredExercises(filteredExercises)
    }

    filterBySearch();
  }, [exercises, exerciseName, muscleGroup])

  console.log(filteredExercises);



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
        <label htmlFor="exerciseName">Exercise name</label>
        <input type="text" placeholder="eg. Squats" name="exerciseName" onChange={(e) => setExerciseName(e.target.value)} />

        {/* SUPER BASIC MUSCLE GROUP FILTER — TESTING LOGIC */}
        <fieldset>
          <legend>Muscle Group:</legend>
        </fieldset>

        <div className="allMuscles" style={{ "display": "flex", "textTransform": "lowercase", "flexWrap": "wrap" }}>
          {allMuscleGroups.map(muscle => (

            <div>
              <input type="radio" name="muscleGroup" id={muscle.toLowerCase()} value={muscle.toLowerCase()} onChange={() => setMuscleGroup(muscle)} />
              <label htmlFor={muscle.toLowerCase()}>{muscle}</label>
            </div>
          ))}
        </div>

        <p style={{ "color": "red" }}>Muscle group selected: {muscleGroup}</p>


        <div className="exercise-modal__content">
          {filteredExercises.map(
            (ex) => (
              <div key={ex.id} className="exercise-modal__group">
                {/* <h3 className="exercise-modal__group-label">{muscleGroup}</h3>
                {exercises.map((exercise) => (
                  <button
                    key={exercise.id}
                    className="exercise-modal__exercise-btn"
                    onClick={() => onSelect(exercise)}
                  >
                    {exercise.name}
                  </button>
                ))} */}
                <button className="exercise-modal__exercise-btn" onClick={() => onSelect(ex)}>
                  {ex.name}
                </button>
              </div>
            ),
          )}

        </div>
      </div>
    </>
  );
}

export default SelectExerciseModal;
