import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Logo from './Logo';
import AuthContext from '../core/AuthContext';

const Navbar = () => {
  const { isLogged } = useContext(AuthContext); 
  const navigate = useNavigate(); 

  const scrollToSection = (hash) => {
    navigate('/');
    setTimeout(() => {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <header className="navbar">
      <nav>
        <div className="navbar-logo">
          <Logo />
        </div>
        <ul>
          <li>
            <button className="nav-link" onClick={() => navigate('/')}>
              Home
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection('#about')}>
              About
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => scrollToSection('#destinations')}>
              Destinations
            </button>
          </li>
          <li>
            <button className="nav-link" onClick={() => navigate('/newLocation')}>
              New Location
            </button>
          </li>
          {!isLogged && (
            <li>
              <NavLink to="/login"  className="nav-link">Login</NavLink>
            </li>
          )}
          {isLogged && (
            <>
              <li>
                <NavLink to="/logout"  className="nav-link">Logout</NavLink>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;