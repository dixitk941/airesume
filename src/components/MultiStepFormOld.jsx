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
import { FaChevronLeft, FaChevronRight, FaEye, FaDownload, FaUndo, FaCheck } from 'react-icons/fa';

const steps = [
  { id: 'personal', title: 'Personal Info', emoji: '👤' },
  { id: 'objective', title: 'Objective', emoji: '🎯' },
  { id: 'education', title: 'Education', emoji: '🎓' },
  { id: 'experience', title: 'Experience', emoji: '💼' },
  { id: 'skills', title: 'Skills', emoji: '🛠️' },
  { id: 'projects', title: 'Projects', emoji: '🏆' },
  { id: 'final', title: 'Final Details', emoji: '✨' }
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
  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle batch changes (for a group of fields)
  const updateFields = (fields) => {
    setFormData(prev => ({
      ...prev,
      ...fields
    }));
  };
  
  // Navigate to next step
  const nextStep = () => {
    if (currentStep < steps.length - 1) {
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
  
  // Get percentage completion
  const getProgress = () => {
    return Math.round(((currentStep + 1) / steps.length) * 100);
  };
  
  // Render the current step
  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return <PersonalInfoStep formData={formData} handleChange={handleChange} />;
      case 1:
        return <ObjectiveStep formData={formData} handleChange={handleChange} />;
      case 2:
        return <EducationStep formData={formData} handleChange={handleChange} />;
      case 3:
        return <ExperienceStep formData={formData} handleChange={handleChange} />;
      case 4:
        return <SkillsStep formData={formData} handleChange={handleChange} />;
      case 5:
        return <ProjectsCertificationsStep formData={formData} handleChange={handleChange} />;
      case 6:
        return <FinalDetailsStep formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };
  
  // Toggle between form and preview
  const toggleViewMode = () => {
    setViewMode(prev => prev === 'form' ? 'preview' : 'form');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // iOS 17-style screen transition variants
  const screenVariants = {
    hidden: (direction) => ({
      x: direction > 0 ? 20 : -20,
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? -20 : 20,
      opacity: 0,
      transition: {
        duration: 0.25,
        ease: [0.23, 1, 0.32, 1]
      }
    })
  };
  
  // Track direction of navigation for animations
  const [direction, setDirection] = useState(1);
  
  const customNextStep = () => {
    setDirection(1);
    nextStep();
  };
  
  const customPrevStep = () => {
    setDirection(-1);
    prevStep();
  };
  
  // Jump to a specific step
  const jumpToStep = (index) => {
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header section with view toggle */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <button 
          onClick={onBack}
          className="back-indicator"
        >
          <FaChevronLeft size={13} />
          <span>Back to Home</span>
        </button>
        
        <div className="segmented-control">
          <div 
            className={`segmented-control-option ${viewMode === 'form' ? 'active' : ''}`}
            onClick={() => setViewMode('form')}
          >
            Edit Resume
          </div>
          <div 
            className={`segmented-control-option ${viewMode === 'preview' ? 'active' : ''}`}
            onClick={() => setViewMode('preview')}
          >
            Preview
          </div>
          <div 
            className="segmented-control-slider" 
            style={{ 
              width: `${100 / 2}%`,
              transform: `translateX(${viewMode === 'form' ? '0%' : '100%'})` 
            }}
          ></div>
        </div>
        
        {viewMode === 'preview' && (
          <button 
            className="btn-ios flex items-center text-sm"
          >
            <FaDownload className="mr-1" /> Download PDF
          </button>
        )}
      </div>
      
      {/* Progress and step indicators */}
      {viewMode === 'form' && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <span className="text-3xl mr-3">{steps[currentStep].emoji}</span>
              <div>
                <h2 className="text-[var(--font-title2)] font-semibold text-[var(--color-text)]">
                  {steps[currentStep].title}
                </h2>
                <p className="text-[var(--color-text-secondary)] text-sm">
                  Step {currentStep + 1} of {steps.length}
                </p>
              </div>
            </div>
            <span className="text-sm font-medium px-3 py-1 bg-[var(--ios-gray-6)] rounded-full">
              {getProgress()}% Complete
            </span>
          </div>
          
          {/* Modern step indicator */}
          <div className="step-indicator">
            <div 
              className="step-indicator-progress" 
              style={{ width: `${getProgress()}%` }}
            ></div>
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`step-dot ${
                  index < currentStep 
                    ? 'completed' 
                    : index === currentStep 
                      ? 'active' 
                      : ''
                }`}
                onClick={() => jumpToStep(index)}
                title={step.title}
                style={{cursor: 'pointer'}}
              >
                {index < currentStep && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center text-white" 
                    style={{fontSize: '8px'}}
                  >
                    <FaCheck />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Step titles on desktop */}
          <div className="hidden md:flex justify-between mt-2">
            {steps.map((step, index) => (
              <div 
                key={step.id}
                className={`text-xs px-2 text-center ${
                  index === currentStep 
                    ? 'text-[var(--color-primary)] font-medium' 
                    : 'text-[var(--color-text-secondary)]'
                }`}
                style={{
                  cursor: 'pointer',
                  maxWidth: '100px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
                onClick={() => jumpToStep(index)}
              >
                {step.title}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Main content area */}
      <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden -z-10 opacity-50">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[var(--ios-blue)] opacity-5 blur-3xl"></div>
          <div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-[var(--ios-purple)] opacity-5 blur-3xl"></div>
        </div>
        
        <AnimatePresence mode="wait" custom={direction}>
          {viewMode === 'form' ? (
            <motion.div
              key={`form-${currentStep}`}
              custom={direction}
              variants={screenVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="card-neuro"
            >
              {renderStep()}
              
              <div className="flex justify-between mt-8">
                <button
                  onClick={customPrevStep}
                  className={`btn-ios-secondary flex items-center ${currentStep === 0 
                    ? 'opacity-50 cursor-not-allowed' 
                    : ''}`}
                  disabled={currentStep === 0}
                >
                  <FaChevronLeft className="mr-2" size={12} /> Previous
                </button>
                
                <button
                  onClick={customNextStep}
                  className="btn-ios flex items-center"
                >
                  {currentStep === steps.length - 1 ? 'Complete' : 'Next'} <FaChevronRight className="ml-2" size={12} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ 
                duration: 0.35,
                ease: [0.23, 1, 0.32, 1]
              }}
              className="card-float"
            >
              <Resume data={formData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MultiStepForm;
