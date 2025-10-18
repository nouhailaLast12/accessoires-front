import React, { useState, useEffect } from 'react';
import AccessoireList from './components/AccessoireList';
import Navbar from './components/Navbarr';
import { FiChevronDown, FiSearch, FiHeart, FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiUser, FiInfo } from 'react-icons/fi';
import { motion } from 'framer-motion';
import './styles/AccessoireMariam.css';

const AccessoireMariam = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <div className="accessoire-mariam-container">
      <Navbar scrolled={isScrolled} />

      {/* Hero Section */}
      <motion.header 
        className="am-header"
        style={{ 
          backgroundPositionY: `calc(50% + ${scrollPosition * 0.3}px)`,
          opacity: 1 - scrollPosition / 400
        }}
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <div className="header-overlay">
          <motion.h1 className="glowing-text" whileHover={{ scale: 1.05 }}>
            Collection Mariam
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Accessoires élégants pour toutes occasions
          </motion.p>
          <motion.div 
            className="scroll-indicator"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <FiChevronDown size={24} />
          </motion.div>
        </div>
      </motion.header>

      {/* Search Bar */}
      <motion.div 
        className="search-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Rechercher des accessoires..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <motion.button
              className="clear-btn"
              onClick={() => setSearchQuery('')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              ×
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="main-content">
        {/* Featured Collection */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="section-header">
            <h2>Nos Créations Exclusives</h2>
            <p>Pièces uniques faites avec passion</p>
          </div>
          <AccessoireList searchQuery={searchQuery} />
        </motion.section>

        {/* About Section */}
        <motion.section
          className="about-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <FiInfo size={32} className="section-icon" />
            <h2>À Propos de Mariam Jewelry</h2>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p>
                Fondée en 2015, Mariam Jewelry est née de la passion pour les créations artisanales et les pièces uniques.
                Chaque accessoire est conçu avec soin dans notre atelier parisien, en utilisant des matériaux de qualité.
              </p>
              <p>
                Notre philosophie : allier élégance intemporelle et modernité pour des pièces qui racontent une histoire
                et accompagnent vos moments précieux.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="about-button"
              >
                Découvrir notre histoire
              </motion.button>
            </div>
            <div className="about-image">
              <img 
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                alt="Accessoires Mariam Jewelry"
                loading="lazy"
              />
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          className="contact-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <FiUser size={32} className="section-icon" />
            <h2>Contactez-Nous</h2>
          </div>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Nos Coordonnées</h3>
              <ul>
                <li><FiMail /> contact@mariamjewelry.com</li>
                <li><FiPhone /> +33 6 12 34 56 78</li>
                <li><FiMapPin /> 123 Rue des Bijoux, 75001 Paris</li>
              </ul>
              <h3>Horaires d'Ouverture</h3>
              <p>Lundi - Vendredi : 10h - 19h</p>
              <p>Samedi : 11h - 18h</p>
              <div className="social-links">
                <a href="#" aria-label="Instagram"><FiInstagram size={24} /></a>
                <a href="#" aria-label="Facebook"><FiFacebook size={24} /></a>
              </div>
            </div>
            <div className="contact-form">
              <h3>Envoyez-nous un message</h3>
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Votre email" required />
                </div>
                <div className="form-group">
                  <textarea placeholder="Votre message" rows="5" required></textarea>
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Envoyer le message
                </motion.button>
              </form>
            </div>
          </div>
        </motion.section>

        {/* Newsletter Section */}
        <motion.section
          className="newsletter-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3>Abonnez-vous à notre newsletter</h3>
          <p>Recevez en exclusivité nos nouvelles collections et offres spéciales</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Votre email" required />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              S'abonner
            </motion.button>
          </form>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="am-footer">
        <div className="footer-content">
          <div className="footer-section">
            <h4>Mariam Jewelry</h4>
            <p>Créations artisanales de bijoux uniques et élégants</p>
            <div className="social-icons">
              <a href="#" aria-label="Instagram"><FiInstagram /></a>
              <a href="#" aria-label="Facebook"><FiFacebook /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Liens rapides</h4>
            <ul>
              <li><a href="#">Accueil</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Boutique</a></li>
              <li><a href="#">À propos</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Informations</h4>
            <ul>
              <li><a href="#">Livraison & Retours</a></li>
              <li><a href="#">Paiement sécurisé</a></li>
              <li><a href="#">Conditions générales</a></li>
              <li><a href="#">Politique de confidentialité</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Mariam Jewelry. Tous droits réservés.</p>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <motion.div 
          className="fab"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <FiHeart size={24} />
        </motion.div>
        
        {isScrolled && (
          <motion.div 
            className="fab fab-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ↑
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AccessoireMariam;