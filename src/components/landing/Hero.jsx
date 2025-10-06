import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  FaArrowRight, 
  FaRocket, 
  FaStar, 
  FaCrown, 
  FaLightbulb,
  FaCheckCircle,
  FaUsers,
  FaClock
} from 'react-icons/fa';

const Hero = ({ onGetStarted }) => {
  const [currentStat, setCurrentStat] = useState(0);
  const controls = useAnimation();
  
  const stats = [
    { icon: FaUsers, number: '50,000+', label: 'Resumes Created' },
    { icon: FaStar, number: '4.9/5', label: 'User Rating' },
    { icon: FaClock, number: '< 5 min', label: 'Average Time' },
    { icon: FaCrown, number: '95%', label: 'Success Rate' }
  ];

  const features = [
    { icon: FaCheckCircle, text: 'ATS-Optimized Templates' },
    { icon: FaLightbulb, text: 'AI-Powered Suggestions' },
    { icon: FaRocket, text: 'One-Click Export' },
    { icon: FaCrown, text: 'Professional Designs' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [stats.length]);

  useEffect(() => {
    controls.start({
      scale: [1, 1.1, 1],
      transition: { duration: 0.6, ease: "easeInOut" }
    });
  }, [currentStat, controls]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 opacity-20 blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 opacity-15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-teal-400 to-blue-600 opacity-10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2">
                  <FaStar className="text-yellow-300" />
                  <span>AI-Powered Resume Builder</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-900">Create Your</span>
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
                  Dream Resume
                </span>
                <br />
                <span className="text-gray-900">in Minutes</span>
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Land your dream job with professional, ATS-optimized resumes. 
                Our AI technology ensures your skills shine through beautifully crafted templates.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  onClick={onGetStarted}
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 inline-flex items-center justify-center space-x-3"
                >
                  <FaRocket className="group-hover:animate-bounce" />
                  <span>Start Building Now</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button className="bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 border-2 border-gray-200">
                  See Examples
                </button>
              </div>
              
              {/* Feature list */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto lg:mx-0">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex items-center space-x-2 text-gray-700"
                  >
                    <feature.icon className="text-green-500 text-sm" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Content - Interactive Resume Preview */}
          <div className="lg:order-last">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main resume mockup */}
              <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 transform rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[8.5/11] p-8">
                  {/* Resume header mockup */}
                  <div className="mb-6">
                    <div className="h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                  </div>
                  
                  {/* Content sections */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                      <div className="h-3 bg-gray-100 rounded"></div>
                      <div className="h-3 bg-gray-100 rounded w-5/6"></div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="space-y-1">
                        <div className="h-3 bg-gray-100 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                        <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                      <div className="flex flex-wrap gap-2">
                        {[...Array(6)].map((_, i) => (
                          <div key={i} className="h-6 w-16 bg-blue-100 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating success badge */}
                <motion.div
                  animate={controls}
                  className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-full shadow-lg"
                >
                  <div className="flex items-center space-x-2 text-sm font-bold">
                    <FaCheckCircle />
                    <span>ATS Ready!</span>
                  </div>
                </motion.div>
              </div>
              
              {/* Floating stats card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100"
              >
                <motion.div animate={controls} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    {React.createElement(stats[currentStat].icon, { className: "text-2xl text-blue-600 mr-2" })}
                    <span className="text-2xl font-bold text-gray-900">
                      {stats[currentStat].number}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{stats[currentStat].label}</p>
                </motion.div>
              </motion.div>
              
              {/* Template preview cards */}
              <div className="absolute -top-8 -left-8 space-y-2">
                {['Professional', 'Modern', 'Creative'].map((template, index) => (
                  <motion.div
                    key={template}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="bg-white px-3 py-2 rounded-lg shadow-lg text-xs font-medium text-gray-700 border border-gray-200"
                  >
                    {template} Template
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

