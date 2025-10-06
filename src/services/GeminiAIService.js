// Gemini AI service for resume content generation
const GEMINI_API_KEY = 'AIzaSyA6S6wK0e1xWk3nhd7_8GhfpozV2Q7BGmo';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

class GeminiAIService {
  static async generateContent(prompt, context = {}) {
    // Check if API key is available
    if (!GEMINI_API_KEY) {
      console.warn('Gemini API key not configured, using fallback content');
      return this.getFallbackContent(prompt);
    }

    try {
      console.log('Making request to:', `${GEMINI_API_URL}?key=${GEMINI_API_KEY.substring(0, 10)}...`);
      console.log('Request payload:', {
        contents: [{
          parts: [{
            text: prompt.substring(0, 100) + '...'
          }]
        }]
      });

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Gemini API Error Response:', errorText);
        
        // Try alternative model if the primary fails
        if (response.status === 404) {
          console.log('Trying alternative model...');
          return await this.tryAlternativeModel(prompt);
        }
        
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        console.warn('No content generated, using fallback');
        return this.getFallbackContent(prompt);
      }
    } catch (error) {
      console.error('Gemini AI service error:', error);
      console.warn('Using fallback content generation');
      return this.getFallbackContent(prompt);
    }
  }

  // Try alternative model endpoints
  static async tryAlternativeModel(prompt) {
    const alternativeUrls = [
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent',
      'https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent'
    ];

    for (const url of alternativeUrls) {
      try {
        console.log('Trying alternative URL:', url);
        const response = await fetch(`${url}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: prompt
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 1024,
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            console.log('Alternative model succeeded');
            return data.candidates[0].content.parts[0].text;
          }
        }
      } catch (error) {
        console.log('Alternative model failed:', error.message);
        continue;
      }
    }

    // If all alternatives fail, use fallback
    return this.getFallbackContent(prompt);
  }

  // Fallback content generation when API is unavailable
  static getFallbackContent(prompt) {
    if (prompt.includes('objective') || prompt.includes('summary')) {
      return "Dynamic and results-driven professional with proven experience in delivering high-quality solutions. Passionate about leveraging technology and innovation to drive business success and exceed organizational goals.";
    } else if (prompt.includes('skills')) {
      return "JavaScript, React, Node.js, Python, SQL, Git, Agile Development, Problem Solving, Team Collaboration, Project Management, Communication, Leadership";
    } else if (prompt.includes('experience') || prompt.includes('description')) {
      return "Contributed to key projects and initiatives that improved operational efficiency and delivered measurable business results through innovative problem-solving and collaborative teamwork.";
    } else if (prompt.includes('project')) {
      return "Developed and implemented comprehensive solution using modern technologies to address complex business requirements and enhance user experience.";
    } else {
      return "Professional content generated to enhance your resume and showcase your unique qualifications and achievements.";
    }
  }

  // Generate professional objective/summary
  static async generateObjective(personalInfo, targetRole = '', experience = '') {
    const prompt = `
Write a compelling professional objective/summary for a resume. Keep it concise (2-3 sentences, 50-80 words).

Personal Information:
- Name: ${personalInfo.full_name || 'Professional'}
- Target Role: ${targetRole || 'seeking career opportunities'}
- Years of Experience: ${experience || 'entry-level to experienced'}

Requirements:
- Professional and engaging tone
- Focus on value proposition
- Mention key skills or strengths
- Align with the target role
- No filler words or clichés

Generate only the objective text without quotes or additional formatting.
    `;

    return await this.generateContent(prompt);
  }

  // Generate skills based on role and experience
  static async generateSkills(role, experience = '', education = '') {
    const prompt = `
Generate a list of relevant professional skills for a ${role} position.

Context:
- Target Role: ${role}
- Experience Level: ${experience || 'mixed experience levels'}
- Education Background: ${education || 'various backgrounds'}

Requirements:
- Include both technical and soft skills
- Make skills relevant to the role
- Include 8-12 skills
- Mix of hard and soft skills
- Return as a comma-separated list only

Generate only the skills list without any additional text or formatting.
    `;

    const response = await this.generateContent(prompt);
    return response.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);
  }

  // Improve work experience descriptions
  static async improveExperienceDescription(role, company, currentDescription = '') {
    const prompt = `
Improve this work experience description for a resume. Make it more impactful and professional.

Position: ${role}
Company: ${company}
Current Description: ${currentDescription || 'No description provided'}

Requirements:
- Use action verbs and quantifiable achievements
- Keep it concise (2-3 bullet points)
- Focus on accomplishments, not just duties
- Use professional language
- Make it ATS-friendly

Generate only the improved description without bullet points or additional formatting.
    `;

    return await this.generateContent(prompt);
  }

  // Generate project descriptions
  static async generateProjectDescription(projectName, technologies = '', role = '') {
    const prompt = `
Write a compelling project description for a resume.

Project: ${projectName}
Technologies Used: ${technologies || 'various technologies'}
Your Role: ${role || 'developer/contributor'}

Requirements:
- 2-3 sentences maximum
- Focus on impact and achievements
- Mention key technologies used
- Professional tone
- Quantify results if possible

Generate only the project description without additional formatting.
    `;

    return await this.generateContent(prompt);
  }

  // Generate cover letter content
  static async generateCoverLetter(personalInfo, targetCompany, targetRole, keySkills = []) {
    const prompt = `
Write a professional cover letter for a job application.

Applicant: ${personalInfo.full_name || 'Applicant'}
Target Company: ${targetCompany}
Target Position: ${targetRole}
Key Skills: ${keySkills.join(', ') || 'various professional skills'}

Requirements:
- Professional business letter format
- 3-4 paragraphs
- Compelling opening
- Highlight relevant skills and experience
- Strong closing with call to action
- Personalized to the company and role

Generate the full cover letter content.
    `;

    return await this.generateContent(prompt);
  }

  // Suggest resume improvements
  static async suggestImprovements(resumeData) {
    const prompt = `
Analyze this resume data and suggest 3-5 specific improvements:

Resume Data:
- Name: ${resumeData.full_name || 'Not provided'}
- Objective: ${resumeData.objective || 'Not provided'}
- Skills: ${resumeData.skills?.join(', ') || 'Not provided'}
- Experience: ${resumeData.experience || 'Not provided'}

Requirements:
- Provide specific, actionable suggestions
- Focus on content, keywords, and structure
- Make suggestions ATS-friendly
- Keep suggestions concise
- Number each suggestion (1, 2, 3, etc.)

Generate only the numbered improvement suggestions.
    `;

    return await this.generateContent(prompt);
  }
}

export default GeminiAIService;
