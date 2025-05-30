import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

// Styled Components
const SaveContainer = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #3e2723;
  margin-bottom: 30px;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ProductCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const HeartIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  z-index: 2;
  font-size: 20px;
  color: ${(props) => (props.$isSaved ? "#ff4d4d" : "#ccc")};
  animation: ${(props) => (props.$justSaved ? pulse : "none")} 0.5s ease;

  &:hover {
    color: #ff4d4d;
    transform: scale(1.1);
  }
`;

const ProductImageElement = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;

  ${ProductCard}:hover & {
    transform: scale(1.05);
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductTitle = styled.h3`
  font-size: 1.1rem;
  color: #333;
  margin: 0 0 10px;
  font-weight: 600;
`;

const Price = styled.p`
  font-size: 1.2rem;
  color: #ffd54f;
  font-weight: bold;
  margin: 0;
`;

const ViewFavoritesButton = styled.button`
  background: linear-gradient(135deg, #3e2723 0%, #5d4037 100%);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 auto;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(62, 39, 35, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(62, 39, 35, 0.3);
    background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  }

  &::before {
    content: "❤️";
    font-size: 1.2rem;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  animation: ${fadeIn} 0.6s ease-out;
`;

// Initial products data
const initialProducts = [
  {
    id: 1,
    title: 'Product 1',
    image: '/images/team1.jpg',
    price: '10.00',
  },
  {
    id: 2,
    title: 'Product 2',
    image: '/images/team2.jpg',
    price: '15.00',
  },
  {
    id: 3,
    title: 'Product 3',
    image: '/images/team3.jpg',
    price: '12.00',
  },
  {
    id: 4,
    title: 'Product 4',
    image: '/images/team4.jpg',
    price: '20.00',
  },
  {
    id: 5,
    title: 'Product 5',
    image: '/images/team5.jpg',
    price: '25.00',
  },
  {
    id: 6,
    title: 'Product 6',
    image: '/images/team6.jpg',
    price: '30.00',
  },
  {
    id: 7,
    title: 'Product 7',
    image: '/images/team7.jpg',
    price: '100.00',
  },
  {
    id: 8,
    title: 'Product 8',
    image: '/images/team8.jpg',
    price: '80.00',
  },
  {
    id: 9,
    title: 'Product 9',
    image: '/images/team9.jpg',
    price: '70.00',
  },
  {
    id: 10,
    title: 'Product 10',
    image: '/images/team10.jpg',
    price: '60.00',
  },
];

const SavePage = () => {
  const [savedProducts, setSavedProducts] = useState([]);
  const [recentlySaved, setRecentlySaved] = useState(null);
  const navigate = useNavigate();

  const handleSave = (product) => {
    const isAlreadySaved = savedProducts.some((item) => item.id === product.id);
    
    if (isAlreadySaved) {
      setSavedProducts(savedProducts.filter((item) => item.id !== product.id));
    } else {
      setSavedProducts([...savedProducts, product]);
      setRecentlySaved(product.id);
      setTimeout(() => setRecentlySaved(null), 1000);
    }
  };

  const navigateToSavedProducts = () => {
    navigate("/saved-products", { state: { savedProducts } });
  };

  useEffect(() => {
    // Load saved products from localStorage if needed
    const saved = localStorage.getItem('savedProducts');
    if (saved) {
      setSavedProducts(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save to localStorage when savedProducts changes
    localStorage.setItem('savedProducts', JSON.stringify(savedProducts));
  }, [savedProducts]);

  return (
    <SaveContainer id="save">
      <Title>Mes Favoris</Title>
      
      <ViewFavoritesButton onClick={navigateToSavedProducts}>
        Voir mes favoris ({savedProducts.length})
      </ViewFavoritesButton>
      
      {initialProducts.length > 0 ? (
        <ProductGrid>
          {initialProducts.map((product) => {
            const isSaved = savedProducts.some((item) => item.id === product.id);
            const justSaved = recentlySaved === product.id;

            return (
              <ProductCard key={product.id}>
                <ProductImage>
                  <HeartIcon
                    $isSaved={isSaved}
                    $justSaved={justSaved}
                    onClick={() => handleSave(product)}
                  >
                    {isSaved ? "❤️" : "🤍"}
                  </HeartIcon>
                  <ProductImageElement 
                    src={product.image} 
                    alt={product.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/placeholder.jpg";
                    }}
                  />
                </ProductImage>
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <Price>{product.price} €</Price>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductGrid>
      ) : (
        <EmptyState>
          <p>Aucun produit sauvegardé pour le moment.</p>
        </EmptyState>
      )}
    </SaveContainer>
  );
};

export default SavePage;