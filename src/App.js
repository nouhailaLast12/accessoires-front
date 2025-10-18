// import React, { useState, useEffect } from "react";
// import { FaSearch, FaShoppingCart } from "react-icons/fa";
// import styled, { keyframes, css } from "styled-components";
// import { Link, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// // Import des composants
// import Navbar from "./Navbar";
// import Shop from "./components/Shop";
// import Gifts from "./Gifts";
// import About from "./About";
// import FAQ from "./FAQ";
// import SavePage from "./SavePage";
// import Footer from "./Footer";
// import Cart from './components/Cart';
// import Checkout from './Checkout';
// import OrderConfirmation from './OrderConfirmation';
// import SavedProductsPage from './SavedProductsPage';
// import Brandpage from './Brandpage';
// import ThankYou from './ThankYou';
// import AdminDashboard from './admin/AdminDashboard';
// import AdminProducts from './admin/AdminProducts';

// // Animations (les mêmes que dans votre navbar)
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(-20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const neonGlow = keyframes`
//   0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073; }
//   50% { text-shadow: 0 0 5px #fff, 0 0 10px #ff4da6, 0 0 15px #ff4da6, 0 0 20px #ff4da6; }
// `;

// const float = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0px); }
// `;

// const rainbow = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.1); }
//   100% { transform: scale(1); }
// `;

// const spin = keyframes`
//   from { transform: rotate(0deg); }
//   to { transform: rotate(360deg); }
// `;

// const slideUp = keyframes`
//   from { transform: translateY(20px); opacity: 0; }
//   to { transform: translateY(0); opacity: 1; }
// `;

// // Styles principaux adaptés au style de la navbar
// const Container = styled.div`
//   font-family: "Rajdhani", sans-serif;
//   text-align: center;
//   margin: 0;
//   padding: 0;
//   position: relative;
//   min-height: 100vh;
//   background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
//   color: white;
// `;

// const TopBar = styled.div`
//   background-color: #3e2723;
//   color: white;
//   text-align: center;
//   padding: 15px 50px;
//   font-size: 16px;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 2px;
//   border-bottom: 3px solid #ff4da6;
//   box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.3);
//   font-family: "Rajdhani", sans-serif;
//   animation: ${fadeIn} 0.8s ease-out;
//   text-shadow: 0 0 5px rgba(255, 255, 255, 0.3);

//   @media (max-width: 768px) {
//     padding: 12px 20px;
//     font-size: 14px;
//   }
// `;

// const Banner = styled.section`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   text-align: center;
//   padding: 180px 20px;
//   background: url("https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80") no-repeat center;
//   background-size: cover;
//   color: white;
//   height: 600px;
//   position: relative;
//   overflow: hidden;
//   transition: all 0.5s ease;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: rgba(10, 10, 20, 0.7);
//     backdrop-filter: blur(3px);
//     z-index: 1;
//     transition: all 0.5s ease;
//   }

//   &:hover::before {
//     background: rgba(10, 10, 20, 0.8);
//   }

//   @media (max-width: 768px) {
//     height: 400px;
//     padding: 100px 20px;
//   }
// `;

// const Title = styled.h2`
//   font-size: 60px;
//   color: #ff4da6;
//   margin-bottom: 20px;
//   font-family: "Audiowide", cursive;
//   text-transform: uppercase;
//   letter-spacing: 3px;
//   z-index: 2;
//   text-shadow: 0 0 10px rgba(255, 77, 166, 0.7);
//   animation: ${neonGlow} 1.5s ease-in-out infinite, ${float} 6s ease-in-out infinite;
//   transition: all 0.3s ease;

//   @media (max-width: 768px) {
//     font-size: 36px;
//   }
// `;

// const Description = styled.p`
//   font-size: 24px;
//   color: #4da6ff;
//   max-width: 700px;
//   margin-top: 20px;
//   font-family: "Rajdhani", sans-serif;
//   line-height: 1.8;
//   z-index: 2;
//   text-shadow: 0 0 5px rgba(77, 166, 255, 0.5);
//   transition: all 0.3s ease;

//   @media (max-width: 768px) {
//     font-size: 18px;
//     max-width: 90%;
//   }
// `;

// const ButtonContainer = styled.div`
//   margin-top: 40px;
//   display: flex;
//   gap: 30px;
//   justify-content: center;
//   z-index: 2;
//   animation: ${slideUp} 0.5s ease-out;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 15px;
//     align-items: center;
//   }
// `;

// const Button = styled.button`
//   padding: 16px 45px;
//   font-size: 18px;
//   border: none;
//   cursor: pointer;
//   background: ${props => props.$primary ? "linear-gradient(45deg, #ff4da6, #ff9a3c)" : "transparent"};
//   color: ${props => props.$primary ? "white" : "#4da6ff"};
//   border-radius: 50px;
//   border: 2px solid ${props => props.$primary ? "transparent" : "#4da6ff"};
//   transition: all 0.3s ease;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   position: relative;
//   overflow: hidden;
//   font-family: "Rajdhani", sans-serif;
//   box-shadow: ${props => props.$primary ? "0 4px 15px rgba(255, 77, 166, 0.4)" : "0 4px 15px rgba(77, 166, 255, 0.2)"};

//   &:hover {
//     background: ${props => props.$primary ? "linear-gradient(45deg, #ff3d9e, #ff8a2b)" : "rgba(77, 166, 255, 0.1)"};
//     color: white;
//     transform: translateY(-5px);
//     box-shadow: ${props => props.$primary ? "0 6px 20px rgba(255, 77, 166, 0.6)" : "0 6px 20px rgba(77, 166, 255, 0.4)"};
//   }

//   &:active {
//     transform: translateY(-2px);
//   }

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
//     transition: all 0.5s ease;
//   }

//   &:hover::before {
//     left: 100%;
//   }

//   @media (max-width: 768px) {
//     padding: 12px 30px;
//     font-size: 16px;
//     width: 80%;
//   }
// `;

// const Section = styled.div`
//   padding: 100px 20px;
//   transition: all 0.3s ease;
//   background: ${props => props.$dark ? "rgba(10, 10, 20, 0.9)" : "rgba(20, 20, 40, 0.7)"};
//   backdrop-filter: blur(5px);
//   border-top: 1px solid rgba(255, 255, 255, 0.1);
//   border-bottom: 1px solid rgba(255, 255, 255, 0.1);

//   @media (max-width: 768px) {
//     padding: 60px 15px;
//   }
// `;

// const SearchBar = styled.div`
//   display: flex;
//   align-items: center;
//   background-color: rgba(30, 30, 60, 0.9);
//   border-radius: 30px;
//   padding: 12px 25px;
//   max-width: 350px;
//   width: 100%;
//   border: 2px solid #4da6ff;
//   box-shadow: 0px 4px 15px rgba(77, 166, 255, 0.3);
//   transition: all 0.3s ease;
//   position: fixed;
//   bottom: 20px;
//   left: 50%;
//   transform: translateX(-50%);
//   z-index: 1000;
//   animation: ${slideUp} 0.5s ease-out;
//   backdrop-filter: blur(5px);
  
//   &:focus-within {
//     border-color: #ff4da6;
//     box-shadow: 0px 6px 20px rgba(255, 77, 166, 0.4);
//     transform: translateX(-50%) scale(1.02);
//   }

//   @media (max-width: 768px) {
//     max-width: 280px;
//     padding: 10px 20px;
//     bottom: 15px;
//   }
// `;

// const SearchInput = styled.input`
//   border: none;
//   outline: none;
//   font-size: 16px;
//   padding: 12px 18px;
//   width: 100%;
//   border-radius: 30px;
//   background-color: transparent;
//   color: white;
//   font-weight: 400;
//   font-family: "Rajdhani", sans-serif;
//   transition: all 0.3s ease;

//   &::placeholder {
//     color: #aaa;
//     transition: all 0.3s ease;
//   }

//   &:focus {
//     background-color: rgba(77, 166, 255, 0.1);
    
//     &::placeholder {
//       color: #ddd;
//     }
//   }

//   @media (max-width: 768px) {
//     font-size: 14px;
//     padding: 10px 15px;
//   }
// `;

// const SearchButton = styled.button`
//   background: linear-gradient(45deg, #ff4da6, #4da6ff);
//   border: none;
//   cursor: pointer;
//   padding: 12px;
//   margin-left: 15px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: hidden;
//   animation: ${pulse} 2s ease infinite;

//   &:hover {
//     transform: rotate(15deg) scale(1.1);
//     box-shadow: 0 0 15px rgba(255, 77, 166, 0.6);
//   }

//   &:active {
//     transform: scale(0.95);
//   }

//   @media (max-width: 768px) {
//     padding: 10px;
//     margin-left: 10px;
//   }
// `;

// const SearchIcon = styled(FaSearch)`
//   color: #fff;
//   font-size: 20px;
//   transition: all 0.3s ease;

//   ${SearchButton}:hover & {
//     transform: scale(1.1);
//   }

//   @media (max-width: 768px) {
//     font-size: 18px;
//   }
// `;

// const FloatingButton = styled.button`
//   position: fixed;
//   bottom: 90px;
//   right: 30px;
//   width: 60px;
//   height: 60px;
//   border-radius: 50%;
//   background: linear-gradient(45deg, #ff4da6, #4da6ff);
//   color: white;
//   border: none;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   box-shadow: 0 4px 15px rgba(255, 77, 166, 0.5);
//   transition: all 0.3s ease;
//   z-index: 1000;
//   animation: ${pulse} 3s ease infinite;

//   &:hover {
//     transform: translateY(-5px) scale(1.1);
//     box-shadow: 0 6px 20px rgba(77, 166, 255, 0.6);
//   }

//   &:active {
//     transform: scale(0.95);
//   }

//   @media (max-width: 768px) {
//     width: 50px;
//     height: 50px;
//     bottom: 80px;
//     right: 20px;
//   }
// `;

// const CartBadge = styled.span`
//   position: absolute;
//   top: -5px;
//   right: -5px;
//   background: #ff4da6;
//   color: white;
//   border-radius: 50%;
//   width: 22px;
//   height: 22px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   font-size: 12px;
//   font-weight: bold;
//   font-family: "Rajdhani", sans-serif;
//   animation: ${pulse} 1.5s ease infinite;
//   box-shadow: 0 0 10px rgba(255, 77, 166, 0.7);
// `;

// // Contexte du panier
// export const CartContext = React.createContext();

// const App = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [cartItems, setCartItems] = useState([]);
//   const [isSearchFocused, setIsSearchFocused] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Charger le panier depuis localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // Sauvegarder le panier dans localStorage
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // Fonctions pour gérer le panier
//   const addToCart = (product) => {
//     setCartItems(prevItems => {
//       const existingItem = prevItems.find(item => item.id === product.id);
//       if (existingItem) {
//         return prevItems.map(item =>
//           item.id === product.id
//             ? { ...item, quantity: (item.quantity || 1) + (product.quantity || 1) }
//             : item
//         );
//       } else {
//         return [...prevItems, { ...product, quantity: product.quantity || 1 }];
//       }
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCartItems(prevItems =>
//       prevItems.map(item =>
//         item.id === productId ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   // Gestion de la recherche
//   const handleSearch = () => {
//     if (searchQuery.trim()) {
//       navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//       setSearchQuery("");
//     }
//   };

//   // Défilement vers une section
//   const scrollToSection = (id) => {
//     const section = document.getElementById(id);
//     if (section) {
//       window.scrollTo({
//         top: section.offsetTop - 80,
//         behavior: "smooth",
//       });
//     }
//   };

//   // Gestion de l'ancre dans l'URL
//   useEffect(() => {
//     if (location.hash) {
//       const id = location.hash.replace("#", "");
//       setTimeout(() => {
//         scrollToSection(id);
//       }, 100);
//     }
//   }, [location]);

//   // Charger les produits
// useEffect(() => {
//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/api/products");
//       setProducts(response.data);
//     } catch (error) {
//       console.error("Erreur lors du chargement des produits:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchProducts();
// }, []);


//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
//       <Container>
//         {/* Top Bar */}
//         <TopBar>FREE SHIPPING ON ORDERS OVER $200</TopBar>

//         {/* Navbar */}
//         <Navbar scrollToSection={scrollToSection} cartItemsCount={cartItems.length} />

//         {/* Routes */}
//         <Routes>
//           <Route
//             path="/"
//             element={
//               <>
//                 <Section id="home">
//                   <Banner>
//                     <Title>Discover Your Beauty</Title>
//                     <Description>Explore our exclusive collection of premium beauty products</Description>
//                     <ButtonContainer>
//                       <Button $primary onClick={() => scrollToSection("shop")}>
//                         Shop Now
//                       </Button>
//                       <Button onClick={() => scrollToSection("about")}>
//                         Learn More
//                       </Button>
//                     </ButtonContainer>
//                   </Banner>
//                 </Section>
//                 <Section id="shop" $dark>
//                   <Shop products={products} loading={loading} />
//                 </Section>
//                 <Section id="gifts">
//                   <Gifts />
//                 </Section>
//                 <Section id="about" $dark>
//                   <About />
//                 </Section>
//                 <Section id="faq">
//                   <FAQ />
//                 </Section>
//                 <Section id="save" $dark>
//                   <SavePage />
//                 </Section>
//                 <Footer />
//               </>
//             }
//           />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/shop" element={<Shop products={products} loading={loading} />} />
//           <Route path="/checkout" element={<Checkout />} />
//           <Route path="/order-confirmation" element={<OrderConfirmation />} />
//           <Route path="/saved-products" element={<SavedProductsPage />} />
//           <Route path="/brand/:brandName" element={<Brandpage />} />
//           <Route path="/thankyou" element={<ThankYou />} />
//           <Route path="/admin" element={<AdminDashboard />} />
//           <Route path="/admin/product" element={<AdminProducts />} />
//         </Routes>

//         {/* Barre de recherche */}
//         <SearchBar $isFocused={isSearchFocused}>
//           <SearchInput
//             type="text"
//             placeholder="Search for beauty products..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             onFocus={() => setIsSearchFocused(true)}
//             onBlur={() => setIsSearchFocused(false)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//           />
//           <SearchButton onClick={handleSearch}>
//             <SearchIcon />
//           </SearchButton>
//         </SearchBar>

//         {/* Bouton panier flottant */}
//         <Link to="/cart">
//           <FloatingButton>
//             <FaShoppingCart size={24} />
//             {cartItems.length > 0 && <CartBadge>{cartItems.reduce((total, item) => total + (item.quantity || 1), 0)}</CartBadge>}
//           </FloatingButton>
//         </Link>
//       </Container>
//     </CartContext.Provider>
//   );
// };

// export default App;
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbarr from './accessoireMariam/components/Navbarr';
// import AccessoireMariam from './accessoireMariam/AccessoireMariam';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import DetailAccessoireMariam from './accessoireMariam/components/DetailAccessoireMariam';
// import ProductPage from './accessoireMariam/components/ProductPage'; // Vérifiez ce chemin

// function App() {
//   return (
//     <Router>
//       <Navbarr />
//       <Routes>
//         <Route path="*" element={<h2>404 - Page non trouvée</h2>} />
//         <Route path="/" element={<AccessoireMariam />} />
//         <Route path="/accessoire/:id" element={<DetailAccessoireMariam />} />
//         <Route path="/produitconfirme" element={<ProductPage/>} /> {/* Route ajoutée */}
//       </Routes>
//     </Router>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import styled, { createGlobalStyle, keyframes, ThemeProvider } from 'styled-components';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';

// // ========== THEME & GLOBAL STYLES ==========
// const theme = {
//   light: {
//     primary: '#4a6fa5',
//     secondary: '#ff7e5f',
//     background: '#ffffff',
//     text: '#333333',
//     cardBg: '#f8f9fa',
//     headerBg: '#343a40',
//     footerBg: '#212529',
//     success: '#28a745',
//     danger: '#dc3545',
//     warning: '#ffc107',
//   },
//   dark: {
//     primary: '#6c8fc7',
//     secondary: '#ff9e7f',
//     background: '#1a1a2e',
//     text: '#f0f0f0',
//     cardBg: '#16213e',
//     headerBg: '#0f3460',
//     footerBg: '#0a192f',
//     success: '#3dd56d',
//     danger: '#ff6b6b',
//     warning: '#ffd166',
//   }
// };

// const GlobalStyle = createGlobalStyle`
//   body {
//     background-color: ${({ theme }) => theme.background};
//     color: ${({ theme }) => theme.text};
//     transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//     font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
//     margin: 0;
//     padding: 0;
//     line-height: 1.6;
//   }

//   .btn-primary {
//     background-color: ${({ theme }) => theme.primary};
//     border-color: ${({ theme }) => theme.primary};
//     transition: all 0.3s ease;

//     &:hover {
//       background-color: ${({ theme }) => theme.primary};
//       filter: brightness(1.1);
//       transform: translateY(-2px);
//     }
//   }

//   .btn-outline-primary {
//     color: ${({ theme }) => theme.primary};
//     border-color: ${({ theme }) => theme.primary};
//     transition: all 0.3s ease;
    
//     &:hover {
//       background-color: ${({ theme }) => theme.primary};
//       color: white;
//       transform: translateY(-2px);
//     }
//   }
// `;

// // ========== ANIMATIONS ==========
// const floatAnimation = keyframes`
//   0% { transform: translateY(0px); }
//   50% { transform: translateY(-10px); }
//   100% { transform: translateY(0px); }
// `;

// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // ========== STYLED COMPONENTS ==========
// const AppContainer = styled.div`
//   position: relative;
//   min-height: 100vh;
//   display: flex;
//   flex-direction: column;
// `;

// const ThemeSwitcher = styled.div`
//   position: fixed;
//   bottom: 20px;
//   left: 20px;
//   z-index: 1000;
//   width: 50px;
//   height: 50px;
//   border-radius: 50%;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   cursor: pointer;
//   background-color: ${({ theme }) => theme.primary};
//   color: white;
//   box-shadow: 0 4px 15px rgba(0,0,0,0.2);
//   transition: all 0.3s ease;
//   animation: ${pulse} 2s infinite;
  
//   &:hover {
//     transform: scale(1.1) !important;
//     animation: none;
//   }
// `;

// const StyledNavbar = styled.nav`
//   background-color: ${({ theme }) => theme.headerBg} !important;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//   padding: 1rem 0;
//   transition: all 0.3s ease;
// `;

// const HeroSection = styled.section`
//   background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), 
//                     url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
//   background-size: cover;
//   background-position: center;
//   min-height: 70vh;
//   display: flex;
//   align-items: center;
//   color: white;
//   position: relative;
//   overflow: hidden;
//   margin-bottom: 3rem;

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(
//       135deg,
//       ${({ theme }) => theme.primary} 0%,
//       ${({ theme }) => theme.secondary} 100%
//     );
//     opacity: 0.6;
//     z-index: 0;
//   }
// `;

// const HeroContent = styled.div`
//   position: relative;
//   z-index: 1;
//   animation: ${fadeIn} 1s ease-out;
//   text-align: center;
//   width: 100%;
// `;

// const ProductCard = styled.div`
//   background-color: ${({ theme }) => theme.cardBg};
//   border: none;
//   border-radius: 12px;
//   box-shadow: 0 5px 15px rgba(0,0,0,0.1);
//   transform: translateY(0);
//   transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
//   overflow: hidden;
//   height: 100%;
//   display: flex;
//   flex-direction: column;
  
//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 15px 30px rgba(0,0,0,0.2);
//   }
// `;

// const ProductImage = styled.div`
//   height: 300px;
//   overflow: hidden;
//   position: relative;
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s ease;
//   }
  
//   ${ProductCard}:hover & img {
//     transform: scale(1.05);
//   }
// `;

// const ProductBadge = styled.span`
//   position: absolute;
//   padding: 5px 15px;
//   border-radius: 20px;
//   font-weight: 600;
//   font-size: 0.8rem;
//   color: white;
//   top: 15px;
//   ${({ position }) => position === 'left' ? 'left: 15px;' : 'right: 15px;'}
//   background-color: ${({ type, theme }) => 
//     type === 'new' ? theme.success : 
//     type === 'eco' ? theme.success : 
//     type === 'discount' ? theme.danger : theme.primary};
//   transition: all 0.3s ease;
//   z-index: 2;
  
//   &:hover {
//     transform: rotate(5deg) scale(1.05);
//   }
// `;

// const FeaturesSection = styled.section`
//   background: linear-gradient(
//     to right,
//     rgba(74, 111, 165, 0.05) 0%,
//     rgba(255, 126, 95, 0.05) 100%
//   );
//   backdrop-filter: blur(10px);
//   padding: 5rem 0;
//   margin: 3rem 0;
// `;

// const FeatureCard = styled.div`
//   text-align: center;
//   padding: 2rem;
//   border-radius: 12px;
//   transition: all 0.3s ease;
//   background-color: rgba(255,255,255,0.08);
//   backdrop-filter: blur(5px);
//   height: 100%;
  
//   &:hover {
//     transform: translateY(-5px);
//     box-shadow: 0 10px 25px rgba(0,0,0,0.1);
//     background-color: rgba(255,255,255,0.12);
//   }
// `;

// const CategoryButton = styled.button`
//   position: relative;
//   overflow: hidden;
//   transition: all 0.3s ease;
//   border-radius: 20px !important;
//   padding: 8px 20px;
//   font-weight: 500;
//   border: none;
  
//   &::after {
//     content: '';
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 3px;
//     background: ${({ theme }) => theme.secondary};
//     transform: scaleX(0);
//     transform-origin: right;
//     transition: transform 0.3s ease;
//   }
  
//   &:hover::after {
//     transform: scaleX(1);
//     transform-origin: left;
//   }
// `;

// const HighlightText = styled.span`
//   color: ${({ theme }) => theme.secondary};
//   position: relative;
//   display: inline-block;
//   font-weight: 600;
  
//   &::after {
//     content: '';
//     position: absolute;
//     bottom: 2px;
//     left: 0;
//     width: 100%;
//     height: 8px;
//     background-color: ${({ theme }) => `${theme.secondary}40`};
//     z-index: -1;
//     transition: all 0.3s ease;
//     border-radius: 4px;
//   }
  
//   &:hover::after {
//     height: 12px;
//     background-color: ${({ theme }) => `${theme.secondary}60`};
//   }
// `;

// const CartItem = styled.div`
//   transition: all 0.3s ease;
//   animation: ${fadeIn} 0.3s ease-out;
// `;

// const App = () => {
//   // ========== STATE ==========
//   const [products, setProducts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [cart, setCart] = useState([]);
//   const [activeCategory, setActiveCategory] = useState('All');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortOption, setSortOption] = useState('featured');
//   const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);
//   const [currentTheme, setCurrentTheme] = useState('light');

//   // ========== PRODUCT DATA ==========
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Simulate API call
//         await new Promise(resolve => setTimeout(resolve, 1500));
        
//         const mockProducts = [
//   {
//     id: 1,
//     name: 'Vintage Denim Jacket',
//     price: 45.99,
//     originalPrice: 89.99,
//     category: 'Jackets',
//     image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Classic vintage denim jacket from the 90s with authentic wear patterns',
//     condition: 'Good',
//     size: 'M',
//     color: 'Blue',
//     rating: 4.7,
//     reviews: 32,
//     isNew: false,
//     isEcoFriendly: true,
//     discount: 15
//   },
//   {
//     id: 2,
//     name: 'Retro Floral Dress',
//     price: 35.50,
//     originalPrice: 65.00,
//     category: 'Dresses',
//     image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Beautiful 70s inspired floral dress with puff sleeves',
//     condition: 'Excellent',
//     size: 'S',
//     color: 'Multi-color',
//     rating: 4.9,
//     reviews: 28,
//     isNew: true,
//     isEcoFriendly: true,
//     discount: 20
//   },
//   {
//     id: 3,
//     name: 'Classic Leather Jacket',
//     price: 129.99,
//     originalPrice: 249.99,
//     category: 'Jackets',
//     image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Genuine leather motorcycle jacket from the 80s',
//     condition: 'Very Good',
//     size: 'L',
//     color: 'Black',
//     rating: 4.8,
//     reviews: 45,
//     isNew: false,
//     isEcoFriendly: false,
//     discount: 35
//   },
//   {
//     id: 4,
//     name: 'Vintage Band T-Shirt',
//     price: 24.99,
//     originalPrice: 39.99,
//     category: 'T-Shirts',
//     image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Original 1992 concert tour t-shirt in great condition',
//     condition: 'Good',
//     size: 'M',
//     color: 'Black',
//     rating: 4.5,
//     reviews: 18,
//     isNew: false,
//     isEcoFriendly: true,
//     discount: 10
//   },
//   {
//     id: 5,
//     name: '90s High-Waisted Jeans',
//     price: 39.99,
//     originalPrice: 69.99,
//     category: 'Jeans',
//     image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Authentic 90s high-waisted straight leg jeans',
//     condition: 'Good',
//     size: '28',
//     color: 'Light Blue',
//     rating: 4.6,
//     reviews: 22,
//     isNew: true,
//     isEcoFriendly: true,
//     discount: 25
//   },
//   {
//     id: 6,
//     name: 'Vintage Wool Coat',
//     price: 89.99,
//     originalPrice: 179.99,
//     category: 'Coats',
//     image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Warm 60s style wool coat with original buttons',
//     condition: 'Excellent',
//     size: 'M',
//     color: 'Beige',
//     rating: 4.7,
//     reviews: 15,
//     isNew: false,
//     isEcoFriendly: true,
//     discount: 30
//   },
//   {
//     id: 7,
//     name: 'Retro Silk Blouse',
//     price: 29.99,
//     originalPrice: 59.99,
//     category: 'Blouses',
//     image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Elegant 80s silk blouse with ruffled collar',
//     condition: 'Very Good',
//     size: 'S',
//     color: 'Cream',
//     rating: 4.4,
//     reviews: 12,
//     isNew: false,
//     isEcoFriendly: false,
//     discount: 15
//   },
//   {
//     id: 8,
//     name: 'Vintage Leather Bag',
//     price: 65.00,
//     originalPrice: 120.00,
//     category: 'Accessories',
//     image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Genuine leather crossbody bag from the 70s',
//     condition: 'Good',
//     size: 'One Size',
//     color: 'Brown',
//     rating: 4.9,
//     reviews: 27,
//     isNew: true,
//     isEcoFriendly: true,
//     discount: 40
//   },
//   {
//     id: 9,
//     name: 'Oversized Denim Shirt',
//     price: 34.99,
//     originalPrice: 49.99,
//     category: 'Shirts',
//     image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: '90s oversized denim shirt perfect for layering',
//     condition: 'Excellent',
//     size: 'L',
//     color: 'Light Blue',
//     rating: 4.3,
//     reviews: 19,
//     isNew: false,
//     isEcoFriendly: true,
//     discount: 20
//   },
//   {
//     id: 10,
//     name: 'Corduroy Pants',
//     price: 42.99,
//     originalPrice: 75.00,
//     category: 'Pants',
//     image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Vintage wide-leg corduroy pants in autumn colors',
//     condition: 'Very Good',
//     size: '30',
//     color: 'Mustard',
//     rating: 4.8,
//     reviews: 14,
//     isNew: true,
//     isEcoFriendly: true,
//     discount: 25
//   },
//   {
//     id: 11,
//     name: 'Cashmere Sweater',
//     price: 79.99,
//     originalPrice: 149.99,
//     category: 'Sweaters',
//     image: 'https://images.unsplash.com/photo-1551024595-11d789871929?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Luxurious vintage cashmere sweater in perfect condition',
//     condition: 'Excellent',
//     size: 'M',
//     color: 'Camel',
//     rating: 4.9,
//     reviews: 36,
//     isNew: false,
//     isEcoFriendly: true,
//     discount: 40
//   },
//   {
//     id: 12,
//     name: 'Silk Scarf',
//     price: 22.50,
//     originalPrice: 45.00,
//     category: 'Accessories',
//     image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//     description: 'Vintage floral silk scarf from the 60s',
//     condition: 'Good',
//     size: 'One Size',
//     color: 'Pink',
//     rating: 4.2,
//     reviews: 8,
//     isNew: false,
//     isEcoFriendly: true,
//     discount: 15
//   }
// ];
        
//         setProducts(mockProducts);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         setIsLoading(false);
//       }
//     };
    
//     fetchProducts();
//   }, []);

//   // ========== BUSINESS LOGIC ==========
//   const categories = ['All', ...new Set(products.map(product => product.category))];

//   const filteredProducts = products
//     .filter(product => {
//       const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
//       const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
//                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
//       return matchesCategory && matchesSearch;
//     })
//     .sort((a, b) => {
//       switch(sortOption) {
//         case 'price-low': return a.price - b.price;
//         case 'price-high': return b.price - a.price;
//         case 'rating': return b.rating - a.rating;
//         case 'discount': return b.discount - a.discount;
//         default: return b.isNew - a.isNew || b.rating - a.rating;
//       }
//     });

//   const addToCart = (product) => {
//     setCart(prevCart => {
//       const existingItem = prevCart.find(item => item.id === product.id);
//       return existingItem 
//         ? prevCart.map(item => item.id === product.id ? {...item, quantity: item.quantity + 1} : item)
//         : [...prevCart, {...product, quantity: 1}];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity < 1) return;
//     setCart(prevCart => prevCart.map(item => 
//       item.id === productId ? {...item, quantity: newQuantity} : item
//     ));
//   };

//   const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   const handleCheckout = () => {
//     setShowCheckoutSuccess(true);
//     setTimeout(() => {
//       setCart([]);
//       setShowCheckoutSuccess(false);
//     }, 3000);
//   };

//   const toggleTheme = () => {
//     setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
//   };

//   const renderStars = (rating) => {
//     return [...Array(5)].map((_, i) => (
//       <i 
//         key={i}
//         className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'}`}
//         style={{ color: theme[currentTheme].warning }}
//       />
//     ));
//   };

//   // ========== RENDER ==========
//   return (
//     <ThemeProvider theme={theme[currentTheme]}>
//       <GlobalStyle />
//       <AppContainer>
//         <ThemeSwitcher onClick={toggleTheme}>
//           {currentTheme === 'light' ? '🌙' : '☀️'}
//         </ThemeSwitcher>

//         {/* Navigation */}
//         <StyledNavbar className="navbar navbar-expand-lg navbar-dark sticky-top">
//           <div className="container">
//             <a className="navbar-brand d-flex align-items-center" href="#">
//               <i className="bi bi-recycle me-2" style={{ fontSize: '1.5rem' }}></i>
//               <span className="fw-bold">SecondStyle</span>
//             </a>
//             <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//               <span className="navbar-toggler-icon"></span>
//             </button>
//             <div className="collapse navbar-collapse" id="navbarNav">
//               <ul className="navbar-nav me-auto">
//                 <li className="nav-item">
//                   <a className="nav-link active" href="#">
//                     <i className="bi bi-house-door me-1"></i> Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     <i className="bi bi-shop me-1"></i> Shop
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="#">
//                     <i className="bi bi-info-circle me-1"></i> About
//                   </a>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <a className="nav-link dropdown-toggle" href="#" id="categoriesDropdown" role="button" data-bs-toggle="dropdown">
//                     <i className="bi bi-tags me-1"></i> Categories
//                   </a>
//                   <ul className="dropdown-menu">
//                     {categories.map(category => (
//                       <li key={category}>
//                         <button 
//                           className="dropdown-item" 
//                           onClick={() => setActiveCategory(category)}
//                         >
//                           {category}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               </ul>
//               <div className="d-flex align-items-center">
//                 <div className="input-group me-3" style={{ width: '200px' }}>
//                   <input 
//                     type="text" 
//                     className="form-control form-control-sm" 
//                     placeholder="Search..." 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                   />
//                   <button className="btn btn-sm btn-outline-light" type="button">
//                     <i className="bi bi-search"></i>
//                   </button>
//                 </div>
//                 <button 
//                   className="btn btn-outline-light position-relative" 
//                   data-bs-toggle="modal" 
//                   data-bs-target="#cartModal"
//                 >
//                   <i className="bi bi-cart3"></i>
//                   {cart.length > 0 && (
//                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                       {cart.reduce((total, item) => total + item.quantity, 0)}
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </StyledNavbar>

//         {/* Hero Section */}
//         <HeroSection>
//           <div className="container">
//             <HeroContent>
//               <h1 className="display-3 fw-bold mb-3">
//                 Sustainable <HighlightText>Fashion</HighlightText>
//               </h1>
//               <p className="lead mb-4">Give pre-loved clothes a second life while saving money and the planet</p>
//               <div className="input-group mb-3 w-50 mx-auto">
//                 <input 
//                   type="text" 
//                   className="form-control" 
//                   placeholder="Search for items..." 
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//                 <button className="btn btn-primary" type="button">
//                   <i className="bi bi-search me-2"></i> Search
//                 </button>
//               </div>
//             </HeroContent>
//           </div>
//         </HeroSection>

//         {/* Main Content */}
//         <main className="container mb-5">
//           {/* Category Filter */}
//           <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-5">
//             <div className="mb-3 mb-md-0">
//               <h2 className="h3 mb-3">
//                 {activeCategory === 'All' ? 'All Products' : activeCategory}
//                 <span className="text-muted ms-2">({filteredProducts.length} items)</span>
//               </h2>
//               <div className="d-flex flex-wrap gap-2">
//                 {categories.map(category => (
//                   <CategoryButton
//                     key={category}
//                     className={`btn ${activeCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
//                     onClick={() => setActiveCategory(category)}
//                   >
//                     {category}
//                   </CategoryButton>
//                 ))}
//               </div>
//             </div>
//             <div className="d-flex align-items-center">
//               <label htmlFor="sortSelect" className="me-2 mb-0">Sort by:</label>
//               <select 
//                 id="sortSelect" 
//                 className="form-select form-select-sm" 
//                 style={{ width: '150px' }}
//                 value={sortOption}
//                 onChange={(e) => setSortOption(e.target.value)}
//               >
//                 <option value="featured">Featured</option>
//                 <option value="price-low">Price: Low to High</option>
//                 <option value="price-high">Price: High to Low</option>
//                 <option value="rating">Customer Rating</option>
//                 <option value="discount">Best Discount</option>
//               </select>
//             </div>
//           </div>

//           {/* Product Grid */}
//           {isLoading ? (
//             <div className="d-flex justify-content-center align-items-center py-5">
//               <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
//                 <span className="visually-hidden">Loading...</span>
//               </div>
//             </div>
//           ) : (
//             <div className="row g-4">
//               {filteredProducts.length > 0 ? (
//                 filteredProducts.map(product => (
//                   <div key={product.id} className="col-md-6 col-lg-4 col-xl-3">
//                     <ProductCard>
//                       <ProductImage>
//                         <img src={product.image} alt={product.name} />
//                         {product.isNew && (
//                           <ProductBadge type="new" position="left">
//                             New
//                           </ProductBadge>
//                         )}
//                         {product.discount > 0 && (
//                           <ProductBadge type="discount" position="right">
//                             -{product.discount}%
//                           </ProductBadge>
//                         )}
//                         {product.isEcoFriendly && (
//                           <ProductBadge type="eco" position="left" style={{ top: product.isNew ? '50px' : '15px' }}>
//                             <i className="bi bi-leaf me-1"></i> Eco
//                           </ProductBadge>
//                         )}
//                       </ProductImage>
//                       <div className="card-body d-flex flex-column">
//                         <div className="d-flex justify-content-between align-items-start mb-2">
//                           <h5 className="card-title mb-0">{product.name}</h5>
//                           <div className="d-flex align-items-center">
//                             {renderStars(product.rating)}
//                             <small className="text-muted ms-1">({product.reviews})</small>
//                           </div>
//                         </div>
//                         <p className="card-text text-muted small mb-2">
//                           <span className="me-2">{product.condition} Condition</span>
//                           <span className="me-2">•</span>
//                           <span className="me-2">{product.size}</span>
//                           <span className="me-2">•</span>
//                           <span>{product.color}</span>
//                         </p>
//                         <p className="card-text small mb-3">{product.description}</p>
//                         <div className="mt-auto">
//                           <div className="d-flex align-items-center mb-2">
//                             <span className="h5 mb-0 text-primary">${product.price.toFixed(2)}</span>
//                             {product.originalPrice > product.price && (
//                               <span className="text-muted text-decoration-line-through ms-2 small">
//                                 ${product.originalPrice.toFixed(2)}
//                               </span>
//                             )}
//                           </div>
//                           <button 
//                             className="btn btn-primary w-100"
//                             onClick={() => addToCart(product)}
//                           >
//                             <i className="bi bi-cart-plus me-2"></i> Add to Cart
//                           </button>
//                         </div>
//                       </div>
//                     </ProductCard>
//                   </div>
//                 ))
//               ) : (
//                 <div className="col-12 text-center py-5">
//                   <i className="bi bi-search display-1 text-muted mb-4"></i>
//                   <h3>No products found</h3>
//                   <p className="text-muted">Try adjusting your search or filter criteria</p>
//                   <button 
//                     className="btn btn-outline-primary mt-3"
//                     onClick={() => {
//                       setActiveCategory('All');
//                       setSearchTerm('');
//                     }}
//                   >
//                     Reset Filters
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}
//         </main>

//         {/* Features Section */}
//         <FeaturesSection>
//           <div className="container">
//             <div className="text-center mb-5">
//               <h2 className="fw-bold">
//                 Why Choose <HighlightText>SecondStyle</HighlightText>?
//               </h2>
//               <p className="text-muted">Sustainable shopping with amazing benefits</p>
//             </div>
//             <div className="row g-4">
//               <div className="col-md-4">
//                 <FeatureCard>
//                   <div className="bg-primary bg-opacity-10 text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
//                     <i className="bi bi-currency-dollar fs-3"></i>
//                   </div>
//                   <h4>Save Money</h4>
//                   <p className="text-muted mb-0">Get high-quality fashion at a fraction of retail prices.</p>
//                 </FeatureCard>
//               </div>
//               <div className="col-md-4">
//                 <FeatureCard>
//                   <div className="bg-success bg-opacity-10 text-success rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
//                     <i className="bi bi-leaf fs-3"></i>
//                   </div>
//                   <h4>Eco-Friendly</h4>
//                   <p className="text-muted mb-0">Reduce fashion waste and help the environment.</p>
//                 </FeatureCard>
//               </div>
//               <div className="col-md-4">
//                 <FeatureCard>
//                   <div className="bg-warning bg-opacity-10 text-warning rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ width: '70px', height: '70px' }}>
//                     <i className="bi bi-stars fs-3"></i>
//                   </div>
//                   <h4>Unique Finds</h4>
//                   <p className="text-muted mb-0">Discover vintage and one-of-a-kind pieces.</p>
//                 </FeatureCard>
//               </div>
//             </div>
//           </div>
//         </FeaturesSection>

//         {/* Newsletter Section */}
//         <section className="bg-primary text-white py-5 mb-5">
//           <div className="container">
//             <div className="row align-items-center">
//               <div className="col-md-6 mb-4 mb-md-0">
//                 <h3 className="fw-bold mb-3">Join Our Community</h3>
//                 <p className="mb-0">Subscribe to get exclusive offers, styling tips, and updates on new arrivals.</p>
//               </div>
//               <div className="col-md-6">
//                 <div className="input-group">
//                   <input type="email" className="form-control" placeholder="Your email address" />
//                   <button className="btn btn-dark" type="button">Subscribe</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Footer */}
//         <footer className="bg-dark text-white py-5" style={{ backgroundColor: theme[currentTheme].footerBg }}>
//           <div className="container">
//             <div className="row">
//               <div className="col-lg-4 mb-4 mb-lg-0">
//                 <h5 className="d-flex align-items-center mb-3">
//                   <i className="bi bi-recycle me-2"></i>
//                   <span>SecondStyle</span>
//                 </h5>
//                 <p className="small">Giving clothes a second life, one purchase at a time. Sustainable fashion for a better future.</p>
//                 <div className="d-flex gap-3">
//                   <a href="#" className="text-white"><i className="bi bi-facebook fs-5"></i></a>
//                   <a href="#" className="text-white"><i className="bi bi-instagram fs-5"></i></a>
//                   <a href="#" className="text-white"><i className="bi bi-twitter fs-5"></i></a>
//                   <a href="#" className="text-white"><i className="bi bi-pinterest fs-5"></i></a>
//                 </div>
//               </div>
//               <div className="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
//                 <h6 className="mb-3">Shop</h6>
//                 <ul className="list-unstyled">
//                   <li className="mb-2"><a href="#" className="text-white-50 small">All Products</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">New Arrivals</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Best Sellers</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Sale Items</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Eco-Friendly</a></li>
//                 </ul>
//               </div>
//               <div className="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
//                 <h6 className="mb-3">Help</h6>
//                 <ul className="list-unstyled">
//                   <li className="mb-2"><a href="#" className="text-white-50 small">FAQs</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Shipping</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Returns</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Size Guide</a></li>
//                   <li className="mb-2"><a href="#" className="text-white-50 small">Contact Us</a></li>
//                 </ul>
//               </div>
//               <div className="col-md-4 col-lg-4">
//                 <h6 className="mb-3">Contact Info</h6>
//                 <ul className="list-unstyled small text-white-50">
//                   <li className="mb-2 d-flex align-items-center">
//                     <i className="bi bi-geo-alt me-2"></i>
//                     <span>123 Fashion St, Style City, SC 12345</span>
//                   </li>
//                   <li className="mb-2 d-flex align-items-center">
//                     <i className="bi bi-envelope me-2"></i>
//                     <span>info@secondstyle.com</span>
//                   </li>
//                   <li className="mb-2 d-flex align-items-center">
//                     <i className="bi bi-telephone me-2"></i>
//                     <span>(123) 456-7890</span>
//                   </li>
//                   <li className="mb-2 d-flex align-items-center">
//                     <i className="bi bi-clock me-2"></i>
//                     <span>Mon-Fri: 9AM-6PM</span>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <hr className="my-4 bg-secondary" />
//             <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
//               <p className="small mb-3 mb-md-0">&copy; {new Date().getFullYear()} SecondStyle. All rights reserved.</p>
//               <div className="d-flex gap-3">
//                 <a href="#" className="text-white-50 small">Privacy Policy</a>
//                 <a href="#" className="text-white-50 small">Terms of Service</a>
//                 <a href="#" className="text-white-50 small">Sitemap</a>
//               </div>
//             </div>
//           </div>
//         </footer>

//         {/* Cart Modal */}
//         <div className="modal fade" id="cartModal" tabIndex="-1" aria-hidden="true">
//           <div className="modal-dialog modal-dialog-centered modal-lg">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title d-flex align-items-center">
//                   <i className="bi bi-cart3 me-2"></i>
//                   Your Shopping Cart
//                   <span className="badge bg-primary rounded-pill ms-2">
//                     {cart.reduce((total, item) => total + item.quantity, 0)}
//                   </span>
//                 </h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//               </div>
//               <div className="modal-body">
//                 {cart.length === 0 ? (
//                   <div className="text-center py-4">
//                     <i className="bi bi-cart-x display-4 text-muted mb-3"></i>
//                     <h5>Your cart is empty</h5>
//                     <p className="text-muted">Start shopping to add items to your cart</p>
//                     <button 
//                       className="btn btn-primary mt-2" 
//                       data-bs-dismiss="modal"
//                       onClick={() => setActiveCategory('All')}
//                     >
//                       Browse Products
//                     </button>
//                   </div>
//                 ) : (
//                   <div>
//                     <div className="table-responsive">
//                       <table className="table">
//                         <thead>
//                           <tr>
//                             <th>Item</th>
//                             <th>Price</th>
//                             <th>Quantity</th>
//                             <th>Total</th>
//                             <th></th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {cart.map(item => (
//                             <CartItem key={item.id}>
//                               <tr>
//                                 <td>
//                                   <div className="d-flex align-items-center">
//                                     <img 
//                                       src={item.image} 
//                                       alt={item.name} 
//                                       className="rounded me-3" 
//                                       style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                                     />
//                                     <div>
//                                       <h6 className="mb-0">{item.name}</h6>
//                                       <small className="text-muted">{item.category}</small>
//                                     </div>
//                                   </div>
//                                 </td>
//                                 <td>${item.price.toFixed(2)}</td>
//                                 <td>
//                                   <div className="d-flex align-items-center">
//                                     <button 
//                                       className="btn btn-sm btn-outline-secondary"
//                                       onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                                     >
//                                       -
//                                     </button>
//                                     <span className="mx-2">{item.quantity}</span>
//                                     <button 
//                                       className="btn btn-sm btn-outline-secondary"
//                                       onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                                     >
//                                       +
//                                     </button>
//                                   </div>
//                                 </td>
//                                 <td>${(item.price * item.quantity).toFixed(2)}</td>
//                                 <td>
//                                   <button 
//                                     className="btn btn-sm btn-outline-danger"
//                                     onClick={() => removeFromCart(item.id)}
//                                   >
//                                     <i className="bi bi-trash"></i>
//                                   </button>
//                                 </td>
//                               </tr>
//                             </CartItem>
//                           ))}
//                         </tbody>
//                       </table>
//                     </div>
//                     <div className="bg-light p-3 rounded mb-3">
//                       <div className="d-flex justify-content-between mb-2">
//                         <span>Subtotal:</span>
//                         <span>${cartTotal.toFixed(2)}</span>
//                       </div>
//                       <div className="d-flex justify-content-between mb-2">
//                         <span>Shipping:</span>
//                         <span>FREE</span>
//                       </div>
//                       <div className="d-flex justify-content-between fw-bold">
//                         <span>Total:</span>
//                         <span>${cartTotal.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="modal-footer">
//                 <button 
//                   type="button" 
//                   className="btn btn-secondary" 
//                   data-bs-dismiss="modal"
//                 >
//                   Continue Shopping
//                 </button>
//                 {cart.length > 0 && (
//                   <button 
//                     type="button" 
//                     className="btn btn-primary"
//                     onClick={handleCheckout}
//                   >
//                     Proceed to Checkout
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Checkout Success Toast */}
//         {showCheckoutSuccess && (
//           <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 11 }}>
//             <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
//               <div className="toast-header bg-success text-white">
//                 <strong className="me-auto">Order Successful!</strong>
//                 <button 
//                   type="button" 
//                   className="btn-close btn-close-white" 
//                   onClick={() => setShowCheckoutSuccess(false)}
//                 ></button>
//               </div>
//               <div className="toast-body">
//                 Thank you for your purchase! Your items will be shipped soon.
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Back to Top Button */}
//         <button 
//           className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-3 d-flex align-items-center justify-content-center" 
//           style={{ 
//             width: '50px', 
//             height: '50px', 
//             zIndex: 10,
//             backgroundColor: theme[currentTheme].primary
//           }}
//           onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//         >
//           <i className="bi bi-arrow-up"></i>
//         </button>
//       </AppContainer>
//     </ThemeProvider>
//   );
// };


