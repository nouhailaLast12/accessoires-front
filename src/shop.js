// src/pages/Shop.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaSearch, FaShoppingCart, FaStar, FaRegStar, FaFilter } from 'react-icons/fa';
import { useCart } from './CartContext';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float3D = keyframes`
 0% { transform: translateY(0px) rotateX(0deg); }
 50% { transform: translateY(-10px) rotateX(10deg); }
 100% { transform: translateY(0px) rotateX(0deg); }
`;

const pulse = keyframes`
 0% { transform: scale(1); }
 50% { transform: scale(1.05); }
 100% { transform: scale(1); }
`;

// Styled Components
const ShopContainer = styled.div`
  padding: 120px 0 40px;
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  color: #333;
`;

const ShopHero = styled.section`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;

  h1 {
    font-size: 3.5rem;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 3px;
    font-weight: 700;
    position: relative;
    color: #333;
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: #4a90e2;
      margin: 20px auto 0;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ShopContent = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out;
`;

const ShopControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchBar = styled.div`
  position: relative;
  flex: 1;
  max-width: 500px;

  input {
    width: 100%;
    padding: 14px 20px 14px 50px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    font-size: 1rem;
    background: rgba(255, 255, 255, 0.8);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4a90e2;
      box-shadow: 0 4px 20px rgba(74, 144, 226, 0.2);
    }
  }

  svg {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #777;
  }
`;

const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 30px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);

  &:hover {
    background: #3a7bc8;
    transform: translateY(-2px);
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
`;

const ProductCard = styled.div`
  background: rgba(255, 255, 255, 0.8);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 45px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 250px;
  background: #f5f5f5;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  ${ProductCard}:hover & img {
    transform: scale(1.05);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.3));
    z-index: 1;
  }
`;

const ProductBadge = styled.span`
  position: absolute;
  top: 15px;
  right: 15px;
  background: #ff4757;
  color: white;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  z-index: 2;
`;

const ProductInfo = styled.div`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h3`
  margin: 0 0 10px;
  font-size: 1.2rem;
  color: #333;
`;

const ProductCategory = styled.span`
  font-size: 0.9rem;
  color: #777;
  margin-bottom: 10px;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
`;

const CurrentPrice = styled.span`
  font-size: 1.3rem;
  font-weight: 700;
  color: #4a90e2;
`;

const OldPrice = styled.span`
  font-size: 1rem;
  color: #999;
  text-decoration: line-through;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;

  svg {
    color: #ffd700;
  }

  span {
    font-size: 0.9rem;
    color: #777;
  }
`;

const AddToCartButton = styled.button`
  margin-top: auto;
  padding: 12px;
  background: ${({ $inCart }) => ($inCart ? '#28a745' : '#4a90e2')};
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background: ${({ $inCart }) => ($inCart ? '#218838' : '#3a7bc8')};
    animation: ${pulse} 1s ease infinite;
  }
`;

// Sample product data

const products = [
  {
    id: 1,
    title: 'Elegant Summer Dress',
    category: 'Dresses',
    price: 59.99,
    oldPrice: 79.99,
    rating: 4.5,
    reviews: 24,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isNew: true
  },
  {
    id: 2,
    title: 'Classic Denim Jacket',
    category: 'Jackets',
    price: 89.99,
    oldPrice: 109.99,
    rating: 4.8,
    reviews: 36,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    id: 3,
    title: 'Casual Sneakers',
    category: 'Shoes',
    price: 65.99,
    oldPrice: 85.99,
    rating: 4.2,
    reviews: 18,
    image: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isNew: true
  },
  {
    id: 4,
    title: 'Formal Blazer',
    category: 'Suits',
    price: 129.99,
    oldPrice: 149.99,
    rating: 4.7,
    reviews: 42,
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    id: 5,
    title: 'Sporty Hoodie',
    category: 'Hoodies',
    price: 45.99,
    oldPrice: 59.99,
    rating: 4.3,
    reviews: 29,
    image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
  },
  {
    id: 6,
    title: 'Stylish Sunglasses',
    category: 'Accessories',
    price: 39.99,
    oldPrice: 49.99,
    rating: 4.6,
    reviews: 31,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    isNew: true
  }
];

const Shop = () => {
    
  const [searchTerm, setSearchTerm] = useState('');
  const { cartItems, addToCart } = useCart();

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} />);
    }
    
    if (hasHalfStar) {
      stars.push(<FaStar key="half" />);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} />);
    }
    
    return stars;
  };

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const isInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  return (
    <ShopContainer>
      <ShopHero>
        <h1>Our Collection</h1>
      </ShopHero>
      
      <ShopContent>
        <ShopControls>
          <SearchBar>
            <FaSearch />
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBar>
          
          <FilterButton>
            <FaFilter /> Filters
          </FilterButton>
        </ShopControls>
        
        <ProductsGrid>
          {filteredProducts.map((product, index) => {
            const inCart = isInCart(product.id);
            
            return (
              <ProductCard key={product.id} $delay={`${index * 0.1}s`}>
                <ProductImage>
                  <img src={product.image} alt={product.title} />
                  {product.isNew && <ProductBadge>New</ProductBadge>}
                </ProductImage>
                
                <ProductInfo>
                  <ProductTitle>{product.title}</ProductTitle>
                  <ProductCategory>{product.category}</ProductCategory>
                  
                  <ProductRating>
                    {renderStars(product.rating)}
                    <span>({product.reviews})</span>
                  </ProductRating>
                  
                  <ProductPrice>
                    <CurrentPrice>${product.price.toFixed(2)}</CurrentPrice>
                    {product.oldPrice && (
                      <OldPrice>${product.oldPrice.toFixed(2)}</OldPrice>
                    )}
                  </ProductPrice>
                  
                  <AddToCartButton 
                    $inCart={inCart}
                    onClick={() => handleAddToCart(product)}
                  >
                    <FaShoppingCart /> 
                    {inCart ? 'Added to Cart' : 'Add to Cart'}
                  </AddToCartButton>
                </ProductInfo>
              </ProductCard>
            );
          })}
        </ProductsGrid>
      </ShopContent>
    </ShopContainer>
  );
};

export default Shop;