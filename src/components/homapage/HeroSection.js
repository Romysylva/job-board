import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/register");
  };

  return (
    <section className="hero-section bg-slate-600 text-white text-center w-spy-16 dark:bg-gray-900">
      <h1 className="text-4xl font-bold">Find Your Dream Job</h1>
      <p className="text-lg mt-4">
        Browse thousands of job listings and connect with top companies.
      </p>
      <button
        onClick={handleGetStartedClick}
        className="cta-button bg-white text-blue-600 py-2 px-6 rounded-full mt-6 hover:bg-gray-200"
      >
        Get Started
      </button>
    </section>
  );
};

export default HeroSection;
