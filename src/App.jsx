import { useState } from 'react'
import './App.css'
import LandingPage from './components/landing/LandingPage'
import MultiStepForm from './components/MultiStepForm'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft } from 'react-icons/fa'

function App() {
  const [currentView, setCurrentView] = useState('landing') // 'landing', 'form'

  const startResumeBuilder = () => {
    setCurrentView('form')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToLanding = () => {
    setCurrentView('landing')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // iOS 17-style header animation variants
  const headerVariants = {
    landing: { 
      boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.4)"
    },
    form: { 
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.6)"
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <motion.header 
        className="glass fixed top-0 w-full z-10"
        variants={headerVariants}
        animate={currentView}
        transition={{ duration: 0.2 }}
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            {currentView === 'form' ? (
              <button 
                onClick={goToLanding}
                className="back-indicator"
              >
                <FaChevronLeft size={13} />
                <span>Back</span>
              </button>
            ) : (
              <div 
                className="flex items-center cursor-pointer"
                onClick={goToLanding}
              >
                <motion.div
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 20 
                  }}
                  className="mr-2"
                >
                  <img src="/app-icon.svg" alt="AI Resume Builder" className="h-8 w-8" />
                </motion.div>
                <h1 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[var(--ios-blue)] to-[var(--ios-purple)]">
                  AI Resume Builder
                </h1>
              </div>
            )}
          </div>
          
          {currentView === 'landing' && (
            <button 
              onClick={startResumeBuilder}
              className="btn-ios py-2 px-5 text-sm"
            >
              Get Started
            </button>
          )}
        </div>
      </motion.header>

      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentView === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ 
                duration: 0.3, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <LandingPage onGetStarted={startResumeBuilder} />
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: [0.23, 1, 0.32, 1] 
              }}
            >
              <MultiStepForm onBack={goToLanding} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-8 px-4 text-center text-[var(--color-text-secondary)] text-sm">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
