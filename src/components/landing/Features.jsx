import { motion } from 'framer-motion';
import { FaFileAlt, FaRobot, FaDownload, FaMobileAlt } from 'react-icons/fa';

const features = [
  {
    icon: <FaFileAlt className="text-4xl text-blue-500" />,
    title: 'ATS-Friendly Templates',
    description: 'Our resume templates are designed to pass Applicant Tracking Systems and get your resume in front of recruiters.'
  },
  {
    icon: <FaRobot className="text-4xl text-blue-500" />,
    title: 'AI-Powered Suggestions',
    description: 'Get smart content suggestions that highlight your skills and experience in the most effective way.'
  },
  {
    icon: <FaDownload className="text-4xl text-blue-500" />,
    title: 'Multiple Export Options',
    description: 'Download your finished resume as PDF, DOCX, or markdown format to use anywhere you need.'
  },
  {
    icon: <FaMobileAlt className="text-4xl text-blue-500" />,
    title: 'Mobile Friendly',
    description: 'Create and edit your resume on any device - desktop, tablet, or smartphone.'
  }
];

const Features = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Craft Perfect Resumes with Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to create professional resumes that stand out
            </p>
          </motion.div>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              className="card-ios p-8 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
              variants={itemVariants}
            >
              <div className="mb-6 rounded-full bg-blue-50 p-5 inline-flex">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

