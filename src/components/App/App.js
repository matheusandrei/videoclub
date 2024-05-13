import {BrowserRouter as Router,Routes, Route,useParams } from 'react-router-dom'
import Entete from '../Entete/Entete'
import Accueil from '../Accueil/Accueil'
import ListeFilms from '../ListeFilms/ListeFilms'
import Film from '../Film/Film'

import Erreur404 from '../Erreur404/Erreur404'
import './App.css'

function App() {
  return (
    <div >
      <Router>
        <Entete/>
          <Routes>
            <Route path="/" element={<Accueil/>}/>
            <Route path="/liste-films" element={<ListeFilms/>}/>
            <Route path="/film/:id" element={<Film/>}/>
            <Route path="/*" element={<Erreur404/>}/>
          </Routes>
      
      </Router>
    </div>
  );
}

export default App;
