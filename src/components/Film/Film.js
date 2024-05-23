import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { useParams } from "react-router-dom";

import "./Film.css";

function Film() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [filmDetails, setFilm] = useState(null);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');

  const urlTuileFilm = `https://four1f-tp1-matheusandrei.onrender.com/films/${id}`;

  useEffect(() => {
    fetch(urlTuileFilm)
      .then((response) => response.json())
      .then((data) => {
        setFilm(data);
        // calcule moyenne
      });
  }, [id, urlTuileFilm]);

  if (!filmDetails) {
    return <div>Film pas trouvé</div>;
  }

  async function soumettreNote(e) {
    e.preventDefault();
    let aNotes;
    if (!filmDetails.notes) {
      aNotes = [1];
    } else {
      aNotes = filmDetails.notes;
      aNotes.push(1);
    }

    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: aNotes }),
    };

    let putNote = await fetch(urlTuileFilm, oOptions),
      getFilm = await fetch(urlTuileFilm);

    Promise.all([putNote, getFilm])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        setFilm(data);
      });
  }

  async function soumettreCommentaire(e) {
    e.preventDefault();
    let aCommentaires;
    if (!filmDetails.commentaires) {
      aCommentaires = [
        {
          commentaire: nouveauCommentaire,
          auteur: context.nom,
        },
      ];
    } else {
      aCommentaires = filmDetails.commentaires;
      aCommentaires.push({
        commentaire: nouveauCommentaire,
        auteur: context.nom,
      });
    }

    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaires: aCommentaires }),
    };

    let putCommentaire = await fetch(urlTuileFilm, oOptions),
      getFilm = await fetch(urlTuileFilm);

    Promise.all([putCommentaire, getFilm])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        setFilm(data);
        setNouveauCommentaire(''); 
      });
  }

  let blockAjoutCommentaire;

  if (context.estLog) {
    blockAjoutCommentaire = (
      <form className="comment-form" onSubmit={soumettreCommentaire}>
        <textarea
          name="commentaire"
          placeholder="Ajouter votre commentaire"
          className="comment-textarea"
          value={nouveauCommentaire}
          onChange={(e) => setNouveauCommentaire(e.target.value)}
        ></textarea>
        <button className="submit-button">Soumettre</button>
      </form>
    );
  }

  return (
    <article className="film-card">
      <h2 className="film-title">{filmDetails?.titre}</h2>
      <img
        src={`/img/${filmDetails?.titreVignette}`}
        alt={filmDetails.titre}
        className="film-img"
      />
      <div className="film-info">
        <p className="film-detail">
          Réalisateur: <span className="film-data">{filmDetails?.realisation}</span>
        </p>
        <p className="film-detail">
          Année: <span className="film-data">{filmDetails?.annee}</span>
        </p>
        <p className="film-detail">
          Notes: <span className="film-data">{filmDetails?.notes}</span>
        </p>
        <button className="note-button" onClick={soumettreNote}>Note</button>
        {blockAjoutCommentaire}
      </div>
    </article>
  );
}

export default Film;
