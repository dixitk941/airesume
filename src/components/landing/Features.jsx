import { motion } from 'framer-motion';
import { 
  FaRobot, 
  FaDownload, 
  FaMobileAlt, 
  FaPalette, 
  FaClock, 
  FaShieldAlt, 
  FaMagic, 
  FaChartLine,
  FaCheckCircle,
  FaEye,
  FaGlobe,
  FaFileAlt
} from 'react-icons/fa';

const mainFeatures = [
  {
    icon: FaRobot,
    title: 'AI-Powered Content',
    description: 'Smart suggestions for skills, experience descriptions, and industry-specific keywords that make recruiters notice.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-50',
    stats: '95% Better'
  },
  {
    icon: FaPalette,
    title: 'Professional Templates',
    description: 'Choose from 15+ stunning, ATS-optimized templates designed by hiring experts and loved by recruiters.',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-50',
    stats: '15+ Templates'
  },
  {
    icon: FaClock,
    title: '5-Minute Creation',
    description: 'Build a complete professional resume faster than making coffee. Our smart form guides you step by step.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50',
    stats: '< 5 Minutes'
  },
  {
    icon: FaDownload,
    title: 'Perfect PDF Export',
    description: 'Download pixel-perfect PDFs that look exactly like your preview. No formatting surprises, ever.',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50',
    stats: '100% Accurate'
  }
];

const additionalFeatures = [
  { icon: FaShieldAlt, text: 'ATS-Optimized Templates' },
  { icon: FaMagic, text: 'One-Click Formatting' },
  { icon: FaChartLine, text: 'Real-time Preview' },
  { icon: FaCheckCircle, text: 'Error Detection' },
  { icon: FaEye, text: 'Live Preview Mode' },
  { icon: FaGlobe, text: 'Multi-Language Support' },
  { icon: FaFileAlt, text: 'Multiple Export Formats' },
  { icon: FaMobileAlt, text: 'Mobile Responsive' }
];

const Features = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-blue-800 font-medium text-sm mb-4">
              <FaMagic className="mr-2" />
              Powerful Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-900">Everything You Need to</span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                Land Your Dream Job
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional tools and AI-powered insights to create resumes that get noticed by recruiters and pass ATS systems.
            </p>
          </motion.div>
        </div>

        {/* Main Features Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {mainFeatures.map((feature, index) => (
            <motion.div 
              key={index} 
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`text-2xl bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`} />
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
                
                <div className={`inline-flex items-center px-3 py-1 bg-gradient-to-r ${feature.color} text-white rounded-full text-sm font-semibold`}>
                  {feature.stats}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-8 lg:p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Plus Many More Features
            </h3>
            <p className="text-gray-600 text-lg">
              Every detail designed to give you the competitive edge
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-3 text-gray-700 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <feature.icon className="text-blue-500 text-lg flex-shrink-0" />
                <span className="font-medium text-sm">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;

