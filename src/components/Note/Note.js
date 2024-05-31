import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faSolidStar } from "@fortawesome/free-solid-svg-icons";
import "./Note.css";

function Note({ note, setNote, soumettreNote }) {
  const [noteSurvolee, setNoteSurvolee] = useState(0);

  return (
    <div>
      <div className="note-buttons">
        {[1, 2, 3, 4, 5].map((n) => (
          <button 
            key={n}
            onClick={() => setNote(n)}
            onMouseEnter={() => setNoteSurvolee(n)}
            onMouseLeave={() => setNoteSurvolee(0)}
            className="star-button"
          >
            <FontAwesomeIcon
              icon={faSolidStar}
              className={`fa-solid fa-star ${note >= n || noteSurvolee >= n ? "active" : ""}`}
            />
          </button>
        ))}
      </div>
      <button className="note-button" onClick={soumettreNote}>Soumettre la note</button>
    </div>
  );
}

export default Note;
