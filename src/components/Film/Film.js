import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { useParams } from "react-router-dom";
import Note from "../Note/Note";
import Commentaire from "../Commentaire/Commentaire";

import "./Film.css";

function Film() {
  const context = useContext(AppContext);
  const { nom } = useContext(AppContext);
  const { id } = useParams();
  const [filmDetails, setFilmDetails] = useState(null);
  const [nouveauCommentaire, setNouveauCommentaire] = useState('');
  const [note, setNote] = useState(0);
  const [noteMoyenne, setnoteMoyenne] = useState(0); 

  const urlTuileFilm = `https://four1f-tp1-matheusandrei.onrender.com/api/films/${id}`;

  useEffect(() => {
    fetch(urlTuileFilm)
      .then((response) => response.json())
      .then((data) => {
        setFilmDetails(data);

        // calcul de la moyenne des notes si des notes existent
        if (data.notes && data.notes.length > 0) {
          const sum = data.notes.reduce((total, current) => total + current, 0);
          const moyenne = sum / data.notes.length;
          setnoteMoyenne(moyenne);
        }
      })
      .catch((error) => console.error('Erreur de chargement du film:', error));
  }, [id]);

  const removeFilm = async () => {
    const options = {
      method: "DELETE",
    };

    try {
      await fetch(urlTuileFilm, options);
      window.location.href = '/films'; 
    } catch (error) {
      console.error('Erreur de suppression du film:', error);
    }
  };

  if (!filmDetails) {
    return <div>Film pas trouvé</div>;
  }

  const soumettreNote = async () => {
    let aNotes = filmDetails.notes ? [...filmDetails.notes] : [];

    if (note > 0 && note <= 5) {
      aNotes.push(note);
    }

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ notes: aNotes }),
    };

    try {
      await fetch(urlTuileFilm, options);
      const response = await fetch(urlTuileFilm);
      const updatedFilm = await response.json();
      setFilmDetails(updatedFilm);
      setNote(0);

      // calcul de la moyenne
      const sum = updatedFilm.notes.reduce((total, current) => total + current, 0);
      const moyenne = sum / updatedFilm.notes.length;

      // met a jour la moyenne des notes
      setnoteMoyenne(moyenne);
    } catch (error) {
      console.error('Erreur de soumission de la note:', error);
    }
  }

  const soumettreCommentaire = async (e) => {
    e.preventDefault();
    const aCommentaires = filmDetails.commentaires ? [...filmDetails.commentaires] : [];
    
    aCommentaires.push({
      commentaire: nouveauCommentaire,
      auteur: nom,
    });

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaires: aCommentaires }),
    };

    try {
      await fetch(urlTuileFilm, options);
      const response = await fetch(urlTuileFilm);
      const updatedFilm = await response.json();
      setFilmDetails(updatedFilm);
      setNouveauCommentaire('');
    } catch (error) {
      console.error('Erreur de soumission du commentaire:', error);
    }
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
  
          <p className="film-detail">
            {`Moyenne des notes: ${noteMoyenne.toFixed(2)}/5` }
          </p>
          <div className="boite-commentaires">
  <p className="film-detail">Commentaires :</p>
  {filmDetails.commentaires && filmDetails.commentaires.length > 0 ? (
    filmDetails.commentaires.map((comment, index) => (
      <div key={index} className="comment-box">
        <p className="film-detail">{comment.commentaire}</p>
      </div>
    ))
  ) : (
    <p className="film-detail">Ce film n'a pas encore de commentaires</p>
  )}
</div>

{context.estLog && (
  <button className='submit-button delete-button' onClick={removeFilm}>Supprimer film</button>
)}
        </div>



      </div>
      
    </article>
  );
}

export default Film;
