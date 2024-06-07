import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import "./Admin.css";

function Admin() {
  
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]); 

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = {
      titre: form.titre.value,
      genres: genres, 
      description: form.description.value,
      annee: form.annee.value,
      realisation: form.realisation.value,
      titreVignette: form.titreVignette.value,
    };
    const token = `Bearer ${localStorage.getItem("api-film-token")}`;
    const options = {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: token,
      },
      body: JSON.stringify(data),
    };
    const response = await fetch("http://localhost:5502/api/films", options);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      navigate("/films");
    }
  }

  function onChange(e) {
    const boite = e.currentTarget;
    const value = boite.value; 
    if (boite.checked && !genres.includes(value)) {
      setGenres([...genres, value]);
    } else {
      let nouveauArray = genres.filter((element) => {
        return element !== value;
      });
      setGenres(nouveauArray);
    }
  }

  return (
    <main>
      <div className="wrapper">
        <h2>Ajouter un film</h2>
        <form className="admin-form" onSubmit={onSubmit}>
          <div>
            <label>Titre:</label>
            <input type="text" name="titre" />
          </div>
          <div>
            <label>Description:</label>
            <textarea name="description"></textarea>
          </div>
          <div>
            <label>Titre Vignette:</label>
            <input type="text" name="titreVignette" />
          </div>
          <div>
            <label>Réalisation:</label>
            <input type="text" name="realisation" />
          </div>
          <div>
            <label>Année:</label>
            <input type="text" name="annee" />
          </div>
          <div>
            <input type="checkbox" value="action" name="genres" onChange={onChange} />
            <label>Action</label>
          </div>
          <div>
            <input type="checkbox" value="comedy" name="genres" onChange={onChange} />
            <label>Comédie</label>
          </div>
          <div>
            <input type="checkbox" value="drame" name="genres" onChange={onChange} />
            <label>Drame</label>
          </div>

          <div>
           
          </div>
          <button type="submit">Soumettre</button>
        </form>
      </div>
    </main>
  );
}

export default Admin;
