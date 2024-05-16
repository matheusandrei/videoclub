import {BrowserRouter as Router,Routes, Route,useParams, Navigate } from 'react-router-dom'
import React, { useState } from 'react'
import Entete from '../Entete/Entete'
import Accueil from '../Accueil/Accueil'
import ListeFilms from '../ListeFilms/ListeFilms'
import Film from '../Film/Film'
import Admin from '../Admin/Admin'
import Erreur404 from '../Erreur404/Erreur404'
import './App.css'

export const AppContext = React.createContext();

function App() {

  // const [estLog, setEstLog]= useState(false);
  const [usager,setUsager] = useState({estLog:false,nom:''});

  function login(e){
    e.preventDefault();
    let usager = (e.target.usager.value);
    if(usager =="admin"){
      // usager.setUsager(true);
      setUsager(prevUsager => ({...prevUsager,estLog:true,nom:usager}))
      e.target.reset();
    }
  }
  return (
    <AppContext.Provider value={usager} >
      <Router>
        <Entete handleLogin={login}/>
          <Routes>
            <Route path="/" element={<Accueil/>}/>
            <Route path="/films" element={<ListeFilms/>}/>
            <Route path="/films/:id" element={<Film/>}/>
            <Route path="/*" element={<Erreur404/>}/>
            <Route path="/admin" element={usager.estLog ? <Admin/> : <Navigate to="/" />} />
          </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
