import React from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Styles
const GiftsContainer = styled.section`
  padding: 100px 20px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-size: 3.2rem;
  color: #3e2723;
  font-family: "Playfair Display", serif;
  margin-bottom: 50px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #ffd54f, #3e2723);
    border-radius: 2px;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${({ index }) => index * 0.1}s;
  opacity: 0;
  animation-fill-mode: forwards;

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImageContainer = styled.div`
  width: 100%;
  height: 250px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 1.4rem;
  color: #3e2723;
  margin-bottom: 12px;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  font-size: 1.3rem;
  color: #ffd54f;
  font-weight: 700;
  margin-bottom: 15px;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(to right, #3e2723, #5d4037);
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  max-width: 200px;
  margin: 0 auto;

  &:hover {
    background: linear-gradient(to right, #5d4037, #3e2723);
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    animation: ${pulse} 1.5s infinite;
  }
`;

// Dummy Data
const gifts = [
  {
    id: 1,
    name: "Collier en Or",
    price: "$120",
    image: "/images/vers1 (1).avif",
  },
  {
    id: 2,
    name: "Boucles d'Oreilles",
    price: "$85",
    image: "/images/vers1 (2).avif",
  },
  {
    id: 3,
    name: "Bracelet Élégant",
    price: "$95",
    image: "/images/vers1 (5).avif",
  },
  {
    id: 4,
    name: "Montre de Luxe",
    price: "$250",
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
            
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </GiftsContainer>
  );
};

export default Gifts;