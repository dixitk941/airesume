import { useState } from 'react';

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    linkedin_url: '',
    portfolio_url: '',
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
    
    // Certifications
    certification_1: '',
    issuer_1: '',
    cert_year_1: '',
    certification_2: '',
    issuer_2: '',
    cert_year_2: '',
    
    // Projects
    project_1_name: '',
    project_1_desc: '',
    project_1_stack: '',
    project_2_name: '',
    project_2_desc: '',
    project_2_stack: '',
    
    // Languages
    language_1: '',
    language_2: '',
    language_3: '',
    
    // Hobbies
    hobbies: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  // Helper function to create form sections
  const FormSection = ({ title, children }) => (
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4 text-gray-700">{title}</h2>
      <div className="bg-white p-4 rounded-lg shadow-md">{children}</div>
    </div>
  );

  // Input field component
  const InputField = ({ label, name, value, onChange, placeholder, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  // Textarea component
  const TextareaField = ({ label, name, value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="3"
      ></textarea>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Resume Builder</h1>
      
      {/* Personal Information */}
      <FormSection title="Personal Information">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField 
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="John Doe"
          />
          <InputField 
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
            type="email"
          />
          <InputField 
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 123-4567"
          />
          <InputField 
            label="LinkedIn URL"
            name="linkedin_url"
            value={formData.linkedin_url}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/johndoe"
          />
          <InputField 
            label="Portfolio URL (Optional)"
            name="portfolio_url"
            value={formData.portfolio_url}
            onChange={handleChange}
            placeholder="https://johndoe.com"
          />
        </div>
      </FormSection>

      {/* Career Objective */}
      <FormSection title="Career Objective">
        <TextareaField 
          label="Objective"
          name="objective"
          value={formData.objective}
          onChange={handleChange}
          placeholder="Experienced software engineer seeking..."
        />
      </FormSection>

      {/* Education */}
      <FormSection title="Education">
        <h3 className="text-lg font-semibold mb-3">Degree 1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <InputField 
            label="Degree"
            name="degree_1"
            value={formData.degree_1}
            onChange={handleChange}
            placeholder="Bachelor of Science in Computer Science"
          />
          <InputField 
            label="Institution"
            name="institution_1"
            value={formData.institution_1}
            onChange={handleChange}
            placeholder="University of Technology"
          />
          <InputField 
            label="Year"
            name="year_1"
            value={formData.year_1}
            onChange={handleChange}
            placeholder="2020"
          />
          <InputField 
            label="Grade"
            name="grade_1"
            value={formData.grade_1}
            onChange={handleChange}
            placeholder="3.8 GPA"
          />
        </div>

        <h3 className="text-lg font-semibold mb-3">Degree 2 (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField 
            label="Degree"
            name="degree_2"
            value={formData.degree_2}
            onChange={handleChange}
            placeholder="Master of Science in Data Science"
          />
          <InputField 
            label="Institution"
            name="institution_2"
            value={formData.institution_2}
            onChange={handleChange}
            placeholder="University of Data Science"
          />
          <InputField 
            label="Year"
            name="year_2"
            value={formData.year_2}
            onChange={handleChange}
            placeholder="2022"
          />
          <InputField 
            label="Grade"
            name="grade_2"
            value={formData.grade_2}
            onChange={handleChange}
            placeholder="3.9 GPA"
          />
        </div>
      </FormSection>

      {/* Work Experience */}
      <FormSection title="Work Experience">
        <h3 className="text-lg font-semibold mb-3">Experience 1</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField 
            label="Company"
            name="company_1"
            value={formData.company_1}
            onChange={handleChange}
            placeholder="Tech Solutions Inc."
          />
          <InputField 
            label="Role"
            name="role_1"
            value={formData.role_1}
            onChange={handleChange}
            placeholder="Senior Software Developer"
          />
          <InputField 
            label="Duration"
            name="duration_1"
            value={formData.duration_1}
            onChange={handleChange}
            placeholder="Jan 2020 - Present"
          />
          <InputField 
            label="Location"
            name="location_1"
            value={formData.location_1}
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="mb-6">
          <TextareaField 
            label="Responsibility 1"
            name="responsibility_1_1"
            value={formData.responsibility_1_1}
            onChange={handleChange}
            placeholder="Led a team of 5 developers to implement a new feature..."
          />
          <TextareaField 
            label="Responsibility 2"
            name="responsibility_1_2"
            value={formData.responsibility_1_2}
            onChange={handleChange}
            placeholder="Reduced system latency by 40% through optimization..."
          />
        </div>

        <h3 className="text-lg font-semibold mb-3">Experience 2 (Optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <InputField 
            label="Company"
            name="company_2"
            value={formData.company_2}
            onChange={handleChange}
            placeholder="Innovative Startup"
          />
          <InputField 
            label="Role"
            name="role_2"
            value={formData.role_2}
            onChange={handleChange}
            placeholder="Full Stack Developer"
          />
          <InputField 
            label="Duration"
            name="duration_2"
            value={formData.duration_2}
            onChange={handleChange}
            placeholder="May 2018 - Dec 2019"
          />
          <InputField 
            label="Location"
            name="location_2"
            value={formData.location_2}
            onChange={handleChange}
            placeholder="Boston, MA"
          />
        </div>
        <div>
          <TextareaField 
            label="Responsibility 1"
            name="responsibility_2_1"
            value={formData.responsibility_2_1}
            onChange={handleChange}
            placeholder="Developed and maintained the company's main web application..."
          />
          <TextareaField 
            label="Responsibility 2"
            name="responsibility_2_2"
            value={formData.responsibility_2_2}
            onChange={handleChange}
            placeholder="Implemented CI/CD pipeline reducing deployment time by 60%..."
          />
        </div>
      </FormSection>

      {/* Skills */}
      <FormSection title="Skills">
        <TextareaField 
          label="Skills (Comma separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="JavaScript, React, Node.js, Python, SQL, AWS, Docker"
        />
      </FormSection>

      {/* Certifications */}
      <FormSection title="Certifications">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <InputField 
            label="Certification 1"
            name="certification_1"
            value={formData.certification_1}
            onChange={handleChange}
            placeholder="AWS Certified Solutions Architect"
          />
          <InputField 
            label="Issuer"
            name="issuer_1"
            value={formData.issuer_1}
            onChange={handleChange}
            placeholder="Amazon Web Services"
          />
          <InputField 
            label="Year"
            name="cert_year_1"
            value={formData.cert_year_1}
            onChange={handleChange}
            placeholder="2023"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField 
            label="Certification 2"
            name="certification_2"
            value={formData.certification_2}
            onChange={handleChange}
            placeholder="Professional Scrum Master"
          />
          <InputField 
            label="Issuer"
            name="issuer_2"
            value={formData.issuer_2}
            onChange={handleChange}
            placeholder="Scrum.org"
          />
          <InputField 
            label="Year"
            name="cert_year_2"
            value={formData.cert_year_2}
            onChange={handleChange}
            placeholder="2022"
          />
        </div>
      </FormSection>

      {/* Projects */}
      <FormSection title="Projects">
        <div className="mb-6">
          <InputField 
            label="Project 1 Name"
            name="project_1_name"
            value={formData.project_1_name}
            onChange={handleChange}
            placeholder="E-commerce Platform"
          />
          <TextareaField 
            label="Project 1 Description"
            name="project_1_desc"
            value={formData.project_1_desc}
            onChange={handleChange}
            placeholder="Built a scalable e-commerce platform with features like..."
          />
          <InputField 
            label="Project 1 Tech Stack"
            name="project_1_stack"
            value={formData.project_1_stack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB, AWS"
          />
        </div>
        <div>
          <InputField 
            label="Project 2 Name"
            name="project_2_name"
            value={formData.project_2_name}
            onChange={handleChange}
            placeholder="AI-powered Content Generator"
          />
          <TextareaField 
            label="Project 2 Description"
            name="project_2_desc"
            value={formData.project_2_desc}
            onChange={handleChange}
            placeholder="Developed an AI tool that automatically generates..."
          />
          <InputField 
            label="Project 2 Tech Stack"
            name="project_2_stack"
            value={formData.project_2_stack}
            onChange={handleChange}
            placeholder="Python, TensorFlow, Flask, Docker"
          />
        </div>
      </FormSection>

      {/* Languages */}
      <FormSection title="Languages">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <InputField 
            label="Language 1"
            name="language_1"
            value={formData.language_1}
            onChange={handleChange}
            placeholder="English (Native)"
          />
          <InputField 
            label="Language 2"
            name="language_2"
            value={formData.language_2}
            onChange={handleChange}
            placeholder="Spanish (Fluent)"
          />
          <InputField 
            label="Language 3"
            name="language_3"
            value={formData.language_3}
            onChange={handleChange}
            placeholder="French (Basic)"
          />
        </div>
      </FormSection>

      {/* Hobbies */}
      <FormSection title="Hobbies (Optional)">
        <TextareaField 
          label="Hobbies"
          name="hobbies"
          value={formData.hobbies}
          onChange={handleChange}
          placeholder="Reading, Hiking, Photography, Chess"
        />
      </FormSection>

      <div className="mt-8 text-center">
        <button 
          type="submit" 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition duration-300"
        >
          Generate Resume
        </button>
      </div>
    </form>
  );
};

export default ResumeForm;
