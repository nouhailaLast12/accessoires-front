import React from "react";
import styled, { keyframes } from "styled-components";

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
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles - Reordered to fix the reference error
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
`;

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, #ff4da6 0%, #4da6ff 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s;
  width: 100%;
  max-width: 220px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(77, 166, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
  animation: ${pulse} 3s infinite;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(77, 166, 255, 0.5);
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

const ProductImageContainer = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  position: relative;
`;

const ProductCard = styled.div`
  background: rgba(30, 30, 60, 0.7);
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${({ index }) => index * 0.1}s;
  animation-fill-mode: forwards;
  opacity: 0;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
    
    ${ProductImage} {
      transform: scale(1.1);
    }
    
    ${AddToCartButton} {
      background-position: right center;
    }
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const ProductPrice = styled.p`
  font-size: 1.8rem;
  color: #ffec3d;
  font-weight: 700;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(255, 236, 61, 0.3);
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h2`
  font-size: 3.5rem;
  font-family: "Audiowide", cursive;
  margin-bottom: 50px;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c, #ffec3d, #4dffb8, #4da6ff, #9d4dff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${rainbow} 15s ease infinite;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  display: inline-block;
  padding: 0 20px;

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

const GiftsContainer = styled.section`
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  position: relative;
  overflow: hidden;
  font-family: "Rajdhani", sans-serif;
`;

// Dummy Data
const gifts = [
  {
    id: 1,
    name: "Collier en Or",
    price: "599€",
    image: "/images/vers1 (1).avif",
  },
  {
    id: 2,
    name: "Boucles d'Oreilles",
    price: "349€",
    image: "/images/vers1 (2).avif",
  },
  {
    id: 3,
    name: "Bracelet Élégant",
    price: "499€",
    image: "/images/vers1 (5).avif",
  },
  {
    id: 4,
    name: "Montre de Luxe",
    price: "1999€",
    image: "/images/vers1 (4).avif",
  },
];

// Component
const Gifts = () => {
  return (
    <GiftsContainer id="gifts">
      <Title>Cadeaux Exclusifs</Title>
      <ProductGrid>
        {gifts.map((gift, index) => (
          <ProductCard key={gift.id} index={index}>
            <ProductImageContainer>
              <ProductImage 
                src={gift.image} 
                alt={gift.name}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
            </ProductImageContainer>
            <ProductInfo>
              <ProductName>{gift.name}</ProductName>
              <ProductPrice>{gift.price}</ProductPrice>
              <AddToCartButton>Ajouter au panier</AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </GiftsContainer>
  );
};

export default Gifts;