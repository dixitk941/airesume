import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PersonalInfoStep from './steps/PersonalInfoStep';
import ObjectiveStep from './steps/ObjectiveStep';
import EducationStep from './steps/EducationStep';
import ExperienceStep from './steps/ExperienceStep';
import SkillsStep from './steps/SkillsStep';
import ProjectsCertificationsStep from './steps/ProjectsCertificationsStep';
import FinalDetailsStep from './steps/FinalDetailsStep';
import Resume from './Resume';
import AIAssistantModal from './AIAssistantModal';
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaEye, 
  FaDownload, 
  FaCheck, 
  FaRobot,
  FaSave,
  FaLightbulb,
  FaClock,
  FaCheckCircle,
  FaTimes
} from 'react-icons/fa';

const steps = [
  { id: 'personal', title: 'Personal Info', emoji: '👤', description: 'Basic contact information' },
  { id: 'objective', title: 'Objective', emoji: '🎯', description: 'Career summary & goals' },
  { id: 'education', title: 'Education', emoji: '🎓', description: 'Academic background' },
  { id: 'experience', title: 'Experience', emoji: '💼', description: 'Work history & roles' },
  { id: 'skills', title: 'Skills', emoji: '⚡', description: 'Technical & soft skills' },
  { id: 'projects', title: 'Projects', emoji: '🚀', description: 'Projects & certifications' },
  { id: 'final', title: 'Final Details', emoji: '✨', description: 'Languages & interests' }
];

