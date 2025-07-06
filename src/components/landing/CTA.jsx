import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const CTA = ({ onGetStarted }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Create Your Professional Resume?</h2>
        <p className="text-xl text-blue-100 mb-10 max-w-3xl mx-auto">
          Get started today and land your dream job with a resume that stands out from the crowd.
        </p>
        
        <button 
          onClick={onGetStarted}
          className="bg-white text-blue-700 hover:bg-blue-50 font-medium px-8 py-4 rounded-full text-lg inline-flex items-center shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Build My Resume <FaArrowRight className="ml-2" />
        </button>
      </motion.div>
    </section>
  );
};

export default CTA;
