// src/pages/About.js
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaUsers, FaBullseye, FaHistory } from 'react-icons/fa';

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

// Composants stylisés
const AboutContainer = styled.div`
  padding: 120px 0 40px;
  min-height: 100vh;
  background: 
    linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)),
    url('https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  color: #333;
`;

const AboutHero = styled.section`
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

const AboutContent = styled.section`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 40px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AboutText = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const AboutTitle = styled.h2`
  margin-bottom: 25px;
  font-size: 2rem;
  color: #333;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  padding-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 15px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: #4a90e2;
  }
`;

const AboutParagraph = styled.p`
  margin-bottom: 20px;
  line-height: 1.7;
  color: #555;
  font-size: 1.1rem;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`;

const AboutImage = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const AboutImg = styled.img`
  width: 100%;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  animation: ${float3D} 4s ease infinite;
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutHero>
        <h1>About FashionHub</h1>
      </AboutHero>
      
      <AboutContent>
        <AboutText>
          <AboutTitle>
            <FaHistory /> Our Story
          </AboutTitle>
          <AboutParagraph $delay="0.1s">
            Founded in 2023, FashionHub started as a small boutique with a big dream - to revolutionize 
            the way people experience fashion. What began as a single storefront has blossomed into 
            a leading online fashion destination, serving customers worldwide.
          </AboutParagraph>
          
          <AboutTitle>
            <FaBullseye /> Our Mission
          </AboutTitle>
          <AboutParagraph $delay="0.2s">
            We're committed to making high-quality fashion accessible to everyone without compromising 
            on style or sustainability. Our carefully curated collections are designed to empower 
            individuals to express their unique personalities through clothing.
          </AboutParagraph>
          
          <AboutTitle>
            <FaUsers /> Our Team
          </AboutTitle>
          <AboutParagraph $delay="0.3s">
            Our team consists of passionate fashion enthusiasts, trend spotters, and customer service 
            experts who work tirelessly to bring you the latest styles from around the globe. We believe 
            fashion should be fun, accessible, and sustainable.
          </AboutParagraph>
        </AboutText>
        
        <AboutImage>
          <AboutImg 
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Our team" 
          />
          <AboutImg 
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
            alt="Our store" 
          />
        </AboutImage>
      </AboutContent>
    </AboutContainer>
  );
};

export default About;