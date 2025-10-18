import React, { useState, useEffect, useCallback, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { 
  FiShoppingCart, 
  FiHeart, 
  FiShare2, 
  FiChevronRight,
  FiStar,
  FiArrowLeft
} from 'react-icons/fi';
import { BsStarFill, BsCheckCircle, BsShieldLock } from 'react-icons/bs';
import PropTypes from 'prop-types';

// Styles avec styled-components
const ProductPageContainer = styled(motion.div)`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #666;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: all 0.3s;

  &:hover {
    color: #1976D2;
    transform: translateX(-5px);
  }
`;

// (Conserver tous les styles précédents de ProductPage et y ajouter :)

const MobileActions = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 15px;
  display: flex;
  gap: 10px;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.1);
  z-index: 100;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileActionButton = styled.button`
  flex: 1;
  padding: 15px;
  background: ${props => props.primary ? '#4CAF50' : 'white'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: ${props => props.primary ? 'none' : '1px solid #ddd'};
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const ProductPage = ({ product, onAddToCart }) => {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2]);
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const controls = useAnimation();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleAddToCart = useCallback((e) => {
    e?.stopPropagation();
    setShowNotification(true);
    
    if (onAddToCart) {
      onAddToCart({
        ...product,
        selectedColor,
        selectedSize,
        quantity
      });
    }

    setTimeout(() => {
      setShowNotification(false);
      navigate('/monapp/produitconfirme', {
        state: {
          produit: product,
          date: new Date().toLocaleString()
        }
      });
    }, 1000);
  }, [product, selectedColor, selectedSize, quantity, onAddToCart, navigate]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Animation au scroll
  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    });
  }, [controls]);

  return (
    <ProductPageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={controls}
    >
      <BackButton onClick={() => navigate(-1)}>
        <FiArrowLeft /> Retour
      </BackButton>

      <ProductGrid>
        <div>
          <GalleryContainer>
            <MainImage 
              src={selectedImage} 
              alt={product.name}
              as={motion.img}
              whileHover={!isMobile ? { scale: 1.05 } : {}}
            />
          </GalleryContainer>
          <ThumbnailGrid>
            {product.images.map((img, index) => (
              <Thumbnail
                key={index}
                src={img}
                active={selectedImage === img}
                onClick={() => setSelectedImage(img)}
                alt={`Vue ${index + 1} de ${product.name}`}
                as={motion.img}
                whileHover={{ scale: 1.05 }}
              />
            ))}
          </ThumbnailGrid>
        </div>

        <ProductDetails>
          <div>
            {product.nouveau && <Badge type="new">Nouveau</Badge>}
            {product.solde && <Badge type="discount">-{product.solde}%</Badge>}
          </div>

          <ProductTitle>{product.nom || product.name}</ProductTitle>
          <BrandLink href="#">Marque: {product.brand}</BrandLink>

          <RatingContainer>
            {[...Array(5)].map((_, i) => (
              <Star key={i} filled={i < (product.rating || 4)} />
            ))}
            <ReviewLink href="#">{product.reviews || 128} avis</ReviewLink>
          </RatingContainer>

          <PriceContainer>
            <CurrentPrice>{product.prix || product.price} DH</CurrentPrice>
            {product.ancienPrix && (
              <OldPrice>{product.ancienPrix} DH</OldPrice>
            )}
            {product.solde && (
              <DiscountBadge>Économisez {product.solde}%</DiscountBadge>
            )}
          </PriceContainer>

          <Availability>
            <CheckIcon /> En stock - Prêt à être expédié
          </Availability>

          {product.colors && (
            <ColorSelector>
              <ColorLabel>Couleur: {selectedColor.name}</ColorLabel>
              <ColorOptions>
                {product.colors.map((color, index) => (
                  <ColorOption
                    key={index}
                    color={color.value}
                    active={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                    as={motion.div}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </ColorOptions>
            </ColorSelector>
          )}

          {product.sizes && (
            <SizeSelector>
              <ColorLabel>Taille:</ColorLabel>
              <SizeOptions>
                {product.sizes.map((size, index) => (
                  <SizeOption
                    key={index}
                    active={selectedSize === size}
                    onClick={() => setSelectedSize(size)}
                    as={motion.button}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {size}
                  </SizeOption>
                ))}
              </SizeOptions>
            </SizeSelector>
          )}

          <QuantitySelector>
            <ColorLabel>Quantité:</ColorLabel>
            <QuantityButton 
              onClick={decreaseQuantity}
              as={motion.button}
              whileTap={{ scale: 0.9 }}
            >
              -
            </QuantityButton>
            <QuantityInput
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            />
            <QuantityButton 
              onClick={increaseQuantity}
              as={motion.button}
              whileTap={{ scale: 0.9 }}
            >
              +
            </QuantityButton>
          </QuantitySelector>

          {!isMobile && (
            <ActionButtons>
              <PrimaryButton 
                onClick={handleAddToCart}
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FiShoppingCart size={20} /> Ajouter au panier
              </PrimaryButton>
              <SecondaryButton 
                onClick={() => setIsFavorite(!isFavorite)}
                title={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
                as={motion.button}
                whileTap={{ scale: 0.9 }}
              >
                <FiHeart size={20} color={isFavorite ? "#ff4081" : "#666"} />
              </SecondaryButton>
            </ActionButtons>
          )}

          <DeliveryInfo>
            <InfoItem>
              <InfoIcon><FiChevronRight /></InfoIcon>
              <div>
                <strong>Livraison gratuite</strong>
                <p>Expédié sous 24h - Livraison en 2-3 jours</p>
              </div>
            </InfoItem>
            <InfoItem>
              <InfoIcon><FiChevronRight /></InfoIcon>
              <div>
                <strong>Retour facile</strong>
                <p>30 jours pour changer d'avis</p>
              </div>
            </InfoItem>
            <InfoItem>
              <InfoIcon><BsShieldLock size={18} /></InfoIcon>
              <div>
                <strong>Paiement sécurisé</strong>
                <p>Payez par carte ou à la livraison</p>
              </div>
            </InfoItem>
          </DeliveryInfo>

          <ShareContainer>
            <ShareText>Partager:</ShareText>
            <ShareButton title="Partager sur Facebook">
              <FiShare2 />
            </ShareButton>
          </ShareContainer>
        </ProductDetails>
      </ProductGrid>

      {isMobile && (
        <MobileActions>
          <MobileActionButton onClick={() => setIsFavorite(!isFavorite)}>
            <FiHeart color={isFavorite ? "#ff4081" : "#666"} size={18} />
          </MobileActionButton>
          <MobileActionButton primary onClick={handleAddToCart}>
            <FiShoppingCart size={18} /> Acheter
          </MobileActionButton>
        </MobileActions>
      )}

      <AnimatePresence>
        {showNotification && (
          <FloatingCartNotification
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <BsCheckCircle size={24} />
            Produit ajouté au panier !
          </FloatingCartNotification>
        )}
      </AnimatePresence>
    </ProductPageContainer>
  );
};

ProductPage.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    nom: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    prix: PropTypes.number,
    price: PropTypes.number,
    ancienPrix: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    description: PropTypes.string,
    nouveau: PropTypes.bool,
    solde: PropTypes.number,
    colors: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        value: PropTypes.string
      })
    ),
    sizes: PropTypes.arrayOf(PropTypes.string),
    brand: PropTypes.string
  }).isRequired,
  onAddToCart: PropTypes.func
};

export default memo(ProductPage);