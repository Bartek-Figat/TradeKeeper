import { ReactNode, memo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";
import { buttonVariants } from "../components/common/button";
import BlobBg from "../components/common/blobBg";
import heroImage from "../img/hero.png";

const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionQuery = {
    activeSection: searchParams.get("section") ?? "home",
    searchParams,
    setSearchParams,
  };

  return (
    <div className="bg-background text-foreground min-h-screen antialiased">
      <Navbar {...sectionQuery} />
      <SectionWrapper id="home" {...sectionQuery}>
        <section className="h-dvh bg-primary px-6 lg:px-10 relative overflow-hidden">
          {/* bg circles */}
          <div className="bg-primary-foreground opacity-15 blur-xl w-72 h-72 rounded-full absolute -bottom-10 -right-10"></div>
          <div className="bg-primary-foreground opacity-15 blur-xl w-[800px] h-[800px] rounded-full absolute -top-48 -left-72"></div>
          {/* end of bg circles */}
          <header className="h-dvh max-w-screen-xl mx-auto py-20 flex flex-col items-center justify-evenly lg:flex-row">
            <div className="text-center max-w-[500px] flex-grow md:flex-grow-0 flex flex-col justify-evenly lg:text-start">
              {/* h1 + subheading and action btn */}
              <div className="space-y-12">
                <h1 className="text-primary-foreground font-bold text-6xl lg:text-[4.5rem] leading-[1.1]">
                  A Trading Journal Designed for Everyone.
                </h1>
                <p className="text-primary-foreground/80 text-[1.2rem]">
                  Found what you’re looking for? Don’t wait! Click the ‘Get
                  Started’ to begin your journey with our comprehensive,
                  user-friendly trading journal. It’s free, fast, and ad-free.
                  Start optimizing your trading routine today!
                </p>
              </div>
              <div className="mt-8 group relative w-fit mx-auto lg:mx-0">
                <div className="absolute -inset-0.5 bg-accent rounded-lg blur opacity-70 group-hover:opacity-100 group-hover:blur-xl transition-all duration-300"></div>
                <Link
                  to="/dashboard"
                  className={buttonVariants({
                    variant: "secondary",
                    size: "lg",
                    className:
                      "relative text-foreground font-semibold w-[180px]",
                  })}
                >
                  Get Started
                </Link>
              </div>
              {/* end */}
            </div>
            {/* hero image */}
            <BlobBg className="hidden md:block">
              <div className="relative">
                <img
                  src={heroImage}
                  className="w-full object-cover object-bottom"
                />
              </div>
            </BlobBg>
            {/* end */}
          </header>
        </section>
      </SectionWrapper>
      <SectionWrapper id="about" {...sectionQuery}>
        <section className="max-w-screen-xl px-6 py-12 mx-auto min-h-[800px] rounded-lg">
          <h2 className="text-4xl font-bold mb-8 text-center text-primary-foreground">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-lg mb-6 text-gray-700">
                Our trading journal is designed to help traders of all levels
                optimize their trading strategies. With a user-friendly
                interface and comprehensive analytics, you can track your
                trades, analyze performance, and make informed decisions.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                We believe in empowering traders with the tools they need to
                succeed. Our platform is built on the principles of simplicity,
                efficiency, and transparency, ensuring that you have everything
                you need to enhance your trading experience.
              </p>
              <p className="text-lg mb-6 text-gray-700">
                Join thousands of traders who trust us to help them achieve
                their trading goals. Whether you're a beginner or a seasoned
                trader, our journal is tailored to meet your needs.
              </p>
              <p className="text-lg text-gray-700">
                Our mission is to provide a seamless and intuitive experience
                for traders worldwide. We continuously innovate and improve our
                platform to ensure it remains at the forefront of trading
                technology.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="https://via.placeholder.com/400"
                alt="About Us"
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>
      </SectionWrapper>
      <SectionWrapper id="pricing" {...sectionQuery}>
        <section className="max-w-screen-xl px-6 py-12 mx-auto min-h-[800px] rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-center">Free Plan</h3>
              <p className="text-lg mb-6 text-center text-gray-700">
                Get started with our basic features.
              </p>
              <ul className="mb-6 space-y-2 text-gray-700">
                <li>✔️ Track up to 100 trades</li>
                <li>✔️ Basic analytics</li>
                <li>✔️ Community support</li>
                <li>✔️ Access to free resources</li>
              </ul>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Choose Free
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-center">Pro Plan</h3>
              <p className="text-lg mb-6 text-center text-gray-700">
                Advanced features for serious traders.
              </p>
              <ul className="mb-6 space-y-2 text-gray-700">
                <li>✔️ Unlimited trades</li>
                <li>✔️ Advanced analytics</li>
                <li>✔️ Priority support</li>
                <li>✔️ Customizable dashboards</li>
                <li>✔️ Access to premium resources</li>
              </ul>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Choose Pro
              </button>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Enterprise Plan
              </h3>
              <p className="text-lg mb-6 text-center text-gray-700">
                Custom solutions for businesses.
              </p>
              <ul className="mb-6 space-y-2 text-gray-700">
                <li>✔️ Custom integrations</li>
                <li>✔️ Dedicated account manager</li>
                <li>✔️ 24/7 support</li>
                <li>✔️ Team collaboration tools</li>
                <li>✔️ Enterprise-level security</li>
              </ul>
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </SectionWrapper>
      <SectionWrapper id="team" {...sectionQuery}>
        <section className="max-w-screen-xl px-6 py-12 mx-auto min-h-[800px] rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="John Doe"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-sm text-gray-600">CEO & Founder</p>
              <p className="text-sm mt-2 text-gray-700">
                John is a seasoned trader with over 15 years of experience in
                the financial markets. He founded Trading Journal to help
                traders optimize their strategies.
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                <a href="https://linkedin.com" className="hover:underline">
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
                <a href="https://twitter.com" className="hover:underline">
                  <img
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Jane Smith"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Jane Smith</h3>
              <p className="text-sm text-gray-600">CTO</p>
              <p className="text-sm mt-2 text-gray-700">
                Jane is a tech enthusiast with a passion for developing
                innovative solutions. She leads our tech team to ensure our
                platform is cutting-edge.
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                <a href="https://linkedin.com" className="hover:underline">
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
                <a href="https://twitter.com" className="hover:underline">
                  <img
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>
            <div className="text-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img
                src="https://via.placeholder.com/150"
                alt="Emily Johnson"
                className="w-32 h-32 mx-auto rounded-full mb-4"
              />
              <h3 className="text-xl font-bold">Emily Johnson</h3>
              <p className="text-sm text-gray-600">Head of Customer Success</p>
              <p className="text-sm mt-2 text-gray-700">
                Emily is dedicated to ensuring our users have the best
                experience. She leads our customer success team to provide
                top-notch support.
              </p>
              <div className="mt-4 flex justify-center space-x-2">
                <a href="https://linkedin.com" className="hover:underline">
                  <img
                    src="/icons/linkedin.svg"
                    alt="LinkedIn"
                    className="w-5 h-5"
                  />
                </a>
                <a href="https://twitter.com" className="hover:underline">
                  <img
                    src="/icons/twitter.svg"
                    alt="Twitter"
                    className="w-5 h-5"
                  />
                </a>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      <SectionWrapper id="contact" {...sectionQuery}>
        <section className="max-w-screen-xl px-6 py-12 mx-auto min-h-[800px] rounded-lg ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-6 text-gray-700">
                Have questions or need support? Reach out to us via email or
                phone, or fill out the contact form below. We’re here to help!
              </p>
              <ul className="text-lg mb-6 text-gray-700">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:support@tradingjournal.com"
                    className="text-blue-500 hover:underline"
                  >
                    support@tradingjournal.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href="tel:1234567890"
                    className="text-blue-500 hover:underline"
                  >
                    (123) 456-7890
                  </a>
                </li>
                <li>Address: 123 Trading St, Finance City, FC 12345</li>
              </ul>
              <div className="mt-4">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627997975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577d1f9c1f1e0e!2sTrading%20St%2C%20Finance%20City%2C%20FC%2012345!5e0!3m2!1sen!2sau!4v1614036271045!5m2!1sen!2sau"
                  width="100%"
                  height="200"
                  className="rounded-lg shadow-md"
                  loading="lazy"
                ></iframe>
              </div>
            </div>
            <div>
              <form className="bg-white p-8 rounded-lg shadow-lg">
                <div className="relative mb-6">
                  <input
                    type="text"
                    id="name"
                    className="peer w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-0"
                    placeholder=" "
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    Name
                  </label>
                </div>
                <div className="relative mb-6">
                  <input
                    type="email"
                    id="email"
                    className="peer w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-0"
                    placeholder=" "
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    Email
                  </label>
                </div>
                <div className="relative mb-6">
                  <textarea
                    id="message"
                    className="peer w-full px-4 py-3 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-0"
                    placeholder=" "
                    rows={4}
                  ></textarea>
                  <label
                    htmlFor="message"
                    className="absolute left-4 -top-2.5 text-sm text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-blue-500"
                  >
                    Message
                  </label>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white px-4 py-3 rounded-md hover:bg-blue-600 transition duration-300"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
      </SectionWrapper>
      <footer className="bg-[#232259] text-white py-8">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-bold">Trading Journal</h3>
              <p className="text-sm">
                © 2023 Trading Journal. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <Link to="/privacy" className="text-sm hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm hover:underline">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-sm hover:underline">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm mb-4">
              Follow us on:
              <a href="https://twitter.com" className="ml-2 hover:underline">
                Twitter
              </a>
              <a href="https://facebook.com" className="ml-2 hover:underline">
                Facebook
              </a>
              <a href="https://instagram.com" className="ml-2 hover:underline">
                Instagram
              </a>
            </p>
            <div className="flex justify-center space-x-4 mb-4">
              <a href="https://twitter.com" className="hover:underline">
                <img
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  className="w-6 h-6"
                />
              </a>
              <a href="https://facebook.com" className="hover:underline">
                <img
                  src="/icons/facebook.svg"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </a>
              <a href="https://instagram.com" className="hover:underline">
                <img
                  src="/icons/instagram.svg"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </a>
            </div>
            <form className="flex justify-center">
              <input
                type="email"
                placeholder="Subscribe to our newsletter"
                className="px-4 py-2 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

interface SectionWrapperProps {
  id: string;
  children: ReactNode;
  searchParams: URLSearchParams;
  setSearchParams: (params: URLSearchParams) => void;
  activeSection: string;
}

const SectionWrapper = memo(
  ({
    id,
    children,
    activeSection,
    searchParams,
    setSearchParams,
  }: SectionWrapperProps) => {
    const { ref, inView } = useInView({ threshold: 0.6 });

    useEffect(() => {
      if (inView && activeSection !== id) {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("section", id);
        setSearchParams(newParams);
      }
    }, [inView]);

    return (
      <div ref={ref} id={id}>
        {children}
      </div>
    );
  }
);
