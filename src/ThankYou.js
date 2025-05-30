import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useLocation } from 'react-router-dom';

// Animations
const checkmarkAnimation = keyframes`
  0% { stroke-dashoffset: 100; }
  100% { stroke-dashoffset: 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const ThankYouContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: ${({ theme }) => theme?.colors?.background || '#f9f9f9'};
  border-radius: 16px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out forwards;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${({ theme }) => theme?.colors?.primary || '#4caf50'};
  }

  @media (max-width: 768px) {
    padding: 1.5rem;
    margin: 1rem;
  }
`;

const OrderTitle = styled.h2`
  text-align: center;
  color: ${({ theme }) => theme?.colors?.text || '#333'};
  font-size: clamp(1.8rem, 3vw, 2.2rem);
  font-weight: 700;
  margin-bottom: 2rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 50px;
    height: 3px;
    background: ${({ theme }) => theme?.colors?.primary || '#4caf50'};
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme?.colors?.primaryLight || 'rgba(76, 175, 80, 0.1)'};
  
  svg {
    width: 50px;
    height: 50px;
    
    path {
      stroke: ${({ theme }) => theme?.colors?.primary || '#4caf50'};
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
  color: ${({ theme }) => theme?.colors?.textSecondary || '#555'};
  background: ${({ theme }) => theme?.colors?.paper || '#fff'};
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1rem;
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme?.colors?.border || '#eee'};
  
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
  color: ${({ theme }) => theme?.colors?.primary || '#4caf50'};
  transition: color 0.3s ease;
  
  &:hover {
    color: ${({ theme }) => theme?.colors?.primaryDark || '#388e3c'};
  }
`;

const EstimatedTime = styled.p`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme?.colors?.primary || '#4caf50'};
  text-align: center;
  margin-top: 1.5rem;
  padding: 0.8rem;
  background: ${({ theme }) => theme?.colors?.primaryLight || 'rgba(76, 175, 80, 0.1)'};
  border-radius: 8px;
  display: inline-block;
`;

const OrderNumber = styled.div`
  font-size: 1.1rem;
  margin: 1.5rem 0;
  padding: 1rem;
  background: ${({ theme }) => theme?.colors?.paper || '#fff'};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: inline-block;
  
  strong {
    color: ${({ theme }) => theme?.colors?.text || '#333'};
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
  padding: 0.8rem 1.8rem;
  background: ${({ theme }) => theme?.colors?.primary || '#4caf50'};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.primaryDark || '#388e3c'};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background: ${({ theme }) => theme?.colors?.secondary || '#f5f5f5'};
  color: ${({ theme }) => theme?.colors?.text || '#333'};
  
  &:hover {
    background: ${({ theme }) => theme?.colors?.secondaryDark || '#e0e0e0'};
  }
`;

// Theme object
const defaultTheme = {
  colors: {
    primary: '#4caf50',
    primaryDark: '#388e3c',
    primaryLight: 'rgba(76, 175, 80, 0.1)',
    secondary: '#f5f5f5',
    secondaryDark: '#e0e0e0',
    text: '#333',
    textSecondary: '#555',
    background: '#f9f9f9',
    paper: '#fff',
    border: '#eee'
  }
};

const ThankYou = () => {
  const location = useLocation();
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
    sendConfirmationEmail(orderData);
  }, []);

  const sendConfirmationEmail = (orderData) => {
    // Simuler l'envoi d'email
    setTimeout(() => {
      setEmailSent(true);
    }, 2000);
  };

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
        <PrimaryButton>Suivre ma commande</PrimaryButton>
        <SecondaryButton>Retour à l'accueil</SecondaryButton>
      </ActionButtons>
      
      {emailSent && <p>Un email de confirmation a été envoyé à votre adresse email.</p>}
    </ThankYouContainer>
  );
};

export default ThankYou;