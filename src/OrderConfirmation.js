import React from "react";
import styled, { keyframes } from "styled-components";
import { useNavigate } from "react-router-dom";

// Animations
const neonGlow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e60073, 0 0 40px #e60073; }
  50% { text-shadow: 0 0 5px #fff, 0 0 10px #ff4da6, 0 0 15px #ff4da6, 0 0 20px #ff4da6; }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const rainbow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const checkmarkAnimation = keyframes`
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
`;

// Styled Components
const ConfirmationContainer = styled.div`
  text-align: center;
  padding: 100px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  font-family: "Rajdhani", sans-serif;
  position: relative;
  overflow: hidden;
`;

const ConfirmationTitle = styled.h2`
  font-size: 3.5rem;
  font-family: "Audiowide", cursive;
  margin-bottom: 30px;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c, #ffec3d, #4dffb8, #4da6ff, #9d4dff);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${rainbow} 15s ease infinite;
  text-transform: uppercase;
  letter-spacing: 3px;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  
  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 150px;
    height: 4px;
    background: linear-gradient(90deg, #ff4da6, #4da6ff);
    border-radius: 2px;
  }
`;

const ConfirmationMessage = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto 40px;
  line-height: 1.6;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const Checkmark = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 40px;
  background: rgba(77, 166, 255, 0.2);
  border: 3px solid rgba(77, 166, 255, 0.5);
  animation: ${checkmarkAnimation} 0.8s ease-out, ${pulse} 2s infinite 1s;
  
  &::before {
    content: "✓";
    font-size: 4rem;
    color: #4dffb8;
    font-weight: bold;
  }
`;

const HomeButton = styled.button`
  background: linear-gradient(135deg, #ff4da6 0%, #4da6ff 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  padding: 16px 32px;
  border-radius: 50px;
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(77, 166, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
  animation: ${fadeIn} 0.8s ease-out 0.4s both, ${pulse} 3s infinite;
  
  &:hover {
    background-position: right center;
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(77, 166, 255, 0.5);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transition: 0.5s;
  }

  &:hover::after {
    left: 100%;
  }
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Star = styled.div`
  position: absolute;
  background: white;
  border-radius: 50%;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay || '0s'};
  
  &:nth-child(1) {
    width: 3px;
    height: 3px;
    top: 20%;
    left: 15%;
  }
  &:nth-child(2) {
    width: 2px;
    height: 2px;
    top: 40%;
    left: 80%;
    animation-delay: 2s;
  }
  &:nth-child(3) {
    width: 4px;
    height: 4px;
    top: 70%;
    left: 30%;
    animation-delay: 4s;
  }
  &:nth-child(4) {
    width: 2px;
    height: 2px;
    top: 30%;
    left: 60%;
    animation-delay: 1s;
  }
  &:nth-child(5) {
    width: 3px;
    height: 3px;
    top: 80%;
    left: 75%;
    animation-delay: 3s;
  }
`;

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <ConfirmationContainer>
      <Stars>
        <Star />
        <Star delay="2s" />
        <Star delay="4s" />
        <Star delay="1s" />
        <Star delay="3s" />
      </Stars>
      
      <Checkmark />
      <ConfirmationTitle>Commande confirmée !</ConfirmationTitle>
      <ConfirmationMessage>
        Merci pour votre achat. Votre commande a été enregistrée et sera traitée rapidement.
        <br />
        Un email de confirmation vous a été envoyé.
      </ConfirmationMessage>
      <HomeButton onClick={() => navigate('/')}>
        Retour à l'accueil
      </HomeButton>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;