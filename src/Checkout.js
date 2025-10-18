import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components"; // Added css import here
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
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components
const CheckoutContainer = styled.div`
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
  overflow: hidden;
  position: relative;
  animation: ${fadeIn} 0.6s ease-out;
  
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
`;

const CheckoutTitle = styled.h2`
  text-align: center;
  margin-bottom: 2.5rem;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: "Audiowide", cursive;
  background: linear-gradient(45deg, #ff4da6, #ff9a3c, #ffec3d, #4dffb8, #4da6ff, #9d4dff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 400% 400%;
  animation: ${rainbow} 15s ease infinite;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  
  &::after {
    content: '';
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

const FormGroup = styled.div`
  margin-bottom: 2rem;
  position: relative;
  transition: all 0.4s ease;
  
  &:hover {
    transform: translateX(5px);
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  ${FormGroup}:hover & {
    color: #fff;
    transform: translateX(3px);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  backdrop-filter: blur(5px);
  
  &:focus {
    background: rgba(255, 255, 255, 0.15);
    box-shadow:
      0 4px 12px rgba(77, 166, 255, 0.3),
      inset 0 0 0 1px rgba(77, 166, 255, 0.5);
    transform: scale(1.02);
    outline: none;
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ff4da6 0%, #4da6ff 100%);
  background-size: 200% auto;
  color: white;
  border: none;
  padding: 1.3rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  margin-top: 1.5rem;
  transition: all 0.5s cubic-bezier(0.19, 1, 0.22, 1);
  position: relative;
  overflow: hidden;
  box-shadow:
    0 6px 12px rgba(77, 166, 255, 0.2),
    0 3px 6px rgba(0, 0, 0, 0.1);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-family: "Rajdhani", sans-serif;
  animation: ${pulse} 3s infinite;
  
  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow:
      0 12px 24px rgba(77, 166, 255, 0.3),
      0 6px 12px rgba(0, 0, 0, 0.15);
    background-position: right center;
  }
  
  &:active {
    transform: translateY(1px);
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
    transition: all 0.7s ease;
  }
  
  &:hover::after {
    left: 100%;
  }
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.9rem 1.8rem;
  border-radius: 12px;
  margin-top: 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  width: 100%;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
  }
  
  &:hover {
    border-color: rgba(255, 255, 255, 0.3);
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    
    &::before {
      transform: translateX(100%);
    }
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 2rem;
`;

const PaymentOption = styled.label`
  flex: 1;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid transparent;
  text-align: center;
  backdrop-filter: blur(5px);
  
  input[type="radio"] {
    display: none;
  }
  
  ${props => props.$isSelected && css`
    background: rgba(77, 166, 255, 0.2);
    border-color: rgba(77, 166, 255, 0.5);
    box-shadow: 0 0 15px rgba(77, 166, 255, 0.3);
  `}
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
`;

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    paymentMethod: "creditCard"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customer_name: formData.firstName + ' ' + formData.lastName,
          customer_email: formData.email,
          customer_address: formData.address,
          payment_method: formData.paymentMethod,
          items: JSON.parse(localStorage.getItem('cart'))
        }),
      });
  
      if (response.ok) {
        const orderData = await response.json();
        alert("Commande confirmée avec succès!");
        localStorage.removeItem('cart');
        navigate(`/order-confirmation/${orderData.id}`);
      } else {
        alert("Erreur lors de la confirmation de la commande");
      }
    } catch (error) {
      alert("Une erreur s'est produite");
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutTitle>Finaliser votre commande</CheckoutTitle>
      
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Prénom</Label>
          <Input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            placeholder="Votre prénom"
          />
        </FormGroup>

        <FormGroup>
          <Label>Nom</Label>
          <Input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            placeholder="Votre nom"
          />
        </FormGroup>

        <FormGroup>
          <Label>Email</Label>
          <Input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
            placeholder="email@exemple.com"
          />
        </FormGroup>

        <FormGroup>
          <Label>Adresse</Label>
          <Input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handleChange} 
            required 
            placeholder="Adresse complète"
          />
        </FormGroup>

        <div style={{ display: 'flex', gap: '20px' }}>
          <FormGroup style={{ flex: 1 }}>
            <Label>Ville</Label>
            <Input 
              type="text" 
              name="city" 
              value={formData.city} 
              onChange={handleChange} 
              required 
              placeholder="Votre ville"
            />
          </FormGroup>

          <FormGroup style={{ flex: 1 }}>
            <Label>Code postal</Label>
            <Input 
              type="text" 
              name="postalCode" 
              value={formData.postalCode} 
              onChange={handleChange} 
              required 
              placeholder="Code postal"
            />
          </FormGroup>
        </div>

        <FormGroup>
          <Label>Pays</Label>
          <Input 
            type="text" 
            name="country" 
            value={formData.country} 
            onChange={handleChange} 
            required 
            placeholder="Votre pays"
          />
        </FormGroup>

        <FormGroup>
          <Label>Méthode de paiement</Label>
          <PaymentMethod>
            <PaymentOption $isSelected={formData.paymentMethod === "creditCard"}>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={formData.paymentMethod === "creditCard"}
                onChange={handleChange}
              />
              Carte de crédit
            </PaymentOption>
            <PaymentOption $isSelected={formData.paymentMethod === "paypal"}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              />
              PayPal
            </PaymentOption>
          </PaymentMethod>
        </FormGroup>

        <SubmitButton type="submit">Confirmer la commande</SubmitButton>
      </form>

      <BackButton onClick={() => navigate(-1)}>
        Retour au panier
      </BackButton>
    </CheckoutContainer>
  );
};

export default Checkout;