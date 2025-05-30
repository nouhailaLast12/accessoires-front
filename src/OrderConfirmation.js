import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const ConfirmationContainer = styled.div`
  text-align: center;
  padding: 50px;
  max-width: 800px;
  margin: 0 auto;
`;

const ConfirmationTitle = styled.h2`
  color: #3e2723;
  margin-bottom: 30px;
`;

const ConfirmationMessage = styled.p`
  font-size: 18px;
  margin-bottom: 30px;
  color: #555;
`;

const HomeButton = styled.button`
  background-color: #3e2723;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;
  transition: all 0.3s;

  &:hover {
    background-color: #5d4037;
  }
`;

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <ConfirmationContainer>
      <ConfirmationTitle>Commande confirmée !</ConfirmationTitle>
      <ConfirmationMessage>
        Merci pour votre achat. Votre commande a été enregistrée et sera traitée rapidement.
        Un email de confirmation vous a été envoyé.
      </ConfirmationMessage>
      <HomeButton onClick={() => navigate('/')}>
        Retour à l'accueil
      </HomeButton>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation;