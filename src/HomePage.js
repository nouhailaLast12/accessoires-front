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
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const ShopContainer = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: #fff;
  padding: 80px 20px;
  min-height: 100vh;
  font-family: "Rajdhani", sans-serif;
`;

const ShopHeader = styled.div`
  margin-bottom: 60px;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out;
`;

const ShopTitle = styled.h1`
  font-size: 4rem;
  font-family: "Audiowide", cursive;
  margin-bottom: 20px;
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

const ShopSubtitle = styled.p`
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
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

const ProductImageContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow: hidden;
  position: relative;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);
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
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: 700;
  color: #ffec3d;
  text-shadow: 0 0 10px rgba(255, 236, 61, 0.3);
`;

const OldPrice = styled.span`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.5);
  text-decoration: line-through;
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

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;

const Spinner = styled.div`
  width: 60px;
  height: 60px;
  border: 5px solid rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  border-top-color: #ff4da6;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        const mockProducts = [
          {
            id: 1,
            title: "Collier en Or 24K",
            price: 599.99,
            oldPrice: 799.99,
            image: "/images/jewelry1.jpg"
          },
          {
            id: 2,
            title: "Bague Diamant Solitaire",
            price: 1299.99,
            oldPrice: 1599.99,
            image: "/images/team6.jpg"
          },
          {
            id: 3,
            title: "Boucles d'Oreilles Saphir",
            price: 349.99,
            oldPrice: 449.99,
            image: "/images/jewelry3.jpg"
          },
          {
            id: 4,
            title: "Bracelet Perles Rare",
            price: 499.99,
            oldPrice: 599.99,
            image: "/images/jewelry4.jpg"
          },
          {
            id: 5,
            title: "Montre Luxe Édition Limitée",
            price: 1999.99,
            oldPrice: 2499.99,
            image: "/images/jewelry5.jpg"
          },
          {
            id: 6,
            title: "Pendentif Émeraude Naturelle",
            price: 899.99,
            oldPrice: 1099.99,
            image: "/images/jewelry6.jpg"
          }
        ];

        setProducts(mockProducts);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    navigate('/cart', { state: { product } });
  };

  if (loading) {
    return (
      <ShopContainer>
        <ShopHeader>
          <ShopTitle>Notre Collection Exclusive</ShopTitle>
          <ShopSubtitle>Chargement des pièces d'exception...</ShopSubtitle>
        </ShopHeader>
        <LoadingContainer>
          <Spinner />
        </LoadingContainer>
      </ShopContainer>
    );
  }

  return (
    <ShopContainer>
      <ShopHeader>
        <ShopTitle>Notre Collection Exclusive</ShopTitle>
        <ShopSubtitle>
          Découvrez des bijoux uniques façonnés avec passion par nos artisans
        </ShopSubtitle>
      </ShopHeader>

      <ProductGrid>
        {products.map((product, index) => (
          <ProductCard key={product.id} index={index}>
            <ProductImageContainer>
              <ProductImage 
                src={product.image} 
                alt={product.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/images/placeholder.jpg";
                }}
              />
            </ProductImageContainer>
            <ProductInfo>
              <ProductTitle>{product.title}</ProductTitle>
              <PriceContainer>
                <CurrentPrice>{product.price} €</CurrentPrice>
                <OldPrice>{product.oldPrice} €</OldPrice>
              </PriceContainer>
              <AddToCartButton onClick={() => handleAddToCart(product)}>
                Ajouter au panier
              </AddToCartButton>
            </ProductInfo>
          </ProductCard>
        ))}
      </ProductGrid>
    </ShopContainer>
  );
};

export default Shop;