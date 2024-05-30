import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function Note({ note, setNote, soumettreNote }) {
  return (
    <div>
      <div className="note-buttons">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} onClick={() => setNote(n)}>
            <FontAwesomeIcon icon={faStar} color={note >= n ? "blue" : "grey"} />
          </button>
        ))}
      </div>
      <button className="note-button" onClick={soumettreNote}>Soumettre la note</button>
    </div>
  );
}

export default Note;
