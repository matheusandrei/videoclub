import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { useParams } from "react-router-dom";
import Note from "../Note/Note";
import Commentaire from "../Commentaire/Commentaire";

import "./Film.css";

function Film() {
  const context = useContext(AppContext);
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [note, setNote] = useState(0);

  const urlTuileFilm = `https://four1f-tp1-matheusandrei.onrender.com/api/films/${id}`;

  useEffect(() => {
    fetch(urlTuileFilm)
      .then((response) => response.json())
      .then((data) => {
        setFilmDetails(data);
      });
  }, [id, urlTuileFilm]);

  if (!filmDetails) {
    return <div>Film pas trouvé</div>;
  }

  async function soumettreNote() {
    let aNotes = filmDetails.notes ? [...filmDetails.notes] : [];

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

    await fetch(urlTuileFilm, oOptions);
    const response = await fetch(urlTuileFilm);
    const updatedFilm = await response.json();
    setFilmDetails(updatedFilm);
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

    await fetch(urlTuileFilm, oOptions);
    const response = await fetch(urlTuileFilm);
    const updatedFilm = await response.json();
    setFilmDetails(updatedFilm);
    setNouveauCommentaire('');
  }

  return (
    <article className="film-card">
      <h2 className="film-title">{filmDetails?.titre}</h2>
      <div className="film-content">
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
          <Note
            note={note}
            setNote={setNote}
            soumettreNote={soumettreNote}
          />
          <Commentaire
            nouveauCommentaire={nouveauCommentaire}
            setNouveauCommentaire={setNouveauCommentaire}
            soumettreCommentaire={soumettreCommentaire}
          />
<p>
  Note pour ce film:{" "}
  {filmDetails?.notes && filmDetails.notes.length > 0
    ? filmDetails.notes.join(", ")
    : "Ce film n'a pas encore été noté"}
</p>

          <p>{filmDetails?.commentaire}</p>
        </div>
      </div>
    </article>
  );
}

export default Film;
