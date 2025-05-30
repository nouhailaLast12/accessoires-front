import React from "react";
import styled from "styled-components";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

// Styled Components
const FooterContainer = styled.footer`
  background-color: #f5f5f5;
  color: #333;
  padding: 60px 20px;
  text-align: center;
  font-family: "Arial", sans-serif;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
`;

const Column = styled.div`
  flex: 1;
  min-width: 250px;
  text-align: left;
  margin-bottom: 30px;
`;

const Title = styled.h3`
  font-size: 18px;
  margin-bottom: 20px;
  color: #555;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
  font-weight: 400;

  &:hover {
    color: #007bff;
  }
`;

const ContactInfo = styled.p`
  font-size: 14px;
  margin: 5px 0;
  color: #666;
`;

const SocialIcons = styled.div`
  display: flex;
  justify-content: center;
  gap: 25px;
  margin-top: 20px;
`;

const IconLink = styled.a`
  color: #333;
  font-size: 22px;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const Copyright = styled.p`
  margin-top: 40px;
  font-size: 14px;
  color: #777;
`;

// Footer Component
const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Logo et description */}
        <Column>
          <h2 style={{ color: "#007bff" }}>Company Name</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor sit amet tortor non ultricies.
          </p>
        </Column>

        {/* Liens de Navigation */}
        <Column>
          <Title>Quick Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>About</ListItem>
            <ListItem>Services</ListItem>
            <ListItem>Contact</ListItem>
          </List>
        </Column>

        {/* Contact Information */}
        <Column>
          <Title>Contact</Title>
          <ContactInfo>📍 Morocco , Temara </ContactInfo>
          <ContactInfo>📞 (+212) 665976678</ContactInfo>
          <ContactInfo>📧 bijou@bijoux.com</ContactInfo>

          {/* Social Icons */}
          <SocialIcons>
            <IconLink href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF />
            </IconLink>
            <IconLink href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter />
            </IconLink>
            <IconLink href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </IconLink>
            <IconLink href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedinIn />
            </IconLink>
          </SocialIcons>
        </Column>
      </FooterContent>

      {/* Copyright */}
      <Copyright>© 2025 Company Name - All Rights Reserved</Copyright>
    </FooterContainer>
  );
};

export default Footer;
