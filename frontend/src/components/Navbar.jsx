import React from 'react';
import Magnetic from './Magnetic';

const Navbar = ({ profile, setView, currentView }) => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar">
        <Magnetic>
          <div className="nav-logo" onClick={() => setView('home')} style={{ cursor: 'none' }}>
            <span className="nav-logo-dot"></span>
            {profile?.name ? profile.name.split(' ')[0] : 'Portfolio'}
          </div>
        </Magnetic>
        <div style={{ display: 'flex', gap: '2rem', margin: '0 2rem' }}>
          <Magnetic>
             <button onClick={() => setView('home')} className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'none', color: currentView === 'home' || currentView === 'project' ? '#fff' : 'var(--text-muted)', fontFamily: 'inherit', fontSize: '0.9rem' }}>Home / Work</button>
          </Magnetic>
          <Magnetic>
             <button onClick={() => setView('contact')} className="nav-link" style={{ background: 'transparent', border: 'none', cursor: 'none', color: currentView === 'contact' ? '#fff' : 'var(--text-muted)', fontFamily: 'inherit', fontSize: '0.9rem' }}>Contact</button>
          </Magnetic>
        </div>
        {profile?.resume && (
           <Magnetic>
             <a href={profile.resume} download className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.8rem', cursor: 'none' }}>
               Resume
             </a>
           </Magnetic>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
