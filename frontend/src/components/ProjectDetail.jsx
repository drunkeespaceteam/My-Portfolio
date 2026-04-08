import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import Magnetic from './Magnetic';
import { ArrowLeft } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text, ContactShadows, MeshDistortMaterial } from '@react-three/drei';

function AbstractModel({ titleIndex }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
        meshRef.current.rotation.x += delta * 0.2;
        meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
       <mesh ref={meshRef}>
         {titleIndex % 2 === 0 ? <icosahedronGeometry args={[1.5, 0]} /> : <torusKnotGeometry args={[1, 0.3, 100, 16]} />}
         <MeshDistortMaterial color={titleIndex % 2 === 0 ? '#7928ca' : '#0070f3'} distort={titleIndex % 2 === 0 ? 0.4 : 0.8} speed={2} roughness={0.2} metalness={0.8} />
       </mesh>
       <Text position={[0, -2.5, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="middle">
         {titleIndex % 2 === 0 ? "Neural Node Analysis Active" : "Blockchain Vector Topology"}
       </Text>
    </Float>
  );
}

const ProjectDetail = ({ project, setView }) => {
  if (!project) return null;
  // hash the title for deterministic 3D rendering
  const titleIndex = project.title ? project.title.length : 0;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="container section"
      style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', paddingTop: '120px' }}
    >
      <div style={{ zIndex: 10 }}>
        <Magnetic>
           <button onClick={() => setView('home')} className="btn btn-glass" style={{ marginBottom: '2rem', padding: '10px 20px', cursor: 'none' }}>
             <ArrowLeft size={18} style={{ marginRight: '8px' }} /> Back to Portfolio
           </button>
        </Magnetic>
        
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem', letterSpacing: '-0.05em', lineHeight: 1 }}>{project.title}</h1>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {project.tags && project.tags.map((tag, i) => (
            <span key={i} className="tag-pill" style={{ background: 'rgba(0,112,243,0.1)', borderColor: 'rgba(0,112,243,0.3)', color: '#fff' }}>{tag}</span>
          ))}
        </div>
        
        <p className="desc" style={{ fontSize: '1.25rem', marginBottom: '3rem', color: '#ccc' }}>
          {project.description}
        </p>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
           <h3 style={{ marginBottom: '1rem', color: '#fff', fontSize: '1.5rem', fontWeight: 600 }}>Technical Implementation</h3>
           <p className="desc" style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>
             This project represents a structural achievement in {project.tags?.[0] || 'software architecture'}. 
             We engineered isolated backend data handlers and exposed them through lightning fast APIs, 
             rendering the UI layer through hardware-accelerated interfaces.
           </p>
           
           <div style={{ display: 'flex', gap: '1rem' }}>
             {project.github && (
               <Magnetic>
                 <a href={project.github} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ cursor: 'none' }}>
                   View Repository
                 </a>
               </Magnetic>
             )}
             <Magnetic>
               <a href="#" className="btn btn-glass" style={{ cursor: 'none' }}>
                 Live Demo
               </a>
             </Magnetic>
           </div>
        </div>
      </div>

      <div style={{ position: 'relative', borderRadius: '24px', overflow: 'hidden', background: '#050505', border: '1px solid rgba(255,255,255,0.1)' }}>
         <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <directionalLight position={[-10, -10, 5]} intensity={0.5} color="#7928ca" />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            <AbstractModel titleIndex={titleIndex} />
            <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={10} blur={2} far={4} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
         </Canvas>
         
         <div style={{ position: 'absolute', top: '20px', right: '20px', background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: '99px', backdropFilter: 'blur(10px)', fontSize: '0.8rem', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', zIndex: 20 }}>
           <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00e599', boxShadow: '0 0 10px #00e599', animation: 'pulse 2s infinite' }}></div>
           WebGL Environment
         </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetail;
