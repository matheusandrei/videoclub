import accueilData from './Accueil.json';
import "./Accueil.css";
function Accueil() {
  return (
    <>
    <div class="image-container">
      <img class="hero" src="/img/hero-banner.jpg" alt="hero"/>
    </div>
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
