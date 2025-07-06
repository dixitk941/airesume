import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGlobe } from 'react-icons/fa';

const PersonalInfoStep = ({ formData, handleChange, errors = {} }) => {
  const [focusedField, setFocusedField] = useState(null);
  
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  return (
    <div className="py-2">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-[var(--color-text-secondary)] mb-8"
      >
        Let's start with your basic information that employers will use to contact you.
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
        {/* Full Name */}
        <motion.div 
          className="md:col-span-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className={`input-float-container ${focusedField === 'full_name' ? 'focus-highlight' : ''} ${errors.full_name ? 'error-highlight' : ''}`}>
            <input
              type="text"
              id="full_name"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              onFocus={() => handleFocus('full_name')}
              onBlur={handleBlur}
              className={`input-float ${errors.full_name ? 'error' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="full_name" className="input-float-label flex items-center">
              <FaUser className="mr-2 text-[var(--color-text-secondary)]" size={14} />
              Full Name <span className="text-[var(--ios-red)] ml-1">*</span>
            </label>
          </div>
          {errors.full_name && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-[var(--ios-red)]"
            >
              {errors.full_name}
            </motion.p>
          )}
        </motion.div>
        
        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className={`input-float-container ${focusedField === 'email' ? 'focus-highlight' : ''} ${errors.email ? 'error-highlight' : ''}`}>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => handleFocus('email')}
              onBlur={handleBlur}
              className={`input-float ${errors.email ? 'error' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="email" className="input-float-label flex items-center">
              <FaEnvelope className="mr-2 text-[var(--color-text-secondary)]" size={14} />
              Email <span className="text-[var(--ios-red)] ml-1">*</span>
            </label>
          </div>
          {errors.email && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-[var(--ios-red)]"
            >
              {errors.email}
            </motion.p>
          )}
        </motion.div>
        
        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className={`input-float-container ${focusedField === 'phone' ? 'focus-highlight' : ''} ${errors.phone ? 'error-highlight' : ''}`}>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => handleFocus('phone')}
              onBlur={handleBlur}
              className={`input-float ${errors.phone ? 'error' : ''}`}
              placeholder=" "
              required
            />
            <label htmlFor="phone" className="input-float-label flex items-center">
              <FaPhone className="mr-2 text-[var(--color-text-secondary)]" size={14} />
              Phone <span className="text-[var(--ios-red)] ml-1">*</span>
            </label>
          </div>
          {errors.phone && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-[var(--ios-red)]"
            >
              {errors.phone}
            </motion.p>
          )}
        </motion.div>
        
        {/* LinkedIn URL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className={`input-float-container ${focusedField === 'linkedin_url' ? 'focus-highlight' : ''}`}>
            <input
              type="url"
              id="linkedin_url"
              name="linkedin_url"
              value={formData.linkedin_url}
              onChange={handleChange}
              onFocus={() => handleFocus('linkedin_url')}
              onBlur={handleBlur}
              className="input-float"
              placeholder=" "
            />
            <label htmlFor="linkedin_url" className="input-float-label flex items-center">
              <FaLinkedin className="mr-2 text-[var(--color-text-secondary)]" size={14} />
              LinkedIn URL
            </label>
          </div>
        </motion.div>
        
        {/* Portfolio/Website URL */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className={`input-float-container ${focusedField === 'portfolio_url' ? 'focus-highlight' : ''}`}>
            <input
              type="url"
              id="portfolio_url"
              name="portfolio_url"
              value={formData.portfolio_url}
              onChange={handleChange}
              onFocus={() => handleFocus('portfolio_url')}
              onBlur={handleBlur}
              className="input-float"
              placeholder=" "
            />
            <label htmlFor="portfolio_url" className="input-float-label flex items-center">
              <FaGlobe className="mr-2 text-[var(--color-text-secondary)]" size={14} />
              Portfolio URL
            </label>
          </div>
        </motion.div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.7 }}
        className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[rgba(0,122,255,0.05)] to-[rgba(88,86,214,0.05)] border border-[rgba(0,122,255,0.1)]"
      >
        <p className="text-sm text-[var(--ios-blue)]">
          <span className="text-[var(--ios-red)] mr-1">*</span>
          Required fields must be filled to proceed
        </p>
      </motion.div>
    </div>
  );
};

export default PersonalInfoStep;
