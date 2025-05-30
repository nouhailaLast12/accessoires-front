import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import styled, { keyframes } from "styled-components";
import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
// Import des composants
import Navbar from "./Navbar";
import Shop from "./components/Shop";
import Gifts from "./Gifts";
import About from "./About";
import FAQ from "./FAQ";
import SavePage from "./SavePage";
import Contact from "./Contact";
import Footer from "./Footer";
import Cart from './components/Cart';
import Checkout from './Checkout';
import OrderConfirmation from './OrderConfirmation';
import SavedProductsPage from './SavedProductsPage';
import Brandpage from './Brandpage';
import ThankYou from './ThankYou';
import AdminDashboard from './admin/AdminDashboard';
import AdminProducts from './admin/AdminProducts';

// Animations
const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// Styles
const Container = styled.div`
  font-family: "Arial", sans-serif;
  text-align: center;
  margin: 0;
  padding: 0;
  position: relative;
  min-height: 100vh;
`;

const TopBar = styled.div`
  background-color: #3e2723;
  color: white;
  text-align: center;
  padding: 20px 50px;
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-bottom: 8px solid #ffd54f;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
  font-family: "Roboto", sans-serif;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 15px 20px;
    font-size: 14px;
  }
`;

const Banner = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  padding: 180px 20px;
  background: url("/images/accessoires5.webp") no-repeat center;
  background-size: cover;
  color: white;
  height: 600px;
  position: relative;
  overflow: hidden;
  transition: all 0.5s ease;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    z-index: 1;
    transition: all 0.5s ease;
  }

  h2, p {
    z-index: 2;
    font-family: "Playfair Display", serif;
    font-weight: 700;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);
    transition: all 0.3s ease;
  }

  &:hover::before {
    background: rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    height: 400px;
    padding: 100px 20px;
  }
`;

const Title = styled.h2`
  font-size: 60px;
  color: #ffd54f;
  margin-bottom: 20px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 36px;
  }
`;

const Description = styled.p`
  font-size: 24px;
  color: #f4e1a1;
  max-width: 700px;
  margin-top: 20px;
  font-family: "Lato", sans-serif;
  line-height: 1.8;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    font-size: 18px;
    max-width: 90%;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 30px;
  justify-content: center;
  z-index: 999;
  animation: ${slideUp} 0.5s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
`;

const Button = styled.button`
  padding: 16px 45px;
  font-size: 18px;
  border: none;
  cursor: pointer;
  background: ${(props) => (props.$primary ? "#ffd54f" : "transparent")};
  color: ${(props) => (props.$primary ? "#3e2723" : "#ffd54f")};
  border-radius: 50px;
  border: 2px solid ${(props) => (props.$primary ? "transparent" : "#ffd54f")};
  transition: all 0.3s ease;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;

  &:hover {
    background: ${(props) => (props.$primary ? "#ffca28" : "rgba(255, 213, 71, 0.1)")};
    color: ${(props) => (props.$primary ? "#3e2723" : "#ffca28")};
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${pulse} 1s ease-out;
  }

  @media (max-width: 768px) {
    padding: 12px 30px;
    font-size: 16px;
    width: 80%;
  }
