import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const LandingPage: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-in effect
  const { ref: welcomeRef, inView: welcomeInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: aboutRef, inView: aboutInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: portfolioRef, inView: portfolioInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: contactRef, inView: contactInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  // Repeat for other sections as needed

  return (
    <>
      {/* Navigation remains unchanged */}
      <nav
        className={`fixed top-0 w-full z-30 transition duration-300 ease-in-out ${
          isScrolled ? "bg-gray-900 shadow-lg" : "bg-gray-800"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="text-lg font-semibold">Brand</div>
          <div className="hidden md:flex space-x-4">
            <a href="#welcome" className="hover:text-gray-300">
              Welcome
            </a>
            <a href="#about" className="hover:text-gray-300">
              About Us
            </a>
            <a href="#services" className="hover:text-gray-300">
              Services
            </a>
            <a href="#portfolio" className="hover:text-gray-300">
              Portfolio
            </a>
            <a href="#testimonials" className="hover:text-gray-300">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden flex flex-col items-center space-y-2 mt-2">
            <a href="#welcome" className="hover:text-gray-300">
              Welcome
            </a>
            <a href="#about" className="hover:text-gray-300">
              About Us
            </a>
            <a href="#services" className="hover:text-gray-300">
              Services
            </a>
            <a href="#portfolio" className="hover:text-gray-300">
              Portfolio
            </a>
            <a href="#testimonials" className="hover:text-gray-300">
              Testimonials
            </a>
            <a href="#contact" className="hover:text-gray-300">
              Contact
            </a>
          </div>
        )}
      </nav>

      <div className="pt-16 bg-blue-500 text-white text-center">
        <div className="container mx-auto p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Our Brand</h1>
          <p className="mb-8">
            Discover our world-class services and innovative solutions for your
            business.
          </p>
          <a
            href="#services"
            className="inline-block bg-white text-blue-500 font-semibold py-2 px-4 rounded hover:bg-gray-100 transition duration-300 ease-in-out"
          >
            Explore Services
          </a>
        </div>
      </div>

      <div className="pt-16 space-y-10">
        <section
          ref={welcomeRef}
          className={`bg-blue-100 p-10 transition-opacity duration-1000 ${
            welcomeInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold">Welcome</h2>
          <p>
            This is the welcome section of our landing page. Here you can
            introduce visitors to your site.
          </p>
        </section>
        <section
          ref={aboutRef}
          className={`bg-green-100 p-10 transition-opacity duration-1000 ${
            aboutInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold">About Us</h2>
          <p>
            Here you can provide information about your company or project, its
            mission, and what it stands for.
          </p>
        </section>
        <section
          ref={servicesRef}
          className={`bg-yellow-100 p-10 transition-opacity duration-1000 ${
            servicesInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold">Services</h2>
          <p>
            This section is great for highlighting the services you offer. Be
            clear and concise about how you can help your visitors.
          </p>
        </section>
        <section
          ref={portfolioRef}
          className={`bg-red-100 p-10 transition-opacity duration-1000 ${
            portfolioInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold">Portfolio</h2>
          <p>
            Showcase your work or the products you offer. This section can be a
            gallery or a list of case studies.
          </p>
        </section>
        <section
          ref={testimonialsRef}
          className={`bg-purple-100 p-10 transition-opacity duration-1000 ${
            testimonialsInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold">Testimonials</h2>
          <p>
            Share some of the feedback from your clients. Testimonials help
            build trust with potential customers.
          </p>
        </section>
        <section
          ref={contactRef}
          className={`bg-gray-100 p-10ransition-opacity duration-1000 ${
            contactInView ? "opacity-100" : "opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold">Contact</h2>
          <p>
            Provide information on how visitors can contact you. Include a form,
            email address, and social media links.
          </p>
        </section>
        {/* Add Modern Card Section */}
      </div>
      <footer className="bg-gray-800 text-white p-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h3 className="font-bold text-lg">Company</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#about" className="hover:text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-gray-300">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="hover:text-gray-300">
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a href="#testimonials" className="hover:text-gray-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="mt-4 space-x-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Facebook
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-6">
          <p>Â© 2023 Brand. All rights reserved.</p>
        </div>
      </footer>
      {/* Footer remains unchanged */}
    </>
  );
};

export default LandingPage;
