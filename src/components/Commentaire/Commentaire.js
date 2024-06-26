import React, { useContext } from "react";
import { AppContext } from "../App/App";
import "./Commentaire.css"
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
        <button className="submit-button">Commenter</button>
      </form>
    )
  );
}

export default Commentaire;