// export default App;
// import React, { useState } from 'react';
// import styled, { createGlobalStyle, keyframes, ThemeProvider } from 'styled-components';
// import { FaSearch, FaLeaf, FaTshirt, FaShippingFast, FaRegHeart, FaFacebook, FaInstagram, FaPinterest } from 'react-icons/fa';
// import { BsArrowRight, BsRecycle, BsTiktok } from 'react-icons/bs';

// // ========== STYLE GLOBAL ==========
// const GlobalStyle = createGlobalStyle`
//   * {
//     margin: 0;
//     padding: 0;
//     box-sizing: border-box;
//   }

//   body {
//     font-family: 'Raleway', sans-serif;
//     color: #2D2D2A;
//     line-height: 1.6;
//   }

//   h1, h2, h3, h4 {
//     font-family: 'Playfair Display', serif;
//   }

//   a {
//     text-decoration: none;
//     color: inherit;
//   }

//   img {
//     max-width: 100%;
//     height: auto;
//   }
// `;

// // ========== THÈME ==========
// const theme = {
//   colors: {
//     primary: '#3A7D44',
//     secondary: '#FF715B',
//     dark: '#2D2D2A',
//     light: '#F9F9F9',
//     grey: '#E8E8E8'
//   },
//   fonts: {
//     main: "'Raleway', sans-serif",
//     secondary: "'Playfair Display', serif"
//   }
// };

