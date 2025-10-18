import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft, FaShoppingCart, FaPlus, FaMinus, FaStar } from 'react-icons/fa';

// Animations (comme dans votre navbar)
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styles
const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  color: white;
  animation: ${fadeIn} 0.5s ease-out;
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: white;
  margin-bottom: 20px;
  padding: 12px 24px;
  border-radius: 50px;
  transition: all 0.3s ease;
  font-family: "Rajdhani", sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }

  svg {
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: translateX(-5px);
  }
`;

const ProductDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const MainImage = styled.img`
  width: 100%;
  max-height: 600px;
  object-fit: contain;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.5s ease;
  backdrop-filter: blur(5px);

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.7);
  }
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 30px;
  background: rgba(20, 20, 40, 0.7);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
`;

const ProductTitle = styled.h1`
  font-size: 32px;
  color: #ffd54f;
  margin-bottom: 15px;
  font-family: "Playfair Display", serif;
  font-weight: 700;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(255, 213, 79, 0.3);
`;

const PriceContainer = styled.div`
  margin: 25px 0;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CurrentPrice = styled.span`
  font-size: 32px;
  font-weight: bold;
  color: #ff4da6;
  font-family: "Rajdhani", sans-serif;
  text-shadow: 0 0 10px rgba(255, 77, 166, 0.3);
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  margin: 30px 0;
  font-family: "Lato", sans-serif;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(45deg, #ff4da6, #4da6ff);
  color: white;
  border: none;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: bold;
  border-radius: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 15px;
  transition: all 0.3s ease;
  margin-top: 30px;
  font-family: "Rajdhani", sans-serif;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 5px 20px rgba(77, 166, 255, 0.3);
  position: relative;
  overflow: hidden;
  animation: ${pulse} 3s infinite;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 77, 166, 0.5);
  }

  &:active {
    transform: translateY(0);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: all 0.5s ease;
  }

  &:hover::before {
    left: 100%;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 30px 0;
`;

const QuantityButton = styled.button`
  width: 45px;
  height: 45px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  font-size: 20px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const QuantityValue = styled.span`
  font-size: 20px;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
  color: white;
  font-family: "Rajdhani", sans-serif;
`;

const ErrorMessage = styled.div`
  color: #ff5252;
  padding: 30px;
  text-align: center;
  font-size: 20px;
  font-family: "Rajdhani", sans-serif;
  background: rgba(20, 20, 40, 0.7);
  border-radius: 10px;
  margin: 20px 0;
`;

const LoadingMessage = styled.div`
  padding: 50px;
  text-align: center;
  font-size: 20px;
  color: white;
  font-family: "Rajdhani", sans-serif;
  background: rgba(20, 20, 40, 0.7);
  border-radius: 10px;
  margin: 20px 0;
`;

const StarDecoration = styled(FaStar)`
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
  font-size: 8px;
  animation: ${spin} 20s linear infinite;
  pointer-events: none;
`;

// Données simulées
const mockProducts = {
  '1': {
    id: 1,
    title: "Sac Chanel Classic Flap",
    price: 6800,
    description: "Le sac iconique Chanel en cuir de agneau matelassé avec fermoir en métal doré. Dimensions: 25 × 16 × 7 cm. Chaîne en métal doré pour porté épaule ou bandoulière.",
    image: "https://images.unsplash.com/photo-1591348122449-02525d70379b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
  },
  '2': {
    id: 2,
    title: "Ceinture Gucci GG Marmont",
    price: 450,
    description: "Ceinture en cuir avec boucle GG Marmont en métal doré. Largeur: 3 cm. Taille ajustable. Matériau: Cuir de veau.",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80"
  }
};

const Details = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Créer des étoiles décoratives comme dans la navbar
    const newStars = [];
    for (let i = 0; i < 15; i++) {
      newStars.push({
        id: i,
        top: Math.random() * 100,
        left: Math.random() * 100,
        size: Math.random() * 5 + 3,
        duration: Math.random() * 30 + 10
      });
    }
    setStars(newStars);

    if (!productId) {
      setError("ID produit non spécifié");
      setLoading(false);
      return;
    }

    // Simulation de chargement asynchrone
    const timer = setTimeout(() => {
      try {
        const foundProduct = mockProducts[productId];
        
        if (!foundProduct) {
          throw new Error(`Produit avec l'ID ${productId} non trouvé`);
        }
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [productId]);

  const handleAddToCart = () => {
    alert(`${quantity} ${product.title} ajouté(s) au panier\nTotal: ${(quantity * product.price).toFixed(2)}€`);
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <DetailContainer>
        <LoadingMessage>Chargement du produit...</LoadingMessage>
      </DetailContainer>
    );
  }

  if (error) {
    return (
      <DetailContainer>
        <ErrorMessage>{error}</ErrorMessage>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour aux produits
        </BackButton>
      </DetailContainer>
    );
  }

  if (!product) {
    return (
      <DetailContainer>
        <ErrorMessage>Produit non disponible</ErrorMessage>
        <BackButton onClick={() => navigate(-1)}>
          <FaArrowLeft /> Retour aux produits
        </BackButton>
      </DetailContainer>
    );
  }

  return (
    <DetailContainer>
      {stars.map(star => (
        <StarDecoration 
          key={star.id}
          style={{
            top: `${star.top}%`,
            left: `${star.left}%`,
            fontSize: `${star.size}px`,
            animationDuration: `${star.duration}s`
          }}
        />
      ))}

      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft /> Retour aux produits
      </BackButton>

      <ProductDetailWrapper>
        <ImageContainer>
          <MainImage 
            src={product.image} 
            alt={product.title}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/500x500?text=Image+Non+Disponible';
            }}
          />
        </ImageContainer>

        <ProductInfo>
          <ProductTitle>{product.title}</ProductTitle>
          
          <PriceContainer>
            <CurrentPrice>{product.price.toFixed(2)}€</CurrentPrice>
          </PriceContainer>

          <Description>{product.description}</Description>

          <QuantitySelector>
            <span>Quantité :</span>
            <QuantityButton onClick={decreaseQuantity}>
              <FaMinus />
            </QuantityButton>
            <QuantityValue>{quantity}</QuantityValue>
            <QuantityButton onClick={increaseQuantity}>
              <FaPlus />
            </QuantityButton>
          </QuantitySelector>

          <AddToCartButton onClick={handleAddToCart}>
            <FaShoppingCart /> Ajouter au panier
          </AddToCartButton>
        </ProductInfo>
      </ProductDetailWrapper>
    </DetailContainer>
  );
};

export default Details;