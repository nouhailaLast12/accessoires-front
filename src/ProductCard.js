import React, { useState } from 'react';
import styled from 'styled-components';

const ProductCardContainer = styled.div`
  border: 1px solid #e1e1e1;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  background: #fff;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
`;

const ProductName = styled.h3`
  margin: 15px 0 5px;
  padding: 0 15px;
  font-size: 1.1rem;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  margin: 0 0 15px;
  padding: 0 15px;
  font-size: 1rem;
  color: #666;
`;

const AddToCartButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  color: #333;
  padding: 10px 20px;
  border: 1px solid #333;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover {
    background-color: #333;
    color: #fff;
  }
`;

const ProductCard = ({ product, onAddToCart }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ProductCardContainer
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ProductImage src={product.image} alt={product.name} />
      <ProductName>{product.name}</ProductName>
      <ProductPrice>${product.price}</ProductPrice>
      {isHovered && (
        <AddToCartButton onClick={() => onAddToCart(product)}>
          Add to Cart
        </AddToCartButton>
      )}
    </ProductCardContainer>
  );
};

export default ProductCard;