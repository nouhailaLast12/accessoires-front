import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";

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

// Données FAQ
const faqData = [
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer: "Nous acceptons les cartes de crédit (Visa, MasterCard, American Express) et PayPal."
  },
  {
    question: "Comment puis-je suivre ma commande ?",
    answer: "Une fois votre commande expédiée, vous recevrez un e-mail avec un numéro de suivi."
  },
  {
    question: "Quelle est votre politique de retour ?",
    answer: "Vous pouvez retourner les articles dans les 30 jours suivant la réception pour un remboursement complet."
  },
  {
    question: "Proposez-vous une garantie sur vos produits ?",
    answer: "Oui, tous nos produits sont couverts par une garantie de 1 an."
  },
  {
    question: "Comment contacter le service client ?",
    answer: "Vous pouvez nous contacter par e-mail à support@bijoux.com ou par téléphone au +212 665 976 678."
  }
];

// Styled Components
const FAQContainer = styled.div`
  padding: 100px 20px;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  min-height: 100vh;
  font-family: "Rajdhani", sans-serif;
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const FAQTitle = styled.h2`
  font-size: 3.5rem;
  font-family: "Audiowide", cursive;
  margin-bottom: 20px;
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
`;

const FAQSubtitle = styled.p`
  font-size: 1.3rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FAQList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
`;

const FAQItem = styled.div`
  background: rgba(30, 30, 60, 0.7);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;
  opacity: 0;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);
  }
`;

const Question = styled.div`
  padding: 25px 30px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ isOpen }) => isOpen ? "#fff" : "rgba(255, 255, 255, 0.9)"};
  background: ${({ isOpen }) => 
    isOpen 
      ? "linear-gradient(90deg, rgba(255, 77, 166, 0.3) 0%, rgba(77, 166, 255, 0.3) 100%)" 
      : "transparent"};
  transition: all 0.4s ease;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const Answer = styled.div`
  padding: ${({ isOpen }) => isOpen ? "25px 30px" : "0 30px"};
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  max-height: ${({ isOpen }) => isOpen ? "1000px" : "0"};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-top: ${({ isOpen }) => isOpen ? "1px solid rgba(255,255,255,0.1)" : "none"};
  background: rgba(20, 20, 40, 0.5);
`;

const IconWrapper = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isOpen }) => 
    isOpen 
      ? "rgba(255, 255, 255, 0.2)" 
      : "linear-gradient(135deg, #ff4da6 0%, #4da6ff 100%)"};
  transition: all 0.4s ease;
  flex-shrink: 0;
  margin-left: 20px;
`;

const Icon = styled.span`
  font-size: 1rem;
  color: white;
  transform: ${({ isOpen }) => isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.4s ease;
`;

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQContainer id="faq">
      <FAQHeader>
        <FAQTitle>Questions Fréquentes</FAQTitle>
        <FAQSubtitle>
          Trouvez des réponses aux questions les plus courantes sur nos produits et services
        </FAQSubtitle>
      </FAQHeader>

      <FAQList>
        {faqData.map((item, index) => (
          <FAQItem key={index} index={index}>
            <Question 
              onClick={() => toggleFAQ(index)}
              isOpen={openIndex === index}
            >
              {item.question}
              <IconWrapper isOpen={openIndex === index}>
                <Icon isOpen={openIndex === index}>▼</Icon>
              </IconWrapper>
            </Question>
            <Answer isOpen={openIndex === index}>
              {item.answer}
            </Answer>
          </FAQItem>
        ))}
      </FAQList>
    </FAQContainer>
  );
};

export default FAQ;