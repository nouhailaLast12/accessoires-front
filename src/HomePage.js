import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styles
const ShopContainer = styled.div`
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8f5f2 0%, #e8e1dd 100%);
  min-height: 100vh;
`;

const ShopHeader = styled.div`
  margin-bottom: 60px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const ShopTitle = styled.h1`
  font-size: 3.5rem;
  color: #3e2723;
  font-family: 'Playfair Display', serif;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.1);

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

const ShopSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 40px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.6s ease-out;
  animation-delay: ${({ index }) => index * 0.1}s;
  animation-fill-mode: forwards;
  opacity: 0;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.15);
    
    &::before {
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,213,79,0.1) 0%, rgba(62,39,35,0.05) 100%);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: -1;
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

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 25px;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 1.4rem;
  color: #3e2723;
  font-weight: 600;
  margin-bottom: 15px;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PriceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const CurrentPrice = styled.span`
  font-size: 1.8rem;
  font-weight: 700;
  color: #ffd54f;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
`;

const OldPrice = styled.span`
  font-size: 1.2rem;
  color: #999;
  text-decoration: line-through;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(135deg, #3e2723 0%, #5d4037 100%);
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
  box-shadow: 0 8px 20px rgba(62, 39, 35, 0.2);
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background-position: right center;
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(62, 39, 35, 0.3);
    animation: ${float} 2s infinite;
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
  width: 50px;
  height: 50px;
  border: 5px solid rgba(62, 39, 35, 0.1);
  border-radius: 50%;
  border-top-color: #3e2723;
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
        // Simulation de chargement
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
            image: "/images/jewelry2.jpg"
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