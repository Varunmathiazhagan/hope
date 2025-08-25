import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiStar, FiZap, FiTarget, FiThumbsUp, FiFlag } from 'react-icons/fi';
import { useInView } from 'react-intersection-observer';

const achievementsData = [
  {
    id: 1,
    title: "Dean's Merit Award",
    organization: "University of Technology",
    date: "2023",
    description: "Awarded for outstanding academic performance and maintaining a CGPA above 9.5 throughout the degree program.",
    icon: <FiAward className="text-yellow-500" />,
    category: "academic"
  },
  {
    id: 2,
    title: "Hackathon Champion",
    organization: "TechFest 2023",
    date: "2023",
    description: "First place winner in the national-level 36-hour hackathon for developing an innovative solution for healthcare accessibility.",
    icon: <FiFlag className="text-cyan-500" />,
    category: "technical"
  },
  {
    id: 3,
    title: "Outstanding Research Paper",
    organization: "International Conference on AI & ML",
    date: "2022",
    description: "Recognized for research paper on 'Optimizing Neural Networks for Edge Computing Devices' at the prestigious international conference.",
    icon: <FiStar className="text-purple-500" />,
    category: "research"
  },
  {
    id: 4,
    title: "Campus Ambassador",
    organization: "Microsoft Student Partner Program",
    date: "2021-2023",
    description: "Selected as Microsoft Student Partner to represent and promote Microsoft technologies on campus through workshops and events.",
    icon: <FiTarget className="text-blue-500" />,
    category: "leadership"
  },
  {
    id: 5,
    title: "Open Source Contributor",
    organization: "GitHub",
    date: "2022",
    description: "Recognized in the top 500 contributors for Hacktoberfest, with over 20 merged pull requests to major open-source projects.",
    icon: <FiThumbsUp className="text-green-500" />,
    category: "technical"
  }
];

const Achievements = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-40 left-10 w-64 h-64 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            x: [0, -70, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
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
            <FiAward className="text-yellow-400 text-xl" />
            <span className="text-white font-medium">Recognition & Honors</span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-center mb-4">
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Recognitions and accomplishments that highlight my dedication and excellence
          </p>
        </motion.div>

        {/* Achievements List */}
        <div 
          ref={ref} 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {achievementsData.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative h-full"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-500/50 to-orange-500/30 rounded-xl blur opacity-0 group-hover:opacity-70 transition duration-300"></div>
              <div className="relative h-full p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl flex flex-col transition-all duration-300 group-hover:bg-gray-800/80 group-hover:translate-y-[-5px]">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-gray-700/70 rounded-lg">
                    <div className="text-2xl">
                      {achievement.icon}
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-900/50 text-gray-300 text-xs rounded-full border border-gray-700/50">
                    {achievement.date}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">
                  {achievement.title}
                </h3>
                
                <p className="text-cyan-400 text-sm mb-3">
                  {achievement.organization}
                </p>
                
                <p className="text-gray-300 text-sm mb-4 flex-grow">
                  {achievement.description}
                </p>
                
                <div className="mt-auto">
                  <span className="inline-block px-3 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full capitalize">
                    {achievement.category}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 mb-6">Interested in my qualifications and achievements?</p>
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-medium rounded-full"
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(234, 179, 8, 0.5)" }}
            whileTap={{ scale: 0.95 }}
          >
            Get In Touch
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
