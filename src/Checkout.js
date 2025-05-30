import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
const CheckoutContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2.5rem;
  background: rgba(255, 253, 245, 0.85);
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: 
    0 8px 32px rgba(31, 38, 135, 0.15),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.2);
  overflow: hidden;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at 30% 50%,
      rgba(255, 213, 79, 0.15) 0%,
      transparent 40%
    );
    animation: float 12s infinite ease-in-out alternate;
    z-index: -1;
  }

  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    50% { transform: translate(-5%, 5%) rotate(2deg); }
    100% { transform: translate(5%, -5%) rotate(-2deg); }
  }
`;

const CheckoutTitle = styled.h2`
  text-align: center;
  color: #4e342e;
  margin-bottom: 2rem;
  font-size: 2.2rem;
  font-weight: 700;
  background: linear-gradient(90deg, #6d4c41, #d7ccc8, #6d4c41);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300% 100%;
  animation: gradientShift 8s ease infinite;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
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
  color: #5d4037;
  font-size: 1rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  
  ${FormGroup}:hover & {
    color: #3e2723;
    transform: translateX(3px);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 1.1rem 1.5rem;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.7);
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.05),
    inset 0 0 0 1px rgba(109, 76, 65, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.1);
  
  &:focus {
    background: rgba(255, 255, 255, 0.9);
    box-shadow:
      0 4px 12px rgba(255, 213, 79, 0.3),
      inset 0 0 0 1px rgba(255, 213, 79, 0.5);
    transform: scale(1.02);
    outline: none;
  }
  
  &::placeholder {
    color: #bcaaa4;
    opacity: 0.7;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #6d4c41 0%, #3e2723 100%);
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
    0 6px 12px rgba(109, 76, 65, 0.2),
    0 3px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-3px) scale(1.01);
    box-shadow:
      0 12px 24px rgba(109, 76, 65, 0.3),
      0 6px 12px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #5d4037 0%, #2e201b 100%);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0.3) 0%,
      rgba(255, 255, 255, 0) 60%
    );
    transform: rotate(30deg);
    transition: all 0.7s ease;
  }
  
  &:hover::after {
    left: 100%;
    top: 100%;
  }
`;

const BackButton = styled.button`
  background: transparent;
  color: #6d4c41;
  border: 2px solid #d7ccc8;
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
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(215, 204, 200, 0.2), transparent);
    transform: translateX(-100%);
    transition: 0.6s;
  }
  
  &:hover {
    border-color: #bcaaa4;
    color: #4e342e;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
    
    &::before {
      transform: translateX(100%);
    }
  }
  
  svg {
    transition: transform 0.3s ease;
  }
  
  &:hover svg {
    transform: translateX(-3px);
  }
`;

// Ajout d'un composant de carte de crédit animé
const CreditCardVisual = styled.div`
  height: 180px;
  background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.6s ease;
  box-shadow: 0 10px 30px rgba(61, 39, 35, 0.3);
  
  &:hover {
    transform: rotateY(10deg) rotateX(5deg);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.2) 0%,
      transparent 50%
    );
    animation: rotate 15s infinite linear;
  }
  
  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
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
          customer_phone: formData.phone, // إضافة إذا كانت موجودة
          customer_address: formData.address,
          payment_method: formData.paymentMethod,
          items: JSON.parse(localStorage.getItem('cart')) // الحصول على المنتجات من السلة
        }),
      });
  
      if (response.ok) {
        const orderData = await response.json();
        alert("تم تأكيد الطلب!");
        localStorage.removeItem('cart');
        navigate(`/order-confirmation/${orderData.id}`);
      } else {
        alert("فشل في تأكيد الطلب، حاول مرة أخرى.");
      }
    } catch (error) {
      alert("حدث خطأ غير متوقع.");
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
          />
        </FormGroup>

        <FormGroup>
          <Label>Méthode de paiement</Label>
          <div>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={formData.paymentMethod === "creditCard"}
                onChange={handleChange}
              /> Carte de crédit
            </label>
            <label style={{ marginLeft: '20px' }}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={formData.paymentMethod === "paypal"}
                onChange={handleChange}
              /> PayPal
            </label>
          </div>
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