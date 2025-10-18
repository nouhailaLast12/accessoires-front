import React from 'react';
import styled, { keyframes } from 'styled-components';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

// Animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Components with safe theme access
const FooterContainer = styled.footer`
  background: ${({ theme }) => theme?.footer?.background || 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'};
  color: ${({ theme }) => theme?.footer?.text || '#ffffff'};
  padding: 5rem 2rem 2rem;
  position: relative;
  overflow: hidden;
  font-family: 'Montserrat', sans-serif;
`;

const FooterWave = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 1200 120" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"><path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" fill="%23ffffff" opacity=".05"/></svg>');
  background-size: cover;
  transform: rotate(180deg);
`;

const FooterContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 3rem;
  position: relative;
  z-index: 2;
`;

const FooterColumn = styled.div`
  animation: ${fadeIn} 0.6s ease-out forwards;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  opacity: 0;
`;

const FooterLogo = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme?.footer?.logo || '#ffffff'};
  display: inline-block;
  background: ${({ theme }) => theme?.footer?.logoGradient || 'linear-gradient(135deg, #4dabf7 0%, #339af0 50%, #228be6 100%)'};
  background-size: 200% 200%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: ${gradientFlow} 8s ease infinite;
`;

const FooterDescription = styled.p`
  font-size: 0.95rem;
  line-height: 1.7;
  color: ${({ theme }) => theme?.footer?.lightText || 'rgba(255, 255, 255, 0.7)'};
  margin-bottom: 1.5rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme?.footer?.heading || '#ffffff'};
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40px;
    height: 3px;
    background: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
    border-radius: 3px;
  }
`;

const FooterList = styled.ul`
  list-style: none;
  padding: 0;
`;

const FooterListItem = styled.li`
  margin-bottom: 0.8rem;
  transition: all 0.3s ease;
  position: relative;
  padding-left: 1rem;
  
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 6px;
    height: 6px;
    background: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
    border-radius: 50%;
    opacity: 0;
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
    padding-left: 1.5rem;
    
    &::before {
      opacity: 1;
    }
  }
`;

const FooterLink = styled.a`
  color: ${({ theme }) => theme?.footer?.lightText || 'rgba(255, 255, 255, 0.7)'};
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  
  &:hover {
    color: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme?.footer?.lightText || 'rgba(255, 255, 255, 0.7)'};
  font-size: 0.95rem;
  line-height: 1.6;
`;

const ContactIcon = styled.span`
  margin-right: 1rem;
  color: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
  font-size: 1.2rem;
  margin-top: 3px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const SocialIcon = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ theme }) => theme?.footer?.socialBg || 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme }) => theme?.footer?.socialIcon || '#ffffff'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || '0s'};
  
  &:hover {
    background: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
    color: #fff;
    transform: translateY(-5px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1400px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid ${({ theme }) => theme?.footer?.divider || 'rgba(255, 255, 255, 0.1)'};
  text-align: center;
  color: ${({ theme }) => theme?.footer?.lightText || 'rgba(255, 255, 255, 0.7)'};
  font-size: 0.85rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  margin-top: 1.5rem;
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: none;
  border-radius: 4px 0 0 4px;
  background: ${({ theme }) => theme?.footer?.inputBg || 'rgba(255, 255, 255, 0.1)'};
  color: ${({ theme }) => theme?.footer?.inputText || '#ffffff'};
  
  &:focus {
    outline: none;
  }
`;

const NewsletterButton = styled.button`
  padding: 0 1.5rem;
  background: ${({ theme }) => theme?.footer?.accent || '#4dabf7'};
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: ${({ theme }) => theme?.footer?.accentHover || '#339af0'};
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterWave />
      
      <FooterContent>
        <FooterColumn $delay="0.1s">
          <FooterLogo>FashionHub</FooterLogo>
          <FooterDescription>
            Your premier destination for luxury fashion and accessories. 
            We bring you the latest trends from around the world with 
            exceptional quality and service.
          </FooterDescription>
          
          <SocialIcons>
            <SocialIcon href="#" $delay="0s"><FaFacebookF /></SocialIcon>
            <SocialIcon href="#" $delay="0.2s"><FaTwitter /></SocialIcon>
            <SocialIcon href="#" $delay="0.4s"><FaInstagram /></SocialIcon>
            <SocialIcon href="#" $delay="0.6s"><FaPinterestP /></SocialIcon>
            <SocialIcon href="#" $delay="0.8s"><FaLinkedinIn /></SocialIcon>
          </SocialIcons>
        </FooterColumn>
        
        <FooterColumn $delay="0.2s">
          <FooterTitle>Quick Links</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#">Home</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Shop</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Collections</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">About Us</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Blog</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Contact</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
        
        <FooterColumn $delay="0.3s">
          <FooterTitle>Customer Service</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#">My Account</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Order Tracking</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Wishlist</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Shipping Policy</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Returns & Exchanges</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">FAQs</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
        
        <FooterColumn $delay="0.4s">
          <FooterTitle>Contact Us</FooterTitle>
          <ContactInfo>
            <ContactIcon><MdLocationOn /></ContactIcon>
            123 Fashion Avenue, New York, NY 10001
          </ContactInfo>
          <ContactInfo>
            <ContactIcon><MdPhone /></ContactIcon>
            +1 (555) 123-4567
          </ContactInfo>
          <ContactInfo>
            <ContactIcon><MdEmail /></ContactIcon>
            info@fashionhub.com
          </ContactInfo>
          
          <FooterTitle style={{ marginTop: '2rem' }}>Newsletter</FooterTitle>
          <FooterDescription>
            Subscribe to get updates on new arrivals and special offers.
          </FooterDescription>
          
          <NewsletterForm>
            <NewsletterInput type="email" placeholder="Your email address" />
            <NewsletterButton>Subscribe</NewsletterButton>
          </NewsletterForm>
        </FooterColumn>
      </FooterContent>
      
      <FooterBottom>
        &copy; {new Date().getFullYear()} FashionHub. All rights reserved. | 
        <FooterLink href="#" style={{ marginLeft: '5px' }}>Privacy Policy</FooterLink> | 
        <FooterLink href="#">Terms of Service</FooterLink>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;