// // ========== ANIMATIONS ==========
// const fadeIn = keyframes`
//   from { opacity: 0; transform: translateY(20px); }
//   to { opacity: 1; transform: translateY(0); }
// `;

// const pulse = keyframes`
//   0% { transform: scale(1); }
//   50% { transform: scale(1.05); }
//   100% { transform: scale(1); }
// `;

// // ========== COMPOSANTS ==========
// const Container = styled.div`
//   max-width: 100%;
//   overflow-x: hidden;
// `;

// const Navbar = styled.nav`
//   background: white;
//   box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//   padding: 1.5rem 5%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   position: fixed;
//   width: 100%;
//   z-index: 100;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     padding: 1rem;
//   }
// `;

// const Logo = styled.div`
//   font-family: ${theme.fonts.secondary};
//   font-weight: 700;
//   font-size: 1.8rem;
//   color: ${theme.colors.primary};
//   display: flex;
//   align-items: center;
  
//   span {
//     color: ${theme.colors.secondary};
//   }

//   svg {
//     margin-right: 10px;
//     font-size: 1.5rem;
//   }
// `;

// const NavLinks = styled.div`
//   display: flex;
//   gap: 2rem;
  
//   @media (max-width: 768px) {
//     display: none;
//   }
// `;

// const NavLink = styled.a`
//   font-weight: 500;
//   transition: color 0.3s;
  
