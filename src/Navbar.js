import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaShoppingBag,
  FaChevronDown,
  FaWhatsapp,
} from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import styled, { keyframes, css } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Styled Components (Identique à ton original)
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 50px;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
  animation: ${fadeIn} 0.5s ease-out;
  transition: all 0.3s ease;

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      padding: 10px 50px;
      box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
    `}
`;

const Logo = styled(Link)`
  font-family: "Playfair Display", serif;
  font-size: 28px;
  font-weight: 900;
  background: linear-gradient(45deg, #8b4513, #daa520, #ffd700);
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-transform: uppercase;
  letter-spacing: 3px;
  transition: all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  text-decoration: none;
  position: relative;

  &:hover {
    letter-spacing: 4px;
    background-position: right center;
    animation: ${gradientFlow} 3s ease infinite;
    text-shadow: 0 0 10px rgba(218, 165, 32, 0.4),
      0 0 20px rgba(139, 69, 19, 0.3);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #8b4513, #daa520, #ffd700);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Menu = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

const NavLink = styled(Link)`
  font-size: 16px;
  color: #3e2723;
  text-decoration: none;
  font-weight: 500;
  cursor: pointer;
  position: relative;
  text-transform: uppercase;
  transition: all 0.3s ease;
  padding: 8px 0;

  &:hover {
    color: #ffd54f;
  }

  &::before {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #ffd54f, #3e2723);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s ease;
  }

  &:hover::before {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownContent = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
  position: absolute;
  background-color: white;
  min-width: 200px;
  box-shadow: 0px 15px 30px rgba(0, 0, 0, 0.15);
  z-index: 1;
  top: 100%;
  left: 0;
  border-radius: 8px;
  overflow: hidden;
  animation: ${fadeIn} 0.3s ease-out;
  pointer-events: ${({ $isOpen }) => ($isOpen ? "auto" : "none")};
  transform-origin: top center;
  transform: ${({ $isOpen }) => ($isOpen ? "scaleY(1)" : "scaleY(0.9)")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
`;

const DropdownLink = styled(Link)`
  color: #3e2723;
  padding: 15px 20px;
  text-decoration: none;
  display: block;
  font-size: 14px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border-left: 3px solid transparent;

  &:hover {
    background-color: #fff9f0;
    color: #ffd54f;
    padding-left: 25px;
    border-left: 3px solid #ffd54f;
  }
`;

const Icon = styled(FaChevronDown)`
  margin-left: 8px;
  font-size: 12px;
  transition: all 0.3s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0)")};
`;

const SocialIcon = styled.a`
  color: #3e2723;
  font-size: 20px;
  transition: all 0.3s ease;
  margin-left: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;

  &:hover {
    color: #ffd54f;
    transform: translateY(-3px);
    background-color: rgba(62, 39, 35, 0.05);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #ffd54f;
    border-radius: 50%;
    transform: scale(0.8);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover::after {
    transform: scale(1.1);
    opacity: 1;
  }
`;

const CartIcon = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(62, 39, 35, 0.05);
    transform: translateY(-3px);

    &::before {
      transform: scale(1.1);
      opacity: 1;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px solid #ffd54f;
    border-radius: 50%;
    transform: scale(0.8);
    opacity: 0;
    transition: all 0.3s ease;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: #ffd54f;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: bold;
  animation: ${pulse} 2s infinite;
`;

const Navbar = () => {
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const [cartItemsCount, setCartItemsCount] = useState(3); // Exemple

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (sectionId) => {
    if (window.location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <NavbarContainer $scrolled={scrolled}>
      {/* Menu gauche */}
      <Menu>
        <NavLink to="/" onClick={() => handleScrollTo("home")}>Accueil</NavLink>
        <NavLink to="/" onClick={() => handleScrollTo("shop")}>Boutique</NavLink>
        <NavLink to="/" onClick={() => handleScrollTo("gifts")}>Cadeaux</NavLink>
      </Menu>

      {/* Logo */}
      <Logo to="/">Olive & Avery</Logo>

      {/* Menu droit */}
      <Menu>
        <NavLink to="/" onClick={() => handleScrollTo("about")}>À propos</NavLink>
        <NavLink to="/" onClick={() => handleScrollTo("save")}>Favoris</NavLink>
        <NavLink to="/" onClick={() => handleScrollTo("contact")}>Contact</NavLink>

        {/* Dropdown marques */}
        <Dropdown
          onMouseEnter={() => setIsBrandsOpen(true)}
          onMouseLeave={() => setTimeout(() => setIsBrandsOpen(false), 200)}
        >
          <NavLink to="#">
            Marques <Icon $isOpen={isBrandsOpen} />
          </NavLink>
          <DropdownContent $isOpen={isBrandsOpen}>
            <DropdownLink to="/brand/chanel">Chanel</DropdownLink>
            <DropdownLink to="/brand/dior">Dior</DropdownLink>
            <DropdownLink to="/brand/gucci">Gucci</DropdownLink>
          </DropdownContent>
        </Dropdown>

        <NavLink to="/" onClick={() => handleScrollTo("faq")}>FAQ</NavLink>
      </Menu>

      {/* Réseaux sociaux + panier */}
      <Menu>
        <SocialIcon href="https://facebook.com" target="_blank" aria-label="Facebook">
          <FaFacebook />
        </SocialIcon>
        <SocialIcon href="https://instagram.com" target="_blank" aria-label="Instagram">
          <FaInstagram />
        </SocialIcon>
        <SocialIcon href="https://wa.me/yourphonenumber" target="_blank" aria-label="WhatsApp">
          <FaWhatsapp />
        </SocialIcon>
        <NavLink to="/account"><FiUser /></NavLink>
        <NavLink to="/cart">
          <CartIcon>
            <FaShoppingBag />
            {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
          </CartIcon>
        </NavLink>
      </Menu>
    </NavbarContainer>
  );
};

export default Navbar;
