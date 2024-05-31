import React from "react";
import "./Filtre.css";

const FILTRES = [
  { label: "Titre alphabétique (A-Z)", orderBy: "titre", orderDirection: "asc" },
  { label: "Titre alphabétique (Z-A)", orderBy: "titre", orderDirection: "desc" },
  { label: "Réalisateur alphabétique (A-Z)", orderBy: "realisation", orderDirection: "asc" },
  { label: "Réalisateur alphabétique (Z-A)", orderBy: "realisation", orderDirection: "desc" },
  { label: "Par année (du plus récent)", orderBy: "annee", orderDirection: "desc" },
  { label: "Par année (du plus ancien)", orderBy: "annee", orderDirection: "asc" }
];

function Filtre({ onChange, filtreActif }) {
  
  
  
    return (
      <ul className="filtre-list">
        {FILTRES.map((filtre, index) => (
          <li
            key={index}
            onClick={() => onChange(filtre)}
            className={filtreActif && filtreActif.label === filtre.label ? 'active' : ''}
          >
            {filtre.label}
          </li>
        ))}
      </ul>
    );
  }
  

export default Filtre;
