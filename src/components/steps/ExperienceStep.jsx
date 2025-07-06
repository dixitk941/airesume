const ExperienceStep = ({ formData, handleChange, errors = {} }) => {
  return (
    <div>
      <p className="text-gray-600 mb-6">
        Add your work experience, starting with your most recent position. Focus on achievements and responsibilities relevant to your target role.
      </p>
      
      <div className="space-y-8">
        {/* First Experience Entry */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Experience #1</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="company_1"
                value={formData.company_1}
                onChange={handleChange}
                placeholder="Tech Solutions Inc."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="role_1"
                value={formData.role_1}
                onChange={handleChange}
                placeholder="Senior Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="duration_1"
                value={formData.duration_1}
                onChange={handleChange}
                placeholder="Jan 2020 - Present"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location_1"
                value={formData.location_1}
                onChange={handleChange}
                placeholder="San Francisco, CA (Remote)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Responsibility/Achievement #1 <span className="text-red-500">*</span>
              </label>
              <textarea
                name="responsibility_1_1"
                value={formData.responsibility_1_1}
                onChange={handleChange}
                placeholder="Led a team of 5 developers to redesign the company's flagship product, resulting in a 40% increase in user engagement."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Responsibility/Achievement #2
              </label>
              <textarea
                name="responsibility_1_2"
                value={formData.responsibility_1_2}
                onChange={handleChange}
                placeholder="Optimized database queries, reducing server load by 30% and improving application response time by 25%."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
        
        {/* Second Experience Entry */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Experience #2 (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="company_2"
                value={formData.company_2}
                onChange={handleChange}
                placeholder="Innovative Startups LLC"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Job Title
              </label>
              <input
                type="text"
                name="role_2"
                value={formData.role_2}
                onChange={handleChange}
                placeholder="Software Developer"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <input
                type="text"
                name="duration_2"
                value={formData.duration_2}
                onChange={handleChange}
                placeholder="Jun 2017 - Dec 2019"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location_2"
                value={formData.location_2}
                onChange={handleChange}
                placeholder="Boston, MA"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Responsibility/Achievement #1
              </label>
              <textarea
                name="responsibility_2_1"
                value={formData.responsibility_2_1}
                onChange={handleChange}
                placeholder="Developed and maintained RESTful APIs that processed over 1 million requests daily."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Key Responsibility/Achievement #2
              </label>
              <textarea
                name="responsibility_2_2"
                value={formData.responsibility_2_2}
                onChange={handleChange}
                placeholder="Implemented automated testing which reduced bug reports by 45% within 3 months."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="2"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-sm font-medium text-blue-800 mb-2">Tips for Impactful Experience Descriptions</h3>
        <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
          <li>Start with strong action verbs (Led, Developed, Implemented, etc.)</li>
          <li>Include quantifiable achievements with metrics (%, $, time saved)</li>
          <li>Focus on results and impact, not just duties</li>
          <li>Keep descriptions concise and relevant to your target role</li>
          <li>Use present tense for current jobs and past tense for previous positions</li>
        </ul>
      </div>
    </div>
  );
};

export default ExperienceStep;