//   &:hover {
//     color: ${theme.colors.primary};
//   }
// `;

// const Button = styled.button`
//   background: ${theme.colors.primary};
//   color: white;
//   border: none;
//   padding: 1rem 2rem;
//   font-size: 1rem;
//   font-weight: 600;
//   border-radius: 50px;
//   cursor: pointer;
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
//   transition: all 0.3s;
  
//   &:hover {
//     background: ${theme.colors.secondary};
//     transform: translateY(-3px);
//   }

//   @media (max-width: 768px) {
//     padding: 0.8rem 1.5rem;
//     font-size: 0.9rem;
//   }
// `;

// const HeroSection = styled.section`
//   background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
//               url('https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
//   background-size: cover;
//   background-position: center;
//   height: 100vh;
//   display: flex;
//   align-items: center;
//   padding: 0 5%;
//   color: white;
// `;

// const HeroContent = styled.div`
//   max-width: 600px;
//   animation: ${fadeIn} 1s ease-out;
// `;

// const Title = styled.h1`
//   font-size: 3.5rem;
//   margin-bottom: 1.5rem;
//   line-height: 1.2;
  
//   @media (max-width: 768px) {
//     font-size: 2.5rem;
//   }
// `;

// const Subtitle = styled.p`
//   font-size: 1.2rem;
//   margin-bottom: 2rem;
//   line-height: 1.6;
// `;

