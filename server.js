const express = require('express');
const cors = require('cors');
const puppeteer = require('puppeteer');
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// LinkedIn profile scraper
async function scrapeLinkedInProfile(profileUrl) {
  console.log(`Attempting to scrape: ${profileUrl}`);
  
  // Validate LinkedIn URL
  if (!profileUrl.includes('linkedin.com/in/')) {
    throw new Error('Invalid LinkedIn profile URL');
  }
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  try {
    const page = await browser.newPage();
    
    // Set user agent to avoid detection
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to LinkedIn profile
    await page.goto(profileUrl, { waitUntil: 'networkidle2' });
    
    // Check if we need to login
    const isLoginPage = await page.evaluate(() => {
      return window.location.href.includes('linkedin.com/login');
    });
    
    if (isLoginPage) {
      console.log('LinkedIn login required. Public data extraction only.');
      
      // Extract public information without logging in
      const publicProfile = await page.evaluate(() => {
        const nameElement = document.querySelector('.top-card-layout__title');
        const headlineElement = document.querySelector('.top-card-layout__headline');
        
        return {
          name: nameElement ? nameElement.innerText : 'Not available',
          headline: headlineElement ? headlineElement.innerText : 'Not available',
          isPublicOnly: true
        };
      });
      
      await browser.close();
      return publicProfile;
    }
    
    // Extract full profile data
    const profileData = await page.evaluate(() => {
      // Extract name and headline
      const name = document.querySelector('h1.text-heading-xlarge') ? 
        document.querySelector('h1.text-heading-xlarge').innerText : '';
      const headline = document.querySelector('.text-body-medium') ? 
        document.querySelector('.text-body-medium').innerText : '';
      
      // Extract contact info
      const contactInfo = {};
      const contactSection = document.querySelector('.pv-contact-info');
      if (contactSection) {
        const emailElement = contactSection.querySelector('.ci-email .pv-contact-info__contact-item');
        if (emailElement) {
          contactInfo.email = emailElement.innerText.trim();
        }
        
        const phoneElement = contactSection.querySelector('.ci-phone .pv-contact-info__contact-item');
        if (phoneElement) {
          contactInfo.phone = phoneElement.innerText.trim();
        }
      }
      
      // Extract about/summary
      const aboutElement = document.getElementById('about')?.parentElement?.querySelector('.pv-shared-text-with-see-more');
      const summary = aboutElement ? aboutElement.innerText : '';
      
      // Extract experience
      const experiences = [];
      const experienceSection = document.getElementById('experience');
      if (experienceSection) {
        const experienceItems = experienceSection.querySelectorAll('.pv-entity__position-group-pager, .pv-profile-section__list-item');
        experienceItems.forEach(item => {
          const titleElement = item.querySelector('.pv-entity__summary-info h3, .t-16.t-black.t-bold');
          const companyElement = item.querySelector('.pv-entity__secondary-title, .pv-entity__company-summary-info h3');
          const dateRangeElement = item.querySelector('.pv-entity__date-range span:nth-child(2)');
          const descriptionElement = item.querySelector('.pv-entity__description');
          
          if (titleElement) {
            experiences.push({
              title: titleElement.innerText.trim(),
              company: companyElement ? companyElement.innerText.trim() : '',
              dateRange: dateRangeElement ? dateRangeElement.innerText.trim() : '',
              description: descriptionElement ? descriptionElement.innerText.trim() : ''
            });
          }
        });
      }
      
      // Extract education
      const education = [];
      const educationSection = document.getElementById('education');
      if (educationSection) {
        const educationItems = educationSection.querySelectorAll('.pv-profile-section__list-item');
        educationItems.forEach(item => {
          const schoolElement = item.querySelector('.pv-entity__school-name');
          const degreeElement = item.querySelector('.pv-entity__degree-name .pv-entity__comma-item');
          const fieldElement = item.querySelector('.pv-entity__fos .pv-entity__comma-item');
          const dateElement = item.querySelector('.pv-entity__dates span:nth-child(2)');
          
          if (schoolElement) {
            education.push({
              school: schoolElement.innerText.trim(),
              degree: degreeElement ? degreeElement.innerText.trim() : '',
              field: fieldElement ? fieldElement.innerText.trim() : '',
              date: dateElement ? dateElement.innerText.trim() : ''
            });
          }
        });
      }
      
      // Extract skills
      const skills = [];
      const skillsSection = document.getElementById('skills');
      if (skillsSection) {
        const skillItems = skillsSection.querySelectorAll('.pv-skill-category-entity__name-text');
        skillItems.forEach(item => {
          skills.push(item.innerText.trim());
        });
      }
      
      return {
        name,
        headline,
        contactInfo,
        summary,
        experiences,
        education,
        skills
      };
    });
    
    await browser.close();
    return profileData;
    
  } catch (error) {
    console.error('Error scraping LinkedIn profile:', error);
    await browser.close();
    throw error;
  }
}

// API endpoint to scrape LinkedIn profile
app.post('/api/linkedin-scrape', async (req, res) => {
  try {
    const { profileUrl } = req.body;
    
    if (!profileUrl) {
      return res.status(400).json({ error: 'Profile URL is required' });
    }
    
    const profileData = await scrapeLinkedInProfile(profileUrl);
    
    // Transform the data into the format expected by the frontend
    const transformedData = {
      firstName: profileData.name?.split(' ')[0] || '',
      lastName: profileData.name?.split(' ').slice(1).join(' ') || '',
      emailAddress: profileData.contactInfo?.email || '',
      phoneNumbers: profileData.contactInfo?.phone ? [{ phoneNumber: profileData.contactInfo.phone }] : [],
      publicProfileUrl: profileUrl,
      headline: profileData.headline || '',
      summary: profileData.summary || '',
      positions: profileData.experiences?.map(exp => ({
        title: exp.title,
        companyName: exp.company,
        startDate: { year: exp.dateRange?.split(' - ')[0] || '' },
        endDate: { year: exp.dateRange?.split(' - ')[1] || 'Present' },
        summary: exp.description
      })) || [],
      educations: profileData.education?.map(edu => ({
        degree: edu.degree,
        fieldOfStudy: edu.field,
        schoolName: edu.school,
        endDate: { year: edu.date?.split(' - ')[1] || '' }
      })) || [],
      skills: profileData.skills?.map(skill => ({ name: skill })) || []
    };
    
    res.json(transformedData);
  } catch (error) {
    console.error('Error in LinkedIn scrape endpoint:', error);
    res.status(500).json({ error: error.message || 'Failed to scrape LinkedIn profile' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`LinkedIn scraper proxy server running on port ${port}`);
});
