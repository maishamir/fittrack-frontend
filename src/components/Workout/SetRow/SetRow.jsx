import React, { useState } from "react";
import "./SetRow.scss";
import { X } from "lucide-react";

/**
 *
 * Renders one individual set row
 *
 * Displays:
 * - Set number
 * - Target Reps
 * - Inputs for actual reps + weight
 *
 * Does NOT:
 * - Fetch data
 * - Manage session state
 */
import { Check } from "lucide-react";
function SetRow({ set, index, onRepsBlur, onWeightBlur, onSetComplete, onDeleteSet }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    const currCheck = !isChecked;
    setIsChecked(currCheck);
    onSetComplete(currCheck);
  }



  return (
    <div className={isChecked ? "set-row set-row--checked" : "set-row"}>
      <div className="set-row__label">Set {index + 1}</div>

      <div className="set-row__input-wrapper">
        <div className="set-row__inputs">
          <input
            className={`set-row__input ${isChecked ? "set-row__input--checked" : ""}`}
            type="number"
            placeholder="kg"
            defaultValue={set.actualWeight ?? ""}
            onBlur={(e) => onWeightBlur(e, set.id)}
            disabled={isChecked}
          />

          <input
            className={`set-row__input ${isChecked ? "set-row__input--checked" : ""}`}
            type="number"
            placeholder="reps"
            defaultValue={set.actualReps ?? ""}
            onBlur={(e) => onRepsBlur(e, set.id)}
            disabled={isChecked}
          />


        </div>

        <button
          className="set-row__check"
          onClick={handleCheck}
          className={
            isChecked
              ? "set-row__check set-row__check--checked"
              : "set-row__check"
          }
        >
          <Check color={isChecked ? "white" : "#8d9eb6"} height={16} width={16} />
        </button> 

        <button
          className="set-row__delete"
          style={{ visibility: set.isNew && !isChecked ? "visible" : "hidden" }} >
          <X color="white" height={16} width={16} className="set-row__x" onClick={onDeleteSet}
          />
        </button>

      </div>
    </div >
  );
}

export default SetRow;
