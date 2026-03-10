import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import "./CreateSet.scss";

function CreateSet({ exercise, onDelete, onUpdate, sectionId, exerciseId }) {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  return (
    <div className="create-set">
      <div className="create-set__header">
        <div className="create-set__info">
          <h3 className="create-set__name">{exercise.name}</h3>
          <p className="create-set__muscle">{exercise.muscleGroup}</p>
        </div>
        <button className="create-set__delete">
          <Trash2 size={20} color="#90A1B9" onClick={onDelete} />
        </button>
      </div>

      <div className="create-set__inputs">
        <div className="create-set__input-group">
          <label className="create-set__label">Sets</label>
          <input
            type="number"
            className="create-set__input"
            placeholder="3"
            onChange={(e) =>
              onUpdate(sectionId, exerciseId, "sets", e.target.value)
            }
          />
        </div>

        <div className="create-set__input-group">
          <label className="create-set__label">Reps</label>
          <input
            type="number"
            className="create-set__input"
            placeholder="10"
            onChange={(e) =>
              onUpdate(sectionId, exerciseId, "reps", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
}

export default CreateSet;
