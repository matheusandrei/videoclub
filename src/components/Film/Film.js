import { useState, useEffect, useContext } from "react";
import { AppContext } from "../App/App";
import { useParams } from "react-router-dom";
import "./Film.css";

function Film() {
 
  const context = useContext(AppContext);

  const { id } = useParams();
  const [filmDetails, setFilm] = useState(null);
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
    return <div>film pas trouvé</div>;
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
        // console.log(data);
      });
  }
  async function soumettreCommentaire(e) {
    e.preventDefault();
    let aCommentaires;
    if (!filmDetails.commentaires) {
      aCommentaires = [
        {
          commentaire: "Je suis un commentaire que vous aurez à dinamiser!",
          auteur: context.nom,
        },
      ];
    } else {
      aCommentaires = filmDetails.commentaires;
      aCommentaires.push([
        {
          commentaire: "Je suis un commentaire que vous aurez à dinamiser!",
          auteur: context.nom,
        },
      ]);
    }

    const oOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ commentaire: aCommentaires }),
    };

    let putCommentaire = await fetch(urlTuileFilm, oOptions),
      getFilm = await fetch(urlTuileFilm);

    Promise.all([putCommentaire, getFilm])
      .then((reponse) => reponse[1].json())
      .then((data) => {
        // console.log(data);
      });
  }

  let blockAjoutCommentaire;

  if (context.estLog) {
    blockAjoutCommentaire = (
<form class="comment-form" onSubmit={soumettreCommentaire}>
    <textarea
        name="commentaire"
        placeholder="Ajouter votre commentaire"
        class="comment-textarea"
    ></textarea>
    <button class="submit-button">Soumettre</button>
</form>

    );
  }
  return (
<article class="film-card">
  <h2 class="film-title">{filmDetails?.titre}</h2>
    <img src={`/img/${filmDetails?.titreVignette}`} alt={filmDetails.titre} class="film-img" />
    <div class="film-info">
        
        <p class="film-detail">Réalisateur: <span class="film-data">{filmDetails?.realisation}</span></p>
        <p class="film-detail">Année: <span class="film-data">{filmDetails?.annee}</span></p>
        <p class="film-detail">Notes: <span class="film-data">{filmDetails?.notes}</span></p>
        <button class="note-button" onClick={soumettreNote}>Note</button>
        {blockAjoutCommentaire}
    </div>
</article>

    
  );
}
export default Film;
