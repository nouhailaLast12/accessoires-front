// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useCart } from './CartContext';
import { FaCreditCard, FaLock, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaCheckCircle, FaArrowLeft } from 'react-icons/fa';

// Background image (you can replace with your own)
const BACKGROUND_IMAGE = 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1772&q=80';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const slideIn = keyframes`
  from { transform: translateX(-100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.5); }
  50% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.8); }
  100% { box-shadow: 0 0 5px rgba(168, 85, 247, 0.5); }
`;

// Styled Components
const CheckoutContainer = styled.div`
  padding: 100px 20px 40px;
  min-height: 100vh;
  background: linear-gradient(rgba(141, 137, 137, 0.7), rgba(0, 0, 0, 0.7)), url(${BACKGROUND_IMAGE});
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  color: white;
`;

const CheckoutTitle = styled.h1`
  text-align: center;
  color: white;
  margin-bottom: 40px;
  font-size: 2.5rem;
  font-family: 'Poppins', sans-serif;
  font-weight: 800;
  position: relative;
  animation: ${fadeIn} 0.8s ease-out;
  text-shadow: 2px 2px 4px rgba(122, 120, 120, 0.5);

  &::after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: #a855f7;
    margin: 20px auto 0;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CheckoutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 30px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: rgba(85, 86, 88, 0.8);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const OrderSummary = styled.div`
  background: rgba(17, 24, 39, 0.8);
  border-radius: 15px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  height: fit-content;
  position: sticky;
  top: 120px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: white;
  margin-bottom: 25px;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 10px;

  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.2);
    margin-left: 15px;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: white;
  font-family: 'Poppins', sans-serif;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(111, 107, 107, 0.2);
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
  background: rgba(31, 41, 55, 0.6);
  color: white;

  &:focus {
    outline: none;
    border-color: #a855f7;
    box-shadow: 0 0 0 3px rgba(168, 85, 247, 0.3);
    animation: ${glow} 1.5s infinite;
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const InputWithIcon = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    color: #a855f7;
  }

  input {
    padding-left: 45px;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethod = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 20px;

  @media (max-width: 576px) {
    flex-direction: column;
  }
`;

const PaymentOption = styled.div`
  flex: 1;
  border: 2px solid ${props => props.selected ? '#a855f7' : 'rgba(255, 255, 255, 0.2)'};
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? 'rgba(168, 85, 247, 0.2)' : 'rgba(31, 41, 55, 0.6)'};

  &:hover {
    border-color: #a855f7;
    transform: translateY(-2px);
  }

  svg {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #a855f7;
  }

  div {
    color: white;
    font-weight: 600;
  }
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(197, 191, 191, 0.1);
`;

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 1.2rem;
  margin-top: 20px;
  padding-top: 15px;
  border-top: 2px solid rgba(255, 255, 255, 0.2);
  color: white;
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #a855f7 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 30px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 5px 15px rgba(168, 85, 247, 0.4);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(168, 85, 247, 0.6);
    animation: ${pulse} 1s ease infinite;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    animation: none;
  }
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #a855f7;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
  text-shadow: 1px 1px 2px rgba(128, 123, 123, 0.5);

  &:hover {
    color: #7c3aed;
  }