// const FeaturesSection = styled.section`
//   padding: 5rem 5%;
//   background: ${theme.colors.light};
// `;

// const SectionTitle = styled.h2`
//   font-size: 2.5rem;
//   text-align: center;
//   margin-bottom: 3rem;
//   position: relative;
  
//   &::after {
//     content: '';
//     position: absolute;
//     bottom: -10px;
//     left: 50%;
//     transform: translateX(-50%);
//     width: 80px;
//     height: 3px;
//     background: ${theme.colors.primary};
//   }
// `;

// const FeaturesGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//   gap: 2rem;
// `;

// const FeatureCard = styled.div`
//   background: white;
//   padding: 2rem;
//   border-radius: 10px;
//   box-shadow: 0 5px 15px rgba(0,0,0,0.05);
//   text-align: center;
//   transition: transform 0.3s;
  
//   &:hover {
//     transform: translateY(-10px);
//   }
// `;

// const FeatureIcon = styled.div`
//   font-size: 2.5rem;
//   color: ${theme.colors.primary};
//   margin-bottom: 1rem;
// `;

// const FeatureTitle = styled.h3`
//   font-size: 1.5rem;
//   margin-bottom: 1rem;
// `;

// const FeatureText = styled.p`
//   color: #666;
//   line-height: 1.6;
// `;

