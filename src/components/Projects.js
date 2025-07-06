import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { FiStar, FiZap, FiCode, FiSearch, FiPlay, FiPause, FiX, FiInfo, FiGithub, FiExternalLink } from 'react-icons/fi';
import { AnimatePresence, motion, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const projectsData = [
    {
      id: 1,
      title: 'Alumni Association Portal',
      subtitle: 'Connecting Alumni & Students',
      description: 'A comprehensive platform for connecting graduated students with their college for future engagement, networking, and collaboration opportunities.',
      longDescription: 'Built using the MERN stack, this portal offers alumni profiles, job boards, event management, and mentorship programs. Features include secure authentication, interactive alumni maps, personalized dashboards, and automated email notifications for upcoming events.',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'mongodb', 'express'],
      github: 'https://github.com/Varunmathiazhagan/Alumni-Association-Student-Portal',
      demo: '#',
      featured: true,
      category: 'web',
      status: 'completed',
      year: 2024,
      duration: '6 months',
      teamSize: 4,
      technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Socket.io'],
      highlights: ['Real-time messaging', 'Advanced search', 'Event management', 'Job board'],
      metrics: {
        users: '500+',
        performance: '98%',
        satisfaction: '4.8/5'
      }
    },
    {
      id: 2,
      title: 'Social Media Dashboard Analyzer',
      subtitle: 'AI-Powered Analytics',
      description: 'A comprehensive analytics dashboard that provides sentiment analysis for Twitter, YouTube tracking, real-time trending news, and an integrated chatbot.',
      longDescription: 'This full-stack application utilizes machine learning for sentiment analysis of social media data. It provides real-time analytics with customizable dashboards, API integrations with multiple social platforms, and data visualization tools. The chatbot uses NLP to respond to user queries about social media trends and metrics.',
      image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80',
      tags: ['react', 'python', 'ml', 'api'],
      github: 'https://github.com/Varunmathiazhagan/Social-media-dashboard_fullstack',
      demo: '#',
      featured: true,
      category: 'data',
      status: 'completed',
      year: 2024,
      duration: '4 months',
      teamSize: 2,
      technologies: ['React', 'Python', 'TensorFlow', 'Flask', 'Chart.js', 'Twitter API'],
      highlights: ['Sentiment analysis', 'Real-time data', 'ML algorithms', 'Interactive charts'],
      metrics: {
        accuracy: '94%',
        processing: '1M+ tweets',
        speed: '2s avg'
      }
    },
    {
      id: 3,
      title: 'OAS - Organization Management',
      subtitle: 'Enterprise Solution',
      description: 'A comprehensive system for Organization and Administration Management, streamlining tasks, user management, and efficient data handling.',
      longDescription: 'OAS is designed to improve organizational efficiency with features including role-based access control, automated workflow management, document processing, and comprehensive reporting tools. The system integrates with existing platforms and provides a unified interface for all administrative tasks.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'sql', 'oauth'],
      github: 'https://github.com/Varunmathiazhagan/OAS',
      demo: '#',
      featured: true,
      category: 'web',
      status: 'completed',
      year: 2024,
      duration: '8 months',
      teamSize: 5,
      technologies: ['React', 'Node.js', 'MySQL', 'OAuth2', 'Redux', 'Material-UI'],
      highlights: ['Role-based access', 'Workflow automation', 'Document management', 'Analytics'],
      metrics: {
        efficiency: '+45%',
        users: '200+',
        uptime: '99.9%'
      }
    },
    {
      id: 4,
      title: 'Personal AI Assistant',
      description: 'A Python-based personal assistant capable of providing weather reports, chat responses, and generating images and videos.',
      longDescription: 'This multimodal AI assistant leverages several machine learning models to offer a comprehensive personal assistant experience. It integrates with weather APIs, implements conversational AI using transformer models, and utilizes generative AI for creating images and videos based on text prompts. The system is designed to be extensible with a plugin architecture.',
      image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['python', 'ml', 'api', 'ai'],
      github: 'https://github.com/Varunmathiazhagan/mulitmodel_ai',
      demo: '#',
      featured: false,
      category: 'ai'
    },
    {
      id: 5,
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform with payment processing, user authentication, and admin dashboard.',
      image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'node', 'mongodb'],
      github: '#',
      demo: '#',
      featured: false,
      category: 'web'
    },
    {
      id: 6,
      title: 'Task Management App',
      description: 'Collaborative task management application with real-time updates and team features.',
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1932&q=80',
      tags: ['react', 'node', 'socket'],
      github: '#',
      demo: '#',
      featured: false,
      category: 'web'
    },
    {
      id: 7,
      title: 'Ziya - Ayurveda Health Platform',
      description: 'A comprehensive Ayurvedic wellness platform with advanced geofencing to connect users with nearby practitioners and herbal stores.',
      longDescription: 'This React-based application integrates advanced geofencing technology to help users locate Ayurveda practitioners, herbal stores, and wellness centers within their vicinity. Features include personalized health assessments, detailed practitioner profiles with ratings, appointment scheduling, secure payment processing, and a knowledge base of Ayurvedic remedies. The platform also offers inventory management for herbal stores and real-time availability tracking using MongoDB for efficient data handling and retrieval.',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'mongodb', 'geolocation', 'healthcare'],
      github: 'https://github.com/Varunmathiazhagan/ziya-ayurveda',
      demo: '#',
      featured: true,
      category: 'web'
    },
    {
      id: 8,
      title: 'Interactive Knowledge Quiz',
      description: 'An enhanced quiz platform with real-time multiplayer capabilities, adaptive learning, and comprehensive analytics dashboard.',
      longDescription: 'This interactive quiz application features real-time multiplayer functionality, allowing users to compete against friends or random opponents. The platform incorporates adaptive learning algorithms that adjust question difficulty based on user performance. Built with React for the frontend and MongoDB for data persistence, it includes features such as leaderboards, achievement badges, question categorization, timed challenges, and detailed analytics that track learning progress over time. The responsive design ensures a seamless experience across desktop and mobile devices.',
      image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
      tags: ['react', 'mongodb', 'socket.io', 'analytics'],
      github: 'https://github.com/Varunmathiazhagan/interactive-quiz',
      demo: '#',
      featured: false,
      category: 'web',
      stats: {
        views: 324,
        likes: 42,
        created: '2023-06-15'
      }
    },
  ];

