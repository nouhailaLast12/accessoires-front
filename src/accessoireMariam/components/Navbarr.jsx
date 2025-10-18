import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbarr = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSubmenu = (menu) => {
    setActiveSubmenu(activeSubmenu === menu ? null : menu);
  };

  const navItems = [
    { name: 'Accueil', path: '/' },
    { 
      name: 'Collections', 
      path: '/collections',
      submenu: [
        { name: 'Nouveautés', path: '/new' },
        { name: 'Best-sellers', path: '/bestsellers' },
        { name: 'Édition limitée', path: '/limited' }
      ]
    },
    { name: 'Boutique', path: '/shop' },
    { name: 'À propos', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${mobileMenuOpen ? 'mobile-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">Mariam Jewelry</span>
        </Link>

        <div className="mobile-menu-icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <div className={`bar1 ${mobileMenuOpen ? 'change' : ''}`}></div>
          <div className={`bar2 ${mobileMenuOpen ? 'change' : ''}`}></div>
          <div className={`bar3 ${mobileMenuOpen ? 'change' : ''}`}></div>
        </div>

        <ul className="nav-menu">
          {navItems.map((item, index) => (
            <li 
              key={index} 
              className={`nav-item ${activeSubmenu === item.name ? 'active' : ''}`}
              onMouseEnter={() => item.submenu && toggleSubmenu(item.name)}
              onMouseLeave={() => item.submenu && toggleSubmenu(null)}
            >
              <Link 
                to={item.path} 
                className="nav-links"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (!item.submenu) setActiveSubmenu(null);
                }}
              >
                {item.name}
                {item.submenu && <span className="dropdown-arrow">▼</span>}
              </Link>

              {item.submenu && (
                <ul className="submenu">
                  {item.submenu.map((subItem, subIndex) => (
                    <li key={subIndex}>
                      <Link 
                        to={subItem.path} 
                        className="submenu-link"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <button className="search-btn">
            <i className="fas fa-search"></i>
          </button>
          <button className="cart-btn">
            <i className="fas fa-shopping-bag"></i>
            <span className="cart-count">3</span>
          </button>
          <button className="account-btn">
            <i className="fas fa-user"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbarr;