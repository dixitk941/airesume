import { useNavigate } from 'react-router-dom';
import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import CTA from './CTA';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/builder');
  };

  return (
    <div className="landing-page">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <Testimonials />
      <CTA onGetStarted={handleGetStarted} />
    </div>
  );
};

export default LandingPage;
