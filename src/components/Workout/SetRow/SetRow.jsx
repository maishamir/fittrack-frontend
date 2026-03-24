import React, { useState } from "react";
import "./SetRow.scss";

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
function SetRow({ set, index, onRepsBlur, onWeightBlur, onSetComplete }) {
  const [isChecked, setIsChecked] = useState(false);

  function handleCheck() {
    const currCheck = !isChecked;
    setIsChecked(currCheck);
    onSetComplete(currCheck);
  }

  return (
    <div className={isChecked ? "set-row set-row--checked" : "set-row"}>
      <div className="set-row__label">Set {index + 1}</div>

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
    </div>
  );
}

export default SetRow;
