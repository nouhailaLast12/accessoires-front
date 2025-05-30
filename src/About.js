import React from 'react';
import styled, { keyframes } from 'styled-components';

// Animations
const move = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styles
const AboutContainer = styled.div`
  text-align: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
  min-height: 100vh;
  padding: 100px 20px;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #3e2723;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;
  animation: ${fadeIn} 0.8s ease-out;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(to right, #ffd54f, #3e2723);
    border-radius: 2px;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 700px;
  margin: 0 auto 60px;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const AccessoriesSection = styled.div`
  overflow: hidden;
  position: relative;
  width: 100%;
  margin-top: 50px;
  padding: 30px 0;
  
  &::before, &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, #f5f7fa, transparent);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, #f5f7fa, transparent);
  }
`;

const AccessoriesSlider = styled.div`
  display: flex;
  animation: ${move} 30s linear infinite;
  width: 200%;
`;

const AccessoryCard = styled.div`
  margin: 0 15px;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const AccessoryImage = styled.img`
  width: 280px;
  height: 280px;
  border-radius: 20px;
  object-fit: cover;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  ${AccessoryCard}:hover & {
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    transform: rotate(-2deg);
  }
`;

const AccessoryName = styled.h3`
  margin-top: 15px;
  font-size: 1.2rem;
  color: #3e2723;
  font-weight: 600;
`;

const About = () => {
  const accessories = [
    { id: 1, name: "Boucles d'oreilles", image: 'team1.jpg' },
    { id: 2, name: "Collier élégant", image: 'team2.jpg' },
    { id: 3, name: "Bracelet doré", image: 'team3.jpg' },
    { id: 4, name: "Montre de luxe", image: 'team4.jpg' },
    { id: 5, name: "Bague précieuse", image: 'team5.jpg' },
    { id: 6, name: "Broche vintage", image: 'team6.jpg' }
  ];

  // Dupliquer les éléments pour l'animation infinie
  const duplicatedAccessories = [...accessories, ...accessories];

  return (
    <AboutContainer id="about">
      <Title>Nos Créations Exclusives</Title>
      <Subtitle>
        Découvrez notre collection d'accessoires minutieusement conçus pour sublimer votre style
      </Subtitle>

      <AccessoriesSection>
        <AccessoriesSlider>
          {duplicatedAccessories.map((item, index) => (
            <AccessoryCard 
              key={`${item.id}-${index}`} 
              delay={`${index * 0.2}s`}
            >
              <AccessoryImage 
                src={`${process.env.PUBLIC_URL}/images/${item.image}`} 
                alt={item.name}
              />
              <AccessoryName>{item.name}</AccessoryName>
            </AccessoryCard>
          ))}
        </AccessoriesSlider>
      </AccessoriesSection>
    </AboutContainer>
  );
};

export default About;