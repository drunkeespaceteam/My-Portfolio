import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ProjectSection from './components/ProjectSection';
import ContactSection from './components/ContactSection';
import ProjectDetail from './components/ProjectDetail';
import Cursor from './components/Cursor';
import { AnimatePresence, motion } from 'framer-motion';
import './index.css';

function App() {
  const [projects, setProjects] = useState([]);
  const [profile, setProfile] = useState(null);
  
  // SPA Router State
  const [currentView, setCurrentView] = useState('home'); // 'home', 'contact', 'project'
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/projects/')
      .then(res => res.json())
      .then(data => data && data.length > 0 && setProjects(data))
      .catch(() => console.log('Could not fetch projects.'));

    fetch(`http://localhost:8000/api/profile/?timestamp=${new Date().getTime()}`)
      .then(res => res.json())
      .then(data => data && data.length > 0 && setProfile(data[data.length - 1]))
      .catch(() => console.log('Could not fetch profile.'));
  }, []);

  const navigateToProject = (project) => {
    setSelectedProject(project);
    setCurrentView('project');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateTo = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <>
      <Cursor />
      <div className="bg-noise"></div>
      <div className="aurora-bg">
        <div className="aurora-orb orb-1"></div>
        <div className="aurora-orb orb-2"></div>
        <div className="aurora-orb orb-3"></div>
      </div>
      
      <Navbar profile={profile} setView={navigateTo} currentView={currentView} />
      
      <main style={{ position: 'relative', zIndex: 10 }}>
        <AnimatePresence mode="wait">
           {currentView === 'home' && (
             <motion.div key="home"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
             >
                <HeroSection profile={profile} setView={navigateTo} />
                <div id="projects" className="section container">
                  <div className="project-grid">
                    {projects.map((project, index) => (
                      <ProjectSection key={project.id || index} project={project} index={index} onExpand={() => navigateToProject(project)} />
                    ))}
                  </div>
                </div>
                <footer className="footer-line container">
                   © {new Date().getFullYear()} {profile?.name || 'Mohamed Sahidh'}. All rights reserved.
                </footer>
             </motion.div>
           )}

           {currentView === 'contact' && (
             <motion.div key="contact"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.5 }}
                style={{ paddingTop: '100px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
             >
                <ContactSection profile={profile} />
             </motion.div>
           )}

           {currentView === 'project' && selectedProject && (
             <ProjectDetail key="project" project={selectedProject} setView={navigateTo} />
           )}
        </AnimatePresence>
      </main>
    </>
  );
}

export default App;
