import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Animations
const neonGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073; }
  50% { text-shadow: 0 0 5px #fff, 0 0 10px #ff4da6, 0 0 15px #ff4da6, 0 0 20px #ff4da6; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const SaveContainer = styled.div`
  padding: 80px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  font-family: "Rajdhani", sans-serif;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-family: "Audiowide", cursive;
  margin-bottom: 40px;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c, #ffec3d, #4dffb8, #4da6ff, #9d4dff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${rainbow} 15s ease infinite;
  text-transform: uppercase;
  letter-spacing: 3px;
  text-align: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, #ff4da6, #4da6ff);
    border-radius: 2px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: rgba(30, 30, 60, 0.7);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 300px;
  overflow: hidden;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
  font-size: 24px;
  color: ${props => props.$isSaved ? "#ff4d4d" : "rgba(255, 255, 255, 0.7)"};
  animation: ${props => props.$justSaved ? pulse : "none"} 0.5s ease;
  backdrop-filter: blur(5px);

  &:hover {
    color: #ff4d4d;
    transform: scale(1.2);
    background: rgba(0, 0, 0, 0.7);
  }
`;

const ProductImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Price = styled.p`
  font-size: 1.8rem;
  color: #ffec3d;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 236, 61, 0.3);
`;

const ViewFavoritesButton = styled.button`
  background: linear-gradient(135deg, #ff4da6 0%, #4da6ff 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s;
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 auto 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(77, 166, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
  animation: ${pulse} 3s infinite;

  &:hover {
    background-position: right center;
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(77, 166, 255, 0.5);
  }

  &::before {
    content: "❤️";
    font-size: 1.4rem;
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::after {
    left: 100%;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  animation: ${fadeIn} 0.6s ease-out;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
`;

// Initial products data
const initialProducts = [
  {
    id: 1,
    title: 'Collier en Diamant',
    image: '/images/team2.jpg',
    price: '599.99',
  },
  {
    id: 2,
    title: 'Bague en Or',
    image: '/images/team3.jpg',
    price: '349.99',
  },
  {
    id: 3,
    title: 'Bracelet en Argent',
    image: '/images/team1.jpg',
    price: '199.99',
  },
  {
    id: 4,
    title: 'Montre de Luxe',
    image: '/images/team4.jpg',
    price: '1299.99',
  },
  {
    id: 5,
    title: 'Boucles en Platine',
    image: '/images/team5.jpg',
    price: '249.99',
  },
  {
    id: 6,
    title: 'Pendentif Émeraude',
    image: '/images/team6.jpg',
    price: '899.99',
  },
];

const SavePage = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [recentlySaved, setRecentlySaved] = useState(null);
  const navigate = useNavigate();

  const handleSave = (product) => {
    const isAlreadySaved = savedProducts.some((item) => item.id === product.id);
    
    if (isAlreadySaved) {
      setSavedProducts(savedProducts.filter((item) => item.id !== product.id));
    } else {
      setSavedProducts([...savedProducts, product]);
      setRecentlySaved(product.id);
      setTimeout(() => setRecentlySaved(null), 1000);
    }
  };

  const navigateToSavedProducts = () => {
    navigate("/saved-products", { state: { savedProducts } });
  };

  useEffect(() => {
    // Load saved products from localStorage if needed
    const saved = localStorage.getItem('savedProducts');
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage when savedProducts changes
    localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
  }, [savedProducts]);

  return (
    <SaveContainer id="save">
      <Title>Mes Favoris</Title>
      
      <ViewFavoritesButton onClick={navigateToSavedProducts}>
        Voir mes favoris ({savedProducts.length})
      </ViewFavoritesButton>
      
      {initialProducts.length > 0 ? (
        <ProductGrid>
          {initialProducts.map((product) => {
            const isSaved = savedProducts.some((item) => item.id === product.id);
            const justSaved = recentlySaved === product.id;

            return (
              <ProductCard key={product.id}>
                <ProductImage>
                  <HeartIcon
                    $isSaved={isSaved}
                    $justSaved={justSaved}
                    onClick={() => handleSave(product)}
                  >
                    {isSaved ? "❤️" : "🤍"}
                  </HeartIcon>
                  <ProductImageElement 
                    src={product.image} 
                    alt={product.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                </ProductImage>
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <Price>{product.price} €</Price>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductGrid>
      ) : (
        <EmptyState>
          <p>Aucun produit sauvegardé pour le moment.</p>
        </EmptyState>
      )}
    </SaveContainer>
  );
};

export default SavePage;