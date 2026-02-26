import React from "react";
import "./StatCard.scss";

function StatCard({ icon, text, cardContent }) {
  return (
    <div className={`statCard`} id={`statCard--${text}`}>
      {icon}
      <h2 className="statCard__content">{cardContent}</h2>
      <small className="statCard__label">
        {text.charAt(0).toUpperCase() + text.slice(1)}
      </small>
    </div>
  );
}

export default StatCard;
