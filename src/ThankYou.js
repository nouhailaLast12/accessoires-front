import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';

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
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`;

// Styled Components
const ThankYouContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 3rem;
  background: rgba(26, 26, 46, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out forwards;
  position: relative;
  overflow: hidden;
  font-family: "Rajdhani", sans-serif;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(77, 166, 255, 0.15) 0%,
      transparent 40%
    );
    animation: ${float} 12s infinite ease-in-out alternate;
    z-index: -1;
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const OrderTitle = styled.h2`
  font-size: 3rem;
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

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SuccessIcon = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 166, 255, 0.2);
  border: 3px solid rgba(77, 166, 255, 0.5);
  animation: ${pulse} 2s infinite;
  
  svg {
    width: 60px;
    height: 60px;
    
    path {
      stroke: #4dffb8;
      stroke-width: 3;
      stroke-dasharray: 100;
      stroke-dashoffset: 100;
      animation: ${checkmarkAnimation} 0.6s ease-out forwards;
      animation-delay: 0.3s;
      fill: none;
    }
  }
`;

const OrderSummary = styled.div`
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(30, 30, 60, 0.7);
  padding: 1.5rem;
  border-radius: 16px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 480px) {
    flex-direction: column;
    text-align: left;
  }
`;

const HighlightText = styled.span`
  font-weight: 700;
  color: #ffec3d;
  transition: color 0.3s ease;
  
  &:hover {
    color: #4dffb8;
  }
`;

const EstimatedTime = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: #4dffb8;
  text-align: center;
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: rgba(77, 166, 255, 0.2);
  border-radius: 8px;
  display: inline-block;
  animation: ${pulse} 3s infinite;
`;

const OrderNumber = styled.div`
  font-size: 1.2rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: rgba(30, 30, 60, 0.7);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: inline-block;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  
  strong {
    color: #fff;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const PrimaryButton = styled.button`
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #ff4da6 0%, #4da6ff 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.5s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(77, 166, 255, 0.3);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
  animation: ${pulse} 3s infinite;
  
  &:hover {
    background-position: right center;
    transform: translateY(-3px);
    box-shadow: 0 12px 25px rgba(77, 166, 255, 0.5);
  }

  &::after {
    content: '';
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

const SecondaryButton = styled(PrimaryButton)`
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.2) 100%);
  color: rgba(255, 255, 255, 0.9);
  
  &:hover {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.3) 100%);
    color: #fff;
  }
`;

const EmailConfirmation = styled.p`
  color: rgba(255, 255, 255, 0.7);
  margin-top: 1.5rem;
  animation: ${fadeIn} 0.6s ease-out;
`;

const ThankYou = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem('orderData')) || {
      products: [],
      totalAmount: 0,
      address: '',
      deliveryTime: '3-5 jours ouvrables'
    };
    
    setOrderDetails(orderData);
    setOrderNumber(`#OLV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`);
    
    // Simuler l'envoi d'email
    setTimeout(() => {
      setEmailSent(true);
    }, 2000);
  }, []);

  if (!orderDetails) {
    return <div>Chargement des détails de la commande...</div>;
  }

  return (
    <ThankYouContainer>
      <SuccessIcon>
        <svg viewBox="0 0 24 24">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
      </SuccessIcon>
      
      <OrderTitle>Merci pour votre commande !</OrderTitle>
      
      <OrderNumber>
        <strong>Numéro de commande :</strong> {orderNumber}
      </OrderNumber>
      
      <OrderSummary>
        <h3>Résumé de la commande :</h3>
        {orderDetails.products.map((product, index) => (
          <OrderItem key={index}>
            <span>{product.name} × {product.quantity}</span>
            <span>{product.price} €</span>
          </OrderItem>
        ))}
        <OrderItem>
          <HighlightText>Total :</HighlightText>
          <span>{orderDetails.totalAmount} €</span>
        </OrderItem>
        
        <OrderItem>
          <HighlightText>Adresse de livraison :</HighlightText>
          <span>{orderDetails.address}</span>
        </OrderItem>
      </OrderSummary>
      
      <EstimatedTime>
        Temps estimé pour la livraison : {orderDetails.deliveryTime}
      </EstimatedTime>
      
      <ActionButtons>
        <PrimaryButton onClick={() => navigate('/orders')}>
          Suivre ma commande
        </PrimaryButton>
        <SecondaryButton onClick={() => navigate('/')}>
          Retour à l'accueil
        </SecondaryButton>
      </ActionButtons>
      
      {emailSent && (
        <EmailConfirmation>
          Un email de confirmation a été envoyé à votre adresse email.
        </EmailConfirmation>
      )}
    </ThankYouContainer>
  );
};

export default ThankYou;