import accueilData from './Accueil.json';

function Accueil() {
  return (
    <div className="wrapper">
      <main>
        <h2>Accueil</h2>
        {accueilData.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </main>
    </div>
  );
}

export default Accueil;
