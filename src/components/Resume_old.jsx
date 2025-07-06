import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaLinkedin, FaGlobe, FaMapMarkerAlt, FaCalendarAlt, FaPrint, FaDownload, FaPalette } from 'react-icons/fa';

const Resume = ({ data }) => {
  const [currentTemplate, setCurrentTemplate] = useState('modern'); // 'modern', 'minimal', 'creative'

  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Helper function to render education items
  const renderEducation = () => {
    const educationItems = [];
    
    if (data.degree_1 && data.institution_1) {
      educationItems.push(
        <div key="edu1" className="mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-gray-800">{data.degree_1}</h4>
            {data.year_1 && <span className="text-sm text-gray-500 flex items-center"><FaCalendarAlt className="mr-1" />{data.year_1}</span>}
          </div>
          <div className="text-gray-600 mb-1">{data.institution_1}</div>
          {data.grade_1 && <div className="text-sm text-gray-500">Grade: {data.grade_1}</div>}
        </div>
      );
    }
    
    if (data.degree_2 && data.institution_2) {
      educationItems.push(
        <div key="edu2" className="mb-4 last:mb-0">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-semibold text-gray-800">{data.degree_2}</h4>
            {data.year_2 && <span className="text-sm text-gray-500 flex items-center"><FaCalendarAlt className="mr-1" />{data.year_2}</span>}
          </div>
          <div className="text-gray-600 mb-1">{data.institution_2}</div>
          {data.grade_2 && <div className="text-sm text-gray-500">Grade: {data.grade_2}</div>}
        </div>
      );
    }
    
    return educationItems;
  };

  // Helper function to render work experience
  const renderWorkExperience = () => {
    const experienceItems = [];
    
    if (data.company_1 && data.role_1) {
      experienceItems.push(
        <div key="exp1" className="mb-6 last:mb-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{data.role_1}</h4>
              <div className="text-blue-600 font-medium">{data.company_1}</div>
            </div>
            <div className="text-right text-sm text-gray-500">
              {data.duration_1 && <div className="flex items-center"><FaCalendarAlt className="mr-1" />{data.duration_1}</div>}
              {data.location_1 && <div className="flex items-center mt-1"><FaMapMarkerAlt className="mr-1" />{data.location_1}</div>}
            </div>
          </div>
          {(data.responsibility_1_1 || data.responsibility_1_2) && (
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {data.responsibility_1_1 && <li>{data.responsibility_1_1}</li>}
              {data.responsibility_1_2 && <li>{data.responsibility_1_2}</li>}
            </ul>
          )}
        </div>
      );
    }
    
    if (data.company_2 && data.role_2) {
      experienceItems.push(
        <div key="exp2" className="mb-6 last:mb-0">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h4 className="font-semibold text-gray-800 text-lg">{data.role_2}</h4>
              <div className="text-blue-600 font-medium">{data.company_2}</div>
            </div>
            <div className="text-right text-sm text-gray-500">
              {data.duration_2 && <div className="flex items-center"><FaCalendarAlt className="mr-1" />{data.duration_2}</div>}
              {data.location_2 && <div className="flex items-center mt-1"><FaMapMarkerAlt className="mr-1" />{data.location_2}</div>}
            </div>
          </div>
          {(data.responsibility_2_1 || data.responsibility_2_2) && (
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              {data.responsibility_2_1 && <li>{data.responsibility_2_1}</li>}
              {data.responsibility_2_2 && <li>{data.responsibility_2_2}</li>}
            </ul>
          )}
        </div>
      );
    }
    
    return experienceItems;
  };

  // Helper function to render skills as tags
  const renderSkills = () => {
    if (!data.skills) return null;
    
    const skillsList = data.skills.split(',').map(skill => skill.trim());
    
    return (
      <div className="flex flex-wrap gap-2">
        {skillsList.map((skill, index) => (
          <span 
            key={index} 
            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    );
  };

  // Helper function to render certifications
  const renderCertifications = () => {
    const certItems = [];
    
    if (data.certification_1 && data.issuer_1) {
      certItems.push(
        <div key="cert1" className="mb-3 last:mb-0">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-800">{data.certification_1}</h4>
              <div className="text-gray-600">{data.issuer_1}</div>
            </div>
            {data.cert_year_1 && <span className="text-sm text-gray-500 flex items-center"><FaCalendarAlt className="mr-1" />{data.cert_year_1}</span>}
          </div>
        </div>
      );
    }
    
    if (data.certification_2 && data.issuer_2) {
      certItems.push(
        <div key="cert2" className="mb-3 last:mb-0">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-semibold text-gray-800">{data.certification_2}</h4>
              <div className="text-gray-600">{data.issuer_2}</div>
            </div>
            {data.cert_year_2 && <span className="text-sm text-gray-500 flex items-center"><FaCalendarAlt className="mr-1" />{data.cert_year_2}</span>}
          </div>
        </div>
      );
    }
    
    return certItems;
  };

  // Helper function to render projects
  const renderProjects = () => {
    const projectItems = [];
    
    if (data.project_1_name) {
      projectItems.push(
        <div key="proj1" className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-800 mb-2">{data.project_1_name}</h4>
          {data.project_1_desc && <p className="text-gray-700 mb-2">{data.project_1_desc}</p>}
          {data.project_1_stack && (
            <div className="flex flex-wrap gap-1">
              {data.project_1_stack.split(',').map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-white text-gray-600 rounded text-xs border">
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    if (data.project_2_name) {
      projectItems.push(
        <div key="proj2" className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <h4 className="font-semibold text-gray-800 mb-2">{data.project_2_name}</h4>
          {data.project_2_desc && <p className="text-gray-700 mb-2">{data.project_2_desc}</p>}
          {data.project_2_stack && (
            <div className="flex flex-wrap gap-1">
              {data.project_2_stack.split(',').map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-white text-gray-600 rounded text-xs border">
                  {tech.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      );
    }
    
    return projectItems;
  };

  // Helper function to render languages
  const renderLanguages = () => {
    const languages = [data.language_1, data.language_2, data.language_3].filter(Boolean);
    
    return languages.length > 0 ? (
      <div className="flex flex-wrap gap-2">
        {languages.map((language, index) => (
          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            {language}
          </span>
        ))}
      </div>
    ) : null;
  };

  // Template selector component
  const TemplateSelector = () => (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <FaPalette className="mr-2 text-blue-600" />
          Resume Templates
        </h3>
        <div className="flex space-x-2">
          {['modern', 'minimal', 'creative'].map((template) => (
            <button
              key={template}
              onClick={() => setCurrentTemplate(template)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentTemplate === template
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {template.charAt(0).toUpperCase() + template.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Modern template
  const ModernTemplate = () => (
    <div className="bg-white shadow-xl rounded-lg overflow-hidden">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">{data.full_name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-blue-100">
            {data.email && (
              <div className="flex items-center">
                <FaEnvelope className="mr-3 text-lg" />
                <span>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex items-center">
                <FaPhone className="mr-3 text-lg" />
                <span>{data.phone}</span>
              </div>
            )}
            {data.linkedin_url && (
              <div className="flex items-center">
                <FaLinkedin className="mr-3 text-lg" />
                <a href={data.linkedin_url} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  LinkedIn Profile
                </a>
              </div>
            )}
            {data.portfolio_url && (
              <div className="flex items-center">
                <FaGlobe className="mr-3 text-lg" />
                <a href={data.portfolio_url} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  Portfolio
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {data.objective && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
                Professional Summary
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{data.objective}</p>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Experience */}
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
                  Work Experience
                </h2>
                <div className="space-y-6">
                  {renderWorkExperience()}
                </div>
              </section>

              {/* Projects */}
              {(data.project_1_name || data.project_2_name) && (
                <section>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-2 border-b-2 border-blue-600">
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {renderProjects()}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Education */}
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                  Education
                </h2>
                <div className="space-y-4">
                  {renderEducation()}
                </div>
              </section>

              {/* Skills */}
              {data.skills && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Skills
                  </h2>
                  {renderSkills()}
                </section>
              )}

              {/* Certifications */}
              {(data.certification_1 || data.certification_2) && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Certifications
                  </h2>
                  <div className="space-y-3">
                    {renderCertifications()}
                  </div>
                </section>
              )}

              {/* Languages */}
              {(data.language_1 || data.language_2 || data.language_3) && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Languages
                  </h2>
                  {renderLanguages()}
                </section>
              )}

              {/* Hobbies */}
              {data.hobbies && (
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b border-gray-300">
                    Interests
                  </h2>
                  <p className="text-gray-700">{data.hobbies}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Minimal template
  const MinimalTemplate = () => (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto">
      <div className="border-b-2 border-gray-200 pb-6 mb-8">
        <h1 className="text-3xl font-light text-gray-900 mb-2">{data.full_name}</h1>
        <div className="flex flex-wrap gap-4 text-gray-600">
          {data.email && <span className="flex items-center"><FaEnvelope className="mr-2" />{data.email}</span>}
          {data.phone && <span className="flex items-center"><FaPhone className="mr-2" />{data.phone}</span>}
          {data.linkedin_url && (
            <a href={data.linkedin_url} className="flex items-center hover:text-blue-600" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="mr-2" />LinkedIn
            </a>
          )}
          {data.portfolio_url && (
            <a href={data.portfolio_url} className="flex items-center hover:text-blue-600" target="_blank" rel="noopener noreferrer">
              <FaGlobe className="mr-2" />Portfolio
            </a>
          )}
        </div>
      </div>

      {data.objective && (
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.objective}</p>
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase tracking-wide">Experience</h2>
        <div className="space-y-6">
          {renderWorkExperience()}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <section className="mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">Education</h2>
            <div className="space-y-3">
              {renderEducation()}
            </div>
          </section>

          {data.skills && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">Skills</h2>
              {renderSkills()}
            </section>
          )}
        </div>

        <div>
          {(data.certification_1 || data.certification_2) && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">Certifications</h2>
              <div className="space-y-3">
                {renderCertifications()}
              </div>
            </section>
          )}

          {(data.language_1 || data.language_2 || data.language_3) && (
            <section className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">Languages</h2>
              {renderLanguages()}
            </section>
          )}
        </div>
      </div>

      {(data.project_1_name || data.project_2_name) && (
        <section className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase tracking-wide">Projects</h2>
          <div className="space-y-4">
            {renderProjects()}
          </div>
        </section>
      )}

      {data.hobbies && (
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3 uppercase tracking-wide">Interests</h2>
          <p className="text-gray-700">{data.hobbies}</p>
        </section>
      )}
    </div>
  );

  // Creative template
  const CreativeTemplate = () => (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 shadow-2xl rounded-2xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-700 via-blue-600 to-teal-500 text-white p-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
            {data.full_name}
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {data.email && (
              <div className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg">
                <FaEnvelope className="text-2xl mb-2" />
                <span className="text-sm">{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg">
                <FaPhone className="text-2xl mb-2" />
                <span className="text-sm">{data.phone}</span>
              </div>
            )}
            {data.linkedin_url && (
              <a href={data.linkedin_url} className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all" target="_blank" rel="noopener noreferrer">
                <FaLinkedin className="text-2xl mb-2" />
                <span className="text-sm">LinkedIn</span>
              </a>
            )}
            {data.portfolio_url && (
              <a href={data.portfolio_url} className="flex flex-col items-center p-3 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all" target="_blank" rel="noopener noreferrer">
                <FaGlobe className="text-2xl mb-2" />
                <span className="text-sm">Portfolio</span>
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          {data.objective && (
            <section className="mb-8 p-6 bg-white rounded-xl shadow-md">
              <h2 className="text-2xl font-bold text-purple-700 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mr-3"></div>
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">{data.objective}</p>
            </section>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <section className="p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full mr-3"></div>
                  Experience
                </h2>
                <div className="space-y-6">
                  {renderWorkExperience()}
                </div>
              </section>

              {(data.project_1_name || data.project_2_name) && (
                <section className="p-6 bg-white rounded-xl shadow-md">
                  <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-green-600 rounded-full mr-3"></div>
                    Projects
                  </h2>
                  <div className="space-y-4">
                    {renderProjects()}
                  </div>
                </section>
              )}
            </div>

            <div className="space-y-6">
              <section className="p-6 bg-white rounded-xl shadow-md">
                <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mr-2"></div>
                  Education
                </h2>
                <div className="space-y-4">
                  {renderEducation()}
                </div>
              </section>

              {data.skills && (
                <section className="p-6 bg-white rounded-xl shadow-md">
                  <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-2"></div>
                    Skills
                  </h2>
                  {renderSkills()}
                </section>
              )}

              {(data.certification_1 || data.certification_2) && (
                <section className="p-6 bg-white rounded-xl shadow-md">
                  <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mr-2"></div>
                    Certifications
                  </h2>
                  <div className="space-y-3">
                    {renderCertifications()}
                  </div>
                </section>
              )}

              {(data.language_1 || data.language_2 || data.language_3) && (
                <section className="p-6 bg-white rounded-xl shadow-md">
                  <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mr-2"></div>
                    Languages
                  </h2>
                  {renderLanguages()}
                </section>
              )}

              {data.hobbies && (
                <section className="p-6 bg-white rounded-xl shadow-md">
                  <h2 className="text-xl font-bold text-purple-700 mb-4 flex items-center">
                    <div className="w-6 h-6 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full mr-2"></div>
                    Interests
                  </h2>
                  <p className="text-gray-700">{data.hobbies}</p>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Convert resume to markdown
  const generateMarkdown = () => {
    let markdown = `# ${data.full_name}\n\n`;
    
    // Contact Information
    const contactInfo = [];
    if (data.email) contactInfo.push(`Email: ${data.email}`);
    if (data.phone) contactInfo.push(`Phone: ${data.phone}`);
    if (data.linkedin_url) contactInfo.push(`LinkedIn: ${data.linkedin_url}`);
    if (data.portfolio_url) contactInfo.push(`Portfolio: ${data.portfolio_url}`);
    
    markdown += contactInfo.join(' | ') + '\n\n';
    
    // Objective
    if (data.objective) {
      markdown += `## Professional Summary\n\n${data.objective}\n\n`;
    }
    
    // Education
    markdown += '## Education\n\n';
    if (data.degree_1 && data.institution_1) {
      markdown += `- **${data.degree_1}**, ${data.institution_1}${data.year_1 ? `, ${data.year_1}` : ''}${data.grade_1 ? ` - Grade: ${data.grade_1}` : ''}\n`;
    }
    if (data.degree_2 && data.institution_2) {
      markdown += `- **${data.degree_2}**, ${data.institution_2}${data.year_2 ? `, ${data.year_2}` : ''}${data.grade_2 ? ` - Grade: ${data.grade_2}` : ''}\n`;
    }
    markdown += '\n';
    
    // Work Experience
    markdown += '## Work Experience\n\n';
    if (data.company_1 && data.role_1) {
      markdown += `### ${data.role_1} | ${data.company_1}\n`;
      markdown += `${data.duration_1}${data.location_1 ? ` | ${data.location_1}` : ''}\n\n`;
      if (data.responsibility_1_1) markdown += `- ${data.responsibility_1_1}\n`;
      if (data.responsibility_1_2) markdown += `- ${data.responsibility_1_2}\n`;
      markdown += '\n';
    }
    if (data.company_2 && data.role_2) {
      markdown += `### ${data.role_2} | ${data.company_2}\n`;
      markdown += `${data.duration_2}${data.location_2 ? ` | ${data.location_2}` : ''}\n\n`;
      if (data.responsibility_2_1) markdown += `- ${data.responsibility_2_1}\n`;
      if (data.responsibility_2_2) markdown += `- ${data.responsibility_2_2}\n`;
      markdown += '\n';
    }
    
    // Skills
    if (data.skills) {
      markdown += '## Skills\n\n';
      const skillsList = data.skills.split(',').map(skill => skill.trim());
      skillsList.forEach(skill => {
        markdown += `- ${skill}\n`;
      });
      markdown += '\n';
    }
    
    // Certifications
    if (data.certification_1 || data.certification_2) {
      markdown += '## Certifications\n\n';
      if (data.certification_1 && data.issuer_1) {
        markdown += `- **${data.certification_1}** – ${data.issuer_1}${data.cert_year_1 ? `, ${data.cert_year_1}` : ''}\n`;
      }
      if (data.certification_2 && data.issuer_2) {
        markdown += `- **${data.certification_2}** – ${data.issuer_2}${data.cert_year_2 ? `, ${data.cert_year_2}` : ''}\n`;
      }
      markdown += '\n';
    }
    
    // Projects
    if (data.project_1_name || data.project_2_name) {
      markdown += '## Projects\n\n';
      if (data.project_1_name) {
        markdown += `### ${data.project_1_name}\n\n`;
        if (data.project_1_desc) markdown += `${data.project_1_desc}\n\n`;
        if (data.project_1_stack) markdown += `Tech stack: ${data.project_1_stack}\n\n`;
      }
      if (data.project_2_name) {
        markdown += `### ${data.project_2_name}\n\n`;
        if (data.project_2_desc) markdown += `${data.project_2_desc}\n\n`;
        if (data.project_2_stack) markdown += `Tech stack: ${data.project_2_stack}\n\n`;
      }
    }
    
    // Languages
    const languages = [data.language_1, data.language_2, data.language_3].filter(Boolean);
    if (languages.length > 0) {
      markdown += '## Languages\n\n';
      markdown += languages.join(', ') + '\n\n';
    }
    
    // Hobbies
    if (data.hobbies) {
      markdown += '## Interests\n\n';
      markdown += data.hobbies + '\n';
    }
    
    return markdown;
  };

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <TemplateSelector />
      
      <motion.div
        key={currentTemplate}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {currentTemplate === 'modern' && <ModernTemplate />}
        {currentTemplate === 'minimal' && <MinimalTemplate />}
        {currentTemplate === 'creative' && <CreativeTemplate />}
      </motion.div>
      
      {/* Action Buttons */}
      <div className="mt-8 flex justify-center space-x-4">
        <motion.button 
          className="flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const markdownText = generateMarkdown();
            const blob = new Blob([markdownText], { type: 'text/markdown' });
            const href = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = href;
            link.download = `${data.full_name.replace(/\s+/g, '_')}_Resume.md`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(href);
          }}
        >
          <FaDownload className="mr-2" />
          Download as Markdown
        </motion.button>
        
        <motion.button 
          className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.print()}
        >
          <FaPrint className="mr-2" />
          Print Resume
        </motion.button>
      </div>
    </div>
  );
};

export default Resume;
