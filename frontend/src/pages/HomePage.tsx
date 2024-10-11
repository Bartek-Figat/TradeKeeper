import { ReactNode, memo, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TextEffect } from "../montion/montionText";
import { AnimatedGroup } from "../montion/animatedGroup";
import { NavLink } from "react-router-dom";
import ImageSlider from "./ImageSlider";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Navbar from "../components/Navbar";

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
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Navbar {...sectionQuery} />

      <SectionWrapper id="home" {...sectionQuery}>
        <motion.div
          className="@lg:px-12 h-auto w-full bg-[#111c43] px-5 py-10 lg:px-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Home Section */}
          <section className="my-20 flex h-auto w-full flex-col lg:flex-row">
            <div className="w-full lg:w-1/2">
              <h1 className="max-w-sm text-2xl font-semibold text-white md:text-3xl lg:text-5xl">
                Track Your Trades with Our{" "}
                <span className="text-lime-500">Trading Journal.</span>
              </h1>
              <TextEffect
                preset="fade"
                className="mt-5 text-sm text-gray-300 lg:text-base"
              >
                Our trading journal provides you with the tools to analyze your
                trading performance, identify patterns, and improve your
                strategies. Start documenting your trades and take control of
                your trading journey today!
              </TextEffect>
              <div className="mt-5 flex h-10 flex-col items-start justify-start gap-2 md:flex-row md:items-start">
                <button className="h-10 rounded-lg bg-lime-500 px-4 py-1 text-white transition-all duration-300 hover:opacity-75">
                  Get Started
                </button>
                <button className="rounded-lg px-2 py-1 text-white transition-all duration-300 hover:opacity-75">
                  Learn More
                </button>
              </div>
              <div className="mt-10 hidden h-auto w-full place-content-center gap-2 lg:grid lg:grid-cols-3 lg:divide-x-[1px]">
                <div className="flex h-20 w-full items-center justify-center px-5 lg:block">
                  <h2 className="text-5xl font-bold text-lime-500">
                    10<span className="text-white">K</span>
                  </h2>
                  <h3 className="mt-2 text-sm text-gray-300">Traders</h3>
                </div>
                <div className="flex h-20 w-full items-center justify-center px-5 lg:block">
                  <h2 className="text-5xl font-bold text-lime-500">
                    5<span className="text-white">K</span>
                  </h2>
                  <h3 className="mt-2 text-sm text-gray-300">Strategies</h3>
                </div>
                <div className="flex h-20 w-full items-center justify-center px-5 lg:block">
                  <h2 className="text-5xl font-bold text-lime-500">
                    1<span className="text-white">M</span>
                  </h2>
                  <h3 className="mt-2 text-sm text-gray-300">Trades Logged</h3>
                </div>
              </div>
            </div>
            <div className="relative mt-5 flex w-full justify-center lg:w-1/2 lg:px-10">
              <div className="absolute left-10 top-20 h-[30%] w-[30%] bg-emerald-300 blur-[130px]"></div>
              <img
                src="https://media.istockphoto.com/id/1645926305/photo/stock-exchange-chart-on-the-screen.jpg?s=2048x2048&w=is&k=20&c=rWefVXE5ixXNDrJh0TU9zi-Sq2V1iCXuIa6ZN_5sXXg="
                alt=""
                className="hidden h-auto w-full rounded-3xl md:block md:w-[70%]"
              />
              <div className="absolute bottom-0 right-10 z-10 h-auto w-[50%] translate-y-1/2 rounded-xl border-t border-lime-500 bg-slate-900 p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-lime-500">Stock</p>
                    <p className="text-sm text-white">NASDAQ: MSFT</p>
                  </div>
                  <div>
                    <p className="text-sm text-lime-500">Crypto</p>
                    <p className="text-sm text-white">BTC</p>
                  </div>
                </div>
                <NavLink to="/sign-up">
                  <button className="w-full rounded-lg border border-lime-500 px-3 py-1.5 text-lime-500 transition-all duration-300 hover:opacity-75">
                    Sign up
                  </button>
                </NavLink>
              </div>
            </div>
          </section>
        </motion.div>
      </SectionWrapper>
      {/* About Us Section */}
      <AnimatedGroup
        variants={{
          container: {
            visible: {
              transition: {
                staggerChildren: 0.05,
              },
            },
          },
          item: {
            hidden: {
              opacity: 0,
              filter: "blur(12px)",
              y: -60,
              rotateX: 90,
            },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              rotateX: 0,
              transition: {
                type: "spring",
                bounce: 0.3,
                duration: 1,
              },
            },
          },
        }}
      >
        <SectionWrapper id="about" {...sectionQuery}>
          <section className="min-h-[800px] w-full rounded-lg bg-blue-50 px-6 py-6 dark:bg-slate-800">
            <div className="mx-auto max-w-screen-xl">
              <div className="mb-10 flex flex-col md:flex-row">
                <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
                  <div className="relative ml-0 mr-0 h-full sm:mr-10">
                    <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-indigo-500"></span>
                    <div className="relative h-full rounded-lg border-2 border-indigo-500 bg-white p-5">
                      <h3 className="my-2 text-lg font-bold text-gray-800">
                        Empowering Traders
                      </h3>
                      <p className="mb-1 mt-3 text-xs font-medium uppercase text-indigo-500">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                        We believe in empowering traders with the tools they
                        need to succeed. Our platform is built on the principles
                        of simplicity, efficiency, and transparency.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="relative ml-0 h-full md:mr-10">
                    <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-purple-500"></span>
                    <div className="relative h-full rounded-lg border-2 border-purple-500 bg-white p-5">
                      <h3 className="my-2 text-lg font-bold text-gray-800">
                        Continuous Innovation
                      </h3>
                      <p className="mb-1 mt-3 text-xs font-medium uppercase text-purple-500">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                        Our mission is to provide a seamless and intuitive
                        experience for traders worldwide. We continuously
                        innovate and improve our platform to ensure it remains
                        at the forefront of trading technology.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mb-5 flex flex-col md:flex-row">
                <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
                  <div className="relative ml-0 mr-0 h-full sm:mr-10">
                    <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-blue-400"></span>
                    <div className="relative h-full rounded-lg border-2 border-blue-400 bg-white p-5">
                      <h3 className="my-2 text-lg font-bold text-gray-800">
                        Tailored Experience
                      </h3>
                      <p className="mb-1 mt-3 text-xs font-medium uppercase text-blue-400">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                        Join thousands of traders who trust us to help them
                        achieve their trading goals. Whether you're a beginner
                        or a seasoned trader, our journal is tailored to meet
                        your needs.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full sm:w-1/2">
                  <div className="relative ml-0 h-full md:mr-10">
                    <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-yellow-400"></span>
                    <div className="relative h-full rounded-lg border-2 border-yellow-400 bg-white p-5">
                      <h3 className="my-2 text-lg font-bold text-gray-800">
                        User-Friendly Interface
                      </h3>
                      <p className="mb-1 mt-3 text-xs font-medium uppercase text-yellow-400">
                        ------------
                      </p>
                      <p className="mb-2 text-gray-600">
                        With a user-friendly interface and comprehensive
                        analytics, you can track your trades, analyze
                        performance, and make informed decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Additional Cards */}
              <div className="mb-5 flex flex-col md:flex-row">
                <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
                  <div className="relative ml-0 mr-0 h-full sm:mr-10">
                    <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-green-500"></span>
                    <div className="relative h-full rounded-lg border-2 border-green-500 bg-white p-5">
                      <h3 className="my-2 text-lg font-bold text-gray-800">
                        Real-Time Notifications
                      </h3>
                      <p className="mb-1 mt-3 text-xs font-medium uppercase text-green-500">
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
                  <div className="relative ml-0 h-full md:mr-10">
                    <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-red-500"></span>
                    <div className="relative h-full rounded-lg border-2 border-red-500 bg-white p-5">
                      <h3 className="my-2 text-lg font-bold text-gray-800">
                        Comprehensive Support
                      </h3>
                      <p className="mb-1 mt-3 text-xs font-medium uppercase text-red-500">
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
      </AnimatedGroup>
      {/*  */}
      <section id="new-features" className="bg-white py-8 sm:py-10 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl xl:text-5xl">
              Boost Your Productivity
            </h2>
            <p className="mt-4 text-base leading-7 text-gray-600 sm:mt-8">
              Enhance your workflow with advanced features
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-y-12 text-center sm:mt-16 sm:grid-cols-2 sm:gap-x-12 md:grid-cols-3 md:gap-0 xl:mt-24">
            {/* Feature 1 */}
            <div className="flex flex-col items-center justify-center md:p-8 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-200">
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
            <div className="flex flex-col items-center justify-center md:border-l md:border-gray-200 md:p-8 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal-200">
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
            <div className="flex flex-col items-center justify-center md:border-l md:border-gray-200 md:p-8 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-200">
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
            <div className="flex flex-col items-center justify-center md:border-t md:border-gray-200 md:p-8 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-200">
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
            <div className="flex flex-col items-center justify-center md:border-l md:border-t md:border-gray-200 md:p-8 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-200">
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
            <div className="flex flex-col items-center justify-center md:border-l md:border-t md:border-gray-200 md:p-8 lg:p-14">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-200">
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
      {/*  */}
      <SectionWrapper id="snapshot" {...sectionQuery}>
        <section className="relative bg-gray-50 pt-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
              Application Snapshot
            </h2>
            <div className="grid grid-cols-1 gap-4 pb-4 md:grid-cols-2 lg:grid-cols-3">
              {/* Card 1 */}
              <div className="transform rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/1645923179/photo/stock-market-and-exchange-chart-and-numbers.jpg?s=2048x2048&w=is&k=20&c=NNl980Aeq9GSKCHUbZXua52QvKpXh3dh2YIsRosUo-Q="
                  alt="Feature 1"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Real-Time Data
                  </h3>
                  <p className="text-gray-600">
                    Access live market data and analytics to make informed
                    trading decisions. Stay ahead of the curve with
                    up-to-the-minute information.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="transform rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/1796395298/photo/close-up-on-a-computer-screen-with-real-time-stock-market-analytics-graphs-and-reports-stock.jpg?s=2048x2048&w=is&k=20&c=6g04dq_ZM-2WzBAumjFUzqXSM1VtIjm6OSONuXqCvMo="
                  alt="Feature 2"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Advanced Charting
                  </h3>
                  <p className="text-gray-600">
                    Utilize advanced charting tools to visualize market trends
                    and patterns. Customize your charts to suit your trading
                    style and preferences.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="transform rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/1358050858/photo/financial-analyst-working-on-a-computer-with-multi-monitor-workstation-with-real-time-stocks.jpg?s=2048x2048&w=is&k=20&c=hQVVYYT4Jk082rxBujsy8KQ3u7Yj0jDGcTu4l9zywiI="
                  alt="Feature 3"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Custom Alerts
                  </h3>
                  <p className="text-gray-600">
                    Set personalized alerts for price changes, volume spikes,
                    and other market events. Never miss an opportunity with
                    timely notifications.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="transform rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/1455038781/photo/business-woman-hand-using-smart-phone-with-cafe-shop-stock-market-charts-on-phone-and-laptop.jpg?s=2048x2048&w=is&k=20&c=brCcH1vktDyr3Qt3v9PYgnG93n91JQ_BGbocVfPIRLU="
                  alt="Feature 4"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Portfolio Management
                  </h3>
                  <p className="text-gray-600">
                    Manage your investments with our intuitive portfolio
                    management tools. Track performance, analyze risk, and
                    optimize your asset allocation.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="transform rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/1796395298/photo/close-up-on-a-computer-screen-with-real-time-stock-market-analytics-graphs-and-reports-stock.jpg?s=2048x2048&w=is&k=20&c=6g04dq_ZM-2WzBAumjFUzqXSM1VtIjm6OSONuXqCvMo="
                  alt="Feature 5"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    Risk Assessment
                  </h3>
                  <p className="text-gray-600">
                    Evaluate your trading strategies with comprehensive risk
                    assessment tools. Make data-driven decisions to minimize
                    potential losses.
                  </p>
                </div>
              </div>

              {/* Card 6 */}
              <div className="transform rounded-lg bg-white shadow-lg transition-transform hover:scale-105">
                <img
                  src="https://media.istockphoto.com/id/1358050858/photo/financial-analyst-working-on-a-computer-with-multi-monitor-workstation-with-real-time-stocks.jpg?s=2048x2048&w=is&k=20&c=hQVVYYT4Jk082rxBujsy8KQ3u7Yj0jDGcTu4l9zywiI="
                  alt="Feature 6"
                  className="h-48 w-full rounded-t-lg object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    User-Friendly Interface
                  </h3>
                  <p className="text-gray-600">
                    Experience a seamless user interface designed for traders of
                    all levels. Navigate effortlessly and access all features
                    with ease.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/*  */}
      <SectionWrapper id="features" {...sectionQuery}>
        <section className="mx-auto min-h-[800px] max-w-screen-xl rounded-lg px-6 py-6">
          <h2 className="mb-4 text-center text-4xl font-bold text-primary-foreground">
            Features
          </h2>
          <p className="mb-12 text-center text-lg text-gray-500">
            Here are some of the awesome features we provide.
          </p>
          <div className="mb-10 flex w-full flex-col sm:flex-row">
            <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
              <div className="relative ml-0 mr-0 h-full sm:mr-10">
                <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-indigo-500"></span>
                <div className="relative h-full rounded-lg border-2 border-indigo-500 bg-white p-5">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    Comprehensive Analytics
                  </h3>
                  <p className="mb-1 mt-3 text-xs font-medium uppercase text-indigo-500">
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
              <div className="relative ml-0 h-full md:mr-10">
                <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-purple-500"></span>
                <div className="relative h-full rounded-lg border-2 border-purple-500 bg-white p-5">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    User-Friendly Interface
                  </h3>
                  <p className="mb-1 mt-3 text-xs font-medium uppercase text-purple-500">
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
          <div className="mb-5 flex w-full flex-col sm:flex-row">
            <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
              <div className="relative ml-0 mr-0 h-full sm:mr-10">
                <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-blue-400"></span>
                <div className="relative h-full rounded-lg border-2 border-blue-400 bg-white p-5">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    Secure and Reliable
                  </h3>
                  <p className="mb-1 mt-3 text-xs font-medium uppercase text-blue-400">
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
            <div className="mb-10 w-full sm:mb-0 sm:w-1/2">
              <div className="relative ml-0 mr-0 h-full sm:mr-10">
                <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded-lg bg-yellow-400"></span>
                <div className="relative h-full rounded-lg border-2 border-yellow-400 bg-white p-5">
                  <h3 className="my-2 text-lg font-bold text-gray-800">
                    Real-Time Notifications
                  </h3>
                  <p className="mb-1 mt-3 text-xs font-medium uppercase text-yellow-400">
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
      {/*  */}

      {/*  */}
      {/* Trading Insights Section */}
      <SectionWrapper id="trading-slider" {...sectionQuery}>
        <ImageSlider />
      </SectionWrapper>
      {/* Testimonials Section */}
      <SectionWrapper id="testimonials" {...sectionQuery}>
        <section className="mx-auto max-w-screen-xl rounded-lg px-6 py-16">
          <h2 className="mb-4 text-center text-4xl font-bold">Testimonials</h2>
          <p className="mb-12 text-center text-lg text-gray-500">
            Here's what our users have to say about us.
          </p>
          <div className="flex max-h-[400px] flex-col items-center justify-center gap-8 overflow-y-auto md:flex-row">
            {/* Testimonial 1 */}
            <div className="flex w-full flex-col rounded-lg border bg-white hover:shadow-lg md:w-1/2 lg:w-1/3">
              <div className="flex flex-grow flex-col items-start justify-center p-5">
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
                <div className="flex flex-col items-start justify-center gap-5 text-left">
                  <p className="text-sm italic md:text-base">
                    "I love how easy it is to track my trades and analyze my
                    performance. The insights I've gained have been invaluable."
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      Maria Garcia
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="rounded-b-lg bg-sky-500 p-0.5"></div>
            </div>

            {/* Testimonial 2 */}
            <div className="flex w-full flex-col rounded-lg border bg-white hover:shadow-lg md:w-1/2 lg:w-1/3">
              <div className="flex flex-grow flex-col items-start justify-center p-5">
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
                <div className="flex flex-col items-start justify-center gap-5 text-left">
                  <p className="text-sm italic md:text-base">
                    "The best trading journal I've ever used. It's helped me
                    stay organized and make better trading decisions."
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      David Lee
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="rounded-b-lg bg-sky-500 p-0.5"></div>
            </div>

            {/* Testimonial 3 */}
            <div className="flex w-full flex-col rounded-lg border bg-white hover:shadow-lg md:w-1/2 lg:w-1/3">
              <div className="flex flex-grow flex-col items-start justify-center p-5">
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
                <div className="flex flex-col items-start justify-center gap-5 text-left">
                  <p className="text-sm italic md:text-base">
                    "Highly recommend Trading Journal to any trader looking to
                    improve their strategy and performance."
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      Sarah Brown
                    </h3>
                    <p className="text-xs md:text-sm">Trader</p>
                  </div>
                </div>
              </div>
              <div className="rounded-b-lg bg-sky-500 p-0.5"></div>
            </div>
            {/* Testimonial 4 */}
            <div className="flex w-full flex-col rounded-lg border bg-white hover:shadow-lg md:w-1/2 lg:w-1/3">
              <div className="flex flex-grow flex-col items-start justify-center p-5">
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
                <div className="flex flex-col items-start justify-center gap-5 text-left">
                  <p className="text-sm italic md:text-base">
                    "This trading journal has transformed my trading experience.
                    The insights I gained have been invaluable!"
                  </p>
                  <div>
                    <h3 className="text-xl font-semibold md:text-2xl">
                      John Doe
                    </h3>
                    <p className="text-xs md:text-sm">Professional Trader</p>
                  </div>
                </div>
              </div>
              <div className="rounded-b-lg bg-sky-500 p-0.5"></div>
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/* Pricing Section */}
      <SectionWrapper id="pricing" {...sectionQuery}>
        <SectionWrapper id="pricing" {...sectionQuery}>
          <section className="bg-blue-50 py-10">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
                Choose Your Trading Plan
              </h2>
              <p className="mb-10 text-gray-600">
                Select a plan that fits your trading needs and start maximizing
                your potential today!
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {/* Basic Plan */}
                <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
                  <h3 className="mb-2 text-xl font-semibold text-lime-500">
                    Basic Plan
                  </h3>
                  <p className="mb-4 text-2xl text-gray-900">$10/month</p>

                  <ul className="mb-6 text-gray-700">
                    <li>Track up to 200 trades</li>
                    <li>Advanced analytics and insights</li>
                    <li>Priority email support</li>
                    <li>Access to trading community</li>
                  </ul>
                  <button className="w-full self-end rounded-lg bg-lime-500 py-2 text-white transition duration-300 hover:opacity-75">
                    Choose Pro
                  </button>
                </div>

                {/* Pro Plan */}
                <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
                  <h3 className="mb-2 text-xl font-semibold text-lime-500">
                    Pro Plan
                  </h3>
                  <p className="mb-4 text-2xl text-gray-900">$25/month</p>
                  <ul className="mb-6 text-gray-700">
                    <li>Track up to 200 trades</li>
                    <li>Advanced analytics and insights</li>
                    <li>Priority email support</li>
                    <li>Access to trading community</li>
                  </ul>
                  <button className="w-full rounded-lg bg-lime-500 py-2 text-white transition duration-300 hover:opacity-75">
                    Choose Pro
                  </button>
                </div>

                {/* Premium Plan */}
                <div className="transform rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
                  <h3 className="mb-2 text-xl font-semibold text-lime-500">
                    Premium Plan
                  </h3>
                  <p className="mb-4 text-2xl text-gray-900">$50/month</p>
                  <ul className="mb-6 text-gray-700">
                    <li>Unlimited trade tracking</li>
                    <li>Comprehensive analytics and insights</li>
                    <li>24/7 support via chat</li>
                    <li>Personalized trading strategies</li>
                  </ul>
                  <button className="w-full rounded-lg bg-lime-500 py-2 text-white transition duration-300 hover:opacity-75">
                    Choose Premium
                  </button>
                </div>
              </div>
            </div>
          </section>
        </SectionWrapper>
      </SectionWrapper>
      {/* FAQs Section */}
      <SectionWrapper id="faqs" {...sectionQuery}>
        <div className="mx-auto max-w-screen-lg py-4">
          <div className="mb-16 text-center">
            <p className="font-regular mt-4 text-sm leading-7 text-gray-500">
              F.A.Q
            </p>
            <h3 className="text-3xl font-extrabold leading-normal tracking-tight text-gray-900 sm:text-4xl">
              Frequently Asked{" "}
              <span className="text-indigo-600">Questions</span>
            </h3>
          </div>

          {/* Technical Section */}
          <div className="mb-10 items-start px-10 sm:flex sm:px-16">
            <h3 className="w-3/12 py-3 text-lg font-bold text-gray-900">
              Technical
            </h3>
            <div className="w-9/12">
              {faqData.slice(0, 5).map((faq, index) => (
                <div className="mb-8 flex items-start" key={index}>
                  <div className="mr-3 hidden items-center justify-center rounded-full border-4 border-white bg-indigo-500 p-3 text-xl font-semibold text-white sm:flex">
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
                      className="mb-2 flex cursor-pointer items-center font-semibold text-gray-900 transition duration-300 ease-in-out hover:text-indigo-600"
                      onClick={() => toggleAnswer(index)}
                    >
                      {expandedFAQIndex === index ? (
                        <FaMinus className="mr-2" />
                      ) : (
                        <FaPlus className="mr-2" />
                      )}
                      {faq.question}
                    </h1>
                    <div
                      className={`transform transition-all duration-500 ease-in-out ${
                        expandedFAQIndex === index
                          ? "max-h-40 scale-100"
                          : "max-h-0 scale-0"
                      } overflow-hidden`}
                    >
                      {expandedFAQIndex === index && (
                        <p className="text-sm text-gray-500">{faq.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Section */}
          <div className="mb-10 items-start px-10 sm:flex sm:px-16">
            <h3 className="w-3/12 py-3 text-lg font-bold text-gray-900">
              Billing
            </h3>
            <div className="w-9/12">
              {faqData.slice(5).map((faq, index) => (
                <div className="mb-8 flex items-start" key={index + 5}>
                  <div className="mr-3 hidden items-center justify-center rounded-full border-4 border-white bg-indigo-500 p-3 text-xl font-semibold text-white sm:flex">
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
                      className="mb-2 flex cursor-pointer items-center font-semibold text-gray-900 transition duration-300 ease-in-out hover:text-indigo-600"
                      onClick={() => toggleAnswer(index + 5)}
                    >
                      {expandedFAQIndex === index + 5 ? (
                        <FaMinus className="mr-2" />
                      ) : (
                        <FaPlus className="mr-2" />
                      )}
                      {faq.question}
                    </h1>
                    <div
                      className={`transform transition-all duration-500 ease-in-out ${
                        expandedFAQIndex === index + 5
                          ? "max-h-40 scale-100"
                          : "max-h-0 scale-0"
                      } overflow-hidden`}
                    >
                      {expandedFAQIndex === index + 5 && (
                        <p className="text-sm text-gray-500">{faq.answer}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
      {/* Contact Section */}
      <SectionWrapper id="contact" {...sectionQuery}>
        <section className="bg-blue-50 px-6 dark:bg-slate-800">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-center">
              {/* Contact Section Content */}
            </div>
          </div>
        </section>
      </SectionWrapper>
      {/* Contact Section */}
      <SectionWrapper id="contact" {...sectionQuery}>
        <section className="bg-blue-50 px-6 py-16 dark:bg-slate-800 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-4 text-center">
              <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
                Contact
              </p>
              <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                Get in Touch
              </h2>
              <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
                We are here to assist you with any inquiries or support you may
                need.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="h-full pr-6">
                <p className="mb-12 mt-3 text-lg text-gray-600 dark:text-slate-400">
                  Feel free to reach out to us through the following channels:
                </p>
                <ul className="mb-6">
                  <li className="mb-4 flex">
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
                  <li className="mb-4 flex">
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
                  <li className="mb-4 flex">
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
                      className="font-xl w-full rounded-md bg-blue-800 px-6 py-3 text-white sm:mb-0"
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
      <footer className="bg-[#111c43] lg:grid lg:grid-cols-5">
        <div className="relative block h-32 lg:col-span-2 lg:h-full">
          <img
            src="https://images.unsplash.com/photo-1651340981821-b519ad14da7c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>

        <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <p>
                <span className="text-xs uppercase tracking-wide text-gray-500">
                  {" "}
                  Call us{" "}
                </span>
                <a
                  href="#"
                  className="block text-2xl font-medium text-white hover:opacity-75 sm:text-3xl"
                >
                  0123456789
                </a>
              </p>

              <ul className="mt-8 space-y-1 text-sm text-gray-300">
                <li>Monday to Friday: 10am - 5pm</li>
                <li>Weekend: 10am - 3pm</li>
              </ul>

              <ul className="mt-8 flex gap-6">
                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    <span className="sr-only">Instagram</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>

                <li>
                  <a
                    href="#"
                    rel="noreferrer"
                    target="_blank"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    <span className="sr-only">Dribbble</span>
                    <svg
                      className="size-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <p className="font-medium text-white">Services</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      1on1 Coaching{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      Company Review{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      Accounts Review{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      HR Consulting{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      SEO Optimisation{" "}
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="font-medium text-white">Company</p>
                <ul className="mt-6 space-y-4 text-sm">
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      About{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      Meet the Team{" "}
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-300 transition hover:opacity-75"
                    >
                      {" "}
                      Accounts Review{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-gray-100 pt-12">
            <div className="sm:flex sm:items-center sm:justify-between">
              <ul className="flex flex-wrap gap-4 text-xs">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Terms & Conditions{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Privacy Policy{" "}
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 transition hover:opacity-75"
                  >
                    {" "}
                    Cookies{" "}
                  </a>
                </li>
              </ul>

              <p className="mt-8 text-xs text-gray-300 sm:mt-0">
                &copy; 2022. Company Name. All rights reserved.
              </p>
            </div>
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
    }, [activeSection, id, inView, searchParams, setSearchParams]);

    return (
      <div ref={ref} id={id} role="region" aria-labelledby={id}>
        {children}
      </div>
    );
  },
);
