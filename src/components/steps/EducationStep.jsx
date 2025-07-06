const EducationStep = ({ formData, handleChange, errors = {} }) => {
  return (
    <div>
      <p className="text-gray-600 mb-6">
        Add your educational background, starting with your most recent degree.
      </p>
      
      <div className="space-y-8">
        {/* First Education Entry */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Education #1</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree/Certificate <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="degree_1"
                value={formData.degree_1}
                onChange={handleChange}
                placeholder="Bachelor of Science in Computer Science"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="institution_1"
                value={formData.institution_1}
                onChange={handleChange}
                placeholder="University of Technology"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year of Completion
              </label>
              <input
                type="text"
                name="year_1"
                value={formData.year_1}
                onChange={handleChange}
                placeholder="2020"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade/GPA
              </label>
              <input
                type="text"
                name="grade_1"
                value={formData.grade_1}
                onChange={handleChange}
                placeholder="3.8/4.0 or First Class Honours"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Second Education Entry */}
        <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Education #2 (Optional)</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Degree/Certificate
              </label>
              <input
                type="text"
                name="degree_2"
                value={formData.degree_2}
                onChange={handleChange}
                placeholder="Master of Business Administration"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Institution
              </label>
              <input
                type="text"
                name="institution_2"
                value={formData.institution_2}
                onChange={handleChange}
                placeholder="Business School"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year of Completion
              </label>
              <input
                type="text"
                name="year_2"
                value={formData.year_2}
                onChange={handleChange}
                placeholder="2022"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Grade/GPA
              </label>
              <input
                type="text"
                name="grade_2"
                value={formData.grade_2}
                onChange={handleChange}
                placeholder="3.9/4.0 or Distinction"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        <p><span className="text-red-500">*</span> Required fields for at least one education entry</p>
      </div>
    </div>
  );
};

export default EducationStep;