const MultiStepForm = ({ onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Personal Info
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    portfolio_url: '',
    
    // Objective
    objective: '',
    
    // Education
    degree_1: '',
    institution_1: '',
    year_1: '',
    grade_1: '',
    degree_2: '',
    institution_2: '',
    year_2: '',
    grade_2: '',
    
    // Work Experience
    company_1: '',
    role_1: '',
    duration_1: '',
    location_1: '',
    responsibility_1_1: '',
    responsibility_1_2: '',
    company_2: '',
    role_2: '',
    duration_2: '',
    location_2: '',
    responsibility_2_1: '',
    responsibility_2_2: '',
    
    // Skills
    skills: '',
    
    // Projects & Certifications
    project_1_name: '',
    project_1_desc: '',
    project_1_stack: '',
    project_2_name: '',
    project_2_desc: '',
    project_2_stack: '',
    certification_1: '',
    issuer_1: '',
    cert_year_1: '',
    certification_2: '',
    issuer_2: '',
    cert_year_2: '',
    
    // Final Details
    language_1: '',
    language_2: '',
    language_3: '',
    hobbies: ''
  });
  
  const [viewMode, setViewMode] = useState('form'); // 'form', 'preview'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [autoSave, setAutoSave] = useState(true);

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && Object.keys(formData).some(key => formData[key])) {
      const saveTimer = setTimeout(() => {
        localStorage.setItem('resumeFormData', JSON.stringify(formData));
      }, 1000);
      return () => clearTimeout(saveTimer);
    }
  }, [formData, autoSave]);

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setFormData(prev => ({ ...prev, ...parsedData }));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Update completed steps when validation changes
  useEffect(() => {
    const newCompletedSteps = new Set();
    steps.forEach((_, index) => {
      const stepRequired = requiredFields[index] || [];
      const isStepComplete = stepRequired.every(field => formData[field] && formData[field].trim() !== '');
      if (isStepComplete) {
        newCompletedSteps.add(index);
      }
    });
    setCompletedSteps(newCompletedSteps);
  }, [formData]);

  // Handle AI suggestions generated from the assistant
  const handleAISuggestions = (suggestions) => {
    console.log('AI suggestions received:', suggestions);
    // Suggestions are already displayed in the modal
  };
  
  // Define required fields for each step
  const requiredFields = {
    0: ['full_name', 'email', 'phone'], // Personal Info
    1: ['objective'], // Objective
    2: ['degree_1', 'institution_1'], // Education (at least first education entry)
    3: ['company_1', 'role_1', 'duration_1'], // Experience (at least first job)
    4: ['skills'], // Skills
    5: [], // Projects & Certifications (optional)
    6: [] // Final Details (optional)
  };
  
  // Validate current step
  const validateCurrentStep = () => {
    const stepRequired = requiredFields[currentStep] || [];
    const stepErrors = {};
    
    stepRequired.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        stepErrors[field] = 'This field is required';
      }
    });
    
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };
  
  // Check if current step is valid
  const isCurrentStepValid = () => {
    const stepRequired = requiredFields[currentStep] || [];
    return stepRequired.every(field => formData[field] && formData[field].trim() !== '');
  };
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };
  
  // Navigate to next step with validation
  const nextStep = async () => {
    if (currentStep === steps.length - 1) {
      // Complete resume
      setIsSubmitting(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
          setViewMode('preview');
        }, 2000);
      } catch (error) {
        console.error('Error completing resume:', error);
      } finally {
        setIsSubmitting(false);
      }
    } else if (validateCurrentStep() && currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  
  // Jump to specific step
  const jumpToStep = (index) => {
    setCurrentStep(index);
    setSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Get percentage completion
  const getProgress = () => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  };
  
  // Render the current step
  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} errors={errors} />;
      case 1:
        return <ObjectiveStep formData={formData} handleChange={handleChange} errors={errors} />;
      case 2:
        return <EducationStep formData={formData} handleChange={handleChange} errors={errors} />;
      case 3:
        return <ExperienceStep formData={formData} handleChange={handleChange} errors={errors} />;
      case 4:
        return <SkillsStep formData={formData} handleChange={handleChange} errors={errors} />;
      case 5:
        return <ProjectsCertificationsStep formData={formData} handleChange={handleChange} errors={errors} />;
      case 6:
        return <FinalDetailsStep formData={formData} handleChange={handleChange} errors={errors} />;
      default:
        return null;
    }
  };
  
  // Toggle between form and preview
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'form' ? 'preview' : 'form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] relative">
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Enhanced with scrolling */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out shadow-2xl lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:shadow-lg flex flex-col`}
        style={{ borderRight: '1px solid var(--color-border)' }}
      >
        {/* Sidebar Header - Fixed */}
        <div className="flex-shrink-0 p-6 border-b border-[var(--color-border)] bg-white">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBack}
              className="back-indicator text-sm hover:opacity-70 transition-opacity"
            >
              <FaChevronLeft size={12} />
              <span>Home</span>
            </button>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--ios-gray-6)] transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <FaTimes size={14} className="text-gray-500" />
            </button>
          </div>
          
          <div className="mb-4">
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">Resume Builder</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Step {currentStep + 1} of {steps.length}</p>
          </div>
          
          {/* Progress Circle */}
          <div className="flex items-center justify-between">
            <div className="relative w-16 h-16">
              <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--ios-gray-5)"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="var(--ios-blue)"
                  strokeWidth="2"
                  strokeDasharray={`${getProgress()}, 100`}
                  className="transition-all duration-500 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-bold text-[var(--ios-blue)]">{getProgress()}%</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-[var(--color-text)]">{currentStep + 1}/{steps.length}</div>
              <div className="text-xs text-[var(--color-text-secondary)]">Steps Complete</div>
            </div>
          </div>
        </div>
        
        {/* Scrollable Steps List */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent hover:scrollbar-thumb-gray-400">
          <div className="p-4 space-y-3">
            <div className="text-xs font-semibold text-[var(--color-text-secondary)] uppercase tracking-wide mb-3 px-2">
              Resume Steps
            </div>
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => jumpToStep(index)}
                className={`group w-full text-left p-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
                  index === currentStep
                    ? 'bg-gradient-to-r from-[var(--ios-blue)] to-blue-600 text-white shadow-lg transform scale-105'
                    : completedSteps.has(index)
                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 hover:from-green-100 hover:to-emerald-100 border border-emerald-200'
                      : 'bg-[var(--ios-gray-6)] text-[var(--color-text-secondary)] hover:bg-gray-100 border border-transparent hover:border-gray-200'
                }`}
                whileHover={{ scale: index === currentStep ? 1.05 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Step indicator line for completed steps */}
                {completedSteps.has(index) && index !== currentStep && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r"></div>
                )}
                
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                    index === currentStep
                      ? 'bg-white bg-opacity-20 backdrop-blur-sm text-white shadow-lg'
                      : completedSteps.has(index)
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'bg-white text-[var(--color-text-secondary)] shadow-sm group-hover:shadow-md'
                  }`}>
                    {completedSteps.has(index) && index !== currentStep ? (
                      <FaCheckCircle size={16} />
                    ) : index === currentStep ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    ) : (
                      <span className="text-xl">{step.emoji}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-sm mb-1 transition-colors ${
                      index === currentStep ? 'text-white' : completedSteps.has(index) ? 'text-emerald-800' : 'text-gray-700'
                    }`}>
                      {step.title}
                    </div>
                    <div className={`text-xs transition-colors ${
                      index === currentStep 
                        ? 'text-white text-opacity-90' 
                        : completedSteps.has(index) 
                          ? 'text-emerald-600' 
                          : 'text-gray-500'
                    }`}>
                      {step.description}
                    </div>
                  </div>
                  
                  {/* Status indicator */}
                  <div className="flex flex-col items-center space-y-1">
                    {completedSteps.has(index) && index !== currentStep && (
                      <FaCheckCircle className="text-emerald-500" size={16} />
                    )}
                    {index === currentStep && (
                      <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
                    )}
                    <span className={`text-xs font-medium ${
                      index === currentStep 
                        ? 'text-white text-opacity-75' 
                        : completedSteps.has(index)
                          ? 'text-emerald-600'
                          : 'text-gray-400'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                </div>
                
                {/* Hover effect overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-300 transform -skew-x-12 translate-x-full group-hover:translate-x-[-200%]"></div>
              </motion.button>
            ))}
          </div>
          
          {/* Quick stats */}
          <div className="px-2 py-4 space-y-3">
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-2">
                <FaClock className="text-blue-500" size={14} />
                <span className="text-sm font-medium text-blue-700">Completion Time</span>
              </div>
              <span className="text-sm font-bold text-blue-800">~ {Math.max(1, 7 - currentStep)} min left</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
              <div className="flex items-center space-x-2">
                <FaCheckCircle className="text-green-500" size={14} />
                <span className="text-sm font-medium text-green-700">Progress</span>
              </div>
              <span className="text-sm font-bold text-green-800">{completedSteps.size}/{steps.length} completed</span>
            </div>
          </div>
        </div>
        
        {/* Sidebar Footer - Fixed */}
        <div className="flex-shrink-0 p-4 border-t border-[var(--color-border)] bg-white">
          {viewMode === 'form' ? (
            <button 
              onClick={toggleViewMode}
              className="btn-ios w-full flex items-center justify-center py-3 text-sm font-semibold"
            >
              <FaEye className="mr-2" size={14} />
              Preview Resume
            </button>
          ) : (
            <div className="space-y-2">
              <button 
                onClick={toggleViewMode}
                className="btn-ios-secondary w-full flex items-center justify-center py-3 text-sm font-semibold"
              >
                Back to Edit
              </button>
              <button 
                className="btn-ios w-full flex items-center justify-center py-3"
              >
                <FaDownload className="mr-2" size={14} />
                Download PDF
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="lg:ml-80 min-h-screen">
        {/* Mobile Header */}
        <div className="lg:hidden sticky top-0 z-30 glass">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button 
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl bg-white/80 shadow-sm"
              >
                <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                  <div className="w-full h-0.5 bg-[var(--color-text)] rounded"></div>
                  <div className="w-full h-0.5 bg-[var(--color-text)] rounded"></div>
                  <div className="w-full h-0.5 bg-[var(--color-text)] rounded"></div>
                </div>
              </button>
              
              <div className="text-center">
                <h3 className="font-semibold text-[var(--color-text)]">{steps[currentStep].title}</h3>
                <p className="text-xs text-[var(--color-text-secondary)]">{currentStep + 1}/{steps.length}</p>
              </div>
              
              {viewMode === 'form' ? (
                <button 
                  onClick={toggleViewMode}
                  className="btn-ios-secondary text-xs px-3 py-2"
                >
                  <FaEye size={10} />
                </button>
              ) : (
                <button 
                  onClick={toggleViewMode}
                  className="btn-ios-secondary text-xs px-3 py-2"
                >
                  Edit
                </button>
              )}
            </div>
            
            {/* Mobile Progress Bar */}
            {viewMode === 'form' && (
              <div className="mt-3">
                <div className="progress-ios">
                  <div style={{ width: `${getProgress()}%` }}></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 lg:p-8">
          {/* Desktop Header */}
          <div className="hidden lg:block mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-[var(--color-text)] mb-2">
                  {steps[currentStep].title}
                </h1>
                <p className="text-[var(--color-text-secondary)] flex items-center">
                  <span className="text-xl mr-2">{steps[currentStep].emoji}</span>
                  {steps[currentStep].description}
                </p>
              </div>
              
              {viewMode === 'preview' && (
                <button 
                  className="btn-ios flex items-center"
                >
                  <FaDownload className="mr-2" size={14} />
                  Download PDF
                </button>
              )}
            </div>
          </div>
          
          {/* Form Content */}
          <AnimatePresence mode="wait">
            {viewMode === 'form' ? (
              <motion.div
                key={`form-${currentStep}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="max-w-2xl mx-auto">
                  <div className="card-ios p-6 lg:p-8 mb-6">
                    {renderStep()}
                  </div>
                  
                  {/* Navigation Buttons */}
                  <div className="flex justify-between">
                    <button
                      onClick={prevStep}
                      className={`btn-ios-secondary flex items-center px-6 py-3 ${currentStep === 0 
                        ? 'opacity-50 cursor-not-allowed' 
                        : ''}`}
                      disabled={currentStep === 0}
                    >
                      <FaChevronLeft className="mr-2" size={12} />
                      Previous
                    </button>
                    
                    <button
                      onClick={nextStep}
                      disabled={!isCurrentStepValid() || isSubmitting}
                      className={`btn-ios flex items-center px-6 py-3 transition-all duration-200 ${
                        !isCurrentStepValid() || isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'
                      }`}
                      title={!isCurrentStepValid() ? 'Please fill in all required fields' : ''}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                          Creating...
                        </>
                      ) : currentStep === steps.length - 1 ? (
                        <>
                          <FaCheckCircle className="mr-2" size={12} />
                          Complete Resume
                        </>
                      ) : (
                        <>
                          Continue
                          <FaChevronRight className="ml-2" size={12} />
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="preview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <div className="max-w-4xl mx-auto">
                  <Resume data={formData} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating AI Assistant Button */}
      <motion.button
        onClick={() => setAiAssistantOpen(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="AI Resume Assistant"
      >
        <FaRobot className="text-xl" />
      </motion.button>

      {/* Success Message */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
          >
            <motion.div
              initial={{ y: 20 }}
              animate={{ y: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-md"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-green-500 text-2xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Resume Completed! 🎉</h3>
              <p className="text-gray-600 mb-4">
                Your professional resume is ready. You'll be redirected to the preview in a moment.
              </p>
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin mx-auto"></div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-save Indicator */}
      {autoSave && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 left-6 z-30 bg-white rounded-full shadow-lg px-4 py-2 flex items-center space-x-2 text-sm"
        >
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-gray-600">Auto-saved</span>
        </motion.div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
        formData={formData}
        onSuggestionsGenerated={handleAISuggestions}
      />
    </div>
  );
};

export default MultiStepForm;
