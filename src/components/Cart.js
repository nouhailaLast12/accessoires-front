import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";

// Styled Components
const CartContainer = styled.div`
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 70vh;
`;

const CartTitle = styled.h2`
  text-align: center;
  color: #3e2723;
  margin-bottom: 30px;
  font-size: 28px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e8d9c5;
  margin-bottom: 15px;
  background-color: #fff9f0;
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  padding: 0 20px;
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  color: #333;
  margin: 0 0 5px 0;
`;

const ItemPrice = styled.p`
  font-size: 16px;
  color: #ffd54f;
  font-weight: bold;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #3e2723;
  background-color: transparent;
  color: #3e2723;
  font-size: 16px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #3e2723;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityValue = styled.span`
  margin: 0 15px;
  font-size: 16px;
  min-width: 20px;
  text-align: center;
`;

const RemoveButton = styled.button`
  background-color: #ffebee;
  color: #c62828;
  border: none;
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 20px;
  font-size: 14px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #ffcdd2;
  }
`;

const TotalSection = styled.div`
  text-align: right;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 2px solid #3e2723;
`;

const TotalText = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #3e2723;
  margin-bottom: 20px;
`;

const CheckoutButton = styled.button`
  background-color: #3e2723;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: all 0.3s;
  width: 100%;
  max-width: 300px;
  
  &:hover {
    background-color: #5d4037;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:disabled {
    background-color: #bdbdbd;
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 50px;
  color: #777;
`;

const BackToShopButton = styled.button`
  background-color: #ffd54f;
  color: #3e2723;
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  margin: 0 auto 30px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #ffc107;
    transform: translateY(-2px);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Cart = () => {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    total
  } = useCart();

  const handleQuantityChange = (id, newQuantity) => {
    updateQuantity(id, Math.max(1, newQuantity));
  };

  const handleFinalizeTask = async () => {
    if (cartItems.length > 0) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/finaliser-tache`, {
          method: "POST", // Assurez-vous que c'est une requête POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ produits: cartItems }), // Envoie les produits
        });
  
        if (response.ok) {
          const result = await response.json();
          console.log("Tâche finalisée avec succès:", result);
          navigate('/checkout'); // Redirection vers la page de checkout
        } else {
          const errorData = await response.json();
          console.error("Erreur lors de la finalisation de la tâche:", errorData.message);
        }
      } catch (error) {
        console.error("Erreur réseau:", error);
      }
    } else {
      console.log("Le panier est vide, impossible de finaliser la commande.");
    }
  };
  

  return (
    <CartContainer>
      <CartTitle>Votre Panier</CartTitle>
      
      {cartItems.length === 0 ? (
        <EmptyCart>
          <p>Votre panier est vide</p>
          <BackToShopButton onClick={() => navigate('/shop')}>
            <span>←</span> Retourner au magasin
          </BackToShopButton>
        </EmptyCart>
      ) : (
        <>
          <ButtonContainer>
            <BackToShopButton onClick={() => navigate('/shop')}>
              <span>←</span> Continuer vos achats
            </BackToShopButton>
          </ButtonContainer>

          {cartItems.map(item => (
            <CartItem key={item.id}>
  <ItemImage
  src={item.image_url || "https://via.placeholder.com/300x220?text=No+Image"}
  alt={item.name}
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/300x220?text=No+Image";
  }}
/>






              <ItemDetails>
                <ItemTitle>{item.name}</ItemTitle>
                <ItemPrice>{item.price} DH (x{item.quantity})</ItemPrice>
              </ItemDetails>
              <QuantityControls>
                <QuantityButton 
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </QuantityButton>
                <QuantityValue>{item.quantity}</QuantityValue>
                <QuantityButton onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
                  +
                </QuantityButton>
                <RemoveButton onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </RemoveButton>
              </QuantityControls>
            </CartItem>
          ))}
          
          <TotalSection>
            <TotalText>Total: {total} Dh</TotalText>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <RemoveButton 
                onClick={clearCart}
                style={{ backgroundColor: '#e0e0e0', color: '#333' }}
              >
                Vider le panier
              </RemoveButton>
              <CheckoutButton 
  onClick={handleFinalizeTask} 
  disabled={cartItems.length === 0} 
>
  Finaliser l'achat
</CheckoutButton>

            </div>
          </TotalSection>
        </>
      )}
    </CartContainer>
  );
};

export default Cart;
