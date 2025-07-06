import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Hero = ({ onGetStarted }) => {
  return (
    <div className="relative min-h-screen overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background elements - iOS 17 inspired subtle blurred shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--ios-blue)] opacity-10 blur-3xl"></div>
        <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[var(--ios-purple)] opacity-10 blur-3xl"></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 rounded-full bg-[var(--ios-teal)] opacity-5 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.5,
            ease: [0.23, 1, 0.32, 1] 
          }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6 text-[var(--color-text)]">
            Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--ios-blue)] to-[var(--ios-purple)]">Amazing Resumes</span> in Minutes
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-[var(--color-text-secondary)] mb-10 max-w-3xl mx-auto">
            Our AI-powered resume builder helps you craft polished, ATS-friendly resumes 
            that get noticed by employers.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <button 
            onClick={onGetStarted}
            className="btn-ios px-8 py-4 text-lg inline-flex items-center space-x-2"
          >
            <span>Create Your Resume</span>
            <FaArrowRight size={14} />
          </button>
        </motion.div>
        
        {/* Floating mockup with iOS 17 style card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.3,
            ease: [0.23, 1, 0.32, 1]
          }}
          className="relative max-w-2xl mx-auto animate-float"
        >
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-[var(--color-border)] bg-white">
            <img 
              src="/resume-mockup.png" 
              alt="Resume Mockup" 
              className="w-full"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://placehold.co/600x400/e2e8f0/1e40af?text=Resume+Preview';
              }}
            />
          </div>
          
          {/* Floating badges - iOS 17 style pills */}
          <div className="absolute -right-4 -top-4 bg-white/80 backdrop-blur-md rounded-xl px-3 py-2 text-sm font-medium text-[var(--ios-blue)] shadow-lg border border-[var(--color-border)]">
            <span className="flex items-center">
              ✓ ATS-Optimized
            </span>
          </div>
          
          <div className="absolute -left-4 bottom-1/3 bg-white/80 backdrop-blur-md rounded-xl px-3 py-2 text-sm font-medium text-[var(--ios-green)] shadow-lg border border-[var(--color-border)]">
            <span className="flex items-center">
              ✓ Professional Templates
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;

