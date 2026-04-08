import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Magnetic from './Magnetic';

const FeelableVisualizer = ({ index }) => {
  const variations = [
    ( // Complex Node Network
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '15px', transform: 'rotateX(45deg) rotateZ(45deg)', transformStyle: 'preserve-3d' }}>
        {[...Array(9)].map((_, i) => (
          <motion.div key={i}
            style={{ width: '30px', height: '30px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', backdropFilter: 'blur(5px)' }}
            animate={{ z: [0, Math.random() * 40 + 20, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 + Math.random(), delay: i * 0.1 }}
          />
        ))}
      </div>
    ),
    ( // Isometric Stacked Blockchain Glass
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', transformStyle: 'preserve-3d' }}>
        {[...Array(4)].map((_, i) => (
          <motion.div key={i}
            style={{ width: '140px', height: '40px', background: 'linear-gradient(135deg, rgba(0,112,243,0.3), rgba(0,112,243,0.05))', border: '1px solid rgba(0,112,243,0.4)', borderRadius: '4px', transform: 'skewX(-30deg)', transformStyle: 'preserve-3d' }}
            animate={{ scaleX: [1, 1.2, 1], x: [0, i % 2 === 0 ? 20 : -20, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: i * 0.2 }}
          />
        ))}
      </div>
    ),
    ( // AI Pulse Waves
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {[...Array(10)].map((_, i) => (
          <motion.div key={i}
            style={{ width: '10px', background: 'linear-gradient(to top, #ff0080, #7928ca)', borderRadius: '4px' }}
            animate={{ height: [20, Math.random() * 120 + 40, 20] }}
            transition={{ repeat: Infinity, duration: 1 + Math.random(), delay: i * 0.05 }}
          />
        ))}
      </div>
    )
  ];
  return variations[index % variations.length];
};

const ProjectSection = ({ project, index, onExpand }) => {
  const isReverse = index % 2 !== 0;
  
  // 3D Parallax Hover Logic
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  
  const rotateX = useTransform(springY, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Parallax Scroll logic for background context image
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <motion.div 
      className={`project-card ${isReverse ? 'reverse' : ''}`}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1200px" }}
    >
      <motion.div 
         ref={ref}
         onMouseMove={handleMouseMove}
         onMouseLeave={handleMouseLeave}
         style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
         className="project-image-box"
      >
         <div className="project-image-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at center, rgba(30,30,30,0.8), #000)', overflow: 'hidden', position: 'relative' }}>
            
            {/* The Feelable Interactive Abstract UI */}
             <motion.div style={{ transform: 'translateZ(80px)', position: 'absolute', zIndex: 10 }}>
               <FeelableVisualizer index={index} />
             </motion.div>

            {/* Parallax Background Context Image */}
           {project.image && (
              <motion.img 
                src={project.image} 
                alt="Context" 
                style={{ y: parallaxY, width: '100%', height: '140%', objectFit: 'cover', opacity: 0.15, filter: 'blur(8px)', position: 'absolute', top: '-20%' }} 
              />
           )}
         </div>
      </motion.div>

      <div className="project-info">
         <span className="project-number">0{index + 1}</span>
         <h3>{project.title}</h3>
         <p className="desc" style={{ fontSize: '1.1rem' }}>{project.description}</p>
         
         <div className="project-tags">
            {project.tags && Array.isArray(project.tags) && project.tags.map((tag, i) => (
              <span key={i} className="tag-pill">{tag}</span>
            ))}
         </div>

         <Magnetic>
           <button onClick={onExpand} className="btn btn-glass" style={{ marginTop: '1rem', cursor: 'none', background: 'transparent', color: 'white', fontFamily: 'inherit' }}>
             View Detail <ArrowRight size={18} />
           </button>
         </Magnetic>
      </div>
    </motion.div>
  );
};
export default ProjectSection;
