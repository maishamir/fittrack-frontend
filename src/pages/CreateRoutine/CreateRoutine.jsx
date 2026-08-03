import React, { useState } from "react";
import { Plus, Save, X } from "lucide-react";
import Layout from "../../components/Layout/Layout";
import "./CreateRoutine.scss";
import { useNavigate } from "react-router-dom";
import SelectExerciseModal from "../../components/SelectExerciseModal/SelectExerciseModal";
import { createRoutine } from "../../api/routines";
import CreateSet from "../../components/CreateRoutine/CreateSet/CreateSet";
import { useUser } from "@clerk/react";

function CreateRoutine() {
  const [routineName, setRoutineName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();


  const navigate = useNavigate();

  // State for the three sections (Warm Up, Main Workout, Cool Down)
  // Each section has a name and an array of exercises
  const [sections, setSections] = useState([
    { id: 1, name: "Warm Up", exercises: [] },
    { id: 2, name: "Main Workout", exercises: [] },
    { id: 3, name: "Cool Down", exercises: [] },
  ]);

  // Handle routine name input change
  function handleRoutineNameChange(e) {
    setRoutineName(e.target.value);
  }

  // Handle clicking the Add button for a section
  // This would open a modal or navigate to exercise selection
  function handleAddExercise(exercise) {
    const newExercise = {
      ...exercise,
      sets: 3,
      reps: 10,
    };
    const updatedSections = sections.map((section) => {
      if (section.id == currentSectionId) {
        return {
          ...section,
          exercises: [...section.exercises, newExercise],
        };
      }
      return section;
    });
    setSections(updatedSections);
    setIsModalOpen(false);
  }

  function handleDeleteExercise(exerciseId, sectionId) {
    const updatedSections = sections.map((section) => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        exercises: section.exercises.filter((ex) => ex.id !== exerciseId),
      };
    });

    setSections(updatedSections);
  }

  function handleExerciseUpdate(sectionId, exerciseId, field, value) {
    setSections(
      sections.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          exercises: section.exercises.map((exercise) => {
            if (exercise.id !== exerciseId) return exercise;
            return { ...exercise, [field]: value };
          }),
        };
      }),
    );
  }

  function handleOpenModal(sectionId) {
    setCurrentSectionId(sectionId);
    setIsModalOpen(true);
  }

  // Handle saving the routine
  async function handleSaveRoutine() {
    try {
      if (!user) {
        return;
      }
      const userId = user.id;

      const routineExercisesData = sections.flatMap((section) =>
        section.exercises.map((ex, index) => ({
          exerciseId: ex.id,
          sectionLabel: section.name,
          orderIndex: index,
          routineSets: {
            create: Array.from({ length: ex.sets }, (_, i) => ({
              orderIndex: i,
              targetExactReps: Number(ex.reps),
            })),
          },
        })),
      );

      const routineData = {
        userId: userId,
        name: routineName,
        tags: [],
        routineExercises: routineExercisesData,
      };

      await createRoutine(routineData);
      navigate("/routines");
    } catch (error) {
      console.error("This is the error", error);
    }

    // You'll implement the save logic here later (API call, etc.)
  }

  // === RENDER === ///
  return (
    <Layout>
      <div className="create-routine">
        <div className="create-routine__header">
          <h1 className="create-routine__title">New Routine</h1>
          <button
            className="create-routine__close"
            onClick={() => navigate("/routines")}
          >
            <X color="#90A1B9" size={20} />
          </button>
        </div>

        <input
          type="text"
          className="create-routine__name-input"
          placeholder="Routine name (e.g., Push Day)"
          value={routineName}
          onChange={handleRoutineNameChange}
        />

        {/* Sections container */}
        <div className="create-routine__sections">
          {sections.map((section) => (
            <div key={section.id} className="create-routine__section">
              <div className="create-routine__section-header">
                <h2 className="create-routine__section-name">{section.name}</h2>
                <button
                  className="create-routine__add-btn"
                  onClick={() => handleOpenModal(section.id)}
                >
                  <Plus size={14} />
                  Add
                </button>
              </div>

              {/* Section content - either exercises or "No exercises" message */}
              <div className="create-routine__section-content">
                {section.exercises.length === 0 ? (
                  <p className="create-routine__empty-message">No exercises</p>
                ) : (
                  <div className="create-routine__exercise-sets">
                    {section.exercises.map((exercise) => (
                      <CreateSet
                        key={exercise.id}
                        exercise={exercise}
                        onDelete={() =>
                          handleDeleteExercise(exercise.id, section.id)
                        }
                        exerciseName={exercise.name}
                        sectionId={section.id}
                        exerciseId={exercise.id}
                        onUpdate={handleExerciseUpdate}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <SelectExerciseModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSelect={handleAddExercise}
        />

        <button
          className="create-routine__save-btn"
          onClick={handleSaveRoutine}
        >
          <Save />
          Save Routine
        </button>
      </div>
    </Layout>
  );
}

export default CreateRoutine;
