import { NavLink } from "react-router-dom";
import "./Entete.css";
function Entete() {
  return (
    <div className="wrapper">
      <header >
        <NavLink to="/">
          <h1>Accueil</h1>
        </NavLink>
        <nav>
          <NavLink to="liste-films">Liste des films </NavLink>
        </nav>
      </header>
    </div>
  );
}

export default Entete;
