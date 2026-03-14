import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const About = () => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [imageError, setImageError] = useState(false);

  // Check if user prefers reduced motion (safely handle cases where matchMedia isn't available)
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const rotateX = useTransform(y, [-100, 100], [15, -15]);
  const rotateY = useTransform(x, [-100, 100], [-15, 15]);

  const handleMouseMove = (e) => {
    try {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      if (!rect || rect.width === 0 || rect.height === 0) return;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPercent = (mouseX / rect.width - 0.5) * 2;
      const yPercent = (mouseY / rect.height - 0.5) * 2;

      x.set(xPercent * 50);
      y.set(yPercent * 50);
    } catch (error) {
      console.error('Error in handleMouseMove:', error);
    }
  };

  const handleMouseLeave = () => {
    try {
      x.set(0);
      y.set(0);
    } catch (error) {
      console.error('Error in handleMouseLeave:', error);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <section id="about" className="py-20 bg-dark relative overflow-hidden">
      {/* Background gradient elements */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-dark to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-dark to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          whileInView={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? {} : { duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="section-heading text-4xl md:text-5xl font-bold text-white">About Me</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Column */}
          <motion.div 
            ref={cardRef}
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            whileInView={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative group"
            onMouseMove={prefersReducedMotion ? undefined : handleMouseMove}
            onMouseLeave={prefersReducedMotion ? undefined : handleMouseLeave}
            style={{ perspective: prefersReducedMotion ? 'none' : 1000 }}
          >
            <motion.div 
              className="aspect-square rounded-2xl overflow-hidden card-3d shadow-xl shadow-primary-500/20"
              style={{ 
                rotateX: prefersReducedMotion ? 0 : rotateX, 
                rotateY: prefersReducedMotion ? 0 : rotateY
              }}
              whileHover={prefersReducedMotion ? {} : { scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {imageError ? (
                // Fallback placeholder when image fails to load
                <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-24 h-24 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-gray-400 text-sm">Image not available</p>
                  </div>
                </div>
              ) : (
                <motion.img 
                  src="/image/varun.jpg" 
                  alt="Varun M - Full Stack Developer" 
                  className="w-full h-full object-cover"
                  style={{ originX: 0.5, originY: 0.5 }} // Ensure scaling is centered
                  onError={handleImageError}
                  animate={prefersReducedMotion ? {} : {
                    y: ["0%", "-2%", "0%"],
                    transition: {
                      duration: 4,
                      ease: "easeInOut",
                      repeat: Infinity,
                    }
                  }}
                  whileHover={prefersReducedMotion ? {} : { 
                    scale: 1.1,
                    transition: { duration: 0.5, ease: 'easeInOut' } 
                  }} 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent pointer-events-none" /> 
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            whileInView={prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-gradient">
              Turning Ideas into Reality
            </h3>
            
            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                Hey there! 👋 I'm a Full Stack Developer passionate about creating seamless digital experiences. 
                With expertise in both front-end aesthetics and back-end architecture, I transform complex problems 
                into elegant solutions.
              </p>
              
              <p>
                From interactive web applications to scalable server architectures, I enjoy working across the entire 
                development stack. My approach combines technical precision with creative innovation.
              </p>

              <div className="text-primary-400">
                <span className="font-semibold">Currently working with:</span>
                <motion.div 
                  className="mt-2 flex flex-wrap gap-3"
                  variants={{ // Container variant for stagger
                    visible: { transition: { staggerChildren: 0.1 } }
                  }}
                  initial={prefersReducedMotion ? "visible" : "hidden"}
                  whileInView={prefersReducedMotion ? "visible" : "visible"}
                  viewport={{ once: true }}
                >
                  {['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'].map((tech, index) => (
                    <motion.span 
                      key={index} 
                      className="px-3 py-1 bg-gray-800/50 rounded-full text-sm border border-gray-700/50"
                      variants={{ // Item variant for stagger
                        hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      whileHover={prefersReducedMotion ? {} : { scale: 1.05, y: -2, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                    >
                      {tech}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>

            <div className="flex gap-4">
              <a 
                href="/resume.pdf" 
                download="Varun_Resume.pdf" 
                className="btn-primary"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
              <a href="#contact" className="btn-primary bg-transparent border-2 border-primary-500">
                Let's Talk
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;