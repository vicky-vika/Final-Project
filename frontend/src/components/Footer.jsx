import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="social-media">
        <a className="nav-link" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <i className="bi bi-facebook"></i> Facebook
        </a>
        <a className="nav-link" href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <i className="bi bi-twitter"></i> Twitter
        </a>
        <a className="nav-link" href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <i className="bi bi-instagram"></i> Instagram
        </a>
        <a className="nav-link" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <i className="bi bi-linkedin"></i> LinkedIn
        </a>
      </div>
      <div>
        <p>&copy; 2024 Zoey M. Romeo&#39;s Travel Blog. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
