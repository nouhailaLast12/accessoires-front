import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
`;

const highlight = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
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
    answer: "Vous pouvez nous contacter par e-mail à support@beautyessence.com ou par téléphone au 01 23 45 67 89."
  }
];

// Styled Components
const FAQContainer = styled.div`
  font-family: 'Montserrat', sans-serif;
  padding: 80px 20px;
  background: #f8f5f2;
  min-height: 100vh;
`;

const FAQHeader = styled.div`
  text-align: center;
  margin-bottom: 60px;
`;

const FAQTitle = styled.h2`
  font-size: 2.8rem;
  color: #2a2a2a;
  margin-bottom: 20px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%);
  }
`;

const FAQSubtitle = styled.p`
  font-size: 1.1rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
`;

const FAQList = styled.div`
  max-width: 900px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: 15px;
`;

const FAQItem = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 25px rgba(0, 0, 0, 0.05);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${({ index }) => index * 0.1}s;
  opacity: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
`;

const Question = styled.div`
  padding: 25px 30px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2a2a2a;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ isOpen }) => 
    isOpen 
      ? "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)" 
      : "white"};
  color: ${({ isOpen }) => isOpen ? "white" : "inherit"};
  transition: all 0.4s ease;

  &:hover {
    background: ${({ isOpen }) => 
      !isOpen && "linear-gradient(90deg, #ff9a9e20 0%, #fad0c420 100%)"};
  }
`;

const Answer = styled.div`
  padding: ${({ isOpen }) => isOpen ? "25px 30px" : "0 30px"};
  font-size: 1rem;
  line-height: 1.7;
  color: #555;
  max-height: ${({ isOpen }) => isOpen ? "1000px" : "0"};
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border-top: ${({ isOpen }) => isOpen ? "1px solid rgba(255,255,255,0.2)" : "none"};
  background: white;
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ isOpen }) => 
    isOpen 
      ? "rgba(255,255,255,0.3)" 
      : "linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)"};
  transition: all 0.3s ease;
`;

const Icon = styled.span`
  font-size: 1rem;
  color: ${({ isOpen }) => isOpen ? "white" : "white"};
  transform: ${({ isOpen }) => isOpen ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.3s ease;
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