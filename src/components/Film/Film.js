import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "./Film.css";

function Film() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [filmDetails, setFilm] = useState(null);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [note, setNote] = useState(0);

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

  async function soumettreNote() {
    let aNotes = filmDetails.notes ? [...filmDetails.notes] : [];

    // ajoute la note selectionnée
    if (note > 0 && note <= 5) {
      aNotes.push(note);
    }

    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: aNotes }),
    };

    let putNote = await fetch(urlTuileFilm, oOptions);
    let getFilm = await fetch(urlTuileFilm);

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

    let putCommentaire = await fetch(urlTuileFilm, oOptions);
    let getFilm = await fetch(urlTuileFilm);

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
        <button className="submit-button">Soumettre le commentaire</button>
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
          Réalisateur: <span
          className="film-data">{filmDetails?.realisation}</span>
          </p>
          <p className="film-detail">
            Année: <span className="film-data">{filmDetails?.annee}</span>
          </p>
          <div className="note-buttons">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => { setNote(n); soumettreNote(); }}>
                <FontAwesomeIcon icon={faStar} color={note >= n ? "gold" : "gray"} />
              </button>
            ))}
          </div>
          <button className="note-button" onClick={soumettreNote}>Soumettre la note</button>
          {blockAjoutCommentaire}
        </div>
      </article>
    );
  }
  
  export default Film;
  