import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FaInstagram, FaTelegram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section className="contact">
      <h2><FormattedMessage id="contact.title" defaultMessage="Contact Me" /></h2>
      <div className="social-links">
        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://t.me/yourusername" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
        <a href="https://wa.me/yournumber" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="mailto:your@email.com"><FaEnvelope /></a>
      </div>
    </section>
  );
}

export default Contact;