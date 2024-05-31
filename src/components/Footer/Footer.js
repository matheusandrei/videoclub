import React, { Component } from 'react';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        <div class="wrapper">
            <div className="footer-content">
              <div className="footer-section">
                <h3>À propos de nous</h3>
                <p>Présentez brièvement votre vidéoclub et ce qui le rend spécial.</p>
              </div>
              <div className="footer-section">
                <h3>Contact</h3>
                <p>Adresse : Pie VXIII</p>
                <p>Téléphone : 555 5555 5555</p>
                <p>Email : cinestream.com</p>
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
              <p>&copy; {new Date().getFullYear()} Votre cinestream. Tous droits réservés.</p>
            </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
