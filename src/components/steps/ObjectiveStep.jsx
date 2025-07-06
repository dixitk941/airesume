const ObjectiveStep = ({ formData, handleChange, errors = {} }) => {
  return (
    <div>
      <p className="text-[var(--color-text-secondary)] mb-6">
        Your career objective gives employers a quick overview of your goals and expertise. 
        Make it concise and impactful (2-3 sentences).
      </p>
      
      <div className="space-y-4">
        <div className="form-group">
          <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
            Career Objective <span className="text-[var(--ios-red)]">*</span>
          </label>
          <textarea
            name="objective"
            value={formData.objective}
            onChange={handleChange}
            placeholder="Experienced software developer with 5+ years of expertise in building scalable web applications. Seeking a senior developer role where I can leverage my skills in React and Node.js to deliver high-quality solutions."
            className={`input-ios ${errors.objective ? 'border-[var(--ios-red)] bg-red-50' : ''}`}
            rows="5"
            required
          ></textarea>
          {errors.objective && (
            <p className="mt-1 text-xs text-[var(--ios-red)]">{errors.objective}</p>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-[rgba(0,122,255,0.05)] rounded-xl border border-[rgba(0,122,255,0.1)]">
        <h3 className="text-sm font-medium text-[var(--ios-blue)] mb-2">Tips for a Strong Objective</h3>
        <ul className="list-disc pl-5 text-sm text-[var(--ios-blue)] opacity-80 space-y-1">
          <li>Tailor it to the specific role you're applying for</li>
          <li>Include your years of experience and key areas of expertise</li>
          <li>Mention 2-3 of your most relevant skills</li>
          <li>Clearly state what you're looking for in your next role</li>
          <li>Keep it under 3 sentences for maximum impact</li>
        </ul>
      </div>
    </div>
  );
};

export default ObjectiveStep;
