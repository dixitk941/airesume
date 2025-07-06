// Gemini AI service for resume content generation
const GEMINI_API_KEY = 'AIzaSyARdoeSSu7JuVwvBRzy-ORO8hm5PW4-0lU';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

class GeminiAIService {
  static async generateContent(prompt, context = {}) {
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
            topK: 1,
            topP: 1,
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
        throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('No content generated');
      }
    } catch (error) {
      console.error('Gemini AI service error:', error);
      throw error;
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
