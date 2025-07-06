import Hero from './Hero';
import Features from './Features';
import Testimonials from './Testimonials';
import CTA from './CTA';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="landing-page">
      <Hero onGetStarted={onGetStarted} />
      <Features />
      <Testimonials />
      <CTA onGetStarted={onGetStarted} />
    </div>
  );
};

export default LandingPage;
