import React, { useEffect, useState } from "react";
import "./ScheduleWorkoutModal.scss";
import { getRoutines, startSession } from "../../api/routines";
import { useNavigate } from "react-router-dom";
import { deleteSession } from "../../api/sessions";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
// import toast, {Toaster} from 'react-hot-toast';

function ScheduleWorkoutModal({
  isOpen,
  onClose,
  routineDate,
  onSchedule,
  scheduled,
  onRemove,
  canStartToday
}) {
  const [routines, setRoutines] = useState([]);
  const [isClosing, setIsClosing] = useState(false);
  const [scheduledSessions, setScheduledSessions] = useState();
  const [loadingId, setLoadingId] = useState(null);
  const navigate = useNavigate();
  const startToday = canStartToday();

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

  useEffect(() => {
    setScheduledSessions(scheduled);
  }, [scheduled]);

  // === HELPER FUNCTIONS === //
  // Select a routine to schedule it and then close the modal
  async function handleRoutineSelect(routineId) {
    // TODO: ADD FUNCTION TO SELECT ROUTINE
    try {
      const session = await startSession(routineId, {
        scheduledDate: routineDate,
      });

      onSchedule(session);
    } catch (error) {
      console.error("Could not schedule routine", error);
    }
  }

  async function handleStartRoutine(session) {
    if (!startToday) {
      toast.error("Whoops! Can't start a routine on the wrong day", {
        style: {
          fontSize: '0.875rem',
          width: "90%"
        }
      });
      return;
    }
    try {
      setLoadingId(session.id);

      navigate(`/workout/${session.id}`);
    } finally {
      setLoadingId(null);
    }
  }

  async function handleRemoveSession(sessionId) {
    const sessionToRemove = scheduledSessions.find(
      (session) => session.id === sessionId,
    );

    try {
      const response = await deleteSession(sessionId);
      onRemove(sessionId);
    } catch (error) {
      console.error(error);
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

        {scheduledSessions.length > 0 && (
          <div className="routine-modal__list">
            {scheduledSessions?.map((session) => {
              return (
                <div
                  className={`routine-modal__exercise-btn routine-modal__exercise-btn--sched ${session.completed ? "routine-modal__exercise-btn--complete" : ""}`}
                  key={session.id}
                >
                  <div className="routine-modal__routineName">
                    {session.completed && session.scheduledDate ? (
                      <Check size={18} color="#05DF72" />
                    ) : session.completed && !session.scheduledDate ? (
                      <span title="Completed an impromptu workout! Nice 💪🏼">⭐️</span>
                    ) : (
                      ""
                    )}
                    {session.routineNameSnapshot}
                  </div>
                  {!session.completed ? (
                    <div className="routine-modal__actions">
                      <button
                        className={`${startToday ? "" : "disabled"} routine-modal__action routine-modal__action--start`}
                        onClick={() => handleStartRoutine(session)}
                      >
                        Start
                      </button>
                      <button
                        className="routine-modal__action routine-modal__action--remove"
                        onClick={() => handleRemoveSession(session.id)}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="routine-modal__actions routine-modal__actions--completed">
                      <p>Completed</p>
                    </div>
                  )}
                </div>
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
