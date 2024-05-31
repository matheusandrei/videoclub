import accueilData from './Accueil.json';
import "./Accueil.css";
function Accueil() {
  return (
    <>
    <img className="hero" src="/img/hero-banner.jpg" alt="hero"/>
    <div className="wrapper">
      <main>
        {accueilData.map((paragraph, index) => (
          <p className="accueil-p" key={index}>{paragraph}</p>
        ))}
      </main>
    </div>
    </>
  );
}

export default Accueil;
