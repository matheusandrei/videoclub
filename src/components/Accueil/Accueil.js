import accueilData from './Accueil.json';
import "./Accueil.css";
function Accueil() {
  return (
<>
  <div className="image-container">
    <img className="hero" src="/img/hero-banner.jpg" alt="hero" />
    <div className="text-overlay">
      {accueilData.map((paragraph, index) => (
        <p className="accueil-p" key={index}>{paragraph}</p>
      ))}
    </div>
  </div>
</>
  );
}

export default Accueil;
