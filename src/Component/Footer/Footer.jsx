import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaInstagram, FaArrowUp } from "react-icons/fa";
import { SiVisa, SiMastercard, SiPaypal } from "react-icons/si";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Left: Logo & Contact */}
        
          <div className="footer-logo">
            <h3>My Electronics Store</h3>
          </div>

          <div className="footer-contact">
            <h4>Contact Us</h4>
            <p>Address: 123 Tech Street, Mumbai, India</p>
            <p>Email: support@myelectronics.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        

        {/* Center: Social Icons */}
        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Right: Payment Icons */}
        <div className="footer-payments">
          <h4>We Accept</h4>
          <div className="payment-icons">
            <SiVisa />
            <SiMastercard />
            <SiPaypal />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 My Electronics Store. All rights reserved.</p>
        <button
          className="go-top-btn"
          onClick={scrollToTop}
          title="Back to Top"
        >
          <FaArrowUp />
        </button>
      </div>
    </footer>
  );
};

export default Footer;