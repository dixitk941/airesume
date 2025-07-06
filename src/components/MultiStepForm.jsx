import { useState } from 'react';
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
import { FaChevronLeft, FaChevronRight, FaEye, FaDownload, FaCheck, FaRobot } from 'react-icons/fa';

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
  const nextStep = () => {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
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

      {/* Sidebar - One UI 7 inspired */}
      <motion.div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-out shadow-2xl lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:shadow-lg`}
        style={{ borderRight: '1px solid var(--color-border)' }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between mb-4">
            <button 
              onClick={onBack}
              className="back-indicator text-sm"
            >
              <FaChevronLeft size={12} />
              <span>Home</span>
            </button>
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-[var(--ios-gray-6)]"
              onClick={() => setSidebarOpen(false)}
            >
              ✕
            </button>
          </div>
          
          <div>
            <h2 className="text-xl font-bold text-[var(--color-text)] mb-1">Resume Builder</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">Step {currentStep + 1} of {steps.length}</p>
          </div>
          
          {/* Progress Circle */}
          <div className="mt-4 flex items-center justify-between">
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
        
        {/* Steps List */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {steps.map((step, index) => (
              <motion.button
                key={step.id}
                onClick={() => jumpToStep(index)}
                className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                  index === currentStep
                    ? 'bg-[var(--ios-blue)] text-white shadow-lg'
                    : index < currentStep
                      ? 'bg-[rgba(52,199,89,0.1)] text-[var(--ios-green)] hover:bg-[rgba(52,199,89,0.15)]'
                      : 'bg-[var(--ios-gray-6)] text-[var(--color-text-secondary)] hover:bg-[var(--ios-gray-5)]'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 ${
                    index === currentStep
                      ? 'bg-white text-[var(--ios-blue)]'
                      : index < currentStep
                        ? 'bg-[var(--ios-green)] text-white'
                        : 'bg-[var(--ios-gray-4)] text-[var(--color-text-secondary)]'
                  }`}>
                    {index < currentStep ? (
                      <FaCheck size={12} />
                    ) : (
                      <span className="text-lg">{step.emoji}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm">{step.title}</div>
                    <div className={`text-xs opacity-75 ${
                      index === currentStep ? 'text-white' : ''
                    }`}>
                      {step.description}
                    </div>
                  </div>
                  {index < currentStep && (
                    <FaCheck className="text-[var(--ios-green)] ml-2" size={12} />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[var(--color-border)]">
          {viewMode === 'form' ? (
            <button 
              onClick={toggleViewMode}
              className="btn-ios w-full flex items-center justify-center py-3"
            >
              <FaEye className="mr-2" size={14} />
              Preview Resume
            </button>
          ) : (
            <div className="space-y-2">
              <button 
                onClick={toggleViewMode}
                className="btn-ios-secondary w-full flex items-center justify-center py-3"
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
                      className={`btn-ios flex items-center px-6 py-3 ${
                        !isCurrentStepValid() ? 'opacity-70 cursor-not-allowed' : ''
                      }`}
                      title={!isCurrentStepValid() ? 'Please fill in all required fields' : ''}
                    >
                      {currentStep === steps.length - 1 ? 'Complete Resume' : 'Continue'}
                      <FaChevronRight className="ml-2" size={12} />
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