// Freelancing projects data
const freelancingProjects = [
  {
    id: 1,
    title: 'DevForge Hackathon Registration Website',
    subtitle: 'Official University Event Platform',
    description: 'Official registration platform for the IT department\'s DevForge hackathon, facilitating participant sign-ups and team formation.',
    longDescription: 'Developed for the university IT department, this website streamlined the registration process for the DevForge hackathon. Built with React and Node.js, it features user authentication, team creation/joining functionality, real-time registration updates, and an admin dashboard for managing participants and teams. Integrated email notifications kept participants informed. The platform successfully managed over 200 participants and 50 teams, with features for project submissions and judging integration.',
    image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1770&q=80',
    tags: ['react', 'node', 'mongodb', 'auth', 'event'],
    github: 'https://github.com/Varunmathiazhagan/DevForge-Hackathon',
    demo: '#',
    featured: true,
    category: 'web',
    stats: {
      views: 512,
      likes: 78, 
      created: '2023-09-10'
    },
    highlights: [
      'Used by 200+ participants',
      'Real-time team formation',
      'Project submission & judging system'
    ],
    client: 'University IT Department'
  },
  {
    id: 2,
    title: 'KSP Yarns E-Commerce Platform',
    subtitle: 'Premium Textile Online Store',
    description: 'A comprehensive e-commerce platform for KSP Yarns with integrated payment processing, inventory management, and customer loyalty programs.',
    longDescription: 'Developed a full-featured e-commerce solution for KSP Yarns, a premium textile manufacturer. The platform features a responsive design that showcases product catalogs with detailed filtering options, high-quality image galleries, and video demonstrations. Backend functionality includes inventory management with low-stock alerts, order processing with status tracking, secure payment integration, and customer account management. The analytics dashboard provides insights into sales trends, customer behavior, and marketing campaign effectiveness, helping the client make data-driven business decisions.',
    image: 'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1772&q=80',
    tags: ['react', 'node', 'mongodb', 'e-commerce', 'payments'],
    github: 'https://github.com/Varunmathiazhagan/ksp-yarns-ecommerce',
    demo: 'https://kspyarns.com',
    featured: true,
    category: 'web',
    stats: {
      views: 780,
      likes: 93,
      created: '2023-11-15'
    },
    highlights: [
      'Increased online sales by 150%',
      'Seamless payment integration',
      'Custom inventory management system',
      'Mobile-responsive design'
    ],
    client: 'KSP Yarns Textiles',
    payment: '₹10,000'
  }
];

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const modalRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [sortBy, setSortBy] = useState('featured');
  // eslint-disable-next-line no-unused-vars
  const [multiFilter, setMultiFilter] = useState([]);
  const [autoPlay, setAutoPlay] = useState(false);
  const searchRef = useRef(null);
  const controls = useAnimation();
  const containerRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const [showScrollTop, setShowScrollTop] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [hoveredProject, setHoveredProject] = useState(null);

  const handleProjectDetails = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    },
    exit: { 
      opacity: 0, 
      y: -50, 
      scale: 0.9,
      transition: { duration: 0.2 }
    }
  };
  
  const projects = useMemo(() => projectsData, []);

  // Apply advanced filtering with search and multiple filters
  const getFilteredProjects = useCallback(() => {
    let result = projects;
    
    // Apply search term
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(term) || 
        project.description.toLowerCase().includes(term) || 
        project.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      if (filter === 'featured') {
        result = result.filter(project => project.featured);
      } else if (['web', 'data', 'ai'].includes(filter)) {
        result = result.filter(project => project.category === filter);
      } else {
        result = result.filter(project => project.tags.includes(filter));
      }
    }
    
    // Apply multi-filters if any
    if (multiFilter.length > 0) {
      result = result.filter(project => 
        multiFilter.some(tag => project.tags.includes(tag))
      );
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'newest':
        result = [...result].sort((a, b) => 
          new Date(b.stats?.created || '2023-01-01') - new Date(a.stats?.created || '2023-01-01'));
        break;
      case 'popular':
        result = [...result].sort((a, b) => (b.stats?.views || 0) - (a.stats?.views || 0));
        break;
      case 'likes':
        result = [...result].sort((a, b) => (b.stats?.likes || 0) - (a.stats?.likes || 0));
        break;
      case 'featured':
      default:
        result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    return result;
  }, [filter, searchTerm, multiFilter, sortBy, projects]);

  const filteredProjects = getFilteredProjects();
  
  // Add scroll reveal animation for project cards
  const [, projectInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (projectInView) {
      controls.start('visible');
    }
  }, [controls, projectInView]);

  // Reset search when filter changes
  useEffect(() => {
    if (filter !== 'all') {
      setSearchTerm('');
    }
  }, [filter]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press "/" to focus search
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);

  // Handle scroll to show/hide scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (!projectsSection) return;
      
      const rect = projectsSection.getBoundingClientRect();
      setShowScrollTop(rect.top < -300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle keyboard navigation in modal
  const handleModalKeyDown = useCallback((e) => {
    if (!showModal) return;
    
    if (e.key === 'Escape') {
      closeModal();
    } else if (e.key === 'Tab') {
      // Keep focus trapped within modal
      if (!modalRef.current) return;
      
      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      
      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        e.preventDefault();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        e.preventDefault();
      }
    }
  }, [showModal, closeModal]);

  // Manage focus when modal opens/closes
  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        if (modalRef.current) {
          const firstFocusable = modalRef.current.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
          if (firstFocusable) firstFocusable.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showModal]);
  
  // Enhanced modal control with keyboard navigation
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleModalKeyDown);
    } else {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleModalKeyDown);
    }
    
    return () => {
      document.body.style.overflow = 'auto';
      document.removeEventListener('keydown', handleModalKeyDown);
    };
  }, [showModal, handleModalKeyDown]);

  // Enhanced Project Card Component
  const ProjectCard = ({ project, index }) => {
    const cardRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [10, -10]);
    const rotateY = useTransform(x, [-100, 100], [-10, 10]);

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPercent = (mouseX / rect.width - 0.5) * 2;
      const yPercent = (mouseY / rect.height - 0.5) * 2;
      x.set(xPercent * 50);
      y.set(yPercent * 50);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const statusColors = {
      completed: 'text-green-400 bg-green-400/20',
      inProgress: 'text-yellow-400 bg-yellow-400/20',
      planned: 'text-blue-400 bg-blue-400/20'
    };

    return (
      <motion.div
        ref={cardRef}
        className="group relative h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{ perspective: 1000 }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
      >
        <motion.div 
          className="relative h-full bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden"
          style={{ rotateX, rotateY }}
          whileHover={{ 
            scale: 1.02,
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          {/* Project Image */}
          <div className="relative h-48 overflow-hidden">
            <motion.img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Status Badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[project.status]}`}>
                {project.status}
              </span>
            </div>

            {/* Featured Badge */}
            {project.featured && (
              <div className="absolute top-4 right-4">
                <motion.div 
                  className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <FiStar className="text-white text-sm" />
                </motion.div>
              </div>
            )}

            {/* Overlay on Hover */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
            >
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex space-x-2">
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiGithub className="text-lg" />
                  </motion.a>
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiExternalLink className="text-lg" />
                  </motion.a>
                  <motion.button
                    onClick={() => handleProjectDetails(project)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FiInfo className="text-lg" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Info */}
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-cyan-400 font-medium">{project.subtitle}</p>
              </div>
              <span className="text-xs text-gray-400">{project.year}</span>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 line-clamp-3">
              {project.description}
            </p>

            {/* Metrics */}
            {project.metrics && (
              <div className="grid grid-cols-3 gap-2 mb-4">
                {Object.entries(project.metrics).map(([key, value]) => (
                  <motion.div 
                    key={key} 
                    className="text-center"
                    initial={{ opacity: 1, scale: 1 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1
                    }}
                    transition={{ duration: 0 }}
                  >
                    <div className="text-lg font-bold text-cyan-400">{value}</div>
                    <div className="text-xs text-gray-400 capitalize">{key}</div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full border border-gray-600/50"
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(59, 130, 246, 0.2)' }}
                  initial={{ opacity: 1, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Project Details */}
            <div className="flex items-center justify-between text-xs text-gray-400">
              <span>Team: {project.teamSize}</span>
              <span>{project.duration}</span>
            </div>
          </div>

          {/* Hover Glow Effect */}
          <motion.div 
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.2 : 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-xl" />
          </motion.div>
        </motion.div>
      </motion.div>
    );
  };

  // Reset search when filter changes
  useEffect(() => {
    if (filter !== 'all') {
      setSearchTerm('');
    }
  }, [filter]);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Press "/" to focus search
      if (e.key === '/' && document.activeElement !== searchRef.current) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section 
      id="projects" 
      ref={containerRef}
      className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/10 to-purple-900/10 relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -150, 0],
            y: [0, 100, 0],
            scale: [1, 0.8, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
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
            <FiZap className="text-cyan-400 text-xl" />
            <span className="text-white font-medium">Featured Work</span>
            <FiCode className="text-pink-400 text-xl" />
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              My Projects
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Showcasing innovative solutions and creative implementations across various technologies
          </p>
        </motion.div>

        {/* Freelancing Projects Showcase with animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.div 
            className="flex flex-col items-center mb-12"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center space-x-3 mb-6 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-purple-500/30"
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(168, 85, 247, 0.4)' }}
            >
              <FiStar className="text-purple-400 text-xl" />
              <span className="text-white font-medium">Client Projects</span>
              <FiStar className="text-pink-400 text-xl" />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Freelancing Work
              </span>
            </h3>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Professional projects delivered for clients with exceptional results and satisfaction
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {freelancingProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-70 transition duration-300"></div>
                <div className="relative bg-gray-800/90 rounded-2xl p-6 h-full flex flex-col">
                  <div className="lg:flex gap-6 mb-6">
                    <motion.div 
                      className="lg:w-1/2 h-56 overflow-hidden rounded-xl mb-4 lg:mb-0"
                      whileHover={{ scale: 1.05 }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition duration-700 ease-in-out transform group-hover:scale-110"
                      />
                    </motion.div>
                    
                    <div className="lg:w-1/2">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-2xl font-bold text-white">{project.title}</h4>
                        <motion.div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-bold px-3 py-1 rounded-full"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {project.payment}
                        </motion.div>
                      </div>
                      <p className="text-purple-400 font-medium mb-3">{project.subtitle}</p>
                      <p className="text-gray-300 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 4).map((tag, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * i }}
                            className="px-3 py-1 bg-gray-700/70 text-gray-300 text-xs rounded-full"
                          >
                            {tag}
                          </motion.span>
                        ))}
                      </div>
                      
                      <p className="text-gray-400 text-sm mb-4">
                        <span className="font-semibold">Client:</span> {project.client}
                      </p>
                      
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700/50 rounded-full text-white hover:bg-purple-500/50 transition-colors"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiGithub className="text-lg" />
                        </motion.a>
                        <motion.a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-gray-700/50 rounded-full text-white hover:bg-pink-500/50 transition-colors"
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiExternalLink className="text-lg" />
                        </motion.a>
                        <motion.button
                          onClick={() => handleProjectDetails(project)}
                          className="p-2 bg-gray-700/50 rounded-full text-white hover:bg-blue-500/50 transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FiInfo className="text-lg" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Highlights */}
                  <div className="mt-auto">
                    <h5 className="font-semibold text-white mb-2 flex items-center gap-2">
                      <FiStar className="text-purple-400" /> Key Achievements
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {project.highlights.map((highlight, i) => (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * i }}
                          className="flex items-center text-sm text-gray-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mr-2"></div>
                          {highlight}
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Add prominent buttons */}
                  <div className="mt-6 pt-4 border-t border-gray-700/50 flex flex-wrap gap-3">
                    <motion.a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-700/70 hover:bg-purple-600/80 text-white rounded-lg flex items-center gap-2 transition-colors"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiGithub /> View Code
                    </motion.a>
                    <motion.a 
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/80 to-pink-500/80 text-white rounded-lg flex items-center gap-2"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FiExternalLink /> Live Demo
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enhanced Controls for regular projects */}
        <motion.div 
          className="flex flex-col lg:flex-row justify-between items-center mb-12 space-y-4 lg:space-y-0"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2">
            {['all', 'web', 'data', 'ai', 'mobile'].map((category) => (
              <motion.button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  filter === category
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                    : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 border border-gray-700/50'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category === 'all' ? 'All Projects' : category.charAt(0).toUpperCase() + category.slice(1)}
              </motion.button>
            ))}
          </div>

          {/* View Controls */}
          <div className="flex items-center space-x-4">
            {/* Auto-play Toggle */}
            <motion.button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`p-2 rounded-full transition-colors ${
                autoPlay ? 'bg-cyan-500 text-white' : 'bg-gray-800/50 text-gray-300 border border-gray-700/50'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {autoPlay ? <FiPause /> : <FiPlay />}
            </motion.button>

            {/* Search */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700/50 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 w-48"
              />
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index} 
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FiSearch className="text-4xl text-gray-600 mb-4 mx-auto" />
            <p className="text-gray-400 text-lg">No projects found matching your criteria</p>
            <button 
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }}
              className="mt-4 px-6 py-2 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-colors"
            >
              Reset Filters
            </button>
          </motion.div>
        )}
        
      </div>
      
      {/* Project Details Modal - Enhanced with content animations */}
      <AnimatePresence>
        {showModal && selectedProject && (
          <motion.div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              ref={modalRef}
              className="bg-gray-800/90 backdrop-blur-md rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl shadow-blue-500/20"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-labelledby="modal-title"
              aria-modal="true"
              tabIndex="-1"
            >
              <div className="p-6 md:p-8">
                <motion.div
                  className="flex justify-between items-center mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 id="modal-title" className="text-2xl md:text-3xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                    {selectedProject.title}
                  </h3>
                  <motion.button 
                    onClick={closeModal}
                    className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-700/50 transition-all"
                    whileHover={{ scale: 1.1, rotate: 90, backgroundColor: "rgba(100, 100, 100, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close modal"
                  >
                    <FiX className="text-xl" />
                  </motion.button>
                </motion.div>
                
                <motion.div 
                  className="aspect-video rounded-lg overflow-hidden mb-6 group shadow-lg"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                </motion.div>
                
                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-2 flex items-center gap-2"><FiInfo /> Project Overview</h4>
                  <p className="text-gray-300 leading-relaxed">{selectedProject.longDescription || selectedProject.description}</p>
                </motion.div>
                
                {/* Project Highlights in Modal */}
                {selectedProject.highlights && selectedProject.highlights.length > 0 && (
                  <motion.div
                    className="mb-6"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 }}
                  >
                    <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2"><FiStar /> Key Highlights</h4>
                    <ul className="list-disc list-inside text-gray-300 space-y-2 pl-2">
                      {selectedProject.highlights.map((highlight, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + index * 0.05 }}
                        >
                          {highlight}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                <motion.div 
                  className="mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h4 className="text-lg font-semibold text-blue-400 mb-3 flex items-center gap-2"><FiCode /> Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, index) => (
                      <motion.span 
                        key={index} 
                        className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full border border-gray-600"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.3)", y: -2 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ 
                          opacity: 1, 
                          y: 0,
                          transition: { delay: 0.4 + (index * 0.05) }
                        }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex flex-wrap gap-4 mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.a 
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiGithub /> View Source Code
                  </motion.a>
                  <motion.a 
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center gap-2"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(124, 58, 237, 0.5)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiExternalLink /> Live Demo
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
                       