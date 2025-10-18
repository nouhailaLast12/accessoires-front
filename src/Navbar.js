import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes, css } from 'styled-components';
import { 
  FaShoppingCart, 
  FaUser, 
  FaSearch, 
  FaTimes, 
  FaBars,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import { RiShoppingBag3Fill } from 'react-icons/ri';

// Animations
const neonGlow = keyframes`
  0%, 100% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${props => props.theme.colors.primary}, 0 0 30px ${props => props.theme.colors.primary}; }
  50% { text-shadow: 0 0 5px #fff, 0 0 10px #fff, 0 0 20px ${props => props.theme.colors.secondary}, 0 0 30px ${props => props.theme.colors.secondary}; }
`;

const float3D = keyframes`
  0% { transform: translateY(0px) rotateX(0deg); }
  50% { transform: translateY(-10px) rotateX(10deg); }
  100% { transform: translateY(0px) rotateX(0deg); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Composants stylisés
const NavContainer = styled.nav`
  background: ${({ theme }) => theme.colors.navBackground};
  backdrop-filter: ${({ $scrolled }) => ($scrolled ? 'blur(12px)' : 'blur(8px)')};
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  padding: ${({ $scrolled }) => ($scrolled ? '0.5rem 0' : '1rem 0')};
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transform: translateY(${({ $hidden }) => ($hidden ? '-100%' : '0')});
`;

const NavWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media (max-width: 992px) {
    padding: 0 1.5rem;
  }
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  letter-spacing: 1px;
  position: relative;
  z-index: 1001;

  span {
    background: ${({ theme }) => theme.colors.linkUnderline};
    background-size: 200% 200%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: ${gradientFlow} ${({ theme }) => theme.animations.gradientFlow};
    display: inline-block;
  }

  .logo-icon {
    margin-right: 10px;
    font-size: 1.5em;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const NavMenu = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 992px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: ${({ theme }) => theme.colors.navBackground};
    flex-direction: column;
    justify-content: center;
    transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
    opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
    pointer-events: ${({ $isOpen }) => ($isOpen ? 'all' : 'none')};
    z-index: 1000;
    transition: all 0.4s ease;
  }
`;

const NavItem = styled.div`
  margin-left: 2rem;
  position: relative;

  @media (max-width: 992px) {
    margin: 1.5rem 0;
    opacity: 0;
    animation: ${fadeIn} 0.5s ease forwards;
    animation-delay: ${({ $delay }) => $delay || '0s'};
  }
`;

const NavLink = styled(Link)`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.primary : theme.colors.text};
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  padding: 0.5rem 0;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: ${({ theme }) => theme.colors.linkUnderline};
    transform: scaleX(${({ $isActive }) => ($isActive ? '1' : '0')});
    transform-origin: ${({ $isActive }) => ($isActive ? 'left' : 'right')};
    transition: transform 0.4s ease;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }

  @media (max-width: 992px) {
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: 2rem;

  @media (max-width: 992px) {
    margin-left: 0;
    margin-top: 2rem;
  }
`;

const IconLink = styled(Link)`
  color: ${({ theme }) => theme.colors.iconColor};
  font-size: 1.2rem;
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  animation: ${float3D} ${({ theme }) => theme.animations.float3D};
  animation-delay: ${({ $delay }) => $delay || '0s'};

  &:hover {
    color: ${({ theme }) => theme.colors.iconHover};
    transform: translateY(-5px);
  }

  @media (max-width: 992px) {
    font-size: 1.5rem;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -8px;
  right: -10px;
  background: ${({ theme }) => theme.colors.badgeBackground};
  color: ${({ theme }) => theme.colors.badgeText};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 992px) {
    display: block;
  }
`;

const SearchBar = styled.div`
  position: relative;
  margin-left: 2rem;

  input {
    padding: 0.7rem 1.5rem;
    border-radius: 30px;
    border: 1px solid ${({ theme }) => theme.colors.searchBorder};
    background: ${({ theme }) => theme.colors.searchBackground};
    color: ${({ theme }) => theme.colors.text};
    transition: all 0.5s ease;
    width: 200px;

    &:focus {
      outline: none;
      width: 250px;
      border-color: ${({ theme }) => theme.colors.searchFocus};
    }
  }

  @media (max-width: 992px) {
    display: none;
  }
`;

const ThemeToggle = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.2rem;
  cursor: pointer;
  margin-left: 1rem;
  transition: all 0.5s ease;

  &:hover {
    transform: rotate(180deg) scale(1.2);
  }
`;

const Navbar = ({ onThemeToggle, isDarkMode }) => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItems] = useState(3);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY && window.scrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScrollY(window.scrollY);
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <NavContainer $scrolled={scrolled} $hidden={hidden}>
      <NavWrapper>
        <Logo to="/">
          <RiShoppingBag3Fill className="logo-icon" />
          <span>FashionHub</span>
        </Logo>

        <MobileMenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>

        <NavMenu $isOpen={isMenuOpen}>
          <NavItem $delay="0.1s">
            <NavLink 
              to="/" 
              $isActive={location.pathname === '/'}
            >
              Home
            </NavLink>
          </NavItem>
          <NavItem $delay="0.2s">
            <NavLink 
              to="/shop" 
              $isActive={location.pathname === '/shop'}
            >
              Shop
            </NavLink>
          </NavItem>
          <NavItem $delay="0.3s">
            <NavLink 
              to="/cart" 
              $isActive={location.pathname === '/cart'}
            >
              Cart
            </NavLink>
          </NavItem>
          <NavItem $delay="0.4s">
            <NavLink 
              to="/about" 
              $isActive={location.pathname === '/about'}
            >
              About
            </NavLink>
          </NavItem>
          <NavItem $delay="0.5s">
            <NavLink 
              to="/contact" 
              $isActive={location.pathname === '/contact'}
            >
              Contact
            </NavLink>
          </NavItem>
           <NavItem $delay="0.5s">
            <NavLink 
              to="/ChekoutPage" 
              $isActive={location.pathname === '/ChekoutPage'}
            >
              chekoutPage
            </NavLink>
          </NavItem>

          <SearchBar>
            <input type="text" placeholder="Search products..." />
          </SearchBar>

          <IconWrapper>
            <IconLink to="/account" $delay="0s">
              <FaUser />
            </IconLink>
            <IconLink to="/cart" $delay="0.2s">
              <FaShoppingCart />
              {cartItems > 0 && <CartBadge>{cartItems}</CartBadge>}
            </IconLink>
            <ThemeToggle onClick={onThemeToggle}>
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </ThemeToggle>
          </IconWrapper>
        </NavMenu>
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;