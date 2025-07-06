import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaSpinner, FaTimes, FaMagic, FaLightbulb } from 'react-icons/fa';
import GeminiAIService from '../services/GeminiAIService';

const AIAssistantModal = ({ isOpen, onClose, formData, onSuggestionsGenerated }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('improvements');

  const handleAnalyzeResume = async () => {
    setIsAnalyzing(true);
    try {
      const improvements = await GeminiAIService.suggestImprovements(formData);
      setSuggestions(improvements.split('\n').filter(s => s.trim()));
      if (onSuggestionsGenerated) {
        onSuggestionsGenerated(suggestions);
      }
    } catch (error) {
      console.error('Failed to analyze resume:', error);
      alert('Failed to analyze resume. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const generateCoverLetter = async () => {
    if (!formData.full_name) {
      alert('Please fill in your personal information first');
      return;
    }
    
    const targetCompany = prompt('Enter the company name:');
    const targetRole = prompt('Enter the position title:');
    
    if (!targetCompany || !targetRole) return;

    setIsAnalyzing(true);
    try {
      const skills = formData.skills ? formData.skills.split(',').map(s => s.trim()) : [];
      const coverLetter = await GeminiAIService.generateCoverLetter(
        formData,
        targetCompany,
        targetRole,
        skills
      );
      
      // Open in new window or download
      const newWindow = window.open('', '_blank');
      newWindow.document.write(`
        <html>
          <head><title>Cover Letter</title></head>
          <body style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
            <h1>Cover Letter</h1>
            <pre style="white-space: pre-wrap; font-family: inherit;">${coverLetter}</pre>
          </body>
        </html>
      `);
      newWindow.document.close();
      
    } catch (error) {
      console.error('Failed to generate cover letter:', error);
      alert('Failed to generate cover letter. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
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
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-blue-50">
            <div className="flex items-center">
              <FaRobot className="text-purple-600 text-2xl mr-3" />
              <h2 className="text-xl font-semibold text-gray-800">AI Resume Assistant</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <FaTimes className="text-gray-500" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('improvements')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'improvements'
                  ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaLightbulb className="inline mr-2" />
              Resume Analysis
            </button>
            <button
              onClick={() => setActiveTab('coverLetter')}
              className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'coverLetter'
                  ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <FaMagic className="inline mr-2" />
              Cover Letter
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {activeTab === 'improvements' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Resume Analysis & Suggestions</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Get AI-powered suggestions to improve your resume's content, structure, and ATS compatibility.
                  </p>
                  
                  <button
                    onClick={handleAnalyzeResume}
                    disabled={isAnalyzing}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <FaLightbulb className="mr-2" />
                        Analyze My Resume
                      </>
                    )}
                  </button>
                </div>

                {suggestions.length > 0 && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-medium text-purple-800 mb-3">AI Recommendations:</h4>
                    <div className="space-y-2">
                      {suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          <p className="text-sm text-purple-700">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'coverLetter' && (
              <div>
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">AI Cover Letter Generator</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Generate a professional, personalized cover letter based on your resume information.
                  </p>
                  
                  <button
                    onClick={generateCoverLetter}
                    disabled={isAnalyzing || !formData.full_name}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isAnalyzing ? (
                      <>
                        <FaSpinner className="animate-spin mr-2" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <FaMagic className="mr-2" />
                        Generate Cover Letter
                      </>
                    )}
                  </button>
                  
                  {!formData.full_name && (
                    <p className="text-xs text-amber-600 mt-2">
                      Please fill in your personal information first
                    </p>
                  )}
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">How it works:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Uses your resume information to create personalized content</li>
                    <li>• Asks for target company and position details</li>
                    <li>• Generates a professional cover letter in a new window</li>
                    <li>• You can copy, edit, and save the generated letter</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
            <p className="text-xs text-gray-500 flex-1">
              Powered by Google Gemini AI
            </p>
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AIAssistantModal;