`;

const Section = styled.div`
  padding: 100px 20px;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 60px 15px;
  }
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 30px;
  padding: 12px 25px;
  max-width: 350px;
  width: 100%;
  border: 2px solid #ddd;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  animation: ${slideUp} 0.5s ease-out;
  
  &:focus-within {
    border-color: #3e2723;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateX(-50%) scale(1.02);
  }

  @media (max-width: 768px) {
    max-width: 280px;
    padding: 10px 20px;
    bottom: 15px;
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  font-size: 16px;
  padding: 12px 18px;
  width: 100%;
  border-radius: 30px;
  background-color: transparent;
  color: #333;
  font-weight: 400;
  transition: all 0.3s ease;

  &::placeholder {
    color: #aaa;
    transition: all 0.3s ease;
  }

  &:focus {
    background-color: rgb(248, 240, 217);
    
    &::placeholder {
      color: #ddd;
    }
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 15px;
  }
`;

const SearchButton = styled.button`
  background-color: #3e2723;
  border: none;
  cursor: pointer;
  padding: 12px;
  margin-left: 15px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #4e362e;
    transform: rotate(10deg);
  }

  &:active {
    transform: scale(0.95);
  }

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }

  &:focus:not(:active)::after {
    animation: ${pulse} 1s ease-out;
  }

  @media (max-width: 768px) {
    padding: 10px;
    margin-left: 10px;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: #fff;
  font-size: 20px;
  transition: all 0.3s ease;

  ${SearchButton}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;

const FloatingButton = styled.button`
  position: fixed;
  bottom: 90px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #3e2723;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  z-index: 1000;

  &:hover {
    background-color: #4e362e;
    transform: translateY(-5px) scale(1.1);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    bottom: 80px;
    right: 20px;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ff5252;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
`;

// Contexte du panier
export const CartContext = React.createContext();

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Charger le panier depuis localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Sauvegarder le panier dans localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Fonction pour ajouter au panier
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      let updatedItems;
      
      if (existingItem) {
        updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
            : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: product.quantity || 1 }];
      }
      
      return updatedItems;
    });
  };

  // Fonction pour supprimer du panier
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // Fonction pour mettre à jour la quantité
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };



  // Gestion de la recherche
  const handleSearch = () => {
  if (searchQuery.trim()) {
    navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    setSearchQuery("");
  }
};
  // Défilement vers une section
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Gestion de l'ancre dans l'URL
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location]);
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/products"); // غيّر هذا حسب رابط API عندك
      setProducts(response.data);
    } catch (error) {
      console.error("خطأ في جلب المنتجات:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, []);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      <Container>
        {/* Top Bar */}
        <TopBar>FREE SHIPPING ON ORDERS OVER $200</TopBar>

        {/* Navbar */}
        <Navbar scrollToSection={scrollToSection} cartItemsCount={cartItems.length} />

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Section id="home">
                  <Banner>
                    <Title>Discover Your Beauty</Title>
                    <Description>Explore a range of premium beauty products.</Description>
                    <ButtonContainer>
                      <Button $primary onClick={() => scrollToSection("shop")}>
                        Shop Now
                      </Button>
                      <Button onClick={() => scrollToSection("about")}>
                        Learn More
                      </Button>
                    </ButtonContainer>
                  </Banner>
                </Section>
                <Section id="shop">
  <Shop products={products} loading={loading} />
</Section>

                <Section id="gifts">
                  <Gifts />
                </Section>
                <Section id="about">
                  <About />
                </Section>
                <Section id="faq">
                  <FAQ />
                </Section>
                <Section id="save">
                  <SavePage />
                </Section>
               
                <Footer />
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop" element={<Shop products={products} loading={loading} />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
          <Route path="/saved-products" element={<SavedProductsPage />} />
          <Route path="/brand/:brandName" element={<Brandpage />} />
          <Route path="/thankyou" element={<ThankYou />} />
          <Route path="/admin" element={<AdminDashboard />} />
           <Route path="/admin/product" element={< AdminProducts />} />
        </Routes>
        

        {/* Barre de recherche */}
        <SearchBar $isFocused={isSearchFocused}>
          <SearchInput
            type="text"
            placeholder="Search for beauty products"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <SearchButton onClick={handleSearch}>
            <SearchIcon />
          </SearchButton>
        </SearchBar>

        {/* Bouton panier flottant */}
        <Link to="/cart">
          <FloatingButton>
            <FaShoppingCart size={24} />
            {cartItems.length > 0 && <CartBadge>{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}</CartBadge>}
          </FloatingButton>
        </Link>
      </Container>
    </CartContext.Provider>
   
  );
};

export default App;