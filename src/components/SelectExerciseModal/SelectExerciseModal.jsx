import React, { useEffect, useState } from "react";
import "./SelectExerciseModal.scss";
import { getExercises } from "../../api/exercises"
import { Search } from "lucide-react";
function SelectExerciseModal({ isOpen, onClose, onSelect }) {


  const [exercises, setExercises] = useState([]);
  const [exerciseName, setExerciseName] = useState("");
  const [muscleGroup, setMuscleGroup] = useState(null)
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
      const matchesMuscle = muscleGroup && (ex.primaryMuscleGroup === muscleGroup);
      return matchesName || matchesMuscle;
    })
    setFilteredExercises(filteredExercises)

  }, [exercises, exerciseName, muscleGroup])

  // Don't render anything if modal is closed
  if (!isOpen) return null;



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

          <div className="searchEx">
            <input type="text" placeholder="Search..." name="exerciseName" onChange={(e) => setExerciseName(e.target.value)} value={exerciseName} className="exercise-modal__search" />
            <div className="icon"><Search className="searchIcon" color="#7B2DFB" size={20} /></div>
          </div>

          <button onClick={() => { setExerciseName(""); setMuscleGroup(null) }}>Clear Filter</button>

          <p>Filter by muscle group</p>

          <div className="allMuscles">
            {allMuscleGroups.map(muscle => (

              <label htmlFor={muscle} key={muscle}>
                {muscle.toLowerCase()}
                <input type="checkbox" name="muscleGroup" id={muscle} value={muscle} onChange={(e) => setMuscleGroup(e.target.value) 
                } checked={muscleGroup === muscle} />
              </label>
            ))}
          </div>


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
