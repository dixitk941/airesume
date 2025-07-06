# AI Resume Builder

A modern, iOS-inspired resume builder web application with LinkedIn AutoFill integration. Create professional resumes with a beautiful, mobile-first design featuring multi-step forms and real-time validation.

## Features

- **Modern UI Design**: Inspired by iOS 17+ and One UI 7 with clean, intuitive interface
- **Multi-Step Form**: Progressive form with sidebar navigation (desktop) and mobile-friendly header
- **LinkedIn AutoFill**: Automatically populate form fields from LinkedIn profile
- **Real-time Validation**: Form validation with inline error messages
- **Mobile-First**: Responsive design optimized for all devices
- **Skills Management**: Interactive skill pills with easy add/remove functionality
- **Professional Templates**: Clean, ATS-friendly resume layouts

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- A LinkedIn Developer account (for production LinkedIn AutoFill)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd airesume
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## LinkedIn AutoFill Setup

### For Development
The application includes demo data for testing LinkedIn AutoFill functionality during development.

### For Production
To enable LinkedIn AutoFill in production:

1. **Domain Allowlisting**: Contact your LinkedIn representative to get your domain allowlisted for LinkedIn AutoFill
2. **LinkedIn Developer Account**: Ensure you have a LinkedIn Developer account with appropriate permissions
3. **HTTPS Required**: LinkedIn AutoFill only works on HTTPS domains in production

The LinkedIn AutoFill Plugin is already integrated and will automatically work once your domain is allowlisted.

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready for deployment.

## Technology Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **LinkedIn AutoFill Plugin** - Official LinkedIn integration

## Project Structure

```
src/
├── components/
│   ├── steps/              # Form step components
│   │   ├── PersonalInfoStep.jsx
│   │   ├── ObjectiveStep.jsx
│   │   ├── SkillsStep.jsx
│   │   ├── EducationStep.jsx
│   │   ├── ExperienceStep.jsx
│   │   ├── ProjectsCertificationsStep.jsx
│   │   └── FinalDetailsStep.jsx
│   └── MultiStepForm.jsx   # Main form component
├── App.jsx                 # Main app component
├── main.jsx               # App entry point
└── index.css              # Global styles
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
