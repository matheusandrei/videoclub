import "./TuileFilm.css";
function TuileFilm(props) {



  return (
    <article className="tuile-film" data-testid={`tuile-film${props.id}`}>
    <img src={`/img/${props.data.titreVignette}`} alt={props.data.titre} />
    <div className="info">
      <h2>{props.data.titre}</h2>
      <p>Réalisateur: {props.data.realisation}</p>
      <p>Année: {props.data.annee}</p>
    </div>
  </article>
  
  );
}

export default TuileFilm;
