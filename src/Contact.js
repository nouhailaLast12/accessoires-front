// src/pages/Contact.js
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from 'react-icons/fa';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float3D = keyframes`
  0% { transform: translateY(0px) rotateX(0deg); }
  50% { transform: translateY(-10px) rotateX(10deg); }
  100% { transform: translateY(0px) rotateX(0deg); }
`;

// Composants stylisés
const ContactContainer = styled.div`
  padding: 120px 0 40px;
  min-height: 100vh;
  background: 
    linear-gradient(rgba(94, 92, 92, 0.7), rgba(0, 0, 0, 0.7)),
    url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80');
  background-size: cover;
  background-attachment: fixed;
  background-position: center;
  color: white;
`;

const ContactHero = styled.section`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  animation: ${fadeIn} 0.8s ease-out;

  h1 {
    font-size: 3.5rem;
    text-shadow: 0 0 15px rgba(36, 35, 35, 0.8);
    font-family: 'Montserrat', sans-serif;
    letter-spacing: 3px;
    font-weight: 700;
    position: relative;
    
    &::after {
      content: '';
      display: block;
      width: 100px;
      height: 4px;
      background: ${({ theme }) => theme.colors.primary};
      margin: 20px auto 0;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 2.5rem;
    }
  }
`;

const ContactContent = styled.section`
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  gap: 40px;
  animation: ${fadeIn} 1s ease-out;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ContactFormContainer = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 12px;
  font-weight: 600;
  color: white;
  font-size: 1.1rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 14px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  font-size: 1rem;
  height: 180px;
  resize: vertical;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.3);
    background: rgba(255, 255, 255, 0.2);
  }
`;

const SubmitButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 16px 24px;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
  animation: ${float3D} 3s ease infinite;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const ContactInfo = styled.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ContactTitle = styled.h2`
  margin-bottom: 25px;
  font-size: 2rem;
  color: white;
  font-family: 'Montserrat', sans-serif;
  position: relative;
  padding-bottom: 15px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 80px;
    height: 4px;
    background: ${({ theme }) => theme.colors.primary};
  }
`;

const ContactText = styled.p`
  margin-bottom: 20px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  animation: ${fadeIn} 0.5s ease forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  strong {
    color: white;
    font-weight: 700;
  }
`;

const SocialMedia = styled.div`
  margin-top: 40px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 25px;
  margin-top: 25px;
`;

const SocialIconLink = styled.a`
  color: white;
  font-size: 2rem;
  transition: all 0.3s ease;
  animation: ${float3D} 3s ease infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-5px) scale(1.1);
  }
`;

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
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
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('Failed to send message.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while sending the message.');
    }
  };

  return (
    <ContactContainer>
      <ContactHero>
        <h1>Contact Us</h1>
      </ContactHero>
      
      <ContactContent>
        <ContactFormContainer>
          <ContactTitle>Send us a message</ContactTitle>
          <ContactForm onSubmit={handleSubmit}>
            <FormGroup $delay="0.1s">
              <FormLabel htmlFor="name">Name</FormLabel>
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </FormGroup>
            
            <FormGroup $delay="0.2s">
              <FormLabel htmlFor="email">Email</FormLabel>
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                required
              />
            </FormGroup>
            
            <FormGroup $delay="0.3s">
              <FormLabel htmlFor="message">Message</FormLabel>
              <FormTextarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message"
                required
              ></FormTextarea>
            </FormGroup>
            
            <SubmitButton type="submit">Send Message</SubmitButton>
          </ContactForm>
        </ContactFormContainer>
        
        <ContactInfo>
          <ContactTitle>Our Information</ContactTitle>
          <ContactText $delay="0.1s"><strong>Email:</strong> info@fashionhub.com</ContactText>
          <ContactText $delay="0.2s"><strong>Phone:</strong> +1 234 567 890</ContactText>
          <ContactText $delay="0.3s"><strong>Address:</strong> 123 Fashion Street, Style City, 10001</ContactText>
          
          <SocialMedia>
            <ContactTitle>Follow Us</ContactTitle>
            <SocialIcons>
              <SocialIconLink href="#" $delay="0s"><FaFacebook /></SocialIconLink>
              <SocialIconLink href="#" $delay="0.2s"><FaInstagram /></SocialIconLink>
              <SocialIconLink href="#" $delay="0.4s"><FaTwitter /></SocialIconLink>
              <SocialIconLink href="#" $delay="0.6s"><FaPinterest /></SocialIconLink>
            </SocialIcons>
          </SocialMedia>
        </ContactInfo>
      </ContactContent>
    </ContactContainer>
  );
};

export default Contact;