// const ProductsSection = styled.section`
//   padding: 5rem 5%;
//   background: white;
// `;

// const ProductGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
//   gap: 2rem;
//   margin-top: 3rem;
// `;

// const ProductCard = styled.div`
//   background: white;
//   border-radius: 10px;
//   overflow: hidden;
//   box-shadow: 0 5px 15px rgba(0,0,0,0.05);
//   transition: all 0.3s;
//   position: relative;
  
//   &:hover {
//     transform: translateY(-10px);
//     box-shadow: 0 15px 30px rgba(0,0,0,0.1);
//   }
// `;

// const ProductImage = styled.div`
//   height: 300px;
//   background: ${theme.colors.grey};
//   position: relative;
//   overflow: hidden;
  
//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     transition: transform 0.5s;
//   }
// `;

// const ProductBadge = styled.span`
//   position: absolute;
//   top: 15px;
//   right: 15px;
//   background: ${theme.colors.secondary};
//   color: white;
//   padding: 0.3rem 1rem;
//   border-radius: 20px;
//   font-size: 0.8rem;
//   font-weight: 600;
// `;

// const ProductInfo = styled.div`
//   padding: 1.5rem;
// `;

// const ProductTitle = styled.h3`
//   font-size: 1.2rem;
//   margin-bottom: 0.5rem;
// `;

