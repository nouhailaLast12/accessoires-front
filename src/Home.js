import React from "react";
import { Link } from "react-router-dom"; // Importation du Link de React Router

const Home = () => {
  return (
    <div
      className="position-relative w-100 vh-100 d-flex flex-column justify-content-center align-items-center text-white"
      style={{
        backgroundImage: "url('/images/accessoires3.jpg')", // Image de fond
        backgroundSize: "cover", // La taille de l'image s'adapte à l'écran
        backgroundPosition: "center", // Centre l'image
        filter: "brightness(70%)", // Rendre l'image plus sombre (optionnel)
      }}
     id="home">
      {/* Overlay sombre pour améliorer la lisibilité du texte */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(243, 32, 32, 0.5)", // Overlay noir semi-transparent
        }}
      ></div>

      {/* Contenu principal */}
      <div className="position-relative text-center" style={{ zIndex: 10 }}>
        <h1 className="display-3 fw-bold mb-4"></h1>
        <p className="lead mb-5" style={{ fontSize: "1.5rem", maxWidth: "800px" }}>
          Explorez notre gamme de produits haut de gamme conçus pour sublimer votre style et répondre à
          vos besoins. Rejoignez-nous dès aujourd'hui et transformez votre quotidien.
        </p>
        <div className="d-flex gap-3 justify-content-center">
          <Link to="/shop">
            <button
              className="btn btn-primary btn-lg px-5 py-3 fw-bold"
              style={{ fontSize: "1.25rem", borderRadius: "30px" }}
            >
              Voir la Boutique
            </button>
          </Link>
          <Link to="/about">
            <button
              className="btn btn-outline-light btn-lg px-5 py-3 fw-bold"
              style={{ fontSize: "1.25rem", borderRadius: "30px" }}
            >
              En savoir plus
            </button>
          </Link>
        </div>
      </div>

      {/* Icônes sociales en bas à gauche */}
      <div
        className="position-absolute bottom-0 start-0 p-4 d-flex gap-3"
        style={{ zIndex: 10 }}
      >
        <a
          href="https://twitter.com/yourprofile"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-twitter fa-2x"></i>
        </a>
        <a
          href="https://facebook.com/yourprofile"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook fa-2x"></i>
        </a>
        <a
          href="https://instagram.com/yourprofile"
          className="text-white"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram fa-2x"></i>
        </a>
      </div>
    </div>
  );
};

export default Home;