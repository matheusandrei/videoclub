import accueilData from './Accueil.json';

function Accueil() {
  return (
    <div>
      <h2>Accueil</h2>
      {accueilData.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

export default Accueil;
