import React, { useState } from "react";
import axios from 'axios';
import styled, { keyframes } from "styled-components";

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
const ContactSection = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #f0f0f0 100%);
  padding: 80px 20px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  min-height: 100vh;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  color: #2c3e50;
  margin-bottom: 20px;
  background: linear-gradient(to right, #3e2723, #ffd54f);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #6c757d;
  max-width: 800px;
  margin: 0 auto 60px;
  animation: ${fadeIn} 0.8s ease-out 0.2s both;
`;

const ContactForm = styled.form`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 25px;
  transform: perspective(1000px);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  animation: ${fadeIn} 0.8s ease-out 0.4s both;

  &:hover {
    transform: perspective(1000px) translateY(-5px) rotateX(2deg);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.12);
  }
`;

const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  padding: 18px 20px;
  font-size: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  width: 100%;
  box-sizing: border-box;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #ffd54f;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.2);
  }

  &::placeholder {
    color: #adb5bd;
  }
`;

const TextArea = styled.textarea`
  padding: 18px 20px;
  font-size: 1rem;
  border: 2px solid #e9ecef;
  border-radius: 10px;
  width: 100%;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s;
  background: rgba(255, 255, 255, 0.8);
  font-family: "Poppins", sans-serif;

  &:focus {
    border-color: #ffd54f;
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 213, 79, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #3e2723 0%, #5d4037 100%);
  color: white;
  font-size: 1.1rem;
  padding: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.4s;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(62, 39, 35, 0.2);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #5d4037 0%, #3e2723 100%);
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(62, 39, 35, 0.3);
    animation: ${pulse} 1.5s infinite;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:active:not(:disabled) {
    transform: translateY(1px);
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    transform: translateX(-100%);
    transition: transform 0.6s;
  }

  &:hover:not(:disabled)::after {
    transform: translateX(100%);
  }
`;

const ContactInfoSection = styled.section`
  margin-top: 80px;
  animation: ${fadeIn} 0.8s ease-out 0.6s both;
`;

const ContactInfoTitle = styled.h2`
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 40px;
  position: relative;
  display: inline-block;

  &::after {
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(to right, #3e2723, #ffd54f);
    border-radius: 2px;
  }
`;

const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const InfoCard = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(to right, #3e2723, #ffd54f);
    transition: height 0.3s;
  }

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.1);

    &::before {
      height: 10px;
    }
  }
`;

const InfoIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #3e2723;
`;

const InfoTitle = styled.h3`
  font-size: 1.5rem;
  color: #3e2723;
  margin-bottom: 15px;
`;

const InfoText = styled.p`
  font-size: 1.1rem;
  color: #6c757d;
  line-height: 1.6;
`;

const MapContainer = styled.div`
  margin-top: 80px;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transform: perspective(1000px);
  transition: all 0.5s;
  animation: ${fadeIn} 0.8s ease-out 0.8s both;

  &:hover {
    transform: perspective(1000px) rotateX(1deg);
  }

  iframe {
    width: 100%;
    height: 450px;
    border: none;
  }
`;

const StatusMessage = styled.div`
  margin: 20px auto;
  padding: 15px;
  max-width: 700px;
  border-radius: 8px;
  text-align: center;
  animation: ${fadeIn} 0.5s ease-out;
  background-color: ${props => props.type === 'success' ? '#d4edda' : '#f8d7da'};
  color: ${props => props.type === 'success' ? '#155724' : '#721c24'};
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/contact', {
        nom: formData.name,
        email: formData.email,
        telephone: formData.phone,
        message: formData.message
      });

      setSubmitStatus({
        type: 'success',
        message: 'Message envoyé avec succès ! Nous vous contacterons bientôt.'
      });

      // Réinitialiser le formulaire
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      
      let errorMessage = "Une erreur est survenue lors de l'envoi du message.";
      if (error.response) {
        if (error.response.data.errors) {
          // Gestion des erreurs de validation Laravel
          errorMessage = Object.values(error.response.data.errors).join('\n');
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      }

      setSubmitStatus({
        type: 'error',
        message: errorMessage
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactSection>
      <Title>Contactez-nous</Title>
      <Subtitle>
        Des questions ou des commentaires ? Remplissez le formulaire ci-dessous et nous vous répondrons dès que possible !
      </Subtitle>

      {submitStatus && (
        <StatusMessage type={submitStatus.type}>
          {submitStatus.message}
        </StatusMessage>
      )}

      <ContactForm onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            type="text"
            name="name"
            placeholder="Votre nom complet"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </InputGroup>
        
        <InputGroup>
          <Input
            type="email"
            name="email"
            placeholder="Votre adresse email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </InputGroup>
        
        <InputGroup>
          <Input
            type="tel"
            name="phone"
            placeholder="Votre numéro de téléphone (facultatif)"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </InputGroup>
        
        <InputGroup>
          <TextArea
            name="message"
            placeholder="Votre message..."
            value={formData.message}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
        </InputGroup>
        
        <SubmitButton 
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
        </SubmitButton>
      </ContactForm>

      <ContactInfoSection>
        <ContactInfoTitle>Nos coordonnées</ContactInfoTitle>
        <ContactInfoGrid>
          <InfoCard>
            <InfoIcon>📞</InfoIcon>
            <InfoTitle>Téléphone</InfoTitle>
            <InfoText>(+212) 665976678</InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>📧</InfoIcon>
            <InfoTitle>Email</InfoTitle>
            <InfoText>contact@bijoux-luxe.com</InfoText>
          </InfoCard>
          
          <InfoCard>
            <InfoIcon>📍</InfoIcon>
            <InfoTitle>Adresse</InfoTitle>
            <InfoText>
              123 Avenue des Bijoux<br />
              Témara, Maroc
            </InfoText>
          </InfoCard>
        </ContactInfoGrid>
      </ContactInfoSection>

      <MapContainer>
        <iframe
          title="Localisation de notre boutique"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6615.786432242308!2d-6.908486!3d33.925818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda76c6e1a1a9c9b%3A0x5e49b6e5c4a3a3e!2sAv.%20Moulay%20Idriss%201%2C%20T%C3%A9mara%2C%20Morocco!5e0!3m2!1sen!2sma!4v1620000000000!5m2!1sen!2sma"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </MapContainer>
    </ContactSection>
  );
};

export default Contact;