`;

const SuccessMessage = styled.div`
  background: rgba(213, 237, 219, 0.9);
  color: #155724;
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${slideIn} 0.5s ease-out;
`;

const CheckoutPage = () => {
  const { cartItems, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In reality, you would process the data and send it to the server
    console.log('Form submitted:', formData);
    
    // Simulate successful payment process
    setTimeout(() => {
      setOrderCompleted(true);
      clearCart();
    }, 1500);
  };

  const subtotal = total;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.1;
  const finalTotal = subtotal + shipping + tax;

  if (orderCompleted) {
    return (
      <CheckoutContainer>
        <CheckoutTitle>Your Order is Confirmed!</CheckoutTitle>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <SuccessMessage>
            <FaCheckCircle size={24} />
            <div>
              <h3>Thank you for shopping with us!</h3>
              <p>Your order has been received and will be shipped as soon as possible.</p>
            </div>
          </SuccessMessage>
          <div style={{ marginTop: '30px' }}>
            <CheckoutButton onClick={() => window.location.href = '/'}>
              Return to Homepage
            </CheckoutButton>
          </div>
        </div>
      </CheckoutContainer>
    );
  }

  if (cartItems.length === 0) {
    return (
      <CheckoutContainer>
        <CheckoutTitle>Shopping Cart is Empty</CheckoutTitle>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p>You don't have any items in your shopping cart.</p>
          <CheckoutButton onClick={() => window.location.href = '/shop'}>
            Shop Now
          </CheckoutButton>
        </div>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      
      <BackButton onClick={() => window.history.back()}>
        <FaArrowLeft /> Back to Cart
      </BackButton>

      <form onSubmit={handleSubmit}>
        <CheckoutContent>
          <div>
            <FormSection>
              <SectionTitle>Shipping Information</SectionTitle>
              
              <Row>
                <FormGroup>
                  <Label>First Name</Label>
                  <InputWithIcon>
                    <FaUser />
                    <Input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your first name"
                    />
                  </InputWithIcon>
                </FormGroup>
                
                <FormGroup>
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your last name"
                  />
                </FormGroup>
              </Row>
              
              <FormGroup>
                <Label>Email</Label>
                <InputWithIcon>
                  <FaEnvelope />
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="your.email@example.com"
                  />
                </InputWithIcon>
              </FormGroup>
              
              <FormGroup>
                <Label>Phone Number</Label>
                <InputWithIcon>
                  <FaPhone />
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="(123) 456-7890"
                  />
                </InputWithIcon>
              </FormGroup>
              
              <FormGroup>
                <Label>Address</Label>
                <InputWithIcon>
                  <FaMapMarkerAlt />
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Your full address"
                  />
                </InputWithIcon>
              </FormGroup>
              
              <Row>
                <FormGroup>
                  <Label>City</Label>
                  <Input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="City"
                  />
                </FormGroup>
                
                <FormGroup>
                  <Label>Postal Code</Label>
                  <Input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder ZIP Code
                  />
                </FormGroup>
              </Row>
            </FormSection>
            
            <FormSection style={{ marginTop: '30px' }}>
              <SectionTitle>Payment Method</SectionTitle>
              
              <PaymentMethod>
                <PaymentOption 
                  selected={paymentMethod === 'creditCard'} 
                  onClick={() => setPaymentMethod('creditCard')}
                >
                  <FaCreditCard />
                  <div>Credit Card</div>
                </PaymentOption>
                
                <PaymentOption 
                  selected={paymentMethod === 'paypal'} 
                  onClick={() => setPaymentMethod('paypal')}
                >
                  <FaLock />
                  <div>PayPal</div>
                </PaymentOption>
              </PaymentMethod>
              
              {paymentMethod === 'creditCard' && (
                <>
                  <FormGroup>
                    <Label>Card Number</Label>
                    <InputWithIcon>
                      <FaCreditCard />
                      <Input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </InputWithIcon>
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Cardholder Name</Label>
                    <Input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      required
                      placeholder="Name on card"
                    />
                  </FormGroup>
                  
                  <Row>
                    <FormGroup>
                      <Label>Expiry Date</Label>
                      <Input
                        type="text"
                        name="cardExpiry"
                        value={formData.cardExpiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        required
                      />
                    </FormGroup>
                    
                    <FormGroup>
                      <Label>CVV</Label>
                      <Input
                        type="text"
                        name="cardCvv"
                        value={formData.cardCvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        required
                      />
                    </FormGroup>
                  </Row>
                </>
              )}
              
              {paymentMethod === 'paypal' && (
                <div style={{ 
                  textAlign: 'center', 
                  padding: '20px', 
                  background: 'rgba(31, 41, 55, 0.6)', 
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  <p>You will be redirected to PayPal to complete your payment.</p>
                </div>
              )}
            </FormSection>
          </div>
          
          <OrderSummary>
            <SectionTitle>Order Summary</SectionTitle>
            
            {cartItems.map(item => (
              <OrderItem key={item.id}>
                <div>
                  <div style={{ fontWeight: '600' }}>{item.title}</div>
                  <div style={{ fontSize: '0.9rem', color: '#d1d5db' }}>Quantity: {item.quantity}</div>
                </div>
                <div style={{ fontWeight: '600' }}>${(item.price * item.quantity).toFixed(2)}</div>
              </OrderItem>
            ))}
            
            <OrderItem>
              <div>Subtotal</div>
              <div>${subtotal.toFixed(2)}</div>
            </OrderItem>
            
            <OrderItem>
              <div>Shipping</div>
              <div>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</div>
            </OrderItem>
            
            <OrderItem>
              <div>Tax</div>
              <div>${tax.toFixed(2)}</div>
            </OrderItem>
            
            <OrderTotal>
              <div>Total</div>
              <div>${finalTotal.toFixed(2)}</div>
            </OrderTotal>
            
            <CheckoutButton type="submit">
              <FaLock /> Confirm Order & Pay
            </CheckoutButton>
            
            <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '0.8rem', color: '#d1d5db' }}>
              Your transactions are protected and secure
            </div>
          </OrderSummary>
        </CheckoutContent>
      </form>
    </CheckoutContainer>
  );
};

export default CheckoutPage;