import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';

/**
 * Contact Component with EmailJS Integration
 * Service ID: service_2873eb3
 * Template ID: template_trkcjep
 * Public Key: NqnyZ-KjIm4aRhu5X
 */
export default function Contact() {
  const formRef = useRef(null);

  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  // Email validation regex
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;
    return re.test(String(email).trim());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.from_name.trim() || formData.from_name.trim().length < 2) {
      newErrors.from_name = 'Please enter your full name (minimum 2 characters).';
    }

    if (!formData.from_email.trim() || !isValidEmail(formData.from_email)) {
      newErrors.from_email = 'Please enter a valid email address.';
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      newErrors.subject = 'Please enter a subject (minimum 3 characters).';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please enter your message (minimum 10 characters).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMessage({ type: '', text: '' });

    if (!validateForm()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill in all required fields correctly before submitting.'
      });
      return;
    }

    setLoading(true);

    const SERVICE_ID = 'service_2873eb3';
    const TEMPLATE_ID = 'template_trkcjep';
    const PUBLIC_KEY = 'NqnyZ-KjIm4aRhu5X';

    // Option 1: sendForm using the form ref
    emailjs
      .sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, {
        publicKey: PUBLIC_KEY
      })
      .then((response) => {
        setLoading(false);
        setStatusMessage({
          type: 'success',
          text: 'Message sent successfully!'
        });
        // Clear form after successful submission
        setFormData({
          from_name: '',
          from_email: '',
          subject: '',
          message: ''
        });
        setErrors({});
      })
      .catch((error) => {
        setLoading(false);
        console.error('EmailJS Submission Error:', error);
        setStatusMessage({
          type: 'error',
          text: error?.text || 'Failed to send message. Please try again later.'
        });
      });
  };

  return (
    <section id="contact" className="contact section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Contact Me</h2>
        <p>I am actively seeking Python Full Stack Developer opportunities. Feel free to connect via email, phone, or LinkedIn!</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          {/* Contact Information Column */}
          <div className="col-lg-5">
            <div className="info-wrap p-4 shadow-sm bg-white rounded-3">
              <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
                <i className="bi bi-geo-alt flex-shrink-0 text-primary fs-3 me-3"></i>
                <div>
                  <h3 className="h5 mb-1 fw-bold">Location</h3>
                  <p className="text-secondary mb-0">Hyderabad, Telangana, India</p>
                </div>
              </div>

              <div className="info-item d-flex mt-4" data-aos="fade-up" data-aos-delay="300">
                <i className="bi bi-telephone flex-shrink-0 text-primary fs-3 me-3"></i>
                <div>
                  <h3 className="h5 mb-1 fw-bold">Phone</h3>
                  <p className="mb-0">
                    <a href="tel:+917207501176" className="text-secondary text-decoration-none">+91 7207501176</a>
                  </p>
                </div>
              </div>

              <div className="info-item d-flex mt-4" data-aos="fade-up" data-aos-delay="400">
                <i className="bi bi-envelope flex-shrink-0 text-primary fs-3 me-3"></i>
                <div>
                  <h3 className="h5 mb-1 fw-bold">Email</h3>
                  <p className="mb-0">
                    <a href="mailto:shaiksamreen864@gmail.com" className="text-secondary text-decoration-none">shaiksamreen864@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="info-item d-flex mt-4" data-aos="fade-up" data-aos-delay="500">
                <i className="bi bi-linkedin flex-shrink-0 text-primary fs-3 me-3"></i>
                <div>
                  <h3 className="h5 mb-1 fw-bold">LinkedIn</h3>
                  <p className="mb-0">
                    <a href="https://www.linkedin.com/in/shaik-samreen-70985527b/" target="_blank" rel="noopener noreferrer" className="text-primary text-decoration-none fw-semibold">
                      linkedin.com/in/shaik-samreen-70985527b
                    </a>
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-3 overflow-hidden shadow-sm border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.31604169527!2d78.26795893081827!3d17.41229980183181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78399738e19!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  frameBorder="0"
                  style={{ border: 0, width: '100%', height: '200px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Location Map"
                ></iframe>
              </div>
            </div>
          </div>

          {/* Contact Form Column */}
          <div className="col-lg-7">
            <div className="bg-white p-4 rounded-3 shadow-sm border" data-aos="fade-up" data-aos-delay="200">
              <h4 className="fw-bold mb-3">Send a Message</h4>

              {/* Status Alert Message */}
              {statusMessage.text && (
                <div
                  className={`alert ${
                    statusMessage.type === 'success' ? 'alert-success' : 'alert-danger'
                  } d-flex align-items-center mb-3 shadow-sm`}
                  role="alert"
                >
                  <i
                    className={`bi ${
                      statusMessage.type === 'success' ? 'bi-check-circle-fill text-success' : 'bi-exclamation-triangle-fill text-danger'
                    } fs-5 me-2`}
                  ></i>
                  <div>{statusMessage.text}</div>
                </div>
              )}

              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <div className="row gy-3">
                  {/* Full Name */}
                  <div className="col-md-6">
                    <label htmlFor="from_name" className="form-label fw-semibold">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="from_name"
                      id="from_name"
                      className={`form-control ${errors.from_name ? 'is-invalid' : ''}`}
                      placeholder="Enter your full name"
                      value={formData.from_name}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    {errors.from_name && <div className="invalid-feedback">{errors.from_name}</div>}
                  </div>

                  {/* Email Address */}
                  <div className="col-md-6">
                    <label htmlFor="from_email" className="form-label fw-semibold">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      name="from_email"
                      id="from_email"
                      className={`form-control ${errors.from_email ? 'is-invalid' : ''}`}
                      placeholder="name@example.com"
                      value={formData.from_email}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    {errors.from_email && <div className="invalid-feedback">{errors.from_email}</div>}
                  </div>

                  {/* Subject */}
                  <div className="col-md-12">
                    <label htmlFor="subject" className="form-label fw-semibold">
                      Subject <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      className={`form-control ${errors.subject ? 'is-invalid' : ''}`}
                      placeholder="Job Opportunity / Project Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    />
                    {errors.subject && <div className="invalid-feedback">{errors.subject}</div>}
                  </div>

                  {/* Message */}
                  <div className="col-md-12">
                    <label htmlFor="message" className="form-label fw-semibold">
                      Message <span className="text-danger">*</span>
                    </label>
                    <textarea
                      name="message"
                      id="message"
                      rows="6"
                      className={`form-control ${errors.message ? 'is-invalid' : ''}`}
                      placeholder="Your message here..."
                      value={formData.message}
                      onChange={handleChange}
                      disabled={loading}
                      required
                    ></textarea>
                    {errors.message && <div className="invalid-feedback">{errors.message}</div>}
                  </div>

                  {/* Submit Button */}
                  <div className="col-md-12 text-center mt-3">
                    <button
                      type="submit"
                      id="contact-submit-btn"
                      className="btn btn-primary px-5 py-2 rounded-pill fw-semibold shadow-sm"
                      style={{ backgroundColor: 'var(--accent-color, #149ddd)', border: 'none' }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-send-fill me-2"></i>Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
