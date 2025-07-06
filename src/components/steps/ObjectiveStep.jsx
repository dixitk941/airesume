import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaRobot, FaSpinner, FaMagic, FaLightbulb } from 'react-icons/fa';
import GeminiAIService from '../../services/GeminiAIService';

const ObjectiveStep = ({ formData, handleChange, errors = {} }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [targetRole, setTargetRole] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');

  const handleGenerateObjective = async () => {
    if (!targetRole.trim()) {
      alert('Please enter your target role first');
      return;
    }

    setIsGenerating(true);
    try {
      const personalInfo = {
        full_name: formData.full_name || 'Professional'
      };
      
      const generatedObjective = await GeminiAIService.generateObjective(
        personalInfo,
        targetRole,
        experienceLevel
      );

      // Update the objective field
      const syntheticEvent = {
        target: {
          name: 'objective',
          value: generatedObjective
        }
      };
      handleChange(syntheticEvent);

    } catch (error) {
      console.error('Failed to generate objective:', error);
      alert('Failed to generate objective. Please try again or write it manually.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-[var(--color-text-secondary)] mb-6"
      >
        Your career objective gives employers a quick overview of your goals and expertise. 
        Make it concise and impactful (2-3 sentences).
      </motion.p>

      {/* AI Assistant Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="mb-6 p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-xl"
      >
        <h3 className="text-sm font-medium text-purple-700 mb-3 flex items-center">
          <FaRobot className="mr-2" />
          AI Assistant - Generate Your Objective
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Target Role *
            </label>
            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g., Frontend Developer, Marketing Manager"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Select experience</option>
              <option value="Entry-level (0-2 years)">Entry-level (0-2 years)</option>
              <option value="Mid-level (2-5 years)">Mid-level (2-5 years)</option>
              <option value="Senior-level (5-10 years)">Senior-level (5-10 years)</option>
              <option value="Executive-level (10+ years)">Executive-level (10+ years)</option>
            </select>
          </div>
        </div>

        <button
          type="button"
          onClick={handleGenerateObjective}
          disabled={isGenerating || !targetRole.trim()}
          className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isGenerating ? (
            <>
              <FaSpinner className="animate-spin mr-2" />
              Generating...
            </>
          ) : (
            <>
              <FaMagic className="mr-2" />
              Generate Objective with AI
            </>
          )}
        </button>
      </motion.div>
      
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
