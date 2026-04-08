import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const ContactSection = ({ profile }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('http://localhost:8000/api/contact/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="section container" id="contact">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}>Let's build something</h2>
        <p className="desc" style={{ margin: '0 auto' }}>If you have a project that needs world-class engineering, I'm available.</p>
      </div>

      <motion.div 
        className="contact-card"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-grid">
           <div>
             <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: 700 }}>Direct Reach</h3>
             <p className="desc" style={{ marginBottom: '2.5rem' }}>
               Reach out directly via email or social platforms. Let's make it happen.
             </p>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
               {profile?.email && <div style={{display: 'flex'}}><span style={{color: 'rgba(255,255,255,0.4)', width: '100px'}}>Email</span> <Magnetic><a href={`mailto:${profile.email}`} className="nav-link" style={{cursor: 'none'}}>{profile.email}</a></Magnetic></div>}
               {profile?.linkedin && <div style={{display: 'flex'}}><span style={{color: 'rgba(255,255,255,0.4)', width: '100px'}}>LinkedIn</span> <Magnetic><a href={profile.linkedin} target="_blank" rel="noreferrer" className="nav-link" style={{cursor: 'none'}}>Connect</a></Magnetic></div>}
               {profile?.github && <div style={{display: 'flex'}}><span style={{color: 'rgba(255,255,255,0.4)', width: '100px'}}>GitHub</span> <Magnetic><a href={profile.github} target="_blank" rel="noreferrer" className="nav-link" style={{cursor: 'none'}}>Follow</a></Magnetic></div>}
             </div>
           </div>

           <form onSubmit={handleSubmit}>
             <div className="input-glow-group">
               <label htmlFor="name">Name</label>
               <input type="text" id="name" name="name" className="premium-input" style={{cursor: 'none'}} required value={formData.name} onChange={handleChange} placeholder="John Doe" />
             </div>
             <div className="input-glow-group">
               <label htmlFor="email">Email</label>
               <input type="email" id="email" name="email" className="premium-input" style={{cursor: 'none'}} required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
             </div>
             <div className="input-glow-group">
               <label htmlFor="message">Message</label>
               <textarea id="message" name="message" rows="4" className="premium-input" style={{cursor: 'none'}} required value={formData.message} onChange={handleChange} placeholder="Tell me about your project..."></textarea>
             </div>
             <Magnetic>
                 <button type="submit" className="btn btn-primary" disabled={status === 'sending'} style={{ marginTop: '1rem', cursor: 'none' }}>
                    {status === 'sending' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
                 </button>
             </Magnetic>
           </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ContactSection;
