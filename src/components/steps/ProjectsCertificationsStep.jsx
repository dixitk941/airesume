const ProjectsCertificationsStep = ({ formData, handleChange, errors = {} }) => {
  return (
    <div>
      <p className="text-gray-600 mb-6">
        Add details about your projects and certifications to showcase your practical skills and specialized knowledge.
      </p>
      
      <div className="space-y-8">
        {/* Projects Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Projects</h3>
          
          {/* Project 1 */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5">
            <h4 className="text-md font-medium text-gray-800 mb-3">Project #1</h4>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="project_1_name"
                  value={formData.project_1_name}
                  onChange={handleChange}
                  placeholder="E-commerce Platform"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  name="project_1_desc"
                  value={formData.project_1_desc}
                  onChange={handleChange}
                  placeholder="Developed a full-stack e-commerce platform with user authentication, product catalog, and payment processing."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <input
                  type="text"
                  name="project_1_stack"
                  value={formData.project_1_stack}
                  onChange={handleChange}
                  placeholder="React, Node.js, MongoDB, Stripe API"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Project 2 */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h4 className="text-md font-medium text-gray-800 mb-3">Project #2 (Optional)</h4>
            
            <div className="space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Name
                </label>
                <input
                  type="text"
                  name="project_2_name"
                  value={formData.project_2_name}
                  onChange={handleChange}
                  placeholder="Task Management App"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Description
                </label>
                <textarea
                  name="project_2_desc"
                  value={formData.project_2_desc}
                  onChange={handleChange}
                  placeholder="Created a collaborative task management application with real-time updates and team workspaces."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="2"
                ></textarea>
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Technologies Used
                </label>
                <input
                  type="text"
                  name="project_2_stack"
                  value={formData.project_2_stack}
                  onChange={handleChange}
                  placeholder="Vue.js, Firebase, Tailwind CSS"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Certifications Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Certifications</h3>
          
          {/* Certification 1 */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200 mb-5">
            <h4 className="text-md font-medium text-gray-800 mb-3">Certification #1</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  name="certification_1"
                  value={formData.certification_1}
                  onChange={handleChange}
                  placeholder="AWS Certified Solutions Architect"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="cert_year_1"
                  value={formData.cert_year_1}
                  onChange={handleChange}
                  placeholder="2022"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="form-group md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  name="issuer_1"
                  value={formData.issuer_1}
                  onChange={handleChange}
                  placeholder="Amazon Web Services"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          {/* Certification 2 */}
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h4 className="text-md font-medium text-gray-800 mb-3">Certification #2 (Optional)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-group md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Certification Name
                </label>
                <input
                  type="text"
                  name="certification_2"
                  value={formData.certification_2}
                  onChange={handleChange}
                  placeholder="Professional Scrum Master (PSM I)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="form-group">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Year
                </label>
                <input
                  type="text"
                  name="cert_year_2"
                  value={formData.cert_year_2}
                  onChange={handleChange}
                  placeholder="2021"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="form-group md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Issuing Organization
                </label>
                <input
                  type="text"
                  name="issuer_2"
                  value={formData.issuer_2}
                  onChange={handleChange}
                  placeholder="Scrum.org"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCertificationsStep;
