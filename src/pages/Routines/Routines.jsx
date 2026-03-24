import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Play } from "lucide-react";
import "./Routines.scss";
import { deleteRoutine, getRoutines, startSession } from "../../api/routines";
import Layout from "../../components/Layout/Layout";
import SelectExerciseModal from "../../components/SelectExerciseModal/SelectExerciseModal";

function RoutinesList() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [loadingId, setLoadingId] = useState(null);

  // State to hold all routines
  // HARDCODED TEST DATA - Replace with actual API call later
  const [routines, setRoutines] = useState([]);

  // Fetch routines on component mount
  useEffect(() => {
    async function fetchRoutines() {
      // You'll replace this with your actual API call
      const data = await getRoutines();
      setRoutines(data);
    }

    fetchRoutines();
  }, []);

  // Handle clicking the New button
  function handleNewRoutine() {
    navigate("/routines/createRoutine");
  }

  // Handle clicking the Play button
  async function handlePlayRoutine(routineId) {
    try {
        setLoadingId(routineId);
        const session = await startSession(routineId);

        const sessionId = session.id ?? session.session.Id;
        navigate(`/workout/${sessionId}`);
    } finally {
        setLoadingId(null);
    }
  }

  // Handle clicking Edit button
  function handleEditRoutine(routineId) {
    console.log("Editing routine:", routineId);
    // You'll add navigation to edit page here
    console.log("Navigating...");

    navigate(`/routines/${routineId}/edit`)
  }

  // Handle clicking Delete button
  async function handleDeleteRoutine(routineId) {
    const routine = routines.find((routine) => routine.id === routineId);
    console.log("Routine => ", routine);

    const routineName = routine.name;
    if (
      !confirm(`Are you sure you want to delete the routine "${routineName}"?`)
    )
      return;

    try {
      await deleteRoutine(routineId);

      setRoutines(routines.filter((routine) => routine.id != routineId));
    } catch (err) {
      console.error(err);
    }

    // You'll add delete confirmation and API call here
  }

  // Group exercises by section for display
  function groupExercisesBySection(routineExercises) {
    const grouped = {};

    routineExercises.forEach((re) => {
      if (!grouped[re.sectionLabel]) {
        grouped[re.sectionLabel] = [];
      }
      grouped[re.sectionLabel].push(re);
    });

    return grouped;
  }

  return (
    <Layout>
      <div className="routines-list">
        {/* Header with title and New button */}
        <SelectExerciseModal />
        <div className="routines-list__header">
          <h1 className="routines-list__title">Routines</h1>
          <button className="routines-list__new-btn" onClick={handleNewRoutine}>
            <Plus size={16} />
            New
          </button>
        </div>

        {/* List of routine cards */}
        <div className="routines-list__cards">
          {routines.map((routine) => {
            const numExercises = routine.routineExercises?.length || 0;
            const numSets =
              routine.routineExercises?.reduce((total, re) => {
                return total + (re.routineSets?.length || 0);
              }, 0) || 0;
            const groupedExercises = groupExercisesBySection(
              routine.routineExercises || [],
            );

            return (
              <div key={routine.id} className="routines-list__card">
                {/* Card header */}
                <div className="routines-list__card-header">
                  <div className="routines-list__card-info">
                    <h2 className="routines-list__card-name">{routine.name}</h2>
                    <p className="routines-list__card-stats">
                      {numExercises} exercises • {numSets} sets
                    </p>
                  </div>
                  <button
                    className="routines-list__play-btn"
                    onClick={() => handlePlayRoutine(routine.id)}
                  >
                    <Play color="white" size={20} />
                  </button>
                </div>

                {/* Card body - always visible */}
                <div className="routines-list__card-body">
                  {/* Loop through each section */}
                  {Object.entries(groupedExercises).map(
                    ([sectionLabel, exercises]) => (
                      <div
                        key={sectionLabel}
                        className="routines-list__section"
                      >
                        <h3 className="routines-list__section-label">
                          {sectionLabel}
                        </h3>

                        {/* Loop through exercises in this section */}
                        <div className="routines-list__section-exercises">
                          {exercises.map((re) => (
                            <div
                              key={re.id}
                              className="routines-list__exercise"
                            >
                              <span className="routines-list__exercise-name">
                                {re.exercise.name}
                              </span>
                              <span className="routines-list__exercise-sets">
                                {re.routineSets.length} ×{" "}
                                {re.routineSets[0]?.targetMaxReps ||
                                  re.routineSets[0]?.targetExactReps ||
                                  "?"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ),
                  )}
                </div>

                {/* Card footer - Edit and Delete buttons */}
                <div className="routines-list__card-footer">
                  <button
                    className="routines-list__edit-btn"
                    onClick={() => handleEditRoutine(routine.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="routines-list__delete-btn"
                    onClick={() => handleDeleteRoutine(routine.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default RoutinesList;
