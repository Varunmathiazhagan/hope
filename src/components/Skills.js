import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { 
  DiReact, DiNodejsSmall, DiMongodb, DiJavascript1, DiCss3, DiHtml5, 
  DiJava, DiPython, DiGit, DiMysql, DiLinux
} from 'react-icons/di';
import { 
  SiNextdotjs, SiTailwindcss, SiDocker, 
  SiC, SiCplusplus, SiFlutter, 
  SiKubernetes, SiTensorflow
} from 'react-icons/si';
import { FaSearch, FaTimes, FaCode, FaRocket, FaLightbulb, FaDatabase, FaServer, FaPalette } from 'react-icons/fa';

const Skills = () => {
  // Remove hoveredSkill state as it's causing unnecessary re-renders
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const skillsRef = useRef(null);
  
  // Motion values for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Enhanced skill data with ratings and descriptions
  const skillCategories = useMemo(() => [
    {
      name: "Programming Languages",
      icon: <FaCode className="text-2xl" />,
      description: "Core programming languages I master",
      skills: [
        { name: 'JavaScript', icon: <DiJavascript1 className="text-4xl" />, color: '#F7DF1E', colorGradient: 'from-yellow-400 to-yellow-300', rating: 95, description: "Modern ES6+ & frameworks" },
        { name: 'Java', icon: <DiJava className="text-4xl" />, color: '#007396', colorGradient: 'from-blue-600 to-blue-500', rating: 90, description: "Enterprise applications" },
        { name: 'C', icon: <SiC className="text-4xl" />, color: '#A8B9CC', colorGradient: 'from-gray-400 to-gray-300', rating: 85, description: "System programming" },
        { name: 'C++', icon: <SiCplusplus className="text-4xl" />, color: '#00599C', colorGradient: 'from-blue-700 to-blue-600', rating: 88, description: "Object-oriented programming" },
        { name: 'Python', icon: <DiPython className="text-4xl" />, color: '#3776AB', colorGradient: 'from-blue-600 to-green-500', rating: 92, description: "Data science & automation" },
      ]
    },
    {
      name: "Frontend Development",
      icon: <FaPalette className="text-2xl" />,
      description: "Creating beautiful user interfaces",
      skills: [
        { name: 'React', icon: <DiReact className="text-4xl" />, color: '#61DAFB', colorGradient: 'from-cyan-500 to-blue-400', rating: 95, description: "Component-based architecture" },
        { name: 'Next.js', icon: <SiNextdotjs className="text-4xl" />, color: '#000000', colorGradient: 'from-gray-800 to-gray-700', rating: 90, description: "Full-stack React framework" },
        { name: 'HTML5', icon: <DiHtml5 className="text-4xl" />, color: '#E34F26', colorGradient: 'from-orange-600 to-red-500', rating: 98, description: "Semantic markup" },
        { name: 'CSS3', icon: <DiCss3 className="text-4xl" />, color: '#1572B6', colorGradient: 'from-blue-600 to-blue-500', rating: 95, description: "Advanced styling & animations" },
        { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-4xl" />, color: '#38B2AC', colorGradient: 'from-teal-500 to-cyan-400', rating: 93, description: "Utility-first CSS framework" },
      ]
    },
    {
      name: "Backend Development",
      icon: <FaServer className="text-2xl" />,
      description: "Scalable server-side solutions",
      skills: [
        { name: 'Node.js', icon: <DiNodejsSmall className="text-4xl" />, color: '#539E43', colorGradient: 'from-green-600 to-green-500', rating: 92, description: "JavaScript runtime" },
        { name: 'MongoDB', icon: <DiMongodb className="text-4xl" />, color: '#47A248', colorGradient: 'from-green-600 to-green-500', rating: 90, description: "NoSQL database" },
        { name: 'MySQL', icon: <DiMysql className="text-4xl" />, color: '#4479A1', colorGradient: 'from-blue-700 to-blue-600', rating: 88, description: "Relational database" },
      ]
    },
    {
      name: "DevOps & Tools",
      icon: <FaRocket className="text-2xl" />,
      description: "Development and deployment tools",
      skills: [
        { name: 'Git', icon: <DiGit className="text-4xl" />, color: '#F05032', colorGradient: 'from-red-500 to-orange-500', rating: 95, description: "Version control" },
        { name: 'Docker', icon: <SiDocker className="text-4xl" />, color: '#2496ED', colorGradient: 'from-blue-500 to-blue-400', rating: 85, description: "Containerization" },
        { name: 'Kubernetes', icon: <SiKubernetes className="text-4xl" />, color: '#326CE5', colorGradient: 'from-blue-600 to-blue-500', rating: 80, description: "Container orchestration" },
        { name: 'Linux', icon: <DiLinux className="text-4xl" />, color: '#FCC624', colorGradient: 'from-yellow-500 to-yellow-400', rating: 90, description: "System administration" },
      ]
    },
    {
      name: "Mobile Development",
      icon: <FaRocket className="text-2xl" />,
      description: "Cross-platform mobile apps",
      skills: [
        { name: 'Flutter', icon: <SiFlutter className="text-4xl" />, color: '#02569B', colorGradient: 'from-blue-700 to-blue-600', rating: 87, description: "Cross-platform framework" },
      ]
    },
    {
      name: "AI & ML",
      icon: <FaLightbulb className="text-2xl" />,
      description: "Machine learning and AI",
      skills: [
        { name: 'TensorFlow', icon: <SiTensorflow className="text-4xl" />, color: '#FF6F00', colorGradient: 'from-orange-600 to-orange-500', rating: 82, description: "Machine learning framework" },
      ]
    }
  ], []);

  // Areas of interest section
  const interests = useMemo(() => [
    {
      name: "Full-Stack Development",
      icon: <FaCode className="text-4xl" />,
      description: "Building end-to-end web applications with modern technologies",
      color: "from-blue-500 to-purple-500",
    },
    {
      name: "Database Management System",
      icon: <FaDatabase className="text-4xl" />,
      description: "Designing and managing efficient database systems",
      color: "from-cyan-500 to-blue-500",
    },
    {
      name: "Data Science",
      icon: <FaDatabase className="text-4xl" />,
      description: "Extracting insights and building data-driven applications",
      color: "from-green-500 to-teal-500",
    },
    {
      name: "AI/ML Applications",
      icon: <FaLightbulb className="text-4xl" />,
      description: "Integrating machine learning into practical applications",
      color: "from-purple-500 to-pink-500",
    },
  ], []);

  // Define all categories for filter buttons
  const allCategories = useMemo(() => ['All', ...skillCategories.map(category => category.name)], [skillCategories]);

  // Filter skills based on category and search query
  const filteredSkills = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery) {
      return skillCategories;
    }

    if (selectedCategory === 'All') {
      return skillCategories.map(category => ({
        ...category,
        skills: category.skills.filter(skill => 
          skill.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.skills.length > 0);
    }

    const filteredCategory = skillCategories.find(
      category => category.name === selectedCategory
    );
    
    if (!filteredCategory) return [];
    
    if (!searchQuery) {
      return [filteredCategory];
    }
    
    return [{
      ...filteredCategory,
      skills: filteredCategory.skills.filter(skill => 
        skill.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }].filter(category => category.skills.length > 0);
  }, [skillCategories, selectedCategory, searchQuery]);

  // Mouse tracking for 3D effects
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (skillsRef.current) {
        const rect = skillsRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    const skillsSection = skillsRef.current;
    if (skillsSection) {
      skillsSection.addEventListener('mousemove', handleMouseMove);
      return () => skillsSection.removeEventListener('mousemove', handleMouseMove);
    }
  }, [mouseX, mouseY]);

  // Unified visibility detection with better performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Remove isVisible state usage since it's not needed
          if (entry.isIntersecting) {
            // Handle visibility if needed
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );
    
    const currentRef = skillsRef.current;
    
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, []);

  // Optimized animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.8
      }
    }
  }), []);

  // Optimize the SkillCard component with React.memo for better performance
  const SkillCard = React.memo(({ skill, category, index, total }) => {
    const cardRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const cardRotateX = useTransform(y, [-100, 100], [5, -5]); 
    const cardRotateY = useTransform(x, [-100, 100], [-5, 5]);
    
    // Add local hover state to reduce parent component re-renders
    const [isHovered, setIsHovered] = useState(false);
    
    // Simplify orbital animation calculation
    const orbitX = Math.cos((index / total) * Math.PI * 2) * 20;
    const orbitY = Math.sin((index / total) * Math.PI * 2) * 20;

    const handleMouseMove = useCallback((e) => {
      if (!cardRef.current) return;
      try {
        const rect = cardRef.current.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPercent = (mouseX / rect.width - 0.5) * 2;
        const yPercent = (mouseY / rect.height - 0.5) * 2;
        x.set(xPercent * 50);
        y.set(yPercent * 50);
      } catch (error) {
        console.warn('Error in mouse move handler:', error);
      }
    }, [x, y]);

    const handleMouseLeave = useCallback(() => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    }, [x, y]);

    const handleMouseEnter = useCallback(() => {
      setIsHovered(true);
    }, []);

    // Add cleanup for motion values
    useEffect(() => {
      return () => {
        x.set(0);
        y.set(0);
      };
    }, [x, y]);

    // Add console log for debugging
    useEffect(() => {
      console.log(`Rendering skill card: ${skill.name}`);
    }, [skill.name]);

    return (
      <motion.div
        ref={cardRef}
        variants={itemVariants}
        className="group relative min-h-[220px] min-w-[150px] flex"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ perspective: 1000 }}
        whileHover={{ zIndex: 10 }}
        role="button"
        tabIndex={0}
        aria-label={`${skill.name} skill - ${skill.rating}% proficiency`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleMouseEnter();
          }
        }}
      >
        <motion.div
          className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 overflow-hidden flex-1 flex flex-col"
          initial={{ opacity: 1 }} // Ensure it starts visible
          animate={{ opacity: 1 }} // Keep it visible
          style={{ 
            rotateX: isHovered ? cardRotateX : 0, 
            rotateY: isHovered ? cardRotateY : 0,
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
          }}
          whileHover={{ 
            scale: 1.03, 
            boxShadow: `0 10px 30px ${skill.color}20`,
            y: -3
          }}
          transition={{ 
            type: 'spring', 
            stiffness: 300, 
            damping: 15, 
            mass: 0.5
          }}
        >
          {/* Skill Level Progress Bar - Only animate once */}
          <motion.div
            className="absolute top-2 left-2 right-2 h-1 bg-gray-700 rounded-full overflow-hidden"
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <motion.div 
              className={`h-full bg-gradient-to-r ${skill.colorGradient} rounded-full`}
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.rating}%` }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
            />
          </motion.div>

          {/* Optimized orbiting elements - Only render when hovered */}
          {isHovered && (
            <motion.div
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ 
                backgroundColor: skill.color,
                opacity: 0.6,
                left: '50%',
                top: '50%',
                marginLeft: '-3px',
                marginTop: '-3px'
              }}
              animate={{
                x: [orbitX, -orbitX, orbitX],
                y: [orbitY, -orbitY, orbitY],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          )}
          
          {/* Skill Icon with animations - Optimize hover effects */}
          <motion.div 
            className="flex justify-center mb-4 relative pt-4"
            style={{ color: skill.color }}
          >
            {/* Icon with hover effect - Use local hover state */}
            <motion.div
              whileHover={{
                scale: 1.1,
                rotate: 10,
              }}
              transition={{ 
                duration: 0.3,
                type: "spring",
                stiffness: 300
              }}
            >
              {skill.icon}
            </motion.div>
          </motion.div>

          {/* Skill Name */}
          <h4 className="text-white font-semibold text-center mb-2">
            {skill.name}
          </h4>

          {/* Skill Rating - Remove percentage display */}
          <div className="flex items-center justify-center mb-2">
            {/* Rating percentage removed */}
          </div>

          {/* Skill Description - Always visible */}
          <div className="text-xs text-gray-400 text-center leading-relaxed mt-auto">
            <p className="line-clamp-2">
              {skill.description}
            </p>
          </div>
        </motion.div>
      </motion.div>
    );
  });

  // Add displayName for better debugging
  SkillCard.displayName = 'SkillCard';

  return (
    <section 
      id="skills" 
      ref={skillsRef}
      className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 relative overflow-hidden"
    >
      {/* Animated Background Elements - Reduce complexity */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          // Simplify animation to improve performance
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div 
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          // Simplify animation to improve performance
          animate={{ 
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div 
            className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <FaCode className="text-cyan-400 text-xl" />
            <span className="text-white font-medium">Technical Expertise</span>
            <FaRocket className="text-pink-400 text-xl" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Skills
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Technologies and tools I use to build amazing digital experiences
          </p>
        </motion.div>

        {/* Enhanced Filter & Search Controls */}
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-center mb-12 space-y-4 md:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 justify-center">
            {allCategories.map((category, index) => (
              <motion.button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Search Control */}
          <div className="relative">
            <motion.div 
              className="flex items-center space-x-2"
              layout
            >
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 200, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    placeholder="Search skills..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400"
                  />
                )}
              </AnimatePresence>
              <motion.button
                onClick={() => {
                  setIsSearchOpen(!isSearchOpen);
                  if (isSearchOpen) setSearchQuery('');
                }}
                className="p-3 bg-gray-800/50 border border-gray-700/50 rounded-full text-gray-300 hover:text-cyan-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {isSearchOpen && searchQuery ? <FaTimes /> : <FaSearch />}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>

        {/* Skills Grid with error boundary and performance optimizations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCategory}-${searchQuery}`}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            className="space-y-16"
          >
            {filteredSkills.length > 0 ? (
              filteredSkills.map((category) => (
                <motion.div key={category.name} variants={itemVariants}>
                  <motion.div 
                    className="text-center mb-8"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-center space-x-3 mb-3">
                      <motion.span 
                        style={{ color: '#60A5FA' }}
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear"
                        }}
                      >
                        {category.icon}
                      </motion.span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {category.name}
                      </h3>
                    </div>
                    <p className="text-gray-400">{category.description}</p>
                  </motion.div>

                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
                    variants={containerVariants}
                    initial="visible" // Change from initial={false} to ensure visibility
                  >
                    {/* Add key with both category and skill name to ensure uniqueness */}
                    {category.skills.map((skill, index) => (
                      <React.Fragment key={`${category.name}-${skill.name}`}>
                        <SkillCard 
                          skill={skill} 
                          category={category} 
                          index={index} 
                          total={category.skills.length}
                        />
                      </React.Fragment>
                    ))}
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <FaSearch className="text-4xl text-gray-600 mb-4 mx-auto" />
                <p className="text-gray-400 text-lg">No skills found matching your criteria</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Areas of Interest Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-24 text-center"
        >
          <h3 className="text-3xl font-bold text-white mb-8">
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
              Areas of Interest
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gray-800/50 backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 relative overflow-hidden"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index }}
                  className={`absolute inset-0 bg-gradient-to-br ${interest.color} opacity-20 rounded-2xl`}
                />
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 10 }} 
                  className="text-4xl mb-4 relative z-10"
                  style={{ color: "white" }}
                >
                  {interest.icon}
                </motion.div>
                <h4 className="text-xl font-bold text-white mb-2 relative z-10">{interest.name}</h4>
                <p className="text-gray-300 relative z-10 text-sm">{interest.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Results Message - Remove duplicate */}
      </div>
    </section>
  );
};

export default Skills;
    
