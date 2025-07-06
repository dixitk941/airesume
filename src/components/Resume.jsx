import React from 'react';

const Resume = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return null;
  }

  // Helper function to render education items
  const renderEducation = () => {
    const educationItems = [];
    
    if (data.degree_1 && data.institution_1) {
      educationItems.push(
        <li key="edu1" className="mb-3">
          <div className="font-medium">{data.degree_1}</div>
          <div>{data.institution_1}{data.year_1 ? `, ${data.year_1}` : ''}</div>
          {data.grade_1 && <div>Grade: {data.grade_1}</div>}
        </li>
      );
    }
    
    if (data.degree_2 && data.institution_2) {
      educationItems.push(
        <li key="edu2" className="mb-3">
          <div className="font-medium">{data.degree_2}</div>
          <div>{data.institution_2}{data.year_2 ? `, ${data.year_2}` : ''}</div>
          {data.grade_2 && <div>Grade: {data.grade_2}</div>}
        </li>
      );
    }
    
    return educationItems.length > 0 ? (
      <ul className="list-disc pl-5">{educationItems}</ul>
    ) : null;
  };

  // Helper function to render work experience
  const renderWorkExperience = () => {
    const experienceItems = [];
    
    if (data.company_1 && data.role_1) {
      experienceItems.push(
        <li key="exp1" className="mb-4">
          <div className="font-medium">{data.role_1} | {data.company_1}</div>
          <div className="text-sm text-gray-600 mb-1">
            {data.duration_1}{data.location_1 ? ` | ${data.location_1}` : ''}
          </div>
          <ul className="list-disc pl-5">
            {data.responsibility_1_1 && <li>{data.responsibility_1_1}</li>}
            {data.responsibility_1_2 && <li>{data.responsibility_1_2}</li>}
          </ul>
        </li>
      );
    }
    
    if (data.company_2 && data.role_2) {
      experienceItems.push(
        <li key="exp2" className="mb-4">
          <div className="font-medium">{data.role_2} | {data.company_2}</div>
          <div className="text-sm text-gray-600 mb-1">
            {data.duration_2}{data.location_2 ? ` | ${data.location_2}` : ''}
          </div>
          <ul className="list-disc pl-5">
            {data.responsibility_2_1 && <li>{data.responsibility_2_1}</li>}
            {data.responsibility_2_2 && <li>{data.responsibility_2_2}</li>}
          </ul>
        </li>
      );
    }
    
    return experienceItems.length > 0 ? (
      <ul className="list-none">{experienceItems}</ul>
    ) : null;
  };

  // Helper function to render skills
  const renderSkills = () => {
    if (!data.skills) return null;
    
    const skillsList = data.skills.split(',').map(skill => skill.trim());
    
    return (
      <ul className="list-disc pl-5">
        {skillsList.map((skill, index) => (
          <li key={index} className="mb-1">{skill}</li>
        ))}
      </ul>
    );
  };

  // Helper function to render certifications
  const renderCertifications = () => {
    const certItems = [];
    
    if (data.certification_1 && data.issuer_1) {
      certItems.push(
        <li key="cert1" className="mb-2">
          <div>
            <span className="font-medium">{data.certification_1}</span> – {data.issuer_1}
            {data.cert_year_1 ? `, ${data.cert_year_1}` : ''}
          </div>
        </li>
      );
    }
    
    if (data.certification_2 && data.issuer_2) {
      certItems.push(
        <li key="cert2" className="mb-2">
          <div>
            <span className="font-medium">{data.certification_2}</span> – {data.issuer_2}
            {data.cert_year_2 ? `, ${data.cert_year_2}` : ''}
          </div>
        </li>
      );
    }
    
    return certItems.length > 0 ? (
      <ul className="list-disc pl-5">{certItems}</ul>
    ) : null;
  };

  // Helper function to render projects
  const renderProjects = () => {
    const projectItems = [];
    
    if (data.project_1_name) {
      projectItems.push(
        <li key="proj1" className="mb-3">
          <div className="font-medium">{data.project_1_name}</div>
          {data.project_1_desc && <div className="mb-1">{data.project_1_desc}</div>}
          {data.project_1_stack && (
            <div className="text-sm"><strong>Tech stack:</strong> {data.project_1_stack}</div>
          )}
        </li>
      );
    }
    
    if (data.project_2_name) {
      projectItems.push(
        <li key="proj2" className="mb-3">
          <div className="font-medium">{data.project_2_name}</div>
          {data.project_2_desc && <div className="mb-1">{data.project_2_desc}</div>}
          {data.project_2_stack && (
            <div className="text-sm"><strong>Tech stack:</strong> {data.project_2_stack}</div>
          )}
        </li>
      );
    }
    
    return projectItems.length > 0 ? (
      <ul className="list-disc pl-5">{projectItems}</ul>
    ) : null;
  };

  // Helper function to render languages
  const renderLanguages = () => {
    const languages = [data.language_1, data.language_2, data.language_3].filter(Boolean);
    
    return languages.length > 0 ? (
      <div>{languages.join(', ')}</div>
    ) : null;
  };

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
      markdown += `## Objective\n\n${data.objective}\n\n`;
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
      markdown += '## Hobbies\n\n';
      markdown += data.hobbies + '\n';
    }
    
    return markdown;
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl mx-auto my-8">
      <div className="resume-preview">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">{data.full_name}</h1>
            <div className="text-gray-600 mt-1">
              {data.email && <span className="mr-3">{data.email}</span>}
              {data.phone && <span className="mr-3">{data.phone}</span>}
            </div>
            <div className="text-gray-600">
              {data.linkedin_url && (
                <span className="mr-3">
                  <a href={data.linkedin_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </span>
              )}
              {data.portfolio_url && (
                <span>
                  <a href={data.portfolio_url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                    Portfolio
                  </a>
                </span>
              )}
            </div>
          </div>
        </div>

        {data.objective && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Objective
            </h2>
            <p>{data.objective}</p>
          </div>
        )}

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
            Education
          </h2>
          {renderEducation()}
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
            Work Experience
          </h2>
          {renderWorkExperience()}
        </div>

        {data.skills && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Skills
            </h2>
            {renderSkills()}
          </div>
        )}

        {(data.certification_1 || data.certification_2) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Certifications
            </h2>
            {renderCertifications()}
          </div>
        )}

        {(data.project_1_name || data.project_2_name) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Projects
            </h2>
            {renderProjects()}
          </div>
        )}

        {(data.language_1 || data.language_2 || data.language_3) && (
          <div className="mb-6">
            <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Languages
            </h2>
            {renderLanguages()}
          </div>
        )}

        {data.hobbies && (
          <div>
            <h2 className="text-xl font-bold text-gray-700 border-b border-gray-300 pb-1 mb-3">
              Hobbies
            </h2>
            <p>{data.hobbies}</p>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-center space-x-4">
        <button 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
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
          Download as Markdown
        </button>
        <button 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => window.print()}
        >
          Print Resume
        </button>
      </div>
    </div>
  );
};

export default Resume;
