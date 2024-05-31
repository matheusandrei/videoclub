import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
  Navigate,
  useLocation,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import {jwtDecode} from "jwt-decode";
import Entete from "../Entete/Entete";
import Accueil from "../Accueil/Accueil";
import ListeFilms from "../ListeFilms/ListeFilms";
import Film from "../Film/Film";
import Admin from "../Admin/Admin";
import Footer from "../Footer/Footer";
import Erreur404 from "../Erreur404/Erreur404";
import "./App.css";

export const AppContext = React.createContext();

function App() {
  // let appState = "DEV";
  let apiBaseURL = "https://four1f-tp1-matheusandrei.onrender.com/";
  // if (appState === "DEV") {
  //   apiBaseURL = "http://localhost:5502/";
  // }
  const location = useLocation();
  // const [estLog, setEstLog]= useState(false);
  const [usager, setUsager] = useState({ estLog: false, user: {} });
  useEffect(()=>{
    const estValide = jetonValide();
    
    const userData={
      estLog: estValide,
      usager: {},
    }

    setUsager(userData);
  },[])
  async function login(e) {
    e.preventDefault();
    const form = e.target;

    const body = {
      courriel: form.courriel.value,
      mdp: form.mdp.value,
    };

    const data = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    const reponse = await fetch(
      `${apiBaseURL}api/utilisateurs/connexion`,
      data
    );
    const token = await reponse.json();

    if(reponse.status == 200){
      const userData={
        estLog: true,
        usager: {},
      }
  
      setUsager(userData);
        //Si la reponse est ok, on enregistre le token
      window.localStorage.setItem("api-film-token", token);
    }else{
      //Si la reponse n'est pas bonne on detruit le token enregistré si connecté
      window.localStorage.removeItem("api-film-token");
    }
  }

  function logout() {
    setUsager({ estLog: false});
    window.localStorage.removeItem("api-film-token");
  }

  function jetonValide(){
try{
  const token = localStorage.getItem("api-film-token");
  const decode = jwtDecode(token);
  //TODO Vérifier si le token existe
  if(Date.now() < decode.exp *1000){
    return true
  }else{
    //On enleve la connexion si on est connecté
    localStorage.removeItem("api-film-token");
    return false ;
  }
}catch(erreur){
  localStorage.removeItem("api-film-token");
  return false;
}
  }
  return (
    <AppContext.Provider value={usager}>
      <Entete handleLogin={login} handleLogout={logout} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" element={<Accueil />} />
          <Route path="/films" element={<ListeFilms />} />
          <Route path="/films/:id" element={<Film />} />
          <Route path="/*" element={<Erreur404 />} />
          <Route
            path="/admin"
            element={usager.estLog ? <Admin /> : <Navigate to="/" />}
          />
        </Routes>
      </AnimatePresence>
      <Footer/>
    </AppContext.Provider>
  );

}
export default App;
