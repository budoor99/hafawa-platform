import React, { useState } from 'react';
import '../styles/contact.css'; // We'll create this CSS file next

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will contact you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="contact-page">


      <div className="content-container">

        <div className="main-content">
          <h2>Contact Us</h2>
          <p className="subtitle">Have questions or need assistance? Reach out to our team.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label className='form-label fw-semibold' htmlFor="name">Full Name <span className="text-danger">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your full name..."
                required
              />
            </div>


            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="email">Email Address <span className="text-danger">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your email address..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter your phone number..."
              />
            </div>

            <div className="form-group">
              <label className="form-label fw-semibold" htmlFor="message">Message <span className="text-danger">*</span></label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
                placeholder="Type your message here..."
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">SEND MESSAGE</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;