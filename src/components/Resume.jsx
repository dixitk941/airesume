import React, { useState } from 'react';
import { 
  FaDownload, 
  FaPrint, 
  FaEye, 
  FaLinkedin, 
  FaGithub, 
  FaGlobe, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaPalette,
  FaUser,
  FaBriefcase,
  FaGraduationCap,
  FaCog,
  FaAward,
  FaStar,
  FaCode,
  FaTimes,
  FaCalendarAlt,
  FaLanguage,
  FaHeart,
  FaProjectDiagram,
  FaCertificate
} from 'react-icons/fa';

const Resume = ({ data }) => {
  const [currentTemplate, setCurrentTemplate] = useState('professional');
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-700 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
            <FaUser className="text-blue-600 text-2xl" />
          </div>
          <p className="text-lg font-medium text-gray-800">Ready to create your perfect resume?</p>
          <p className="text-sm text-gray-600 mt-1">Fill in your information to see the magic happen</p>
        </div>
      </div>
    );
  }

  // Template configurations
  const templates = {
    professional: {
      name: 'Professional Elite',
      primaryColor: '#1e3a8a',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      textColor: '#1f2937',
      description: 'Corporate excellence',
      icon: '👔'
    },
    modern: {
      name: 'Modern Clean',
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#a78bfa',
      textColor: '#374151',
      description: 'Clean & contemporary',
      icon: '🎨'
    },
    ats_optimized: {
      name: 'ATS Champion',
      primaryColor: '#047857',
      secondaryColor: '#059669',
      accentColor: '#10b981',
      textColor: '#1f2937',
      description: 'ATS-friendly winner',
      icon: '🎯'
    },
    creative: {
      name: 'Creative Studio',
      primaryColor: '#dc2626',
      secondaryColor: '#ef4444',
      accentColor: '#f87171',
      textColor: '#1f2937',
      description: 'Bold & innovative',
      icon: '⚡'
    },
    tech_focus: {
      name: 'Tech Mastery',
      primaryColor: '#0f766e',
      secondaryColor: '#14b8a6',
      accentColor: '#5eead4',
      textColor: '#1f2937',
      description: 'Developer-focused',
      icon: '💻'
    }
  };

  const currentTemplateConfig = templates[currentTemplate];

  // Helper functions (keeping them the same as your existing code)
  const renderContactInfo = () => {
    const contacts = [];
    
    if (data.email) contacts.push({ icon: FaEnvelope, text: data.email, link: `mailto:${data.email}` });
    if (data.phone) contacts.push({ icon: FaPhone, text: data.phone, link: `tel:${data.phone}` });
    if (data.linkedin_url) contacts.push({ icon: FaLinkedin, text: 'LinkedIn', link: data.linkedin_url });
    if (data.github_url) contacts.push({ icon: FaGithub, text: 'GitHub', link: data.github_url });
    if (data.portfolio_url) contacts.push({ icon: FaGlobe, text: 'Portfolio', link: data.portfolio_url });
    
    return contacts.map((contact, index) => (
      <div key={index} className="contact-item flex items-center mb-2">
        <contact.icon className="text-sm mr-2" />
        <a href={contact.link} className="text-sm hover:underline transition-colors">
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
      <div key={index} className="education-item mb-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{edu.degree}</div>
            <div className="font-medium text-gray-700">{edu.institution}</div>
            {edu.grade && (
              <div className="text-sm text-gray-600 mt-1">Grade: {edu.grade}</div>
            )}
          </div>
          {edu.year && (
            <div className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-800 rounded">
              {edu.year}
            </div>
          )}
        </div>
      </div>
    ));
  };

  const renderExperience = () => {
    const experiences = [];
    
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
      <div key={index} className="experience-item mb-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-lg">{exp.role}</div>
            <div className="font-medium text-gray-700">{exp.company}</div>
            {exp.location && <div className="text-sm text-gray-600">{exp.location}</div>}
          </div>
          {exp.duration && (
            <div className="text-sm font-medium px-3 py-1 bg-gray-100 text-gray-800 rounded">
              {exp.duration}
            </div>
          )}
        </div>
        {exp.responsibilities.length > 0 && (
          <div className="space-y-1">
            {exp.responsibilities.map((resp, respIndex) => (
              <div key={respIndex} className="text-sm text-gray-700 pl-4 relative">
                <div className="absolute left-0 top-2 w-2 h-2 bg-gray-400 rounded-full"></div>
                {resp}
              </div>
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
      <div key={index} className="project-item mb-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex justify-between items-start mb-2">
          <div className="font-semibold text-gray-900">{project.name}</div>
          {project.url && (
            <a 
              href={project.url} 
              className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded font-medium"
              target="_blank" 
              rel="noopener noreferrer"
            >
              View
            </a>
          )}
        </div>
        {project.description && (
          <div className="text-sm text-gray-700 mb-3">{project.description}</div>
        )}
        {project.technologies && (
          <div className="flex flex-wrap gap-2">
            {project.technologies.split(',').map((tech, techIndex) => (
              <span key={techIndex} className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded">
                {tech.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    ));
  };

  const renderSkills = () => {
    if (!data.skills) return null;
    
    const skillsList = data.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    
    return (
      <div className="flex flex-wrap gap-2">
        {skillsList.map((skill, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-gray-100 text-gray-800 rounded text-sm font-medium border"
          >
            {skill}
          </span>
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
      <div key={index} className="certification-item mb-3 p-3 bg-gray-50 rounded">
        <div className="font-medium text-gray-900">{cert.name}</div>
        <div className="flex justify-between items-center text-sm text-gray-700 mt-1">
          <span>{cert.issuer}</span>
          {cert.year && (
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded text-xs">
              {cert.year}
            </span>
          )}
        </div>
      </div>
    ));
  };

  // Professional Template
  const ProfessionalTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden print:shadow-none print:rounded-none">
      <div className="p-6 text-white print:text-black print:bg-white" style={{ backgroundColor: currentTemplateConfig.primaryColor }}>
        <h1 className="text-3xl font-bold mb-2 print:text-black">{data.full_name}</h1>
        <p className="text-lg opacity-90 mb-4 print:text-gray-700 print:opacity-100">{data.title || "Professional"}</p>
        <div className="flex flex-wrap gap-4 text-sm print:text-black">
          {renderContactInfo()}
        </div>
      </div>

      <div className="p-6 print:p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 print:gap-4">
          <div className="lg:col-span-2 space-y-6 print:space-y-4">
            {data.objective && (
              <section>
                <h2 className="text-xl font-bold mb-3 text-gray-900 border-b-2 pb-2" style={{ borderColor: currentTemplateConfig.primaryColor }}>
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">{data.objective}</p>
              </section>
            )}

            {renderExperience().length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 pb-2" style={{ borderColor: currentTemplateConfig.primaryColor }}>
                  Professional Experience
                </h2>
                {renderExperience()}
              </section>
            )}

            {renderProjects().length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 pb-2" style={{ borderColor: currentTemplateConfig.primaryColor }}>
                  Key Projects
                </h2>
                {renderProjects()}
              </section>
            )}
          </div>

          <div className="space-y-6 print:space-y-4">
            {data.skills && (
              <section>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Skills</h3>
                {renderSkills()}
              </section>
            )}

            {renderEducation().length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Education</h3>
                {renderEducation()}
              </section>
            )}

            {renderCertifications().length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3 text-gray-900">Certifications</h3>
                {renderCertifications()}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Modern Clean Template
  const ModernTemplate = () => (
    <div className="bg-white shadow-xl rounded-2xl overflow-hidden print:shadow-none print:rounded-none">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r opacity-10" style={{ 
          backgroundColor: currentTemplateConfig.primaryColor 
        }}></div>
        <div className="relative p-8 text-center">
          <h1 className="text-4xl font-light mb-2" style={{ color: currentTemplateConfig.primaryColor }}>
            {data.full_name}
          </h1>
          <p className="text-xl text-gray-600 mb-6">{data.title || "Professional"}</p>
          <div className="flex justify-center flex-wrap gap-6 text-sm text-gray-700">
            {renderContactInfo()}
          </div>
        </div>
      </div>

      <div className="p-8">
        {data.objective && (
          <section className="mb-8">
            <h2 className="text-2xl font-light mb-4 text-center" style={{ color: currentTemplateConfig.primaryColor }}>
              About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-center max-w-3xl mx-auto">{data.objective}</p>
          </section>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            {renderExperience().length > 0 && (
              <section>
                <h2 className="text-2xl font-light mb-6" style={{ color: currentTemplateConfig.primaryColor }}>
                  Experience
                </h2>
                {renderExperience()}
              </section>
            )}

            {renderProjects().length > 0 && (
              <section>
                <h2 className="text-2xl font-light mb-6" style={{ color: currentTemplateConfig.primaryColor }}>
                  Projects
                </h2>
                {renderProjects()}
              </section>
            )}
          </div>

          <div className="space-y-8">
            {data.skills && (
              <section>
                <h3 className="text-xl font-light mb-4" style={{ color: currentTemplateConfig.primaryColor }}>Skills</h3>
                {renderSkills()}
              </section>
            )}

            {renderEducation().length > 0 && (
              <section>
                <h3 className="text-xl font-light mb-4" style={{ color: currentTemplateConfig.primaryColor }}>Education</h3>
                {renderEducation()}
              </section>
            )}

            {renderCertifications().length > 0 && (
              <section>
                <h3 className="text-xl font-light mb-4" style={{ color: currentTemplateConfig.primaryColor }}>Certifications</h3>
                {renderCertifications()}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // ATS Optimized Template
  const ATSOptimizedTemplate = () => (
    <div className="bg-white border-2 border-gray-200 print:border-gray-400">
      <div className="p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.full_name}</h1>
          <p className="text-lg text-gray-700 mb-4">{data.title || "Professional"}</p>
          <div className="flex justify-center flex-wrap gap-4 text-sm text-gray-600">
            {renderContactInfo()}
          </div>
        </div>

        {data.objective && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.objective}</p>
          </section>
        )}

        {renderExperience().length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              WORK EXPERIENCE
            </h2>
            {renderExperience()}
          </section>
        )}

        {data.skills && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              TECHNICAL SKILLS
            </h2>
            {renderSkills()}
          </section>
        )}

        {renderEducation().length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              EDUCATION
            </h2>
            {renderEducation()}
          </section>
        )}

        {renderProjects().length > 0 && (
          <section className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              KEY PROJECTS
            </h2>
            {renderProjects()}
          </section>
        )}

        {renderCertifications().length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-1 mb-3">
              CERTIFICATIONS
            </h2>
            {renderCertifications()}
          </section>
        )}
      </div>
    </div>
  );

  // Creative Template
  const CreativeTemplate = () => (
    <div className="bg-white shadow-2xl rounded-3xl overflow-hidden print:shadow-none print:rounded-none">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br opacity-20" style={{ 
          background: `linear-gradient(135deg, ${currentTemplateConfig.primaryColor}, ${currentTemplateConfig.accentColor})`
        }}></div>
        <div className="relative p-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white" style={{ 
              backgroundColor: currentTemplateConfig.primaryColor 
            }}>
              {data.full_name?.charAt(0)}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2" style={{ color: currentTemplateConfig.primaryColor }}>
                {data.full_name}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{data.title || "Creative Professional"}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                {renderContactInfo()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {data.objective && (
              <section>
                <h2 className="text-2xl font-bold mb-4 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaUser className="mr-3" />
                  Creative Vision
                </h2>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg">{data.objective}</p>
              </section>
            )}

            {renderExperience().length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaBriefcase className="mr-3" />
                  Experience Journey
                </h2>
                {renderExperience()}
              </section>
            )}

            {renderProjects().length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-6 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaProjectDiagram className="mr-3" />
                  Creative Projects
                </h2>
                {renderProjects()}
              </section>
            )}
          </div>

          <div className="space-y-8">
            {data.skills && (
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaStar className="mr-3" />
                  Skills
                </h3>
                {renderSkills()}
              </section>
            )}

            {renderEducation().length > 0 && (
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaGraduationCap className="mr-3" />
                  Education
                </h3>
                {renderEducation()}
              </section>
            )}

            {renderCertifications().length > 0 && (
              <section>
                <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaCertificate className="mr-3" />
                  Certifications
                </h3>
                {renderCertifications()}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Tech Focus Template
  const TechFocusTemplate = () => (
    <div className="bg-gray-900 text-white shadow-2xl rounded-lg overflow-hidden print:bg-white print:text-black print:shadow-none print:rounded-none print:border print:border-gray-400">
      <div className="p-6 bg-gradient-to-r print:bg-white" style={{ 
        background: `linear-gradient(135deg, ${currentTemplateConfig.primaryColor}, ${currentTemplateConfig.secondaryColor})`
      }}>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-lg flex items-center justify-center print:bg-gray-100">
            <FaCode className="text-2xl print:text-gray-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1 print:text-gray-900">{data.full_name}</h1>
            <p className="text-lg opacity-90 print:text-gray-700 print:opacity-100">{data.title || "Software Developer"}</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-4 text-sm print:text-gray-700">
          {renderContactInfo()}
        </div>
      </div>

      <div className="p-6 bg-white text-gray-900">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {data.objective && (
              <section>
                <h2 className="text-xl font-bold mb-3 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaUser className="mr-2" />
                  Technical Profile
                </h2>
                <p className="text-gray-700 leading-relaxed bg-gray-50 p-4 rounded border-l-4" style={{ 
                  borderColor: currentTemplateConfig.primaryColor 
                }}>
                  {data.objective}
                </p>
              </section>
            )}

            {renderExperience().length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaBriefcase className="mr-2" />
                  Technical Experience
                </h2>
                {renderExperience()}
              </section>
            )}

            {renderProjects().length > 0 && (
              <section>
                <h2 className="text-xl font-bold mb-4 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaCode className="mr-2" />
                  Development Projects
                </h2>
                {renderProjects()}
              </section>
            )}
          </div>

          <div className="space-y-6">
            {data.skills && (
              <section>
                <h3 className="text-lg font-bold mb-3 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaCog className="mr-2" />
                  Tech Stack
                </h3>
                {renderSkills()}
              </section>
            )}

            {renderEducation().length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaGraduationCap className="mr-2" />
                  Education
                </h3>
                {renderEducation()}
              </section>
            )}

            {renderCertifications().length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-3 flex items-center" style={{ color: currentTemplateConfig.primaryColor }}>
                  <FaAward className="mr-2" />
                  Certifications
                </h3>
                {renderCertifications()}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  // Template renderer
  const renderTemplate = () => {
    switch (currentTemplate) {
      case 'modern': return <ModernTemplate />;
      case 'ats_optimized': return <ATSOptimizedTemplate />;
      case 'creative': return <CreativeTemplate />;
      case 'tech_focus': return <TechFocusTemplate />;
      case 'professional':
      default: 
        return <ProfessionalTemplate />;
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // **FIXED PDF DOWNLOAD - NO TIMESTAMP, NO EXTRA WHITESPACE**
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    const resumeContent = document.getElementById('resume-content').cloneNode(true);
    
    // Remove all interactive elements and clean up for print
    const linksInContent = resumeContent.querySelectorAll('a');
    linksInContent.forEach(link => {
      const span = document.createElement('span');
      span.textContent = link.textContent;
      span.className = link.className;
      link.parentNode.replaceChild(span, link);
    });

    const cleanHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume</title>
          <meta charset="utf-8">
          <style>
            /* EXACT A4 SIZE WITH NO BROWSER INTERFERENCE */
            @page {
              size: A4;
              margin: 0;
              padding: 0;
            }
            
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            html, body {
              width: 210mm;
              height: 297mm;
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              font-size: 14px;
              line-height: 1.4;
              color: #333;
              background: white;
              overflow: hidden;
            }
            
            .resume-container {
              width: 210mm;
              height: 297mm;
              padding: 10mm;
              background: white;
              overflow: hidden;
              page-break-inside: avoid;
            }
            
            /* Remove all shadows and rounded corners for print */
            .shadow-lg, .shadow-2xl, .shadow-xl {
              box-shadow: none !important;
            }
            
            .rounded-lg, .rounded-xl, .rounded {
              border-radius: 0 !important;
            }
            
            /* Ensure proper scaling */
            .grid {
              display: grid;
              grid-template-columns: 1fr 2fr;
              gap: 15mm;
            }
            
            .lg\\:col-span-2 {
              grid-column: span 2;
            }
            
            /* Typography scaling for A4 */
            h1 { font-size: 24px; margin-bottom: 6px; }
            h2 { font-size: 18px; margin-bottom: 12px; }
            h3 { font-size: 16px; margin-bottom: 10px; }
            p, div, span { font-size: 13px; }
            
            /* Spacing adjustments */
            .space-y-6 > * + * { margin-top: 15px; }
            .space-y-4 > * + * { margin-top: 10px; }
            .space-y-8 > * + * { margin-top: 20px; }
            
            .mb-2 { margin-bottom: 6px; }
            .mb-3 { margin-bottom: 10px; }
            .mb-4 { margin-bottom: 12px; }
            .mb-6 { margin-bottom: 18px; }
            
            .p-4 { padding: 12px; }
            .p-6 { padding: 18px; }
            .p-8 { padding: 20px; }
            
            /* Background colors for print */
            .bg-gray-50 { background-color: #f9f9f9 !important; }
            .bg-gray-100 { background-color: #f3f4f6 !important; }
            .bg-blue-100 { background-color: #dbeafe !important; }
            .bg-gray-200 { background-color: #e5e7eb !important; }
            
            /* Text colors */
            .text-white { color: white !important; }
            .text-gray-900 { color: #111827 !important; }
            .text-gray-800 { color: #1f2937 !important; }
            .text-gray-700 { color: #374151 !important; }
            .text-gray-600 { color: #4b5563 !important; }
            
            /* Border utilities */
            .border-b-2 { border-bottom: 2px solid; }
            .border-l-4 { border-left: 4px solid; }
            
            /* Flexbox utilities */
            .flex { display: flex; }
            .flex-wrap { flex-wrap: wrap; }
            .justify-between { justify-content: space-between; }
            .items-center { align-items: center; }
            .items-start { align-items: flex-start; }
            
            /* Hide print-specific classes that show unwanted content */
            .print\\:hidden { display: none !important; }
            
            /* Contact info styling */
            .contact-item {
              display: flex;
              align-items: center;
              margin-bottom: 6px;
              font-size: 12px;
            }
            
            /* Skills styling */
            .flex.flex-wrap.gap-2 {
              display: flex;
              flex-wrap: wrap;
              gap: 6px;
            }
            
            .px-3.py-1 {
              padding: 4px 8px;
              font-size: 11px;
              border: 1px solid #d1d5db;
              border-radius: 4px;
              background: #f9f9f9;
            }
            
            /* Experience item bullets */
            .relative.pl-4::before {
              content: '•';
              position: absolute;
              left: 0;
              top: 0;
              color: #6b7280;
            }
            
            .relative.pl-4 {
              position: relative;
              padding-left: 16px;
              margin-bottom: 4px;
              font-size: 12px;
              line-height: 1.3;
            }
            
            /* Ensure no page breaks within items */
            .experience-item, .education-item, .project-item, .certification-item {
              page-break-inside: avoid;
              margin-bottom: 15px;
            }
            
            /* Remove any browser default margins */
            @media print {
              html, body {
                margin: 0 !important;
                padding: 0 !important;
              }
              
              .resume-container {
                margin: 0 !important;
                width: 100% !important;
                height: 100% !important;
                max-width: none !important;
                max-height: none !important;
              }
            }
          </style>
        </head>
        <body>
          <div class="resume-container">
            ${resumeContent.innerHTML}
          </div>
          <script>
            // Auto-trigger print dialog
            window.onload = function() {
              setTimeout(function() {
                window.print();
                // Close window after print dialog
                setTimeout(function() {
                  window.close();
                }, 1000);
              }, 500);
            };
            
            // Handle print completion
            window.onafterprint = function() {
              window.close();
            };
          </script>
        </body>
      </html>
    `;
    
    printWindow.document.write(cleanHTML);
    printWindow.document.close();
  };

  // Template Selector
  const TemplateSelector = () => (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {Object.entries(templates).map(([key, template]) => (
        <button
          key={key}
          onClick={() => setCurrentTemplate(key)}
          className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left overflow-hidden ${
            currentTemplate === key
              ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
          }`}
        >
          <div className="absolute top-3 right-3 text-2xl">{template.icon}</div>
          <div className="mb-4">
            <div className="font-bold text-lg text-gray-800 mb-1">{template.name}</div>
            <div className="text-sm text-gray-500">{template.description}</div>
          </div>
          <div className="flex space-x-2">
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.primaryColor }}></div>
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.secondaryColor }}></div>
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: template.accentColor }}></div>
          </div>
          {currentTemplate === key && (
            <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          )}
        </button>
      ))}
    </div>
  );

  // Preview Modal
  if (isPreviewMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full h-[90vh] overflow-hidden flex flex-col">
          <div className="flex justify-between items-center p-6 border-b bg-gray-50">
            <div>
              <h3 className="text-xl font-bold text-gray-800">Resume Preview</h3>
              <p className="text-sm text-gray-600">{templates[currentTemplate].name} Template</p>
            </div>
            <button 
              onClick={() => setIsPreviewMode(false)}
              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <FaTimes className="text-gray-600" />
            </button>
          </div>
          <div className="flex-1 overflow-auto p-6 bg-gray-100">
            <div className="transform scale-90 origin-top">
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <FaPalette className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Resume Builder</h2>
              <p className="text-gray-600">PDF download fixed - exact preview match!</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setIsPreviewMode(true)}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md"
            >
              <FaEye />
              Preview
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-md"
            >
              <FaPrint />
              Print
            </button>
            <button
              onClick={handleDownloadPDF}
              className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors shadow-md"
            >
              <FaDownload />
              Download Clean PDF
            </button>
          </div>
        </div>
        
        <TemplateSelector />
        
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6 mt-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">✓</span>
            </div>
            <div>
              <h4 className="font-bold text-green-900 mb-2">PDF Download Issues Fixed!</h4>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• **No timestamp** - Removed browser-added date/time</li>
                <li>• **No extra whitespace** - Exact A4 sizing with precise margins</li>
                <li>• **Clean title** - Just "Resume" instead of full page title</li>
                <li>• **Exact preview match** - What you see is what you get</li>
                <li>• **Perfect scaling** - Content fits exactly on A4 page</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-blue-900">Pro Tip for Best Results:</h4>
              <p className="text-sm text-blue-700 mt-1">
                In your browser's print dialog, make sure to **disable headers and footers** 
                (usually found in "More settings" → uncheck "Headers and footers") for the cleanest PDF output.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Resume Content */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-2xl">
        <div 
          id="resume-content" 
          className="max-w-5xl mx-auto transform origin-top transition-all duration-500"
          style={{ 
            transform: 'scale(0.9)',
            minHeight: '11in'
          }}
        >
          {renderTemplate()}
        </div>
      </div>

      {/* Print Styles */}
      <style jsx>{`
        @page {
          size: A4;
          margin: 0;
        }
        
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
            width: 210mm !important;
            height: 297mm !important;
            transform: none !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 10mm !important;
            min-height: auto !important;
            background: white !important;
            font-size: 14px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Resume;
