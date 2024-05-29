import {useContext, useRef} from 'react';
import { AppContext } from '../App/App';
import { NavLink } from "react-router-dom";
import "./Entete.css";
function Entete(props) {
const context = useContext(AppContext)
// console.log(props);
return (
  //TODO Ajouter l'etat de connexion
  <header>
    <div className="wrapper">
      <div className="entete">
        <NavLink to="/">
          <img className="logo" src="/img/logo-cinestream.png" alt="logo"/>
        </NavLink>
        <nav>
          {context.estLog && <NavLink to='admin'>Admin</NavLink>}
          <NavLink to="films">Liste des films</NavLink>
        </nav>
        {context.estLog ? (
        <div className="logout">
          <span>{context.nom}</span>
          <button onClick={props.handleLogout}>Logout</button>
        </div>
      ) : (
        <form className="entete-form" onSubmit={props.handleLogin}>
          <input type="text" name="courriel" placeholder="Usager" />
          <input type="password" name="mdp" placeholder="Mot de passe" />
          <button>Login</button>
        </form>
      )}
      </div>


    </div>
</header>
);
}

export default Entete;
