import React, { useState } from 'react';
import OSWindow from '../App'; // Use the OSWindow component from App

export default function ContactWindow({ onClose }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the form data to your backend or email service
    setSubmitted(true);
  };

  return (
    <OSWindow
      title="Contact Me"
      onClose={onClose}
      initial={{ x: 480, y: 180, w: 360, h: 400 }}
      minWidth={280}
      minHeight={260}
    >
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <div style={{ marginBottom: 18 }}>
          <h3 style={{ margin: 0 }}>Let's Connect!</h3>
          <p style={{ margin: '8px 0 0 0', fontSize: '1rem', color: '#888' }}>
            Fill out the form below to reach out directly. I'll get back to you as soon as possible.
          </p>
        </div>
        {submitted ? (
          <div style={{ color: '#4b3fc4', fontWeight: 600, fontSize: '1.1rem', marginTop: 32 }}>Thank you for your message!</div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ padding: 10, fontSize: '1rem', border: '1px solid #bfc9d1', outline: 'none' }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ padding: 10, fontSize: '1rem', border: '1px solid #bfc9d1', outline: 'none' }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              style={{ padding: 10, fontSize: '1rem', border: '1px solid #bfc9d1', outline: 'none', resize: 'vertical' }}
            />
            <button type="submit" style={{ marginTop: 10, padding: '10px 0', background: '#6c63ff', color: '#fff', border: 'none', fontWeight: 600, fontSize: '1.1rem', cursor: 'pointer' }}>
              Send Message
            </button>
          </form>
        )}
      </div>
    </OSWindow>
  );
} 