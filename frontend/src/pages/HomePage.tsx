import { ReactNode, memo, useEffect, useState } from "react";
import ImageSlider from "./ImageSlider";
import { FaPlus, FaMinus } from "react-icons/fa";
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

  const [expandedFAQIndex, setExpandedFAQIndex] = useState<number | null>(null); // State for expanded FAQ

  const toggleAnswer = (index: number) => {
    setExpandedFAQIndex(expandedFAQIndex === index ? null : index);
  };

  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    "https://images.unsplash.com/photo-1642142783250-d1bef1dafbc9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 1
    "https://plus.unsplash.com/premium_photo-1661609098718-3408828713ba?q=80&w=2081&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 2
    "https://plus.unsplash.com/premium_photo-1683141154082-324d296f3c66?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Trading Image 3
  ];

  const faqData = [
    {
      question: "What is a trading journal?",
      answer:
        "A trading journal is a tool that helps traders track their trades, analyze their performance, and improve their trading strategies.",
    },
    {
      question: "How can I benefit from using a trading journal?",
      answer:
        "By using a trading journal, you can identify patterns in your trading behavior, learn from your mistakes, and make more informed trading decisions.",
    },
    {
      question: "Is the trading journal free?",
      answer:
        "Yes, we offer a free plan with basic features to help you get started with your trading journey.",
    },
    {
      question: "How do I get started with the trading journal?",
      answer:
        "Simply sign up for an account, and you can start logging your trades and analyzing your performance right away.",
    },
    {
      question: "Can I access my trading journal on mobile devices?",
      answer:
        "Yes, our platform is optimized for mobile devices, allowing you to access your journal anytime, anywhere.",
    },
    {
      question: "What types of trades can I log in the journal?",
      answer:
        "You can log various types of trades, including stocks, options, forex, and cryptocurrencies.",
    },
    {
      question: "Is my trading data secure?",
      answer:
        "Absolutely! We use industry-standard encryption and security measures to protect your data.",
    },
    {
      question: "Can I customize my trading journal?",
      answer:
        "Yes, you can customize your journal with various settings and preferences to suit your trading style.",
    },
    {
      question: "What support options are available?",
      answer:
        "We offer email support, a knowledge base, and community forums to help you with any questions or issues.",
    },
    {
      question: "Will there be updates to the trading journal?",
      answer:
        "Yes, we continuously improve our platform and regularly release updates with new features and enhancements.",
    },
  ];

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
      {/* About Us Section */}
      <SectionWrapper id="about" {...sectionQuery}>
        <section className="bg-blue-50 dark:bg-slate-800 w-full px-6 py-6 min-h-[800px] rounded-lg">
          <div className="max-w-screen-xl mx-auto">
            <div className="flex flex-col mb-10 md:flex-row">
              <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Empowering Traders
                    </h3>
                    <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                      ------------
                    </p>
                    <p className="mb-2 text-gray-600">
                      We believe in empowering traders with the tools they need
                      to succeed. Our platform is built on the principles of
                      simplicity, efficiency, and transparency.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative h-full ml-0 md:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Continuous Innovation
                    </h3>
                    <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                      ------------
                    </p>
                    <p className="mb-2 text-gray-600">
                      Our mission is to provide a seamless and intuitive
                      experience for traders worldwide. We continuously innovate
                      and improve our platform to ensure it remains at the
                      forefront of trading technology.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mb-5 md:flex-row">
              <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Tailored Experience
                    </h3>
                    <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
                      ------------
                    </p>
                    <p className="mb-2 text-gray-600">
                      Join thousands of traders who trust us to help them
                      achieve their trading goals. Whether you're a beginner or
                      a seasoned trader, our journal is tailored to meet your
                      needs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative h-full ml-0 md:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      User-Friendly Interface
                    </h3>
                    <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">
                      ------------
                    </p>
                    <p className="mb-2 text-gray-600">
                      With a user-friendly interface and comprehensive
                      analytics, you can track your trades, analyze performance,
                      and make informed decisions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Cards */}
            <div className="flex flex-col mb-5 md:flex-row">
              <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
                <div className="relative h-full ml-0 mr-0 sm:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-green-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-green-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Real-Time Notifications
                    </h3>
                    <p className="mt-3 mb-1 text-xs font-medium text-green-500 uppercase">
                      ------------
                    </p>
                    <p className="mb-2 text-gray-600">
                      Stay updated with real-time notifications on market
                      changes, trade executions, and important events to make
                      timely decisions.
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-full sm:w-1/2">
                <div className="relative h-full ml-0 md:mr-10">
                  <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-red-500 rounded-lg"></span>
                  <div className="relative h-full p-5 bg-white border-2 border-red-500 rounded-lg">
                    <h3 className="my-2 text-lg font-bold text-gray-800">
                      Comprehensive Support
                    </h3>
                    <p className="mt-3 mb-1 text-xs font-medium text-red-500 uppercase">
                      ------------
                    </p>
                    <p className="mb-2 text-gray-600">
                      We offer 24/7 support through various channels to ensure
                      you have the assistance you need whenever you need it.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/*  */}
      <section id="new-features" className="py-8 bg-white sm:py-10 lg:py-16">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
              Boost Your Productivity
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
              Enhance your workflow with advanced features
            </p>
          </div>
          <div className="grid grid-cols-1 mt-10 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 gap-y-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            {/* Feature 1 */}
            <div className="md:p-8 lg:p-14 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-purple-200 flex justify-center items-center">
                <i className="fa-solid fa-chart-column text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Advanced Analytics
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Track and analyze your data with powerful analytics tools. Gain
                valuable insights for better decision-making.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-teal-200 flex justify-center items-center">
                <i className="fa-solid fa-truck-fast text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Fast Integration
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Seamlessly integrate with your existing tools and systems for a
                smooth workflow experience.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-yellow-200 flex justify-center items-center">
                <i className="fa-solid fa-shield text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Security First
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Ensure the safety of your data with top-notch security features.
                Your privacy is our priority.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="md:p-8 lg:p-14 md:border-t md:border-gray-200 flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-red-200 flex justify-center items-center">
                <i className="fa-solid fa-cloud text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Cloud Integration
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Access your data from anywhere with seamless cloud integration.
                Work without boundaries.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-green-200 flex justify-center items-center">
                <i className="fa-solid fa-pen-nib text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Task Management
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Organize your workflow with efficient task management features.
                Stay on top of your projects effortlessly.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="md:p-8 lg:p-14 md:border-l md:border-gray-200 md:border-t flex flex-col justify-center items-center">
              <div className="w-14 h-14 rounded-full bg-orange-200 flex justify-center items-center">
                <i className="fa-solid fa-bolt text-3xl text-gray-900"></i>
              </div>
              <h3 className="mt-12 text-xl font-bold text-gray-900">
                Performance Metrics
              </h3>
              <p className="mt-5 text-base text-gray-600">
                Monitor and measure your performance with comprehensive metrics.
                Optimize your processes for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <SectionWrapper id="features" {...sectionQuery}>
        <section className="max-w-screen-xl px-6 py-6 mx-auto min-h-[800px] rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-center text-primary-foreground">
            Features
          </h2>
          <p className="mb-12 text-lg text-center text-gray-500">
            Here are some of the awesome features we provide.
          </p>
          <div className="flex flex-col w-full mb-10 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    Comprehensive Analytics
                  </h3>
                  <p className="mt-3 mb-1 text-xs font-medium text-indigo-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Gain insights into your trading patterns with our detailed
                    analytics tools. Track performance, identify trends, and
                    optimize your strategies.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full sm:w-1/2">
              <div className="relative h-full ml-0 md:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-purple-500 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-purple-500 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    User-Friendly Interface
                  </h3>
                  <p className="mt-3 mb-1 text-xs font-medium text-purple-500 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Our platform is designed with simplicity in mind, making it
                    easy for traders of all levels to navigate and utilize
                    effectively.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full mb-5 sm:flex-row">
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    Secure and Reliable
                  </h3>
                  <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    We prioritize your security with top-notch encryption and
                    reliable data storage, ensuring your trading data is safe
                    and accessible.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full mb-10 sm:mb-0 sm:w-1/2">
              <div className="relative h-full ml-0 mr-0 sm:mr-10">
                <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-yellow-400 rounded-lg"></span>
                <div className="relative h-full p-5 bg-white border-2 border-yellow-400 rounded-lg">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    Real-Time Notifications
                  </h3>
                  <p className="mt-3 mb-1 text-xs font-medium text-yellow-400 uppercase">
                    ------------
                  </p>
                  <p className="mb-2 text-gray-600">
                    Stay updated with real-time notifications on market changes,
                    trade executions, and important events to make timely
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/* Trading Insights Section */}
      <SectionWrapper id="trading-slider" {...sectionQuery}>
        <ImageSlider images={images} />
      </SectionWrapper>
      {/* Testimonials Section */}
      <SectionWrapper id="testimonials" {...sectionQuery}>
        <section className="max-w-screen-xl px-6 py-16 mx-auto rounded-lg">
          <h2 className="text-4xl font-bold mb-4 text-center">Testimonials</h2>
          <p className="mb-12 text-lg text-center text-gray-500">
            Here's what our users have to say about us.
          </p>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 overflow-y-auto max-h-[400px]">
            {/* Testimonial 1 */}
            <div className="w-full md:w-1/2 lg:w-1/3 hover:shadow-lg rounded-lg border bg-white flex flex-col">
              <div className="flex justify-center items-start flex-col p-5 flex-grow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="icon icon-tabler icon-tabler-quote rotate-180 text-sky-500"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5"></path>
                </svg>
                <div className="flex justify-center items-start flex-col text-left gap-5">
                  <p className="italic text-sm md:text-base">
                    "I love how easy it is to track my trades and analyze my
                    performance. The insights I've gained have been invaluable."
                  </p>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      Maria Garcia
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="bg-sky-500 p-0.5 rounded-b-lg"></div>
            </div>

            {/* Testimonial 2 */}
            <div className="w-full md:w-1/2 lg:w-1/3 hover:shadow-lg rounded-lg border bg-white flex flex-col">
              <div className="flex justify-center items-start flex-col p-5 flex-grow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="icon icon-tabler icon-tabler-quote rotate-180 text-sky-500"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5"></path>
                </svg>
                <div className="flex justify-center items-start flex-col text-left gap-5">
                  <p className="italic text-sm md:text-base">
                    "I love how easy it is to track my trades and analyze my
                    performance. The insights I've gained have been invaluable."
                  </p>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      Maria Garcia
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="bg-sky-500 p-0.5 rounded-b-lg"></div>
            </div>

            {/* Testimonial 3 */}
            <div className="w-full md:w-1/2 lg:w-1/3 hover:shadow-lg rounded-lg border bg-white flex flex-col">
              <div className="flex justify-center items-start flex-col p-5 flex-grow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="icon icon-tabler icon-tabler-quote rotate-180 text-sky-500"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5"></path>
                </svg>
                <div className="flex justify-center items-start flex-col text-left gap-5">
                  <p className="italic text-sm md:text-base">
                    "The best trading journal I've ever used. It's helped me
                    stay organized and make better trading decisions."
                  </p>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      David Lee
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="bg-sky-500 p-0.5 rounded-b-lg"></div>
            </div>

            {/* Testimonial 4 */}
            <div className="w-full md:w-1/2 lg:w-1/3 hover:shadow-lg rounded-lg border bg-white flex flex-col">
              <div className="flex justify-center items-start flex-col p-5 flex-grow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="icon icon-tabler icon-tabler-quote rotate-180 text-sky-500"
                  viewBox="0 0 24 24"
                >
                  <path stroke="none" d="M0 0h24v24H0z"></path>
                  <path d="M10 11H6a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5M19 11h-4a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011 1v6c0 2.667-1.333 4.333-4 5"></path>
                </svg>
                <div className="flex justify-center items-start flex-col text-left gap-5">
                  <p className="italic text-sm md:text-base">
                    "Highly recommend Trading Journal to any trader looking to
                    improve their strategy and performance."
                  </p>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold">
                      Sarah Brown
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="bg-sky-500 p-0.5 rounded-b-lg"></div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/* Pricing Section */}
      <SectionWrapper id="pricing" {...sectionQuery}>
        <section className="bg-blue-50 dark:bg-slate-800 pt-20 lg:pt-[120px] pb-12 lg:pb-[90px] relative z-20 overflow-hidden">
          <div className="container mx-auto">
            <div className="flex flex-wrap justify-center -mx-4">
              <div className="w-full px-4">
                <div className="text-center mx-auto mb-[60px] lg:mb-20 max-w-[510px]">
                  <span className="font-semibold text-lg text-primary mb-2 block">
                    Pricing Table
                  </span>
                  <h2 className="font-bold text-3xl sm:text-4xl md:text-[40px] text-dark mb-4">
                    Our Pricing Plan
                  </h2>
                  <p className="text-base text-body-color">
                    Choose a plan that fits your trading needs. Each plan is
                    designed to help you maximize your trading potential.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center -mx-4">
              {/* Personal Plan */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="bg-white rounded-xl relative z-10 overflow-hidden border border-primary border-opacity-20 shadow-pricing py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10">
                  <span className="text-primary font-semibold text-lg block mb-4">
                    Personal
                  </span>
                  <h2 className="font-bold text-dark mb-5 text-[42px]">
                    $5
                    <span className="text-base text-body-color font-medium">
                      {" "}
                      / year
                    </span>
                  </h2>
                  <p className="text-base text-body-color pb-8 mb-8 border-b border-[#F2F2F2]">
                    Ideal for individual traders looking to track their
                    performance and improve their strategies. Enjoy personalized
                    insights and analytics.
                  </p>
                  <div className="mb-7">
                    <p className="text-base text-body-color leading-loose mb-1">
                      1 User
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      All UI components
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Lifetime access
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Free updates
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Use on 1 project
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      3 Months support
                    </p>
                  </div>
                  <a
                    href="javascript:void(0)"
                    className="w-full block text-base font-semibold text-primary bg-transparent border border-[#D4DEFF] rounded-md text-center p-4 hover:text-white hover:bg-primary hover:border-primary transition"
                  >
                    Choose Personal
                  </a>
                </div>
              </div>
              {/* Business Plan */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="bg-white rounded-xl relative z-10 overflow-hidden border border-primary border-opacity-20 shadow-pricing py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10">
                  <span className="text-primary font-semibold text-lg block mb-4">
                    Business
                  </span>
                  <h2 className="font-bold text-dark mb-5 text-[42px]">
                    $15
                    <span className="text-base text-body-color font-medium">
                      {" "}
                      / year
                    </span>
                  </h2>
                  <p className="text-base text-body-color pb-8 mb-8 border-b border-[#F2F2F2]">
                    Perfect for small teams looking to collaborate and share
                    insights. Get advanced analytics and team features to
                    enhance your trading experience.
                  </p>
                  <div className="mb-7">
                    <p className="text-base text-body-color leading-loose mb-1">
                      5 Users
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      All UI components
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Lifetime access
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Free updates
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Use on 3 projects
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      4 Months support
                    </p>
                  </div>
                  <a
                    href="javascript:void(0)"
                    className="w-full block text-base font-semibold text-white bg-primary border border-primary rounded-md text-center p-4 hover:bg-opacity-90 transition"
                  >
                    Choose Business
                  </a>
                </div>
              </div>
              {/* Professional Plan */}
              <div className="w-full md:w-1/2 lg:w-1/3 px-4">
                <div className="bg-white rounded-xl relative z-10 overflow-hidden border border-primary border-opacity-20 shadow-pricing py-10 px-8 sm:p-12 lg:py-10 lg:px-6 xl:p-12 mb-10">
                  <span className="text-primary font-semibold text-lg block mb-4">
                    Professional
                  </span>
                  <h2 className="font-bold text-dark mb-5 text-[42px]">
                    $25
                    <span className="text-base text-body-color font-medium">
                      {" "}
                      / year
                    </span>
                  </h2>
                  <p className="text-base text-body-color pb-8 mb-8 border-b border-[#F2F2F2]">
                    For serious traders who want to take their trading to the
                    next level. Access to all features, unlimited users, and
                    priority support.
                  </p>
                  <div className="mb-7">
                    <p className="text-base text-body-color leading-loose mb-1">
                      Unlimited Users
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      All UI components
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Lifetime access
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Free updates
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      Use on Unlimited projects
                    </p>
                    <p className="text-base text-body-color leading-loose mb-1">
                      12 Months support
                    </p>
                  </div>
                  <a
                    href="javascript:void(0)"
                    className="w-full block text-base font-semibold text-primary bg-transparent border border-[#D4DEFF] rounded-md text-center p-4 hover:text-white hover:bg-primary hover:border-primary transition"
                  >
                    Choose Professional
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/* FAQs Section */}
      <SectionWrapper id="faqs" {...sectionQuery}>
        <div className="py-4 max-w-screen-lg mx-auto">
          <div className="text-center mb-16">
            <p className="mt-4 text-sm leading-7 text-gray-500 font-regular">
              F.A.Q
            </p>
            <h3 className="text-3xl sm:text-4xl leading-normal font-extrabold tracking-tight text-gray-900">
              Frequently Asked{" "}
              <span className="text-indigo-600">Questions</span>
            </h3>
          </div>

          {/* Technical Section */}
          <div className="px-10 sm:px-16 sm:flex items-start mb-10">
            <h3 className="py-3 font-bold text-lg text-gray-900 w-3/12">
              Technical
            </h3>
            <div className="w-9/12">
              {faqData.slice(0, 5).map((faq, index) => (
                <div className="flex items-start mb-8" key={index}>
                  <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                    {/* SVG Icon */}
                    <svg
                      width="24px"
                      fill="white"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="Layer 2">
                        <g data-name="menu-arrow">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>
                          <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                          <circle cx="12" cy="19" r="1"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="text-md flex-grow">
                    <h1
                      className="text-gray-900 font-semibold mb-2 flex items-center"
                      onClick={() => toggleAnswer(index)}
                    >
                      {expandedFAQIndex === index ? (
                        <FaMinus className="mr-2" />
                      ) : (
                        <FaPlus className="mr-2" />
                      )}
                      {faq.question}
                    </h1>
                    {expandedFAQIndex === index && ( // Show answer if expanded
                      <p className="text-gray-500 text-sm">{faq.answer}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Section */}
          <div className="px-10 sm:px-16 sm:flex items-start mb-10">
            <h3 className="py-3 font-bold text-lg text-gray-900 w-3/12">
              Billing
            </h3>
            <div className="w-9/12">
              {faqData.slice(5).map((faq, index) => (
                <div className="flex items-start mb-8" key={index + 5}>
                  <div className="hidden sm:flex items-center justify-center p-3 mr-3 rounded-full bg-indigo-500 text-white border-4 border-white text-xl font-semibold">
                    {/* SVG Icon */}
                    <svg
                      width="24px"
                      fill="white"
                      height="24px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g data-name="Layer 2">
                        <g data-name="menu-arrow">
                          <rect
                            width="24"
                            height="24"
                            transform="rotate(180 12 12)"
                            opacity="0"
                          ></rect>
                          <path d="M17 9A5 5 0 0 0 7 9a1 1 0 0 0 2 0 3 3 0 1 1 3 3 1 1 0 0 0-1 1v2a1 1 0 0 0 2 0v-1.1A5 5 0 0 0 17 9z"></path>
                          <circle cx="12" cy="19" r="1"></circle>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="text-md flex-grow">
                    <h1
                      className="text-gray-900 font-semibold mb-2 flex items-center"
                      onClick={() => toggleAnswer(index + 5)}
                    >
                      {expandedFAQIndex === index + 5 ? (
                        <FaMinus className="mr-2" />
                      ) : (
                        <FaPlus className="mr-2" />
                      )}
                      {faq.question}
                    </h1>
                    {expandedFAQIndex === index + 5 && ( // Show answer if expanded
                      <p className="text-gray-500 text-sm">{faq.answer}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
      {/* Contact Section */}
      <SectionWrapper id="contact" {...sectionQuery}>
        <section className="bg-blue-50 dark:bg-slate-800 px-6 py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 text-center">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                Contact
              </p>
              <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-600 dark:text-slate-400">
                We are here to assist you with any inquiries or support you may
                need.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="h-full pr-6">
                <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                  Feel free to reach out to us through the following channels:
                </p>
                <ul className="mb-6">
                  <li className="flex mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                        <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Our Address
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        1230 Maecenas Street Donec Road
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        New York, EEUU
                      </p>
                    </div>
                  </li>
                  <li className="flex mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                        <path d="M15 7a2 2 0 0 1 2 2"></path>
                        <path d="M15 3a6 6 0 0 1 6 6"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Contact
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mobile: +1 (123) 456-7890
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Mail: tailnext@gmail.com
                      </p>
                    </div>
                  </li>
                  <li className="flex mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                      >
                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0"></path>
                        <path d="M12 7v5l3 3"></path>
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h3 className="mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-white">
                        Working hours
                      </h3>
                      <p className="text-gray-600 dark:text-slate-400">
                        Monday - Friday: 08:00 - 17:00
                      </p>
                      <p className="text-gray-600 dark:text-slate-400">
                        Saturday &amp; Sunday: 08:00 - 12:00
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="card h-fit max-w-6xl p-5 md:p-12">
                <h2 className="mb-4 text-2xl font-bold dark:text-white">
                  Ready to Get Started?
                </h2>
                <form id="contactForm">
                  <div className="mb-6">
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="name"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="text"
                        id="name"
                        placeholder="Your name"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="name"
                      />
                    </div>
                    <div className="mx-0 mb-1 sm:mb-4">
                      <label
                        htmlFor="email"
                        className="pb-1 text-xs uppercase tracking-wider"
                      ></label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Your email address"
                        className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                        name="email"
                      />
                    </div>
                  </div>
                  <div className="mx-0 mb-1 sm:mb-4">
                    <label
                      htmlFor="message"
                      className="pb-1 text-xs uppercase tracking-wider"
                    ></label>
                    <textarea
                      id="message"
                      name="message"
                      cols={30}
                      rows={5}
                      placeholder="Write your message..."
                      className="mb-2 w-full rounded-md border border-gray-400 py-2 pl-2 pr-4 shadow-md dark:text-gray-300 sm:mb-0"
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="w-full bg-blue-800 text-white px-6 py-3 font-xl rounded-md sm:mb-0"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
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
