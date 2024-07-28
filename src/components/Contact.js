import React from 'react';
import { FormattedMessage } from 'react-intl';
import { FaInstagram, FaTelegram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section className="contact">
      <h2><FormattedMessage id="contact.title" defaultMessage="Contact Me" /></h2>
      <div className="social-links">
        <a href="https://www.instagram.com/kosqaras/" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="https://t.me/kosqaras" target="_blank" rel="noopener noreferrer"><FaTelegram /></a>
        <a href="https://wa.me/87018005682" target="_blank" rel="noopener noreferrer"><FaWhatsapp /></a>
        <a href="mailto:ayanatkz@icloud.com"><FaEnvelope /></a>
      </div>
    </section>
  );
}

export default Contact;