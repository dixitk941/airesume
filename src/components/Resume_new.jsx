import { useState } from 'react';
import { FaDownload, FaPrint, FaEye, FaLinkedin, FaGithub, FaGlobe, FaEnvelope, FaPhone, FaMapMarkerAlt, FaPalette } from 'react-icons/fa';

const Resume = ({ data }) => {
  const [currentTemplate, setCurrentTemplate] = useState('professional');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>Please fill in your information to see the resume preview</p>
      </div>
    );
  }

  // Template configurations
  const templates = {
    professional: {
      name: 'Professional',
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      accentColor: '#3b82f6'
    },
    minimal: {
      name: 'Minimal',
      primaryColor: '#374151',
      secondaryColor: '#1f2937',
      accentColor: '#6b7280'
    },
    modern: {
      name: 'Modern',
      primaryColor: '#7c3aed',
      secondaryColor: '#5b21b6',
      accentColor: '#8b5cf6'
    },
    executive: {
      name: 'Executive',
      primaryColor: '#059669',
      secondaryColor: '#047857',
      accentColor: '#10b981'
    },
    creative: {
      name: 'Creative',
      primaryColor: '#dc2626',
      secondaryColor: '#b91c1c',
      accentColor: '#ef4444'
    }
  };

  const currentTemplateConfig = templates[currentTemplate];

  // Print and PDF functionality
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    // Create a new window with the resume content
    const printWindow = window.open('', '_blank');
    const resumeContent = document.getElementById('resume-content').innerHTML;
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${data.full_name || 'Resume'}</title>
          <meta charset="utf-8">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { 
              font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; 
              line-height: 1.4; 
              color: #374151;
              background: white;
            }
            .resume-container { 
              max-width: 8.5in; 
              margin: 0 auto; 
              padding: 0.5in;
              min-height: 11in;
              background: white;
            }
            .header { margin-bottom: 1rem; }
            .section { margin-bottom: 1rem; }
            .section-title { 
              font-size: 1.1rem; 
              font-weight: 600; 
              border-bottom: 2px solid ${currentTemplateConfig.primaryColor}; 
              padding-bottom: 0.25rem; 
              margin-bottom: 0.75rem;
              color: ${currentTemplateConfig.primaryColor};
            }
            .contact-info { display: flex; flex-wrap: wrap; gap: 1rem; font-size: 0.9rem; }
            .contact-item { display: flex; align-items: center; gap: 0.25rem; }
            .experience-item, .education-item { margin-bottom: 0.75rem; }
            .item-header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.25rem; }
            .item-title { font-weight: 600; color: #1f2937; }
            .item-subtitle { color: #6b7280; font-size: 0.9rem; }
            .item-date { color: #9ca3af; font-size: 0.85rem; }
            .responsibilities { margin-top: 0.5rem; }
            .responsibility { margin-bottom: 0.25rem; padding-left: 1rem; position: relative; }
            .responsibility::before { 
              content: '•'; 
              position: absolute; 
              left: 0; 
              color: ${currentTemplateConfig.primaryColor}; 
            }
            .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; }
            .skill-item { 
              background: ${currentTemplateConfig.primaryColor}15; 
              padding: 0.25rem 0.5rem; 
              border-radius: 0.25rem; 
              font-size: 0.85rem;
              text-align: center;
            }
            @media print {
              body { print-color-adjust: exact; }
              .resume-container { margin: 0; padding: 0.25in; box-shadow: none; }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${resumeContent}
          </div>
          <script>
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    
    printWindow.document.close();
  };

  // Helper functions
  const renderContactInfo = () => {
    const contacts = [];
    
    if (data.email) contacts.push({ icon: FaEnvelope, text: data.email, link: `mailto:${data.email}` });
    if (data.phone) contacts.push({ icon: FaPhone, text: data.phone, link: `tel:${data.phone}` });
    if (data.linkedin_url) contacts.push({ icon: FaLinkedin, text: 'LinkedIn', link: data.linkedin_url });
    if (data.portfolio_url) contacts.push({ icon: FaGlobe, text: 'Portfolio', link: data.portfolio_url });
    
    return contacts.map((contact, index) => (
      <div key={index} className="contact-item">
        <contact.icon className="text-sm" style={{ color: currentTemplateConfig.primaryColor }} />
        <a href={contact.link} className="text-sm hover:underline" style={{ color: currentTemplateConfig.secondaryColor }}>
          {contact.text}
        </a>
      </div>
    ));
  };

  const renderEducation = () => {
    const education = [];
    
    if (data.degree_1 && data.institution_1) {
      education.push({
        degree: data.degree_1,
        institution: data.institution_1,
        year: data.year_1,
        grade: data.grade_1
      });
    }
    
    if (data.degree_2 && data.institution_2) {
      education.push({
        degree: data.degree_2,
        institution: data.institution_2,
        year: data.year_2,
        grade: data.grade_2
      });
    }
    
    return education.map((edu, index) => (
      <div key={index} className="education-item">
        <div className="item-header">
          <div>
            <div className="item-title">{edu.degree}</div>
            <div className="item-subtitle">{edu.institution}</div>
            {edu.grade && <div className="text-sm text-gray-600">Grade: {edu.grade}</div>}
          </div>
          {edu.year && <div className="item-date">{edu.year}</div>}
        </div>
      </div>
    ));
  };

  const renderExperience = () => {
    const experiences = [];
    
    // Collect all experiences
    for (let i = 1; i <= 3; i++) {
      if (data[`company_${i}`] && data[`role_${i}`]) {
        const responsibilities = [];
        for (let j = 1; j <= 4; j++) {
          if (data[`responsibility_${i}_${j}`]) {
            responsibilities.push(data[`responsibility_${i}_${j}`]);
          }
        }
        
        experiences.push({
          company: data[`company_${i}`],
          role: data[`role_${i}`],
          duration: data[`duration_${i}`],
          location: data[`location_${i}`],
          responsibilities
        });
      }
    }
    
    return experiences.map((exp, index) => (
      <div key={index} className="experience-item">
        <div className="item-header">
          <div>
            <div className="item-title">{exp.role}</div>
            <div className="item-subtitle">{exp.company}</div>
            {exp.location && <div className="text-sm text-gray-600">{exp.location}</div>}
          </div>
          {exp.duration && <div className="item-date">{exp.duration}</div>}
        </div>
        {exp.responsibilities.length > 0 && (
          <div className="responsibilities">
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="responsibility">{resp}</div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  const renderProjects = () => {
    const projects = [];
    
    for (let i = 1; i <= 3; i++) {
      if (data[`project_${i}_name`]) {
        projects.push({
          name: data[`project_${i}_name`],
          description: data[`project_${i}_desc`],
          technologies: data[`project_${i}_tech`],
          url: data[`project_${i}_url`]
        });
      }
    }
    
    return projects.map((project, index) => (
      <div key={index} className="mb-3">
        <div className="flex justify-between items-start mb-1">
          <div className="item-title">{project.name}</div>
          {project.url && (
            <a href={project.url} className="text-sm" style={{ color: currentTemplateConfig.primaryColor }}>
              View Project
            </a>
          )}
        </div>
        {project.description && <div className="text-sm text-gray-600 mb-1">{project.description}</div>}
        {project.technologies && (
          <div className="text-sm" style={{ color: currentTemplateConfig.secondaryColor }}>
            Technologies: {project.technologies}
          </div>
        )}
      </div>
    ));
  };

  const renderSkills = () => {
    if (!data.skills) return null;
    
    const skillsList = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    return (
      <div className="skills-grid">
        {skillsList.map((skill, index) => (
          <div key={index} className="skill-item">
            {skill}
          </div>
        ))}
      </div>
    );
  };

  const renderCertifications = () => {
    const certifications = [];
    
    for (let i = 1; i <= 3; i++) {
      if (data[`certification_${i}`]) {
        certifications.push({
          name: data[`certification_${i}`],
          issuer: data[`issuer_${i}`],
          year: data[`cert_year_${i}`]
        });
      }
    }
    
    return certifications.map((cert, index) => (
      <div key={index} className="mb-2">
        <div className="item-title text-sm">{cert.name}</div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{cert.issuer}</span>
          {cert.year && <span>{cert.year}</span>}
        </div>
      </div>
    ));
  };

  const renderLanguages = () => {
    const languages = [];
    
    for (let i = 1; i <= 3; i++) {
      if (data[`language_${i}`]) {
        languages.push({
          language: data[`language_${i}`],
          proficiency: data[`proficiency_${i}`] || 'Fluent'
        });
      }
    }
    
    return languages.map((lang, index) => (
      <div key={index} className="flex justify-between text-sm mb-1">
        <span>{lang.language}</span>
        <span className="text-gray-600">{lang.proficiency}</span>
      </div>
    ));
  };

  // Template Components
  const ProfessionalTemplate = () => (
    <div className="bg-white shadow-lg">
      {/* Header */}
      <div className="p-6 bg-gradient-to-r" style={{ 
        backgroundImage: `linear-gradient(135deg, ${currentTemplateConfig.primaryColor}, ${currentTemplateConfig.secondaryColor})` 
      }}>
        <h1 className="text-3xl font-bold text-white mb-2">{data.full_name}</h1>
        <div className="flex flex-wrap gap-4 text-white text-sm opacity-95">
          {renderContactInfo()}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Objective */}
        {data.objective && (
          <section className="section">
            <h2 className="section-title">Professional Summary</h2>
            <p className="text-gray-700 leading-relaxed">{data.objective}</p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Experience */}
            {renderExperience().length > 0 && (
              <section className="section">
                <h2 className="section-title">Professional Experience</h2>
                {renderExperience()}
              </section>
            )}

            {/* Education */}
            {renderEducation().length > 0 && (
              <section className="section">
                <h2 className="section-title">Education</h2>
                {renderEducation()}
              </section>
            )}

            {/* Projects */}
            {renderProjects().length > 0 && (
              <section className="section">
                <h2 className="section-title">Projects</h2>
                {renderProjects()}
              </section>
            )}
          </div>

          <div className="space-y-6">
            {/* Skills */}
            {data.skills && (
              <section className="section">
                <h2 className="section-title">Skills</h2>
                {renderSkills()}
              </section>
            )}

            {/* Certifications */}
            {renderCertifications().length > 0 && (
              <section className="section">
                <h2 className="section-title">Certifications</h2>
                {renderCertifications()}
              </section>
            )}

            {/* Languages */}
            {renderLanguages().length > 0 && (
              <section className="section">
                <h2 className="section-title">Languages</h2>
                {renderLanguages()}
              </section>
            )}

            {/* Interests */}
            {data.interests && (
              <section className="section">
                <h2 className="section-title">Interests</h2>
                <p className="text-sm text-gray-700">{data.interests}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const MinimalTemplate = () => (
    <div className="bg-white shadow-lg max-w-4xl mx-auto">
      <div className="p-6">
        {/* Header */}
        <div className="text-center border-b-2 pb-6 mb-6" style={{ borderColor: currentTemplateConfig.primaryColor }}>
          <h1 className="text-4xl font-light mb-3" style={{ color: currentTemplateConfig.primaryColor }}>
            {data.full_name}
          </h1>
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-600">
            {renderContactInfo()}
          </div>
        </div>

        {/* Objective */}
        {data.objective && (
          <section className="mb-6">
            <p className="text-center text-gray-700 leading-relaxed italic">{data.objective}</p>
          </section>
        )}

        {/* Experience */}
        {renderExperience().length > 0 && (
          <section className="mb-6">
            <h2 className="section-title">Experience</h2>
            {renderExperience()}
          </section>
        )}

        {/* Education */}
        {renderEducation().length > 0 && (
          <section className="mb-6">
            <h2 className="section-title">Education</h2>
            {renderEducation()}
          </section>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Skills */}
          {data.skills && (
            <section>
              <h2 className="section-title">Skills</h2>
              {renderSkills()}
            </section>
          )}

          {/* Projects */}
          {renderProjects().length > 0 && (
            <section>
              <h2 className="section-title">Projects</h2>
              {renderProjects()}
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const ModernTemplate = () => (
    <div className="bg-white shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* Sidebar */}
        <div className="p-6 text-white" style={{ backgroundColor: currentTemplateConfig.primaryColor }}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">{data.full_name}</h1>
            <div className="space-y-2 text-sm opacity-90">
              {renderContactInfo()}
            </div>
          </div>

          {/* Skills */}
          {data.skills && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Skills</h3>
              <div className="space-y-1">
                {data.skills.split(',').map((skill, index) => (
                  <div key={index} className="text-sm bg-white bg-opacity-20 rounded px-2 py-1">
                    {skill.trim()}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {renderCertifications().length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Certifications</h3>
              {renderCertifications()}
            </div>
          )}

          {/* Languages */}
          {renderLanguages().length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Languages</h3>
              {renderLanguages()}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 p-6 space-y-6">
          {/* Objective */}
          {data.objective && (
            <section>
              <h2 className="section-title">About Me</h2>
              <p className="text-gray-700 leading-relaxed">{data.objective}</p>
            </section>
          )}

          {/* Experience */}
          {renderExperience().length > 0 && (
            <section>
              <h2 className="section-title">Experience</h2>
              {renderExperience()}
            </section>
          )}

          {/* Education */}
          {renderEducation().length > 0 && (
            <section>
              <h2 className="section-title">Education</h2>
              {renderEducation()}
            </section>
          )}

          {/* Projects */}
          {renderProjects().length > 0 && (
            <section>
              <h2 className="section-title">Projects</h2>
              {renderProjects()}
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const ExecutiveTemplate = () => (
    <div className="bg-white shadow-lg">
      {/* Header */}
      <div className="p-6 border-b-4" style={{ borderColor: currentTemplateConfig.primaryColor }}>
        <h1 className="text-4xl font-bold mb-3" style={{ color: currentTemplateConfig.primaryColor }}>
          {data.full_name}
        </h1>
        <div className="flex flex-wrap gap-6 text-gray-600">
          {renderContactInfo()}
        </div>
      </div>

      <div className="p-6">
        {/* Executive Summary */}
        {data.objective && (
          <section className="mb-6 p-4 bg-gray-50 rounded">
            <h2 className="text-xl font-semibold mb-3" style={{ color: currentTemplateConfig.primaryColor }}>
              Executive Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.objective}</p>
          </section>
        )}

        {/* Experience */}
        {renderExperience().length > 0 && (
          <section className="mb-6">
            <h2 className="section-title">Professional Experience</h2>
            {renderExperience()}
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Education */}
          {renderEducation().length > 0 && (
            <section>
              <h2 className="section-title">Education</h2>
              {renderEducation()}
            </section>
          )}

          {/* Skills */}
          {data.skills && (
            <section>
              <h2 className="section-title">Core Competencies</h2>
              {renderSkills()}
            </section>
          )}
        </div>
      </div>
    </div>
  );

  const CreativeTemplate = () => (
    <div className="bg-white shadow-lg">
      {/* Decorative header */}
      <div className="h-2 bg-gradient-to-r" style={{
        backgroundImage: `linear-gradient(90deg, ${currentTemplateConfig.primaryColor}, ${currentTemplateConfig.accentColor}, ${currentTemplateConfig.secondaryColor})`
      }}></div>
      
      <div className="p-6">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-2" style={{ color: currentTemplateConfig.primaryColor }}>
            {data.full_name}
          </h1>
          <div className="flex justify-center flex-wrap gap-4 text-sm">
            {renderContactInfo()}
          </div>
        </div>

        {/* Objective */}
        {data.objective && (
          <section className="mb-6">
            <div className="bg-gradient-to-r p-4 rounded-lg" style={{
              backgroundImage: `linear-gradient(135deg, ${currentTemplateConfig.primaryColor}15, ${currentTemplateConfig.accentColor}15)`
            }}>
              <h2 className="text-xl font-semibold mb-2" style={{ color: currentTemplateConfig.primaryColor }}>
                Creative Vision
              </h2>
              <p className="text-gray-700 leading-relaxed">{data.objective}</p>
            </div>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            {/* Experience */}
            {renderExperience().length > 0 && (
              <section>
                <h2 className="section-title">Experience</h2>
                {renderExperience()}
              </section>
            )}

            {/* Projects */}
            {renderProjects().length > 0 && (
              <section>
                <h2 className="section-title">Featured Projects</h2>
                {renderProjects()}
              </section>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            {/* Skills */}
            {data.skills && (
              <section>
                <h2 className="section-title">Skills</h2>
                {renderSkills()}
              </section>
            )}

            {/* Education */}
            {renderEducation().length > 0 && (
              <section>
                <h2 className="section-title">Education</h2>
                {renderEducation()}
              </section>
            )}

            {/* Certifications */}
            {renderCertifications().length > 0 && (
              <section>
                <h2 className="section-title">Certifications</h2>
                {renderCertifications()}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'minimal': return <MinimalTemplate />;
      case 'modern': return <ModernTemplate />;
      case 'executive': return <ExecutiveTemplate />;
      case 'creative': return <CreativeTemplate />;
      default: return <ProfessionalTemplate />;
    }
  };

  if (isPreviewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-lg font-semibold">Resume Preview</h3>
            <button 
              onClick={() => setIsPreviewMode(false)}
              className="p-2 hover:bg-gray-100 rounded"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <div id="resume-content" className="transform scale-75 origin-top">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap gap-3 items-center justify-between bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex items-center gap-3">
          <FaPalette className="text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Template:</span>
          <div className="flex gap-2">
            {Object.entries(templates).map(([key, template]) => (
              <button
                key={key}
                onClick={() => setCurrentTemplate(key)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  currentTemplate === key
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={currentTemplate === key ? { backgroundColor: template.primaryColor } : {}}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setIsPreviewMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm"
          >
            <FaEye size={14} />
            Preview
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors text-sm"
          >
            <FaPrint size={14} />
            Print
          </button>
          <button
            onClick={handleDownloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors text-sm"
          >
            <FaDownload size={14} />
            Download PDF
          </button>
        </div>
      </div>

      {/* Resume Content */}
      <div
        key={currentTemplate}
        className="bg-gray-50 p-4 rounded-lg"
      >
        <div 
          id="resume-content" 
          className="max-w-4xl mx-auto transform origin-top"
          style={{ 
            transform: 'scale(0.8)',
            minHeight: '11in',
            aspectRatio: '8.5 / 11'
          }}
        >
          {renderTemplate()}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #resume-content, #resume-content * {
            visibility: visible;
          }
          #resume-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            transform: none !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0.5in !important;
            min-height: auto !important;
          }
          .resume-container {
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
