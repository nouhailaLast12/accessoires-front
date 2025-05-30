import React from 'react';
import styled from 'styled-components';

// ستايل المكون
const ProductCardContainer = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  width: 280px;
  font-family: 'Arial', sans-serif;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  background-color: #f5f5f5;
`;

const ProductInfo = styled.div`
  padding: 16px;
`;

const ProductTitle = styled.h3`
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #333;
`;

const Brand = styled.p`
  margin: 0 0 8px 0;
  color: #666;
  font-size: 14px;
`;

const Price = styled.p`
  margin: 8px 0;
  font-weight: bold;
  color: #2e7d32;
  font-size: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 16px;
  font-weight: normal;
`;

const Discount = styled.span`
  display: inline-block;
  background-color: #ff5722;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  margin-left: 8px;
`;

const ShippingInfo = styled.p`
  margin: 8px 0;
  color: #388e3c;
  font-size: 14px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #1565c0;
  }
`;

// المكون الرئيسي
const ProductCard = ({ product, onAddToCart }) => {
  return (
    <ProductCardContainer>
      <ProductImage 
        src={product.image_url || "https://via.placeholder.com/280x200?text=No+Image"} 
        alt={product.name} 
      />
      <ProductInfo>
        <ProductTitle>{product.name}</ProductTitle>
        <Brand>Marque : {product.brand}</Brand>
        <Price>
          {product.price} DH
          <OldPrice>{Math.round(product.price * 1.2)} DH</OldPrice>
        </Price>
        {product.discount && <Discount>Promo: {product.discount}% OFF</Discount>}
        <ShippingInfo>Livraison gratuite</ShippingInfo>
        <AddToCartButton onClick={onAddToCart}>
          Ajouter au Panier
        </AddToCartButton>
      </ProductInfo>
    </ProductCardContainer>
  );
};

export default ProductCard;