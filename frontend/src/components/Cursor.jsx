import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Cursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const [isHovered, setIsHovered] = useState(false);

    // Smooth spring physics for the cursor
    const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e) => {
            cursorX.set(e.clientX - 16); // Center of the 32x32 circle
            cursorY.set(e.clientY - 16);
        };

        const handleMouseOver = (e) => {
            if (e.target.closest('a') || e.target.closest('button') || e.target.closest('.magnetic') || e.target.closest('input') || e.target.closest('textarea') || e.target.closest('.project-card')) {
                setIsHovered(true);
            } else {
                setIsHovered(false);
            }
        };

        window.addEventListener('mousemove', moveCursor);
        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mouseover', handleMouseOver);
        };
    }, []);

    return (
        <motion.div
            style={{
                position: 'fixed',
                left: 0,
                top: 0,
                x: cursorXSpring,
                y: cursorYSpring,
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.4)',
                backgroundColor: isHovered ? 'rgba(255,255,255,0.05)' : 'transparent',
                pointerEvents: 'none',
                zIndex: 99999,
                backdropFilter: isHovered ? 'blur(2px)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mixBlendMode: 'difference'
            }}
            animate={{
                scale: isHovered ? 2.5 : 1,
            }}
            transition={{ type: "tween", ease: "backOut", duration: 0.3 }}
        >
            <div style={{ width: 4, height: 4, background: '#fff', borderRadius: '50%', opacity: isHovered ? 0 : 1, transition: 'opacity 0.2s' }} />
        </motion.div>
    );
};

export default Cursor;
