const FinalDetailsStep = ({ formData, handleChange, errors = {} }) => {
  return (
    <div>
      <p className="text-gray-600 mb-6">
        Add the finishing touches to your resume with additional information that showcases your well-rounded profile.
      </p>
      
      <div className="space-y-8">
        {/* Languages Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Languages</h3>
          <p className="text-sm text-gray-600 mb-4">List languages you can communicate in and your proficiency level.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language #1
              </label>
              <input
                type="text"
                name="language_1"
                value={formData.language_1}
                onChange={handleChange}
                placeholder="English (Native)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language #2
              </label>
              <input
                type="text"
                name="language_2"
                value={formData.language_2}
                onChange={handleChange}
                placeholder="Spanish (Fluent)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language #3
              </label>
              <input
                type="text"
                name="language_3"
                value={formData.language_3}
                onChange={handleChange}
                placeholder="French (Basic)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
        
        {/* Hobbies Section */}
        <div>
          <h3 className="text-lg font-medium text-gray-800 mb-4">Hobbies & Interests (Optional)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Share activities that demonstrate relevant skills or unique aspects of your personality.
          </p>
          
          <div className="form-group">
            <textarea
              name="hobbies"
              value={formData.hobbies}
              onChange={handleChange}
              placeholder="Photography, hiking, competitive chess, volunteering at local code clubs"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            ></textarea>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-5 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-md font-medium text-blue-800 mb-3">Final Resume Tips</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-blue-700">Keep it Concise</h4>
            <p className="text-sm text-blue-600">Aim for a 1-2 page resume that highlights your most relevant experiences.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-700">Tailor to Each Job</h4>
            <p className="text-sm text-blue-600">Customize your resume for each application, emphasizing relevant skills and experiences.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-700">Use Action Verbs</h4>
            <p className="text-sm text-blue-600">Start bullet points with powerful action verbs that showcase your contributions.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-700">Quantify Achievements</h4>
            <p className="text-sm text-blue-600">Include numbers and percentages to demonstrate your impact whenever possible.</p>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-700">Proofread Carefully</h4>
            <p className="text-sm text-blue-600">Check for spelling, grammar, and formatting errors before finalizing your resume.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalDetailsStep;
