import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaLinkedin, FaTimes, FaUpload, FaFileUpload, FaLink, FaInfoCircle } from 'react-icons/fa';

const LinkedInImportModal = ({ isOpen, onClose, onImport }) => {
  const [importMethod, setImportMethod] = useState('manual');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [manualData, setManualData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    headline: '',
    summary: '',
    experience: '',
    education: '',
    skills: [],
    projects: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleManualDataChange = (field, value) => {
    setManualData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImport = async () => {
    setIsLoading(true);
    
    try {
      if (importMethod === 'manual') {
        // Import manual data
        const importedData = {
          full_name: manualData.fullName,
          email: manualData.email,
          phone: manualData.phone,
          location: manualData.location,
          objective: manualData.summary || manualData.headline,
          skills: manualData.skills.filter(skill => skill.trim()),
          // Experience data (this will be handled in MultiStepForm to parse and distribute)
          linkedin_experience: manualData.experience,
          linkedin_education: manualData.education,
          linkedin_projects: manualData.projects,
          // Add more fields as needed
        };
        
        onImport(importedData);
      } else if (importMethod === 'url') {
        // This would be where you'd implement LinkedIn profile scraping
        // For now, we'll show a placeholder
        alert('LinkedIn URL import is not available yet. Please use manual import.');
        return;
      }
      
      onClose();
    } catch (error) {
      console.error('Import failed:', error);
      alert('Import failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkillsChange = (value) => {
    const skillsArray = value.split(',').map(skill => skill.trim());
    handleManualDataChange('skills', skillsArray);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center">
              <FaLinkedin className="text-[#0077b5] text-2xl mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">Import from LinkedIn</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            {/* Import Method Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Choose Import Method</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setImportMethod('manual')}
                  className={`p-4 border-2 rounded-xl transition-all ${
                    importMethod === 'manual'
                      ? 'border-[var(--ios-blue)] bg-[rgba(0,119,204,0.05)]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <FaFileUpload className="text-2xl mb-2 mx-auto text-[var(--ios-blue)]" />
                  <h4 className="font-medium text-gray-800 mb-1">Manual Entry</h4>
                  <p className="text-sm text-gray-600">Copy and paste your information manually</p>
                </button>
                
                <button
                  onClick={() => setImportMethod('url')}
                  className={`p-4 border-2 rounded-xl transition-all opacity-50 cursor-not-allowed ${
                    importMethod === 'url'
                      ? 'border-[var(--ios-blue)] bg-[rgba(0,119,204,0.05)]'
                      : 'border-gray-200'
                  }`}
                  disabled
                >
                  <FaLink className="text-2xl mb-2 mx-auto text-gray-400" />
                  <h4 className="font-medium text-gray-800 mb-1">LinkedIn URL</h4>
                  <p className="text-sm text-gray-600">Coming soon</p>
                </button>
              </div>
            </div>

            {/* Manual Import Form */}
            {importMethod === 'manual' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <FaInfoCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <p className="font-medium mb-1">How to get your LinkedIn data:</p>
                      <ol className="list-decimal list-inside space-y-1 text-blue-700">
                        <li>Go to your LinkedIn profile</li>
                        <li>Copy the relevant information from each section</li>
                        <li>Paste it into the fields below</li>
                        <li>Click "Import Data" to fill your resume</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={manualData.fullName}
                      onChange={(e) => handleManualDataChange('fullName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={manualData.email}
                      onChange={(e) => handleManualDataChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={manualData.phone}
                      onChange={(e) => handleManualDataChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={manualData.location}
                      onChange={(e) => handleManualDataChange('location', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent"
                      placeholder="San Francisco, CA"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Headline</label>
                  <input
                    type="text"
                    value={manualData.headline}
                    onChange={(e) => handleManualDataChange('headline', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent"
                    placeholder="Software Engineer at Tech Company"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Professional Summary</label>
                  <textarea
                    value={manualData.summary}
                    onChange={(e) => handleManualDataChange('summary', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent resize-none"
                    placeholder="Brief professional summary from your LinkedIn About section..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <input
                    type="text"
                    value={manualData.skills.join(', ')}
                    onChange={(e) => handleSkillsChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent"
                    placeholder="JavaScript, React, Node.js, Python (separate with commas)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate skills with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Work Experience</label>
                  <textarea
                    value={manualData.experience}
                    onChange={(e) => handleManualDataChange('experience', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent resize-none"
                    placeholder="Copy your work experience from LinkedIn (we'll help you format it later)..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Education</label>
                  <textarea
                    value={manualData.education}
                    onChange={(e) => handleManualDataChange('education', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent resize-none"
                    placeholder="Copy your education details from LinkedIn..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Projects</label>
                  <textarea
                    value={manualData.projects}
                    onChange={(e) => handleManualDataChange('projects', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--ios-blue)] focus:border-transparent resize-none"
                    placeholder="Copy any projects or achievements from LinkedIn..."
                  />
                </div>
              </div>
            )}

            {/* URL Import Form (Disabled for now) */}
            {importMethod === 'url' && (
              <div className="space-y-4 opacity-50">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile URL</label>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="https://linkedin.com/in/yourprofile"
                    disabled
                  />
                  <p className="text-sm text-gray-500 mt-2">This feature is coming soon. Please use manual import for now.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleImport}
              disabled={isLoading || (importMethod === 'manual' && !manualData.fullName)}
              className="px-6 py-2 bg-[var(--ios-blue)] text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Importing...
                </>
              ) : (
                <>
                  <FaUpload className="mr-2" />
                  Import Data
                </>
              )}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LinkedInImportModal;
