import React, { useEffect, useState } from "react";
import "./SelectExerciseModal.scss";
import { getExercises } from "../../api/exercises"
function SelectExerciseModal({ isOpen, onClose, onSelect }) {


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
      if (!exercises.length) {
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


  // useEffect to filter by search or selected muscle group filter
  useEffect(() => {

    const filteredExercises = exercises.filter(ex => {
      const matchesName = exerciseName && ex.name.toLowerCase().split(" ").some(exWords => exWords.startsWith(exerciseName.toLowerCase()));
      const matchesMuscle = ex.primaryMuscleGroup === muscleGroup;
      return matchesName || matchesMuscle;
    })
    setFilteredExercises(filteredExercises)

  }, [exercises, exerciseName, muscleGroup])

  // Don't render anything if modal is closed
  if (!isOpen) return null;


  // const modalContent = loading ? (<p>Loading</p>) : 

  return (
    <>
      {/* Backdrop - clicking it closes the modal */}
      <div className="modal-backdrop" onClick={onClose}></div>


      {/* Modal container - slides up from bottom */}
      <div className="exercise-modal">

        {!loading && <div className="exercise-modal__contents">
          <div className="exercise-modal__header">
            <h2 className="exercise-modal__title">Select Exercise</h2>
          </div>

          <label htmlFor="exerciseName">Exercise name</label>
          <input type="text" placeholder="eg. Squats" name="exerciseName" onChange={(e) => setExerciseName(e.target.value)} value={exerciseName} />
          <button onClick={() => { setExerciseName(""); setMuscleGroup("") }}>Clear Filter</button>

          {/* SUPER BASIC MUSCLE GROUP FILTER — TESTING LOGIC */}
          <fieldset>
            <legend>Muscle Group:</legend>

            <div className="allMuscles" style={{ "display": "flex", "textTransform": "lowercase", "flexWrap": "wrap" }}>
              {allMuscleGroups.map(muscle => (

                <div key={muscle}>
                  <input type="radio" name="muscleGroup" id={muscle.toLowerCase()} value={muscle.toLowerCase()} onChange={() => setMuscleGroup(muscle)} />
                  <label htmlFor={muscle.toLowerCase()}>{muscle}</label>
                </div>
              ))}
            </div>
          </fieldset>



          <p style={{ "color": "red" }}>Muscle group selected: {muscleGroup}</p>


          <div className="exercise-modal__content">
            {filteredExercises?.map(
              (ex) => (
                <div key={ex.id} className="exercise-modal__group">

                  <button className="exercise-modal__exercise-btn" onClick={() => onSelect(ex)}>
                    {ex.name}
                  </button>
                </div>
              ),
            )}

          </div>
        </div>}
        {loading && <p>Loading...</p>}
      </div>
    </>
  );
}

export default SelectExerciseModal;
