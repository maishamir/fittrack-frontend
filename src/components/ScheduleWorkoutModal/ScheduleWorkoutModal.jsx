import React, { useEffect, useState } from "react";
import "./ScheduleWorkoutModal.scss";
import { getRoutines } from "../../api/routines";
import { startSession } from "../../api/routines";

function ScheduleWorkoutModal({
  isOpen,
  onClose,
  routineDate,
  onSchedule,
  scheduled,
}) {
  const [routines, setRoutines] = useState([]);
  const [isClosing, setIsClosing] = useState(false);

  function handleModalClose() {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 300);
  }

  // fetch routines
  useEffect(() => {
    async function fetchRoutines() {
      const data = await getRoutines();
      setRoutines(data);
    }
    fetchRoutines();
  }, []);

  // === HELPER FUNCTIONS === //
  // Select a routine to schedule it and then close the modal
  async function handleRoutineSelect(routineId) {
    // TODO: ADD FUNCTION TO SELECT ROUTINE
    try {
      onClose();
      const session = await startSession(routineId, {
        scheduledDate: routineDate,
      });

      onSchedule(session);
    } catch (error) {
      console.error("Could not schedule routine", error);
    }
  }

  function formatDate(date) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date,
    );
    return formattedDate;
  }

  const formattedDate = formatDate(routineDate);

  if (!isOpen && !isClosing) return;
  // render nothing if the modal is clsoed

  return (
    <>
      <div className="modal-backdrop" onClick={handleModalClose}></div>

      {/* modal container */}
      <div
        className={`routine-modal ${isClosing ? "routine-modal--closing " : ""}`}
      >
        <div className="routine-modal__header">
          <h2 className="routine-modal__title">Schedule Workout</h2>
          <small className="routine-modal__selectedDate">{formattedDate}</small>
        </div>

        {scheduled.length > 0 && (
          <div className="routine-modal__list">
            {scheduled.map((session) => {
              return (
                <button className="routine-modal__exercise-btn">
                  {session.routineNameSnapshot}
                </button>
              );
            })}
          </div>
        )}

        <div className="routine-modal__list">
          <h2 className="routine-modal__list-title">Add Routine</h2>
          {routines.map((routine) => {
            const numExercises = routine.routineExercises?.length || 0;
            return (
              <button
                className="routine-modal__exercise-btn"
                key={routine.id}
                onClick={() => handleRoutineSelect(routine.id)}
              >
                <p className="routine-modal__routine-name">{routine.name}</p>
                <small className="routine-modal__numExercises">
                  {numExercises} exercises
                </small>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default ScheduleWorkoutModal;
