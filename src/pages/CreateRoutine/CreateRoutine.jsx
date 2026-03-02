import React, { useState } from 'react'
import { Plus, Save, X } from 'lucide-react'
import Layout from '../../components/Layout/Layout';
import './CreateRoutine.scss'
import { useNavigate } from 'react-router-dom';


function CreateRoutine() {
  const [routineName, setRoutineName] = useState('');
  const navigate = useNavigate();

  // State for the three sections (Warm Up, Main Workout, Cool Down)
  // Each section has a name and an array of exercises
  const [sections, setSections] = useState([
    { id: 1, name: 'Warm Up', exercises: [] },
    { id: 2, name: 'Main Workout', exercises: [] },
    { id: 3, name: 'Cool Down', exercises: [] }
  ]);

  // Handle routine name input change
  function handleRoutineNameChange(e) {
    setRoutineName(e.target.value);
  }

  // Handle clicking the Add button for a section
  // This would open a modal or navigate to exercise selection
  function handleAddExercise(sectionId) {
    console.log('Add exercise to section:', sectionId);
    // You'll implement the modal/navigation logic here later
  }

  // Handle saving the routine
  function handleSaveRoutine() {
    console.log('Saving routine:', { routineName, sections });
    // You'll implement the save logic here later (API call, etc.)
  }

  // Handle closing/canceling
  function handleClose() {
    console.log('Closing create routine');
    // You'll implement navigation back or modal close here
  }

  return (
    <Layout >
      <div className="create-routine">

        <div className="create-routine__header">
          <h1 className="create-routine__title">New Routine</h1>
          <button
            className="create-routine__close"
            onClick={handleClose}
          >
            <X color='#90A1B9' size={20} onClick={() => navigate("/routines")}/>
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
                  onClick={() => handleAddExercise(section.id)}
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
                  <div className="create-routine__exercises">
                    {section.exercises.map((exercise) => (
                      <div key={exercise.id} className="create-routine__exercise">
                        {exercise.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

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