import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Film.css";

function Film() {
  const { id } = useParams();
  const [filmDetails, setFilm] = useState(null);
  const urlTuileFilm = `https://four1f-602-partie1.onrender.com/api/films/${id}`;
  useEffect(() => {
    fetch(urlTuileFilm)
      .then((response) => response.json())
      .then((data) => {
        setFilm(data);
  
        // calcule moyenne
        
      });
  
  }, [id, urlTuileFilm]);
  if(!filmDetails){
    return <div>fasdsadasd</div>;
  }
  async function soumettreNote(e) {
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

  return (
    <article>
      <img src={`/img/${filmDetails?.titreVignette}`} alt={filmDetails.titre} />
      <h2>{filmDetails?.titre}</h2>
      <p>Realisateur:{filmDetails?.realisation}</p>
      <p>Annee:{filmDetails?.annee}</p>
      <p>notes:{filmDetails?.notes}</p>
      <button onClick={soumettreNote}>Note</button>
    </article>
  );
}
export default Film;
