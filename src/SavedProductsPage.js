import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const SavedContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
`;

const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ProductImage = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 5px;
  overflow: hidden;
`;

const ProductImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 10px 0;
`;

const Price = styled.p`
  font-size: 14px;
  color: #ffd54f;
  font-weight: bold;
`;

const SavedProductsPage = () => {
  const location = useLocation();
  const savedProducts = location.state?.savedProducts || [];

  return (
    <SavedContainer>
      <h1>Mes Produits Sauvegardés</h1>
      {savedProducts.length > 0 ? (
        <ProductGrid>
          {savedProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage>
                <ProductImageElement src={product.image} alt={product.title} />
              </ProductImage>
              <ProductTitle>{product.title}</ProductTitle>
              <Price>{product.price} €</Price>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <p>Aucun produit sauvegardé pour le moment.</p>
      )}
    </SavedContainer>
  );
};

export default SavedProductsPage;