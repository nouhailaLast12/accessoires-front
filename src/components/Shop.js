import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useCart } from "../context/CartContext";
import { FaShoppingBag, FaSearch, FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

// Animations
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
const ShopContainer = styled.div`
  padding: 50px;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  min-height: 100vh;
`;

const SearchContainer = styled.div`
  margin: 40px auto;
  max-width: 700px;
  position: relative;
`;

const SearchInput = styled.input`
  padding: 15px 25px 15px 50px;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 50px;
  font-size: 18px;
  color: white;
  outline: none;
  transition: all 0.5s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: #ff4da6;
    box-shadow: 0 0 20px rgba(255, 77, 166, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255, 255, 255, 0.6);
  font-size: 20px;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 40px;
  width: 90%;
  margin: 0 auto;
  padding: 40px 0;
`;

const ProductCard = styled.div`
  background: rgba(30, 30, 60, 0.7);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.6);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${ProductCard}:hover & {
    transform: scale(1.1);
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
  color: white;
`;

const ProductTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 15px 0;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #fff;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
  height: 50px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin: 15px 0;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 24px;
  color: #4dffb8;
  text-shadow: 0 0 10px rgba(77, 255, 184, 0.3);
`;

const OldPrice = styled.span`
  text-decoration: line-through;
  color: rgba(255, 255, 255, 0.5);
  font-size: 18px;
`;

const DiscountBadge = styled.span`
  display: inline-block;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c);
  color: white;
  padding: 5px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  animation: ${pulse} 2s ease infinite;
`;

const ShippingInfo = styled.p`
  font-size: 14px;
  color: #4da6ff;
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 15px;
  background: linear-gradient(45deg, #ff4da6, #4da6ff);
  background-size: 200% 200%;
  color: white;
  border: none;
  border-radius: 10px;
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
  margin-top: 20px;

  &:hover {
    background-position: right center;
    animation: ${neonGlow} 1.5s ease-in-out infinite, ${pulse} 2s ease infinite;
    transform: translateY(-3px);
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 50px;
`;

const PageButton = styled.button`
  padding: 12px 20px;
  border-radius: 50px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background-color: ${({ $active }) => ($active ? "rgba(255, 77, 166, 0.7)" : "rgba(255, 255, 255, 0.1)")};
  color: ${({ $active }) => ($active ? "#fff" : "rgba(255, 255, 255, 0.8)")};
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s;
  backdrop-filter: blur(5px);

  &:hover {
    background-color: rgba(255, 77, 166, 0.5);
    color: #fff;
    border-color: rgba(255, 77, 166, 0.7);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ArrowButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
  backdrop-filter: blur(5px);

  &:hover:not(:disabled) {
    background: rgba(255, 77, 166, 0.5);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  padding: 100px;
  font-size: 24px;
  color: white;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NoProductsMessage = styled.div`
  padding: 100px;
  font-size: 24px;
  color: white;
  text-align: center;
  grid-column: 1 / -1;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin: 10px 0;
`;

const StarIcon = styled(FaStar)`
  color: #ffec3d;
  font-size: 16px;
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
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
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
    return <LoadingMessage>Chargement des produits...</LoadingMessage>;
  }

  return (
    <ShopContainer id="shop">
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder="Rechercher des produits..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SearchContainer>

      <ProductGrid>
        {currentProducts.length > 0 ? (
          currentProducts.map((product, index) => (
            <ProductCard key={product.id} $delay={`${index * 0.1}s`}>
              <ProductImage 
                src={product.image_url || "https://via.placeholder.com/300x250?text=OLIVE+STORE"} 
                alt={product.name}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://via.placeholder.com/300x250?text=OLIVE+STORE";
                }}
              />

              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                
                <RatingContainer>
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} />
                  ))}
                  <span>({product.reviews || 0})</span>
                </RatingContainer>
                
                <PriceContainer>
                  <Price>{product.price} DH</Price>
                  {product.oldPrice && <OldPrice>{product.oldPrice} DH</OldPrice>}
                  {product.discount && <DiscountBadge>-{product.discount}%</DiscountBadge>}
                </PriceContainer>
                
                <ShippingInfo>
                  <FaStar color="#4dffb8" /> Livraison gratuite
                </ShippingInfo>
                
                <AddToCartButton onClick={() => addToCart({...product, quantity: 1})}>
                  <FaShoppingBag /> Ajouter au Panier
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))
        ) : (
          <NoProductsMessage>
            Aucun produit ne correspond à votre recherche
          </NoProductsMessage>
        )}
      </ProductGrid>

      {totalPages > 1 && (
        <PaginationContainer>
          <ArrowButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
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
            <FaArrowRight />
          </ArrowButton>
        </PaginationContainer>
      )}
    </ShopContainer>
  );
};

export default Shop;