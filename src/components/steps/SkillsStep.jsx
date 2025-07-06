import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaPlus, FaCode, FaUsers, FaLightbulb, FaBriefcase } from 'react-icons/fa';

const SkillsStep = ({ formData, handleChange, errors = {} }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [skillInput, setSkillInput] = useState('');
  const [skillsList, setSkillsList] = useState(
    formData.skills ? formData.skills.split(',').map(skill => skill.trim()).filter(Boolean) : []
  );
  
  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const handleSkillInputChange = (e) => {
    setSkillInput(e.target.value);
  };
  
  const addSkill = () => {
    if (skillInput.trim()) {
      const newSkills = [...skillsList, skillInput.trim()];
      setSkillsList(newSkills);
      updateFormSkills(newSkills);
      setSkillInput('');
    }
  };
  
  const removeSkill = (index) => {
    const newSkills = skillsList.filter((_, i) => i !== index);
    setSkillsList(newSkills);
    updateFormSkills(newSkills);
  };
  
  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    } else if (e.key === ',' && skillInput.trim()) {
      e.preventDefault();
      addSkill();
    }
  };
  
  const updateFormSkills = (skills) => {
    handleChange({
      target: {
        name: 'skills',
        value: skills.join(', ')
      }
    });
  };
  
  const skillCategories = [
    {
      title: 'Technical Skills',
      icon: <FaCode />,
      color: 'var(--ios-blue)',
      examples: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Docker']
    },
    {
      title: 'Soft Skills',
      icon: <FaUsers />,
      color: 'var(--ios-purple)',
      examples: ['Communication', 'Leadership', 'Problem-Solving', 'Teamwork', 'Adaptability']
    },
    {
      title: 'Domain Skills',
      icon: <FaLightbulb />,
      color: 'var(--ios-orange)',
      examples: ['UX/UI Design', 'Data Analysis', 'SEO', 'Digital Marketing', 'AI/ML']
    },
    {
      title: 'Management Skills',
      icon: <FaBriefcase />,
      color: 'var(--ios-green)',
      examples: ['Project Management', 'Agile/Scrum', 'Team Leadership', 'Strategic Planning']
    }
  ];
  
  return (
    <div className="py-2">
      <motion.p 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="text-[var(--color-text-secondary)] mb-8"
      >
        List your skills relevant to the job you're applying for. Press Enter or comma after each skill.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className={`input-float-container ${focusedField === 'skills' ? 'focus-highlight' : ''} ${errors.skills ? 'error-highlight' : ''}`}>
          <div className="relative">
            <input
              type="text"
              id="skills-input"
              value={skillInput}
              onChange={handleSkillInputChange}
              onKeyPress={handleInputKeyPress}
              onFocus={() => handleFocus('skills')}
              onBlur={handleBlur}
              className={`input-float pr-10 ${errors.skills ? 'error' : ''}`}
              placeholder=" "
            />
            <label htmlFor="skills-input" className="input-float-label">
              Add a Skill <span className="text-[var(--ios-red)]">*</span>
            </label>
            <button 
              type="button"
              onClick={addSkill}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[var(--color-primary)] p-2"
              disabled={!skillInput.trim()}
            >
              <FaPlus size={16} />
            </button>
          </div>
          {errors.skills && (
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-1 text-xs text-[var(--ios-red)]"
            >
              {errors.skills}
            </motion.p>
          )}
        </div>
        
        {/* Skills Pills */}
        <div className="tag-pill-container mt-4 mb-8">
          {skillsList.length > 0 ? (
            skillsList.map((skill, index) => (
              <motion.div
                key={`${skill}-${index}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="tag-pill"
              >
                {skill}
                <span 
                  className="close-icon ml-2 cursor-pointer" 
                  onClick={() => removeSkill(index)}
                >
                  <FaTimes size={10} />
                </span>
              </motion.div>
            ))
          ) : (
            <p className="text-sm text-[var(--color-text-secondary)] italic">No skills added yet. Add your first skill above.</p>
          )}
        </div>
      </motion.div>
      
      {/* Skills Categories */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-6 card-float p-5"
      >
        <h3 className="text-[var(--font-headline)] font-semibold text-[var(--color-text)] mb-4">
          Popular Skills by Category
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
              className="rounded-xl border border-[var(--color-border)] bg-white p-4 ios-hover"
            >
              <div className="flex items-center mb-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center mr-3" 
                  style={{ backgroundColor: `${category.color}20`, color: category.color }}
                >
                  {category.icon}
                </div>
                <h4 className="font-semibold">{category.title}</h4>
              </div>
              
              <div className="tag-pill-container">
                {category.examples.map((example, i) => (
                  <div 
                    key={i}
                    className="tag-pill cursor-pointer opacity-80 hover:opacity-100"
                    style={{ backgroundColor: `${category.color}15`, color: category.color }}
                    onClick={() => {
                      if (!skillsList.includes(example)) {
                        const newSkills = [...skillsList, example];
                        setSkillsList(newSkills);
                        updateFormSkills(newSkills);
                      }
                    }}
                  >
                    {example}
                    <FaPlus size={8} className="ml-1" />
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.8 }}
        className="mt-8 p-4 rounded-xl bg-gradient-to-r from-[rgba(0,122,255,0.05)] to-[rgba(88,86,214,0.05)] border border-[rgba(0,122,255,0.1)]"
      >
        <h3 className="text-sm font-medium text-[var(--ios-blue)] mb-2">Tips for an Effective Skills Section</h3>
        <ul className="list-disc pl-5 text-sm text-[var(--ios-blue)] opacity-80 space-y-1">
          <li>Prioritize skills mentioned in the job description</li>
          <li>Include both technical and soft skills</li>
          <li>Be specific about technologies and tools you know</li>
          <li>Consider arranging skills by proficiency level</li>
          <li>Keep skills relevant to the position you're applying for</li>
        </ul>
      </motion.div>
    </div>
  );
};

export default SkillsStep;
