import {useContext, useRef} from 'react';
import { AppContext } from '../App/App';
import { NavLink } from "react-router-dom";
import "./Entete.css";
function Entete(props) {
const context = useContext(AppContext)
// console.log(props);
  return (
    <div className="wrapper entete">
      <header >
        <NavLink to="/">
          <h1>Accueil</h1>
        </NavLink>
        <nav>
        {context.estLog ? <NavLink to='admin'>Admin</NavLink>:''}
          <NavLink to="films">Liste des films </NavLink>
        </nav>
        <form onSubmit={props.handleLogin}>
          {/* <input ref={elUsager} type="text" name="usager" placeholder="Usager"></input> */}
           <input type="text" name="usager" placeholder="Usager"></input> 
          <button>Login</button>
        </form>
      </header>
    </div>
  );
}

export default Entete;