// const ProductPrice = styled.p`
//   font-weight: 700;
//   color: ${theme.colors.primary};
//   margin-bottom: 1rem;
  
//   span {
//     color: #999;
//     text-decoration: line-through;
//     margin-left: 0.5rem;
//     font-weight: 400;
//   }
// `;

// const Newsletter = styled.section`
//   background: linear-gradient(135deg, ${theme.colors.primary} 0%, #2D5E36 100%);
//   padding: 4rem 5%;
//   color: white;
//   text-align: center;
// `;

// const NewsletterTitle = styled.h2`
//   font-size: 2.5rem;
//   margin-bottom: 1rem;
// `;

// const NewsletterForm = styled.form`
//   display: flex;
//   max-width: 500px;
//   margin: 2rem auto 0;
  
//   input {
//     flex: 1;
//     padding: 1rem;
//     border: none;
//     border-radius: 50px 0 0 50px;
//     font-size: 1rem;
//   }
  
//   button {
//     background: ${theme.colors.secondary};
//     color: white;
//     border: none;
//     padding: 0 2rem;
//     border-radius: 0 50px 50px 0;
//     font-weight: 600;
//     cursor: pointer;
//     transition: background 0.3s;
    
//     &:hover {
//       background: #E85A4F;
//     }
//   }
// `;

// const Footer = styled.footer`
//   background: ${theme.colors.dark};
//   color: white;
//   padding: 4rem 5% 2rem;
// `;

// const FooterGrid = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//   gap: 2rem;
//   margin-bottom: 3rem;
// `;

// const FooterColumn = styled.div`
//   h3 {
//     margin-bottom: 1.5rem;
//     position: relative;
    
//     &::after {
//       content: '';
//       position: absolute;
//       bottom: -10px;
//       left: 0;
//       width: 40px;
//       height: 2px;
//       background: ${theme.colors.primary};
//     }
//   }
  
//   ul {
//     list-style: none;
//     padding: 0;
    
//     li {
//       margin-bottom: 0.8rem;
      
//       a {
//         color: #ccc;
//         transition: color 0.3s;
        
//         &:hover {
//           color: white;
//         }
//       }
//     }
//   }
// `;

// const SocialIcons = styled.div`
//   display: flex;
//   gap: 1rem;
//   margin-top: 1rem;
  
//   a {
//     color: white;
//     font-size: 1.2rem;
//     transition: color 0.3s;
    
//     &:hover {
//       color: ${theme.colors.primary};
//     }
//   }
// `;

// const Copyright = styled.p`
//   text-align: center;
//   padding-top: 2rem;
//   border-top: 1px solid #444;
//   color: #999;
//   font-size: 0.9rem;
// `;

// // ========== COMPOSANT PRINCIPAL ==========
// const App = () => {
//   const [email, setEmail] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Merci pour votre inscription ! Un email a été envoyé à ${email}`);
//     setEmail('');
//   };

//   const featuredProducts = [
//     {
//       id: 1,
//       name: 'Veste en jean vintage',
//       price: 45.99,
//       originalPrice: 89.99,
//       image: 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//       badge: '-40%'
//     },
//     {
//       id: 2,
//       name: 'Robe fleurie rétro',
//       price: 35.50,
//       originalPrice: 65.00,
//       image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//       badge: 'Nouveau'
//     },
//     {
//       id: 3,
//       name: 'Veste en cuir classique',
//       price: 129.99,
//       originalPrice: 249.99,
//       image: 'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//       badge: '-50%'
//     },
//     {
//       id: 4,
//       name: 'T-shirt de groupe vintage',
//       price: 24.99,
//       originalPrice: 39.99,
//       image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80&bg=white',
//       badge: 'Éco'
//     }
//   ];

//   return (
//     <ThemeProvider theme={theme}>
//       <GlobalStyle />
//       <Container>
//         {/* Navigation */}
//         <Navbar>
//           <Logo>
//             <BsRecycle />
//             ReFashion<span>.</span>
//           </Logo>
//           <NavLinks>
//             <NavLink href="#">Accueil</NavLink>
//             <NavLink href="#">Boutique</NavLink>
//             <NavLink href="#">Comment ça marche</NavLink>
//             <NavLink href="#">À propos</NavLink>
//             <NavLink href="#">Contact</NavLink>
//           </NavLinks>
//           <Button>
//             <FaSearch /> Rechercher
//           </Button>
//         </Navbar>

//         {/* Hero Section */}
//         <HeroSection>
//           <HeroContent>
//             <Title>Donnez une seconde vie à vos vêtements préférés</Title>
//             <Subtitle>
//               Découvrez notre sélection exclusive de vêtements d'occasion de qualité,
//               soigneusement sélectionnés pour vous offrir style et durabilité.
//             </Subtitle>
//             <Button>
//               Explorer la collection <BsArrowRight />
//             </Button>
//           </HeroContent>
//         </HeroSection>

//         {/* Features Section */}
//         <FeaturesSection>
//           <SectionTitle>Pourquoi choisir ReFashion ?</SectionTitle>
//           <FeaturesGrid>
//             <FeatureCard>
//               <FeatureIcon><FaLeaf /></FeatureIcon>
//               <FeatureTitle>Mode durable</FeatureTitle>
//               <FeatureText>
//                 Chaque achat réduit l'impact environnemental de l'industrie textile.
//               </FeatureText>
//             </FeatureCard>
//             <FeatureCard>
//               <FeatureIcon><FaTshirt /></FeatureIcon>
//               <FeatureTitle>Qualité vérifiée</FeatureTitle>
//               <FeatureText>
//                 Tous nos articles sont inspectés pour garantir leur excellent état.
//               </FeatureText>
//             </FeatureCard>
//             <FeatureCard>
//               <FeatureIcon><FaShippingFast /></FeatureIcon>
//               <FeatureTitle>Livraison rapide</FeatureTitle>
//               <FeatureText>
//                 Recevez vos articles en 2-3 jours ouvrés avec emballage écologique.
//               </FeatureText>
//             </FeatureCard>
//           </FeaturesGrid>
//         </FeaturesSection>

