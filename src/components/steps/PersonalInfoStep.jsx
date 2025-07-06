import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaLinkedin, FaGlobe, FaTimes, FaLink, FaSpinner } from 'react-icons/fa';

const PersonalInfoStep = ({ formData, handleChange, errors = {} }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [showLinkedInModal, setShowLinkedInModal] = useState(false);
  const [linkedInUrl, setLinkedInUrl] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };

  const handleLinkedInImport = async () => {
    if (!linkedInUrl.trim()) {
      alert('Please enter a LinkedIn profile URL');
      return;
    }

    setIsImporting(true);
    
    try {
      // For now, we'll simulate the import with demo data
      // In production, you would call an API to scrape the LinkedIn profile
      const demoProfile = {
        firstName: 'John',
        lastName: 'Doe',
        emailAddress: 'john.doe@example.com',
        phoneNumbers: [{ phoneNumber: '+1 (555) 123-4567' }],
        publicProfileUrl: linkedInUrl,
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
          },
          {
            title: 'Frontend Developer',
            companyName: 'StartupXYZ',
            startDate: { year: 2019 },
            endDate: { year: 2021 },
            location: { name: 'New York, NY' },
            summary: 'Developed responsive user interfaces and improved application performance by 40%'
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
          { name: 'AWS' },
          { name: 'MongoDB' }
        ]
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Dispatch the LinkedIn autofill event that MultiStepForm is listening for
      window.dispatchEvent(new CustomEvent('linkedinAutofill', { 
        detail: demoProfile 
      }));

      setShowLinkedInModal(false);
      setLinkedInUrl('');
      
    } catch (error) {
      console.error('LinkedIn import failed:', error);
      alert('Failed to import LinkedIn data. Please try again or fill the form manually.');
    } finally {
      setIsImporting(false);
    }
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
          {/* Primary LinkedIn AutoFill button */}
          <div id="linkedin-autofill-container" className="linkedin-autofill-wrapper mb-3">
            <script 
              type="IN/AutoFill" 
              data-callback="onLinkedInSuccess"
              data-error-callback="onLinkedInError"
              data-fields="id,first-name,last-name,email-address,headline,location,industry,positions,educations,skills,summary,phone-numbers,public-profile-url"
            />
          </div>
          
          {/* Always show a demo/fallback button */}
          <button
            type="button"
            onClick={() => setShowLinkedInModal(true)}
            className="w-full px-4 py-3 bg-[#0077b5] text-white font-medium rounded-lg hover:bg-[#005582] transition-colors flex items-center justify-center"
          >
            <FaLinkedin className="mr-2" />
            Import from LinkedIn
          </button>
        </div>
        
        <div className="text-xs text-[var(--color-text-secondary)]">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Enter your LinkedIn profile URL to automatically import your information.
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

      {/* LinkedIn URL Import Modal */}
      {showLinkedInModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center">
                <FaLinkedin className="text-[#0077b5] text-2xl mr-3" />
                <h2 className="text-xl font-semibold text-gray-800">Import from LinkedIn</h2>
              </div>
              <button
                onClick={() => setShowLinkedInModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn Profile URL
                </label>
                <div className="relative">
                  <FaLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="url"
                    value={linkedInUrl}
                    onChange={(e) => setLinkedInUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/yourprofile"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0077b5] focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <strong>How to find your LinkedIn URL:</strong>
                </p>
                <ol className="list-decimal list-inside text-sm text-blue-700 mt-2 space-y-1">
                  <li>Go to your LinkedIn profile</li>
                  <li>Click "Contact info" or copy the URL from your browser</li>
                  <li>Paste the URL above and click Import</li>
                </ol>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowLinkedInModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLinkedInImport}
                  disabled={isImporting || !linkedInUrl.trim()}
                  className="px-6 py-2 bg-[#0077b5] text-white rounded-lg hover:bg-[#005885] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                >
                  {isImporting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Importing...
                    </>
                  ) : (
                    <>
                      <FaLinkedin className="mr-2" />
                      Import Data
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PersonalInfoStep;
