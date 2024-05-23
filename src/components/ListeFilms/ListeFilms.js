import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from 'framer-motion'
import "./ListeFilms.css";
import TuileFilm from "../TuileFilm/TuileFilm";

function ListeFilms() {

  const urlListeFilms =
    "https://four1f-tp1-matheusandrei.onrender.com/films";
  const [urlFiltre, setUrlFiltre] = useState(urlListeFilms);
  const [listeFilms, setListeFilms] = useState([]);
  const [estCharge,setEstCharge] = useState(false)
  useEffect(() => {
    fetch(urlFiltre)
      .then((response) => response.json())
      .then((data) => {
        setListeFilms(data);
        setEstCharge(true);
      });
  }, [urlFiltre]);

  const tuilesFilm = listeFilms.map((film, index) => {
    return (
      <Link key={index} to={`/films/${film.id}`}>
        <TuileFilm data={film} id={index} />
      </Link>
    );
  });
/**
 * 
 * @param {Object} e 
 */
  function filtres(e){
    // console.log(e.target);
    setUrlFiltre(`${urlListeFilms}?limit=2&orderBy=annee&orderDirection=desc`);

  }
  function testJest(e){
    e.target.textContent = 'test';
  }

const transition = {duration:1, ease:'easeInOut'}

const animeBasVersHaut={
  hidden:{ opacity:0, y:25 },
  visible:{ opacity:1,y:0, transition},
  exit:{ opacity:0, y:25,transition }
}
const animeGaucheVersDroit={
  hidden:{ opacity:0, x:-25 },
  visible:{ opacity:1,y:0, transition},
  exit:{ opacity:0, x:-25,transition }
}
  return (
    <main>
     
      <div className="wrapper">
        <ul>
          <li onClick={(e)=>{filtres(e)}}>Realisateur alphabetique</li>
          <li></li>
          <li></li>
        </ul>
        <h2 data-testid="titre" onClick={testJest}>Liste des films</h2>
        { estCharge?
        <motion.div 
        key='films'
        className="catalogue"
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={animeBasVersHaut}
        >
          {tuilesFilm}
        </motion.div>
        :''}
      </div>
    </main>
  );
}

export default ListeFilms;