//         {/* Products Section */}
//         <ProductsSection>
//           <SectionTitle>Nos dernières trouvailles</SectionTitle>
//           <ProductGrid>
//             {featuredProducts.map(product => (
//               <ProductCard key={product.id}>
//                 <ProductImage>
//                   <img src={product.image} alt={product.name} />
//                   <ProductBadge>{product.badge}</ProductBadge>
//                 </ProductImage>
//                 <ProductInfo>
//                   <ProductTitle>{product.name}</ProductTitle>
//                   <ProductPrice>
//                     {product.price}€ <span>{product.originalPrice}€</span>
//                   </ProductPrice>
//                   <Button style={{ padding: '0.7rem 1rem', fontSize: '0.9rem', width: '100%' }}>
//                     <FaRegHeart /> Ajouter au panier
//                   </Button>
//                 </ProductInfo>
//               </ProductCard>
//             ))}
//           </ProductGrid>
//         </ProductsSection>

//         {/* Newsletter */}
//         <Newsletter>
//           <NewsletterTitle>Abonnez-vous à notre newsletter</NewsletterTitle>
//           <p>Soyez les premiers informés de nos nouvelles arrivées et offres exclusives</p>
//           <NewsletterForm onSubmit={handleSubmit}>
//             <input 
//               type="email" 
//               placeholder="Votre email" 
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required 
//             />
//             <button type="submit">S'abonner</button>
//           </NewsletterForm>
//         </Newsletter>

//         {/* Footer */}
//         <Footer>
//           <FooterGrid>
//             <FooterColumn>
//               <h3>ReFashion</h3>
//               <p>La plateforme de mode circulaire qui redonne vie aux vêtements de qualité.</p>
//               <SocialIcons>
//                 <a href="#"><FaFacebook /></a>
//                 <a href="#"><FaInstagram /></a>
//                 <a href="#"><FaPinterest /></a>
//                 <a href="#"><BsTiktok /></a>
//               </SocialIcons>
//             </FooterColumn>
//             <FooterColumn>
//               <h3>Boutique</h3>
//               <ul>
//                 <li><a href="#">Nouveautés</a></li>
//                 <li><a href="#">Vêtements</a></li>
//                 <li><a href="#">Accessoires</a></li>
//                 <li><a href="#">Soldes</a></li>
//                 <li><a href="#">Éco-responsable</a></li>
//               </ul>
//             </FooterColumn>
//             <FooterColumn>
//               <h3>Aide</h3>
//               <ul>
//                 <li><a href="#">FAQ</a></li>
//                 <li><a href="#">Livraison</a></li>
//                 <li><a href="#">Retours</a></li>
//                 <li><a href="#">Guide des tailles</a></li>
//                 <li><a href="#">Contact</a></li>
//               </ul>
//             </FooterColumn>
//             <FooterColumn>
//               <h3>À propos</h3>
//               <ul>
//                 <li><a href="#">Notre histoire</a></li>
//                 <li><a href="#">Impact écologique</a></li>
//                 <li><a href="#">Blog</a></li>
//                 <li><a href="#">Carrières</a></li>
//                 <li><a href="#">Presse</a></li>
//               </ul>
//             </FooterColumn>
//           </FooterGrid>
//           <Copyright>
//             &copy; {new Date().getFullYear()} ReFashion. Tous droits réservés.
//           </Copyright>
//         </Footer>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default App;
// src/App.js

// import React, { useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { ThemeProvider } from 'styled-components';
// import Navbar from './Navbar';
// import Footer from './Footer';
// import Home from './Home';
// import About from './About';
// import Contact from './Contact';
// import { lightTheme, darkTheme } from './theme';
// import Shop from './shop';
// import Cart from './cart'
// import GlobalStyle from './GlobalStyles';
// import { CartProvider } from "./CartContext";
// import CheckoutPage from './CheckoutPage';
// function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   return (
//     <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
//       <GlobalStyle />
//       <Navbar 
//         onThemeToggle={() => setIsDarkMode(!isDarkMode)} 
//         isDarkMode={isDarkMode}
//       />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/chekoutPage" element={<CheckoutPage />} />
//       </Routes>
//       <Footer />
//     </ThemeProvider>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import styled, { createGlobalStyle, keyframes } from "styled-components";

// Styles globaux
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
  }

  html {
    direction: ltr;
  }
`;

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Composants stylisés
const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: white;
  margin-bottom: 10px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 300;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 30px;
  width: 100%;
  max-width: 1200px;

  @media (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: ${slideIn} 0.6s ease-out;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 12px 40px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.6);
  }
`;

const FormTitle = styled.h2`
  font-size: 1.8rem;
  color: #2d3748;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: #4a5568;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  padding: 15px 20px;
  border: 2px solid ${props => props.error ? '#e53e3e' : '#e2e8f0'};
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  background: white;

  &:focus {
    outline: none;
    border-color: ${props => props.error ? '#e53e3e' : '#4299e1'};
    box-shadow: 0 0 0 3px ${props => props.error ? 'rgba(229, 62, 62, 0.1)' : 'rgba(66, 153, 225, 0.1)'};
    transform: translateY(-2px);
  }
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

const PrimaryButton = styled.button`
  flex: 1;
  background: linear-gradient(135deg, #4299e1 0%, #3182ce 100%);
  color: white;
  border: none;
  padding: 15px 25px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #3182ce 0%, #2b6cb0 100%);
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled.button`
  padding: 15px 25px;
  border: 2px solid #cbd5e0;
  background: transparent;
  color: #4a5568;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #f7fafc;
  }
`;

const SuccessMessage = styled.div`
  background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 12px;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 500;
  animation: ${fadeIn} 0.5s ease;
`;

export default function App() {
  const [formData, setFormData] = useState({ name: "", email: "", job: "" });
  const [users, setUsers] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    setUsers(storedUsers);
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Le nom est requis";
    else if (formData.name.trim().length < 2) newErrors.name = "Le nom doit contenir au moins 2 caractères";
    if (!formData.email.trim()) newErrors.email = "L'e-mail est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "E-mail non valide";
    if (!formData.job.trim()) newErrors.job = "Le métier est requis";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingIndex !== null) {
      const updatedUsers = [...users];
      updatedUsers[editingIndex] = formData;
      setUsers(updatedUsers);
      setSuccessMessage("Utilisateur mis à jour !");
      setEditingIndex(null);
    } else {
      setUsers([...users, { ...formData, id: Date.now() }]);
      setSuccessMessage("Utilisateur ajouté !");
    }

    setFormData({ name: "", email: "", job: "" });
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEdit = (index) => {
    setFormData(users[index]);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    if (window.confirm("Supprimer cet utilisateur ?")) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
      setSuccessMessage("Utilisateur supprimé !");
      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  const handleCancel = () => {
    setFormData({ name: "", email: "", job: "" });
    setEditingIndex(null);
    setErrors({});
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Header>
          <Title>📋 Gestion des utilisateurs</Title>
          <Subtitle>Ajoutez, modifiez et supprimez facilement vos utilisateurs</Subtitle>
        </Header>

        {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

        <GridContainer>
          <GlassCard>
            <FormTitle>{editingIndex !== null ? "✏️ Modifier l'utilisateur" : "➕ Ajouter un utilisateur"}</FormTitle>
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Nom complet *</Label>
                <Input name="name" value={formData.name} onChange={handleChange} error={errors.name} placeholder="Entrez le nom complet" />
                {errors.name && <ErrorMessage>⚠️ {errors.name}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Email *</Label>
                <Input name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} placeholder="exemple@mail.com" />
                {errors.email && <ErrorMessage>⚠️ {errors.email}</ErrorMessage>}
              </FormGroup>

              <FormGroup>
                <Label>Métier *</Label>
                <Input name="job" value={formData.job} onChange={handleChange} error={errors.job} placeholder="Ex : Développeur, Designer" />
                {errors.job && <ErrorMessage>⚠️ {errors.job}</ErrorMessage>}
              </FormGroup>

              <ButtonGroup>
                <PrimaryButton type="submit">{editingIndex !== null ? "💾 Enregistrer" : "➕ Ajouter"}</PrimaryButton>
                {editingIndex !== null && <SecondaryButton onClick={handleCancel}>Annuler</SecondaryButton>}
              </ButtonGroup>
            </Form>
          </GlassCard>

          <GlassCard>
            <FormTitle>👥 Liste des utilisateurs ({users.length})</FormTitle>
            {users.length > 0 ? (
              users.map((user, index) => (
                <div key={user.id || index} style={{ borderBottom: "1px solid #eee", padding: "10px 0" }}>
                  <strong>{user.name}</strong> — {user.email} — {user.job}
                  <div style={{ marginTop: "8px" }}>
                    <button onClick={() => handleEdit(index)}>✏️ Modifier</button>{" "}
                    <button onClick={() => handleDelete(index)}>🗑️ Supprimer</button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucun utilisateur pour le moment.</p>
            )}
          </GlassCard>
        </GridContainer>
      </AppContainer>
    </>
  );
}




