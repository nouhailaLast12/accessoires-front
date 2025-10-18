// src/pages/Cart.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaShoppingCart, FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import { RiCouponLine } from 'react-icons/ri';
import { useCart } from './CartContext';

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

// Styled Components
const CartContainer = styled.div`
  padding: 120px 20px 40px;
  min-height: 100vh;
  background: linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)),
              url('https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
`;

const CartHero = styled.div`
  text-align: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;
  h1 { font-size: 3rem; color: #333; }
`;

const CartContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 40px;

  @media(max-width: 992px){
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: rgba(255,255,255,0.8);
  border-radius: 15px;
  padding: 30px;
  animation: ${fadeIn} 0.5s ease-out;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px solid rgba(0,0,0,0.1);

  &:last-child { border-bottom: none; }
`;

const ItemImage = styled.div`
  width: 100px; height: 100px; border-radius: 10px; overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const ItemDetails = styled.div`
  flex: 1;
  h3 { margin: 0 0 5px; font-size: 1.1rem; color: #333; }
  p { margin: 0; font-size: 0.9rem; color: #777; }
`;

const ItemPrice = styled.div`
  font-weight: 700; color: #4a90e2;
`;

const QuantityControl = styled.div`
  display: flex; align-items: center; gap: 10px; margin: 10px 0;

  button {
    width: 30px; height: 30px; border: 1px solid #ddd; border-radius: 50%;
    background: white; display: flex; align-items: center; justify-content: center; cursor: pointer;
    &:hover{ background: #f0f0f0; }
  }
  span { min-width: 30px; text-align: center; font-weight: 600; }
`;

const RemoveButton = styled.button`
  background: none; border: none; color: #ff4757; cursor: pointer; display: flex; align-items: center; gap: 5px;
  &:hover { color: #e84118; }
`;

const CartSummary = styled.div`
  background: rgba(255,255,255,0.8); border-radius: 15px; padding: 30px;
  height: fit-content; animation: ${fadeIn} 0.5s ease-out;
`;

const CouponInput = styled.div`
  display: flex; margin: 20px 0; border: 1px solid #ddd; border-radius: 30px; overflow: hidden;
  input { flex:1; padding: 12px 15px; border:none; outline:none; }
  button { padding:0 20px; background:#4a90e2; color:white; border:none; cursor:pointer; &:hover{background:#3a7bc8;}}
`;

const SummaryRow = styled.div`
  display:flex; justify-content:space-between; margin:15px 0; font-weight:${({bold}) => bold?'700':'400'}; font-size:${({bold})=>bold?'1.2rem':'1rem'};
`;

const CheckoutButton = styled.button`
  width: 100%; padding: 15px; background:#4a90e2; color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer; margin-top:30px; display:flex; align-items:center; justify-content:center; gap:10px;
  &:hover { background:#3a7bc8; animation:${pulse} 1s ease infinite; }
`;

const EmptyCart = styled.div`
  text-align:center; padding:50px 0; color:#777;
  svg{ font-size:5rem; margin-bottom:20px; color:#ddd; }
  h3{ font-size:1.5rem; margin-bottom:20px; }
  button{ padding:12px 30px; background:#4a90e2; color:white; border:none; border-radius:30px; font-weight:600; cursor:pointer; &:hover{background:#3a7bc8; transform:translateY(-3px);}}
`;

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, total } = useCart();
  const [couponCode, setCouponCode] = useState('');

  const applyCoupon = () => {
    alert(`Coupon "${couponCode}" applied! (Demo)`); 
    setCouponCode('');
  };

  const shipping = total > 100 ? 0 : 9.99;
  const tax = total * 0.1;
  const finalTotal = total + shipping + tax;

  return (
    <CartContainer>
      <CartHero><h1>Your Shopping Cart</h1></CartHero>
      {cartItems.length > 0 ? (
      <CartContent>
        <CartItems>
          {cartItems.map(item=>(
            <CartItem key={item.id}>
              <ItemImage><img src={item.image} alt={item.title}/></ItemImage>
              <ItemDetails>
                <h3>{item.title}</h3>
                <p>{item.category}</p>
                <ItemPrice>${item.price.toFixed(2)}</ItemPrice>
              </ItemDetails>
              <div>
                <QuantityControl>
                  <button onClick={()=>updateQuantity(item.id, item.quantity-1)}><FaMinus/></button>
                  <span>{item.quantity}</span>
                  <button onClick={()=>updateQuantity(item.id, item.quantity+1)}><FaPlus/></button>
                </QuantityControl>
                <RemoveButton onClick={()=>removeFromCart(item.id)}><FaTrash/> Remove</RemoveButton>
              </div>
            </CartItem>
          ))}
        </CartItems>
        <CartSummary>
          <h2>Order Summary</h2>
          <CouponInput>
            <input placeholder="Coupon code" value={couponCode} onChange={e=>setCouponCode(e.target.value)}/>
            <button onClick={applyCoupon}><RiCouponLine/></button>
          </CouponInput>
          <SummaryRow><span>Subtotal</span><span>${total.toFixed(2)}</span></SummaryRow>
          <SummaryRow><span>Shipping</span><span>{shipping===0?'FREE':`$${shipping.toFixed(2)}`}</span></SummaryRow>
          <SummaryRow><span>Tax</span><span>${tax.toFixed(2)}</span></SummaryRow>
          <SummaryRow bold><span>Total</span><span>${finalTotal.toFixed(2)}</span></SummaryRow>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </CartSummary>
      </CartContent>
      ) : (
        <EmptyCart>
          <FaShoppingCart/>
          <h3>Your cart is empty</h3>
          <button>Continue Shopping</button>
        </EmptyCart>
      )}
    </CartContainer>
  );
};

export default Cart;
