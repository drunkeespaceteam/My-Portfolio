import React from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';

const HeroSection = ({ profile, setView }) => {
  const name = profile?.name || "Mohamed Sahidh";
  const bio = (profile?.bio || "Building extremely polished, infinitely scalable, and robust software architectures from frontend to backend.").split(" ");

  const container = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: { staggerChildren: 0.04, delayChildren: 0.1 } }
  };

  const wordItem = {
      hidden: { opacity: 0, y: 50, rotateX: -60, filter: 'blur(4px)' },
      show: { opacity: 1, y: 0, rotateX: 0, filter: 'blur(0px)', transition: { type: "spring", stiffness: 150, damping: 15 } }
  };

  return (
    <section className="section container" id="home" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'center', width: '100%' }} className="hero-grid">
        <motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="hero-badge"
          >
            <span className="hero-badge-pulse"></span>
            Available for worldwide opportunities
          </motion.div>
          
          <motion.h1 variants={container} initial="hidden" animate="show" style={{ perspective: '1000px' }}>
            <motion.span variants={wordItem} style={{ display: 'inline-block', marginRight: '1.5rem', transformOrigin: 'bottom center' }}>Hi,</motion.span>
            <motion.span variants={wordItem} style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>I'm</motion.span>
            <br/>
            <motion.span variants={wordItem} className="magic-gradient-text" style={{ display: 'inline-block', transformOrigin: 'bottom center' }}>{name}</motion.span>
          </motion.h1>
          
          <motion.p variants={container} initial="hidden" animate="show" className="desc" style={{ marginTop: '2rem', marginBottom: '3rem', perspective: '1000px' }}>
            {bio.map((word, i) => (
               <motion.span key={i} variants={wordItem} style={{ display: 'inline-block', marginRight: '0.4rem', transformOrigin: 'bottom center' }}>{word}</motion.span>
            ))}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}
          >
             <Magnetic>
                 <a href="#projects" className="btn btn-primary" style={{ cursor: 'none' }}>View My Work</a>
             </Magnetic>
             <Magnetic>
                 <button onClick={() => setView('contact')} className="btn btn-glass" style={{ cursor: 'none', fontFamily: 'inherit', fontSize: '1rem' }}>Get In Touch</button>
             </Magnetic>
          </motion.div>
        </motion.div>

        {/* Floating Premium Avatar Frame */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
           style={{ display: 'flex', justifyContent: 'center' }}
           className="hero-avatar-area"
        >
           <Magnetic>
               <div className="premium-avatar-wrapper" style={{ position: 'relative', width: '320px', height: '320px' }}>
                  <div style={{ position: 'absolute', inset: '-15px', background: 'conic-gradient(from 0deg, var(--accent-purple), var(--accent-blue), transparent, var(--accent-purple))', borderRadius: '50%', filter: 'blur(20px)', opacity: 0.6, animation: 'spinAnim 5s linear infinite' }}></div>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', padding: '6px', position: 'relative', zIndex: 2, backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}>
                     <div style={{ width: '100%', height: '100%', borderRadius: '50%', overflow: 'hidden', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {profile?.image ? (
                           <img 
                             key={profile.image}
                             src={profile.image} 
                             alt={name} 
                             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                             onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random"; }}
                           />
                        ) : (
                           <img 
                             src={"https://ui-avatars.com/api/?name=" + encodeURIComponent(name) + "&background=random"} 
                             alt={name} 
                             style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                           />
                        )}
                     </div>
                  </div>
               </div>
           </Magnetic>
        </motion.div>
      </div>
    </section>
  );
};
export default HeroSection;
