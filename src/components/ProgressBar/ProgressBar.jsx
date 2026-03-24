import "./ProgressBar.scss";

function ProgressBar({totalSets, completedSets}) {
  return (
    <div className="progressBar">
        <div style={{width: `${(completedSets/totalSets) * 100}%`}} className="progressBar--fill">

        </div>
    </div>
  )
}

export default ProgressBar