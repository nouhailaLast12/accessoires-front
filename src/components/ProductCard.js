import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaShoppingBag, FaStar, FaHeart, FaRegHeart } from 'react-icons/fa';

// Animations to match your navbar
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const neonGlow = keyframes`
  0%, 100% { box-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 15px #e60073, 0 0 20px #e60073; }
  50% { box-shadow: 0 0 5px #fff, 0 0 10px #ff4da6, 0 0 15px #ff4da6, 0 0 20px #ff4da6; }
`;

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components
const ProductCardContainer = styled.div`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  width: 300px;
  font-family: 'Rajdhani', sans-serif;
  background: rgba(30, 30, 60, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  }
`;

const ProductImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 250px;
  overflow: hidden;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProductCardContainer}:hover & {
    transform: scale(1.1);
  }
`;

const WishlistButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 77, 166, 0.7);
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
  color: #fff;
`;

const ProductTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
`;

const Brand = styled.p`
  margin: 0 0 10px 0;
  color: #4da6ff;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 15px 0;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 22px;
  color: #4dffb8;
  text-shadow: 0 0 10px rgba(77, 255, 184, 0.3);
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
`;

const DiscountBadge = styled.span`
  display: inline-block;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  text-transform: uppercase;
  animation: ${pulse} 2s ease infinite;
`;

const ShippingInfo = styled.p`
  margin: 10px 0;
  color: #4da6ff;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &::before {
    content: "✈";
    font-size: 16px;
  }
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px;
  background: linear-gradient(45deg, #ff4da6, #4da6ff);
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 15px;
  
  &:hover {
    background-position: right center;
    animation: ${neonGlow} 1.5s ease-in-out infinite, ${pulse} 2s ease infinite;
    transform: translateY(-3px);
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px 0;
`;

const StarIcon = styled(FaStar)`
  color: #ffec3d;
  font-size: 14px;
`;

const ReviewCount = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
`;

const ProductCard = ({ product, onAddToCart, onToggleWishlist, delay }) => {
  const isWishlisted = false; // You would get this from props or state

  return (
    <ProductCardContainer $delay={delay}>
      <ProductImageContainer>
        <ProductImage 
          src={product.image_url || "https://via.placeholder.com/300x250?text=OLIVE+STORE"} 
          alt={product.name} 
        />
        <WishlistButton onClick={onToggleWishlist}>
          {isWishlisted ? 
            <FaHeart color="#ff4da6" size={18} /> : 
            <FaRegHeart color="#fff" size={18} />
          }
        </WishlistButton>
      </ProductImageContainer>
      
      <ProductInfo>
        <Brand>{product.brand}</Brand>
        <ProductTitle>{product.name}</ProductTitle>
        
        <RatingContainer>
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} />
          ))}
          <ReviewCount>({product.reviews || 0})</ReviewCount>
        </RatingContainer>
        
        <PriceContainer>
          <Price>{product.price} DH</Price>
          <OldPrice>{Math.round(product.price * 1.2)} DH</OldPrice>
          {product.discount && (
            <DiscountBadge>-{product.discount}%</DiscountBadge>
          )}
        </PriceContainer>
        
        <ShippingInfo>Livraison gratuite partout au Maroc</ShippingInfo>
        
        <AddToCartButton onClick={onAddToCart}>
          <FaShoppingBag /> AJOUTER AU PANIER
        </AddToCartButton>
      </ProductInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;

