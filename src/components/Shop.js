import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useCart } from "../context/CartContext";

// Composants stylisés
const ShopContainer = styled.div`
  text-align: center;
  padding: 30px;
  background-color: #fafafa;
`;

const SearchContainer = styled.div`
  margin: 20px auto;
  max-width: 600px;
  display: flex;
  justify-content: center;
`;

const SearchInput = styled.input`
  padding: 12px 20px;
  width: 100%;
  border: 2px solid #e8d9c5;
  border-radius: 30px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #ffd54f;
    box-shadow: 0 0 10px rgba(255, 213, 79, 0.3);
  }
`;

const ProductGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  width: 95%;
  margin: auto;
  padding: 30px 0;
`;

const ProductCard = styled.div`
  background-color: #fff9f0;
  border-radius: 12px;
  border: 1px solid #e8d9c5;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  width: 300px;
  height: 420px;
  margin: 15px;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const ProductInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const ProductTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin: 10px 0;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const Price = styled.p`
  font-size: 18px;
  font-weight: bold;
  color: #ffd54f;
  margin-bottom: 5px;
`;

const OldPrice = styled.span`
  font-size: 14px;
  text-decoration: line-through;
  color: #999;
  margin-left: 8px;
`;

const ShippingInfo = styled.p`
  font-size: 12px;
  color: #777;
  margin-top: 5px;
`;

const AddToCartButton = styled.button`
  background: linear-gradient(90deg, #6D4C41, #F5F5DC, #FFD700);
  color: #5D4037;
  border: none;
  padding: 12px 24px;
  border-radius: 50px;
  margin-top: 15px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.5s;
  width: 80%;
  background-size: 200% auto;
  box-shadow: 0 4px 15px rgba(109, 76, 65, 0.3);
  position: relative;
  overflow: hidden;
  
  &:hover {
    background-position: right center;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(109, 76, 65, 0.4);
    color: #3E2723;
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
`;

const PageButton = styled.button`
  padding: 10px 20px;
  border-radius: 25px;
  border: 2px solid #3e2723;
  background-color: ${(props) => (props.$active ? "#3e2723" : "#fff")};
  color: ${(props) => (props.$active ? "#fff" : "#3e2723")};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  
  &:hover {
    background-color: #3e2723;
    color: #fff;
  }

  &:disabled {
    background-color: #ddd;
    color: #aaa;
    cursor: not-allowed;
  }
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  color: #3e2723;
  cursor: pointer;
  transition: opacity 0.3s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.7;
  }
`;

const LoadingMessage = styled.div`
  padding: 50px;
  font-size: 18px;
  color: #5d4037;
`;

const NoProductsMessage = styled.div`
  padding: 50px;
  font-size: 18px;
  color: #5d4037;
  grid-column: 1 / -1;
  text-align: center;
`;

const Shop = ({ products, loading }) => {
  const { addToCart } = useCart();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const productsPerPage = 8;

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(products);
      setCurrentPage(1);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
      setCurrentPage(1);
    }
  }, [searchQuery, products]);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  if (loading) {
    return <LoadingMessage>جاري تحميل المنتجات...</LoadingMessage>;
  }

  return (
    <ShopContainer id="shop">
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Rechercher des produits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <ProductGrid>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage 
                src={product.image_url || "https://via.placeholder.com/300x220?text=No+Image"} 
                alt={product.name} 
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x220?text=No+Image";
                }}
              />

              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                <Price>
                  {product.price} USD
                  <OldPrice>{Math.round(product.price * 1.2)} USD</OldPrice>
                </Price>
                <ShippingInfo>Livré depuis : France</ShippingInfo>
                <AddToCartButton onClick={() => addToCart({...product, quantity: 1})}>
                  Ajouter au Panier
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          <NoProductsMessage>
            Aucun produit ne correspond à votre recherche.
          </NoProductsMessage>
        )}
      </ProductGrid>

      {totalPages > 0 && (
        <PaginationContainer>
          <ArrowButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {"←"}
          </ArrowButton>
          {[...Array(totalPages)].map((_, index) => (
            <PageButton
              key={index}
              $active={currentPage === index + 1}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </PageButton>
          ))}
          <ArrowButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {"→"}
          </ArrowButton>
        </PaginationContainer>
      )}
    </ShopContainer>
  );
};

export default Shop;