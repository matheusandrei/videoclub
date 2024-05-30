import React, { useContext } from "react";
import { AppContext } from "../App/App";

function Commentaire({ nouveauCommentaire, setNouveauCommentaire, soumettreCommentaire }) {
  const context = useContext(AppContext);

  return (
    context.estLog && (
      <form className="comment-form" onSubmit={soumettreCommentaire}>
        <textarea
          name="commentaire"
          placeholder="Ajouter votre commentaire"
          className="comment-textarea"
          value={nouveauCommentaire}
          onChange={(e) => setNouveauCommentaire(e.target.value)}
        ></textarea>
        <button className="submit-button">Soumettre le commentaire</button>
      </form>
    )
  );
}

export default Commentaire;
