import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-section">
      <h4 className="subheading">Find us</h4>
      <h2 className="heading">Contact Us</h2>

      <div className="contact-wrapper">
        <div className="contact-left">
          <div className="contact-info">
            <img src="/images/contact-image.jpg" alt="Contact" className="contact-img" />
            <p>
              <span>📞</span> <strong>Call Us</strong>
              <br />
              +123 45 67 89
            </p>
            <p>
              <span>📧</span> <strong>Email Us</strong>
              <br />
              example@mail.com
            </p>
            <p>
              <span>📍</span> <strong>Address</strong>
              <br />
              208 Trainer Avenue street, Illinois, UK - 62617.
            </p>
          </div>
          
        </div>

        <div className="contact-right">
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="Name" />
              <input type="email" placeholder="Email" />
            </div>
            <input type="text" placeholder="Subject" />
            <textarea placeholder="Message" rows="5"></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;