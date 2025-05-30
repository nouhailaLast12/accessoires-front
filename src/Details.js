import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowLeft, FaShoppingCart, FaPlus, FaMinus } from 'react-icons/fa';

// Styles
const DetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px;
  background-color: #fafafa;
  min-height: 100vh;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
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
  max-height: 500px;
  object-fit: contain;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductInfo = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const ProductTitle = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
`;

const PriceContainer = styled.div`
  margin: 20px 0;
`;

const CurrentPrice = styled.span`
  font-size: 28px;
  font-weight: bold;
  color: #27ae60;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.6;
  color: #555;
  margin: 25px 0;
`;

const AddToCartButton = styled.button`
  background-color: #27ae60;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: background-color 0.2s;
  margin-top: 20px;

  &:hover {
    background-color: #219653;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 20px 0;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.div`
  color: #ff4444;
  padding: 20px;
  text-align: center;
  font-size: 18px;
`;

const LoadingMessage = styled.div`
  padding: 50px;
  text-align: center;
  font-size: 18px;
`;

// Données simulées (à remplacer par votre API réelle)
const mockProducts = {
  '1': {
    id: 1,
    title: "Sac Chanel Classic Flap",
    price: 6800,
    description: "Le sac iconique Chanel en cuir de agneau matelassé avec fermoir en métal doré. Dimensions: 25 × 16 × 7 cm. Chaîne en métal doré pour porté épaule ou bandoulière.",
    image: "/images/chanel1.jpg"
  },
  '2': {
    id: 2,
    title: "Ceinture Gucci GG Marmont",
    price: 450,
    description: "Ceinture en cuir avec boucle GG Marmont en métal doré. Largeur: 3 cm. Taille ajustable. Matériau: Cuir de veau.",
    image: "/images/gucci1.jpg"
  }
};

const Details = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
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
    // Ici vous pourriez ajouter la logique pour le panier
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return <LoadingMessage>Chargement du produit...</LoadingMessage>;
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
            <span>{quantity}</span>
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