import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
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

// Styled Components
const HomeContainer = styled.div`
  position: relative;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
`;

const HeroSection = styled.section`
 background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), 
url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(164, 156, 156, 0.4);
  z-index: 1;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  padding: 0 20px;
  animation: ${fadeIn} 1s ease-out forwards;
`;

const HeroTitle = styled.h1`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 50%, #228be6 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientFlow} 8s ease infinite;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroText = styled.p`
  font-size: 1.3rem;
  max-width: 700px;
  margin: 0 auto 2.5rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  padding: 1rem 2.5rem;
  background: linear-gradient(135deg, #4dabf7 0%, #339af0 50%, #228be6 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }
`;

const SecondaryButton = styled(Link)`
  padding: 1rem 2.5rem;
  background: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-3px);
  }
`;

const SocialIcons = styled.div`
  position: absolute;
  left: 2rem;
  bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  z-index: 2;

  @media (max-width: 768px) {
    flex-direction: row;
    left: 50%;
    transform: translateX(-50%);
    bottom: 1rem;
  }
`;

const SocialIcon = styled.a`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  font-size: 1.2rem;
  
  &:hover {
    background: #4dabf7;
    transform: translateY(-5px);
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <HeroSection>
        <HeroOverlay />
        
        <HeroContent>
          <HeroTitle>Welcome to FashionHub</HeroTitle>
          <HeroText>
            Discover the latest trends in fashion and accessories. 
            Our curated collection brings you premium quality with 
            exceptional style for every occasion.
          </HeroText>
          
          <ButtonGroup>
            <PrimaryButton to="/shop">Shop Now</PrimaryButton>
            <SecondaryButton to="/about">Learn More</SecondaryButton>
          </ButtonGroup>
        </HeroContent>
        
        <SocialIcons>
          <SocialIcon href="#" $delay="0s"><FaFacebookF /></SocialIcon>
          <SocialIcon href="#" $delay="0.2s"><FaTwitter /></SocialIcon>
          <SocialIcon href="#" $delay="0.4s"><FaInstagram /></SocialIcon>
          <SocialIcon href="#" $delay="0.6s"><FaPinterestP /></SocialIcon>
          <SocialIcon href="#" $delay="0.8s"><FaLinkedinIn /></SocialIcon>
        </SocialIcons>
      </HeroSection>
    </HomeContainer>
  );
};

export default Home;