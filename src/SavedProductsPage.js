import React from "react";
import styled, { keyframes } from "styled-components";
import { useLocation } from "react-router-dom";

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
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const SavedContainer = styled.div`
  padding: 80px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  font-family: "Rajdhani", sans-serif;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-family: "Audiowide", cursive;
  margin-bottom: 40px;
  text-align: center;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c, #ffec3d, #4dffb8, #4da6ff, #9d4dff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${rainbow} 15s ease infinite;
  text-transform: uppercase;
  letter-spacing: 3px;
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
  padding-bottom: 20px;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
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

const ProductTitle = styled.h3`
  font-size: 1.3rem;
  color: #fff;
  font-weight: 600;
  margin: 20px 0 10px;
  padding: 0 20px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const Price = styled.p`
  font-size: 1.5rem;
  color: #ffec3d;
  font-weight: 700;
  margin: 0;
  padding: 0 20px;
  text-shadow: 0 0 10px rgba(255, 236, 61, 0.3);
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SavedProductsPage = () => {
  const location = useLocation();
  const savedProducts = location.state?.savedProducts || [];

  return (
    <SavedContainer>
      <Title>Mes Favoris</Title>
      
      {savedProducts.length > 0 ? (
        <ProductGrid>
          {savedProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage>
                <ProductImageElement 
                  src={product.image} 
                  alt={product.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/placeholder.jpg";
                  }}
                />
              </ProductImage>
              <ProductTitle>{product.title}</ProductTitle>
              <Price>{product.price} €</Price>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <EmptyState>
          <p>Aucun produit sauvegardé pour le moment.</p>
        </EmptyState>
      )}
    </SavedContainer>
  );
};

export default SavedProductsPage;