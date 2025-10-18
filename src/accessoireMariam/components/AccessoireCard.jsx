import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { FiHeart, FiShoppingCart, FiEye, FiStar } from 'react-icons/fi';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import PropTypes from 'prop-types';
import '../styles/AccessoireCard.css';

const AccessoireCard = ({ accessoire, onAddToCart, layout = 'vertical' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const controls = useAnimation();
  const navigate = useNavigate(); // ✅ Hook pour navigation

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isHovered && !isMobile) {
      controls.start("hover");
    } else {
      controls.start("initial");
    }
  }, [isHovered, controls, isMobile]);

  const handleLike = useCallback((e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  }, [isLiked]);

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation();
    setIsInCart(true);
    if (onAddToCart) onAddToCart(accessoire);

    setTimeout(() => {
      setIsInCart(false);
      navigate('/confirmation', { state: { produit: accessoire } }); // ✅ Redirection
    }, 500);
  }, [accessoire, onAddToCart, navigate]);

  const toggleQuickView = useCallback((e) => {
    e?.stopPropagation();
    setShowQuickView(prev => !prev);
  }, []);

  const cardVariants = {
    initial: { y: 0, scale: 1 },
    hover: { y: -10, scale: 1.03 }
  };

  const imageVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 }
  };

  const buttonVariants = {
    initial: { y: 20, opacity: 0 },
    hover: { y: 0, opacity: 1 }
  };

  const quickViewVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const hoverHandlers = !isMobile ? {
    onHoverStart: () => setIsHovered(true),
    onHoverEnd: () => setIsHovered(false)
  } : {};

  return (
    <motion.div
      className={`accessoire-card ${layout}-layout`}
      initial="initial"
      animate={controls}
      variants={cardVariants}
      whileTap={{ scale: 0.98 }}
      {...hoverHandlers}
      aria-label={`Product card for ${accessoire.nom}`}
    >
      <div className="card-image-container">
        {!imageLoaded && <div className="image-placeholder" />}
        <motion.img
          src={accessoire.image}
          alt={accessoire.nom}
          className={`accessoire-image ${imageLoaded ? 'loaded' : ''}`}
          variants={imageVariants}
          transition={{ duration: 0.3 }}
          onLoad={() => setImageLoaded(true)}
          loading="lazy"
        />

        <div className="badges-container">
          {accessoire.nouveau && (
            <div className="badge-new" aria-label="New product">Nouveau</div>
          )}
          {accessoire.solde && (
            <div className="badge-sale" aria-label={`On sale: ${accessoire.solde}% off`}>
              -{accessoire.solde}%
            </div>
          )}
        </div>

        <motion.div 
          className="quick-actions"
          initial="initial"
          animate={isHovered || isMobile ? "hover" : "initial"}
        >
          <motion.button
            variants={buttonVariants}
            transition={{ delay: 0.1 }}
            onClick={handleLike}
            className={`like-btn ${isLiked ? 'liked' : ''}`}
            aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isLiked ? <FaHeart /> : <FiHeart />}
          </motion.button>

          <motion.button
            variants={buttonVariants}
            transition={{ delay: 0.2 }}
            onClick={toggleQuickView}
            className="quick-view-btn"
            aria-label="Quick view"
          >
            <FiEye />
          </motion.button>

          <motion.button
            variants={buttonVariants}
            transition={{ delay: 0.3 }}
            onClick={handleAddToCart}
            className={`cart-btn ${isInCart ? 'in-cart' : ''}`}
            aria-label="Add to cart"
          >
            {isInCart ? <FaShoppingCart /> : <FiShoppingCart />}
          </motion.button>
        </motion.div>
      </div>

      <div className="accessoire-info">
        <div className="info-header">
          <h3 className="product-title">{accessoire.nom}</h3>
          <div className="price-container">
            {accessoire.ancienPrix && (
              <span className="old-price">{accessoire.ancienPrix} €</span>
            )}
            <span className={`price ${accessoire.ancienPrix ? 'sale-price' : ''}`}>
              {accessoire.prix} €
            </span>
          </div>
        </div>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <FiStar key={i} className={`star ${i < accessoire.rating ? 'filled' : ''}`} />
          ))}
          <span className="reviews-count">({accessoire.reviews})</span>
        </div>

        <p className="description">{accessoire.description}</p>

        <motion.div 
          className="actions"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered || isMobile ? 1 : 0.7 }}
        >
          <Link to={`/accessoire/${accessoire.id}`} className="detail-link">
            Voir détails
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {showQuickView && (
          <motion.div 
            className="quick-view-modal"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={quickViewVariants}
          >
            <div className="modal-content">
              <button className="close-btn" onClick={toggleQuickView}>&times;</button>
              <h3>{accessoire.nom}</h3>
              <img src={accessoire.image} alt={accessoire.nom} className="modal-image" />
              <div className="modal-price">
                {accessoire.ancienPrix && <span className="old-price">{accessoire.ancienPrix} €</span>}
                <span className={`price ${accessoire.ancienPrix ? 'sale-price' : ''}`}>
                  {accessoire.prix} €
                </span>
              </div>
              <div className="modal-actions">
                <button onClick={handleAddToCart} className="add-to-cart-btn">
                  <FiShoppingCart /> Ajouter au panier
                </button>
                <Link to={`/accessoire/${accessoire.id}`} className="full-details-link" onClick={toggleQuickView}>
                  Voir détails complets
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isInCart && (
          <motion.div
            className="cart-notification"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            Produit ajouté au panier !
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

AccessoireCard.propTypes = {
  accessoire: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nom: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    prix: PropTypes.number.isRequired,
    ancienPrix: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    description: PropTypes.string,
    nouveau: PropTypes.bool,
    solde: PropTypes.number
  }).isRequired,
  onAddToCart: PropTypes.func,
  layout: PropTypes.oneOf(['vertical', 'horizontal'])
};

export default memo(AccessoireCard);
