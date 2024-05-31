import './Footer.css';

function Footer() {
  
    return (
      <footer className="footer">
        <div className="wrapper">
            <div className="footer-content">
              <div className="footer-section">
                <h3>À propos de nous</h3>
                <p>Rejoignez notre communauté de cinéphiles et découvrez le meilleur du cinéma !</p>
              </div>
              <div className="footer-section">
                <h3>Contact</h3>
                <p>Pie VXIII</p>
                <p>555 5555 5555</p>
                <p>cinestream.com</p>
              </div>
              <div className="footer-section">
                <h3>Réseaux Sociaux</h3>
                <ul className="social-links">
                  <li><a href="#"><i className="fab fa-facebook"></i></a></li>
                  <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                  <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; {new Date().getFullYear()} Cinestream. Tous droits réservés.</p>
            </div>
        </div>
      </footer>
    );
  }


export default Footer;
