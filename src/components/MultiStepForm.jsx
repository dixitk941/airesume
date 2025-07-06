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
import { FaChevronLeft, FaChevronRight, FaEye, FaDownload, FaCheck } from 'react-icons/fa';

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
  
  // LinkedIn autofill handler
  useEffect(() => {
    const handleLinkedInAutofill = (event) => {
      const linkedinData = event.detail;
      console.log('LinkedIn data received:', linkedinData);
      
      // Map LinkedIn data to our form fields
      const mappedData = mapLinkedInData(linkedinData);
      
      // Update form data with LinkedIn information
      setFormData(prev => ({
        ...prev,
        ...mappedData
      }));
      
      // Clear any existing errors
      setErrors({});
      
      // Show success message
      alert('LinkedIn profile imported successfully!');
    };
    
    // Listen for LinkedIn autofill events
    window.addEventListener('linkedinAutofill', handleLinkedInAutofill);
    
    // Cleanup
    return () => {
      window.removeEventListener('linkedinAutofill', handleLinkedInAutofill);
    };
  }, []);
  
  // Map LinkedIn data to our form structure
  const mapLinkedInData = (data) => {
    const mapped = {};
    
    // Personal Information
    if (data.firstName && data.lastName) {
      mapped.full_name = `${data.firstName} ${data.lastName}`;
    }
    if (data.emailAddress) {
      mapped.email = data.emailAddress;
    }
    if (data.phoneNumbers && data.phoneNumbers.length > 0) {
      mapped.phone = data.phoneNumbers[0].phoneNumber;
    }
    if (data.publicProfileUrl) {
      mapped.linkedin_url = data.publicProfileUrl;
    }
    
    // Summary/Objective
    if (data.summary) {
      mapped.objective = data.summary;
    }
    
    // Education
    if (data.educations && data.educations.length > 0) {
      const edu1 = data.educations[0];
      if (edu1.degree) mapped.degree_1 = edu1.degree;
      if (edu1.schoolName) mapped.institution_1 = edu1.schoolName;
      if (edu1.endDate && edu1.endDate.year) mapped.year_1 = edu1.endDate.year.toString();
      
      if (data.educations.length > 1) {
        const edu2 = data.educations[1];
        if (edu2.degree) mapped.degree_2 = edu2.degree;
        if (edu2.schoolName) mapped.institution_2 = edu2.schoolName;
        if (edu2.endDate && edu2.endDate.year) mapped.year_2 = edu2.endDate.year.toString();
      }
    }
    
    // Work Experience
    if (data.positions && data.positions.length > 0) {
      const pos1 = data.positions[0];
      if (pos1.companyName) mapped.company_1 = pos1.companyName;
      if (pos1.title) mapped.role_1 = pos1.title;
      if (pos1.location && pos1.location.name) mapped.location_1 = pos1.location.name;
      
      // Format duration
      if (pos1.startDate && pos1.endDate) {
        const startYear = pos1.startDate.year;
        const endYear = pos1.endDate.year || 'Present';
        mapped.duration_1 = `${startYear} - ${endYear}`;
      }
      
      // Add summary as responsibility
      if (pos1.summary) {
        mapped.responsibility_1_1 = pos1.summary;
      }
      
      if (data.positions.length > 1) {
        const pos2 = data.positions[1];
        if (pos2.companyName) mapped.company_2 = pos2.companyName;
        if (pos2.title) mapped.role_2 = pos2.title;
        if (pos2.location && pos2.location.name) mapped.location_2 = pos2.location.name;
        
        if (pos2.startDate && pos2.endDate) {
          const startYear = pos2.startDate.year;
          const endYear = pos2.endDate.year || 'Present';
          mapped.duration_2 = `${startYear} - ${endYear}`;
        }
        
        if (pos2.summary) {
          mapped.responsibility_2_1 = pos2.summary;
        }
      }
    }
    
    // Skills
    if (data.skills && data.skills.length > 0) {
      const skillNames = data.skills.map(skill => skill.name || skill).join(', ');
      mapped.skills = skillNames;
    }
    
    // Languages
    if (data.languages && data.languages.length > 0) {
      if (data.languages[0]) mapped.language_1 = data.languages[0].name || data.languages[0];
      if (data.languages[1]) mapped.language_2 = data.languages[1].name || data.languages[1];
      if (data.languages[2]) mapped.language_3 = data.languages[2].name || data.languages[2];
    }
    
    // Projects (from LinkedIn projects if available)
    if (data.projects && data.projects.length > 0) {
      const proj1 = data.projects[0];
      if (proj1.name) mapped.project_1_name = proj1.name;
      if (proj1.description) mapped.project_1_desc = proj1.description;
      
      if (data.projects.length > 1) {
        const proj2 = data.projects[1];
        if (proj2.name) mapped.project_2_name = proj2.name;
        if (proj2.description) mapped.project_2_desc = proj2.description;
      }
    }
    
    // Certifications
    if (data.certifications && data.certifications.length > 0) {
      const cert1 = data.certifications[0];
      if (cert1.name) mapped.certification_1 = cert1.name;
      if (cert1.authority) mapped.issuer_1 = cert1.authority;
      if (cert1.startDate && cert1.startDate.year) mapped.cert_year_1 = cert1.startDate.year.toString();
      
      if (data.certifications.length > 1) {
        const cert2 = data.certifications[1];
        if (cert2.name) mapped.certification_2 = cert2.name;
        if (cert2.authority) mapped.issuer_2 = cert2.authority;
        if (cert2.startDate && cert2.startDate.year) mapped.cert_year_2 = cert2.startDate.year.toString();
      }
    }
    
    return mapped;
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
    </div>
  );
};

export default MultiStepForm;
