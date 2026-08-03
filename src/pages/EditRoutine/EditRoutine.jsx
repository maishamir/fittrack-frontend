import { useEffect, useState } from "react";
import "./EditRoutine.scss";
import { editRoutine, getRoutineById } from "../../api/routines";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import { Plus, Save, X } from "lucide-react";
import CreateSet from "../../components/CreateRoutine/CreateSet/CreateSet";
import SelectExerciseModal from "../../components/SelectExerciseModal/SelectExerciseModal";

function EditRoutine() {
  const { routineId } = useParams();
  const [routineName, setRoutineName] = useState("");
  const [routineDetails, setRoutineDetails] = useState();
  const [routineExercises, setRoutineExercises] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSectionId, setCurrentSectionId] = useState(null);
  const [routineSections, setRoutineSections] = useState([
    { id: 1, name: "Warm Up", exercises: [] },
    { id: 2, name: "Main Workout", exercises: [] },
    { id: 3, name: "Cool Down", exercises: [] },
  ]);
  const navigate = useNavigate();


  // delete an exercise from a section (ex. barbell bench press from Warm Up)
  function handleDeleteExercise(exerciseId, sectionId) {
    const updatedSections = routineSections.map((section) => {
      if (section.id !== sectionId) return section;
      return {
        ...section,
        exercises: section.exercises.filter((ex) => ex.id !== exerciseId),
      };
    });

    setRoutineSections(updatedSections);
  }

  function handleExerciseUpdate(sectionId, exerciseId, field, value) {
    setRoutineSections(
      routineSections.map((section) => {
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

  async function handleEditRoutine(routineId) {
    try {
      const routineExercisesData = routineSections.flatMap((section) =>
        section.exercises.map((ex, index) => ({
          exerciseId: ex.exerciseId ?? ex.id,
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
        name: routineName,
        tags: [],
        routineExercises: routineExercisesData,
      };

      const response = await editRoutine(routineId, routineData);
      navigate("/routines");
    } catch (error) {
      console.error(error);
    }
  }

  function handleAddExercise(exercise) {
    const newExercise = {
      ...exercise,
      exercise: { name: exercise.name },
      sets: 3,
      reps: 10,
    };
    const updatedSections = routineSections.map((section) => {
      if (section.id == currentSectionId) {
        return {
          ...section,
          exercises: [...section.exercises, newExercise],
        };
      }
      return section;
    });
    setRoutineSections(updatedSections);
    setIsModalOpen(false);
  }

  useEffect(() => {
    const fetchRoutineDetails = async () => {
      try {
        const response = await getRoutineById(routineId);
        setRoutineDetails(response);
        setRoutineExercises(response.routineExercises);
        setRoutineName(response.name);

        const fetchedSections = [
          { id: 1, name: "Warm Up", exercises: [] },
          { id: 2, name: "Main Workout", exercises: [] },
          { id: 3, name: "Cool Down", exercises: [] },
        ].map((section) => ({
          ...section,
          exercises: response.routineExercises
            .filter((ex) => ex.sectionLabel === section.name)
            .map((re) => ({
              ...re,
              sets: re.routineSets.length,
              reps: re.routineSets[0]?.targetExactReps ?? 10,
            })),
        }));

        setRoutineSections(fetchedSections);
      } catch (err) {
        console.error("Failed to fetch routine => ", err);
      }
    };
    fetchRoutineDetails();
  }, [routineId]);


  return (
    <Layout>
      <div className="create-routine">
        <div className="create-routine__header">
          <h1 className="create-routine__title">Edit Routine</h1>
          <button
            className="create-routine__close"
            onClick={() => navigate("/routines")}
          >
            <X color="#90A1B9" size={20} />
          </button>
        </div>

        <input
          type="text"
          name=""
          id=""
          className="create-routine__name-input"
          placeholder="Routine name (e.g., Push Day)"
          value={routineName}
          onChange={(e) => setRoutineName(e.target.value)}
        />

        <div className="create-routine__sections">
          {routineSections.map((section) => (
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

              <div className="create-routine__section-content">
                {section.exercises.length === 0 ? (
                  <p className="create-routine__empty-message">No exercises</p>
                ) : (
                  <div className="create-routine__exercises-sets">
                    {section.exercises.map((exercise) => (
                      <CreateSet
                        key={exercise.id}
                        exercise={exercise}
                        onDelete={() =>
                          handleDeleteExercise(exercise.id, section.id)
                        }
                        sectionId={section.id}
                        exerciseId={exercise.id}
                        onUpdate={handleExerciseUpdate}
                        exerciseName={exercise.exercise.name}
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
          onClick={() => handleEditRoutine(routineId)}
        >
          <Save />
          Save Routine Changes
        </button>
      </div>
    </Layout>
  );
}

export default EditRoutine;
