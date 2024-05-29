import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ListeFilms.css";
import TuileFilm from "../TuileFilm/TuileFilm";
import Filtre from "../Filtre/Filtre";

function ListeFilms() {
  const urlListeFilms = "https://four1f-tp1-matheusandrei.onrender.com/api/films";
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
  const [listeFilms, setListeFilms] = useState([]);
  const [estCharge, setEstCharge] = useState(false);
  const [filtreActif, setFiltreActif] = useState(null);

  useEffect(() => {
    fetch(urlFiltre)
      .then((response) => response.json())
      .then((data) => {
        setListeFilms(data);
        setEstCharge(true);
      });
  }, [urlFiltre]);

  const tuilesFilm = listeFilms.map((film, index) => (
    <Link key={index} to={`/films/${film.id}`}>
      <TuileFilm data={film} id={index} filtreActif={filtreActif} />
    </Link>
  ));

  const handleFiltreChange = (filtre) => {
    setFiltreActif(filtre);
    setUrlFiltre(`${urlListeFilms}?orderBy=${filtre.orderBy}&orderDirection=${filtre.orderDirection}`);
  };

  const transition = { duration: 1, ease: "easeInOut" };
  const animeBasVersHaut = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition },
    exit: { opacity: 0, y: 25, transition },
  };

  return (
    <main>
      <div className="wrapper">
        <Filtre onChange={handleFiltreChange} />
       
        <h2 data-testid="titre">Liste des films</h2>
        {estCharge ? (
          <motion.div
            key="films"
            className="catalogue"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animeBasVersHaut}
          >
            {tuilesFilm}
          </motion.div>
        ) : (
          <div className="loader"></div>
        )}
      </div>
    </main>
  );
}

export default ListeFilms;
