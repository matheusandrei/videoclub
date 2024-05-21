import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListeFilms from "./ListeFilms";
import TuileFilm from "../TuileFilm/TuileFilm";

describe("Composant ListeFilms", () => {
  // Objet fictif
  const mockFilm = {
    titre: "Alien - Le 8ème passager",
    genres: ["Horreur", "Science-fiction"],
    description:
      "Un vaisseau spatial perçoit une transmission non-identifiée comme un signal de détresse...",
    titreVignette: "alienle8emepassager.jpg",
    realisation: "Ridley Scott",
    annee: 1979,
    notes: [3, 4, 5, 2, 1],
    commentaires: [
      { commentaire: "Commentaire 1", auteur: "admin" },
      { commentaire: "Commentaire 2", auteur: "admin" },
    ],
  };



  test("Vérifie la présence du titre", () => {
    render(<ListeFilms />);
    const regTitre = new RegExp("ListE des films", "i");
    const queryTitre = screen.getByText(regTitre);

    expect(queryTitre).toBeTruthy();
    expect(queryTitre).not.toBeFalsy();
    expect(queryTitre).toBeVisible();
    expect(screen.getByTestId("titre")).toHaveTextContent(regTitre);
  });

  test("Vérifie le click sur le titre", () => {
    render(<ListeFilms />);

    const elTitre = screen.getByTestId("titre");
    fireEvent.click(elTitre);
    expect(screen.getByText(/Test/i)).toBeInTheDocument();
  });




//   test("Vérifie la tuile d'un film", () => {
//     render(<TuileFilm data={mockFilm} id="1" />);
//     const elTuileFilm = screen.getByTestId("tuile-film-1");
    
//     expect(elTuileFilm).toContainHTML("img");
//     expect(elTuileFilm).toContainHTML("h2");
//     expect(elTuileFilm).toContainHTML("h3");
  
//     const elImg = elTuileFilm.querySelector("img");
  
//     expect(elImg).toHaveAttribute("src", `/img/${mockFilm.titreVignette}`);
//     expect(screen.getByText(new RegExp(mockFilm.titre, "i"))).toBeInTheDocument();
//   });
  


  
//   test("Vérifie si les clés sont présentes dans la réponse", async () => {
//     const reponse = await fetch("https://four1f-tp1-matheusandrei.onrender.com/films");
//       const data = await reponse.json();
  
//       await waitFor(() => {
//         data.forEach((film) => {
//           expect(film).toHaveProperty("titre");
//           expect(film).toHaveProperty("genres");
//           expect(film).toHaveProperty("description");
//           expect(film).toHaveProperty("titreVignette");
//           expect(film).toHaveProperty("realisation");
//           expect(film).toHaveProperty("annee");
//         });
//     });
//   });
});
