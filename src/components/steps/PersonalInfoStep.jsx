import { useState, useEffect } from 'react';
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

  // Listen for LinkedIn AutoFill success
  useEffect(() => {
    const handleLinkedInSuccess = (event) => {
      const profile = event.detail;
      
      // Dispatch the LinkedIn autofill event that MultiStepForm is listening for
      window.dispatchEvent(new CustomEvent('linkedinAutofill', { 
        detail: profile 
      }));
    };

    const handleLinkedInError = (event) => {
      console.error('LinkedIn AutoFill error:', event.detail);
      // Show user-friendly error message
      alert('LinkedIn AutoFill failed. Please try again or fill the form manually.');
    };

    // Add event listeners
    window.addEventListener('linkedinSuccess', handleLinkedInSuccess);
    window.addEventListener('linkedinError', handleLinkedInError);

    // LinkedIn button initialization
    const initializeLinkedInButton = () => {
      const container = document.getElementById('linkedin-autofill-container');
      const fallbackButton = document.getElementById('linkedin-fallback-button');
      
      // Wait for LinkedIn script to load
      let attempts = 0;
      const maxAttempts = 50; // 5 seconds
      
      const checkLinkedIn = setInterval(() => {
        attempts++;
        
        if (window.IN && window.IN.parse) {
          // LinkedIn is available, parse the container
          clearInterval(checkLinkedIn);
          try {
            window.IN.parse(container);
            console.log('LinkedIn AutoFill initialized successfully');
          } catch (error) {
            console.error('LinkedIn parsing error:', error);
            // Show fallback button if LinkedIn parsing fails
            if (fallbackButton) {
              fallbackButton.classList.remove('hidden');
            }
          }
        } else if (attempts >= maxAttempts) {
          // LinkedIn failed to load, show fallback button
          clearInterval(checkLinkedIn);
          console.log('LinkedIn AutoFill not available, showing demo button');
          if (fallbackButton) {
            fallbackButton.classList.remove('hidden');
          }
        }
      }, 100);
    };

    // Initialize after a short delay to allow DOM to settle
    const timeoutId = setTimeout(initializeLinkedInButton, 500);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('linkedinSuccess', handleLinkedInSuccess);
      window.removeEventListener('linkedinError', handleLinkedInError);
    };
  }, []);
  
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
      
      {/* LinkedIn AutoFill Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-8 p-4 bg-[rgba(0,119,204,0.05)] border border-[rgba(0,119,204,0.1)] rounded-xl"
      >
        <h3 className="text-sm font-medium text-[var(--ios-blue)] mb-2 flex items-center">
          <FaLinkedin className="mr-2" />
          Quick Fill from LinkedIn
        </h3>
        <p className="text-xs text-[var(--color-text-secondary)] mb-3">Save time by importing your profile information from LinkedIn</p>
        
        {/* LinkedIn AutoFill Button Container */}
        <div className="mb-3">
          <div id="linkedin-autofill-container" className="linkedin-autofill-wrapper">
            {/* LinkedIn button will be inserted here dynamically */}
            <script 
              type="IN/AutoFill" 
              data-callback="onLinkedInSuccess"
              data-error-callback="onLinkedInError"
              data-fields="id,first-name,last-name,email-address,headline,location,industry,positions,educations,skills,summary,phone-numbers,public-profile-url"
            />
          </div>
          
          {/* Fallback button for when LinkedIn AutoFill is not available */}
          <div id="linkedin-fallback-button" className="hidden">
            <button
              type="button"
              onClick={() => {
                // Demo data for development/testing
                const demoProfile = {
                  firstName: 'John',
                  lastName: 'Doe',
                  emailAddress: 'john.doe@example.com',
                  phoneNumbers: [{ phoneNumber: '+1 (555) 123-4567' }],
                  publicProfileUrl: 'https://linkedin.com/in/johndoe',
                  headline: 'Full Stack Developer | React & Node.js Expert',
                  summary: 'Passionate full-stack developer with 5+ years of experience building scalable web applications using modern technologies.',
                  positions: [
                    {
                      title: 'Senior Full Stack Developer',
                      companyName: 'Tech Solutions Inc.',
                      startDate: { year: 2021 },
                      endDate: { year: 2024 },
                      location: { name: 'San Francisco, CA' },
                      summary: 'Led development of customer-facing web applications using React, Node.js, and AWS'
                    }
                  ],
                  educations: [
                    {
                      degree: 'Bachelor of Science in Computer Science',
                      schoolName: 'University of Technology',
                      endDate: { year: 2019 }
                    }
                  ],
                  skills: [
                    { name: 'JavaScript' },
                    { name: 'React' },
                    { name: 'Node.js' },
                    { name: 'Python' },
                    { name: 'AWS' }
                  ]
                };
                
                // Dispatch the same event as LinkedIn AutoFill would
                window.dispatchEvent(new CustomEvent('linkedinAutofill', { 
                  detail: demoProfile 
                }));
              }}
              className="w-full sm:w-auto px-4 py-2 bg-[#0077b5] text-white text-sm font-medium rounded-lg hover:bg-[#005885] transition-colors flex items-center justify-center"
            >
              <FaLinkedin className="mr-2" />
              Import from LinkedIn (Demo)
            </button>
          </div>
        </div>
        
        <div className="text-xs text-[var(--color-text-secondary)]">
          <div className="flex items-center mb-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            LinkedIn button will appear above when available, or demo button for testing.
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
            Note: Production LinkedIn AutoFill requires domain allowlisting.
          </div>
        </div>
      </motion.div>
      
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
