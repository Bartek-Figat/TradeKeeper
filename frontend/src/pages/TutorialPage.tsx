import React from "react";
import { motion } from "framer-motion";

const TutorialPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-blue-400 p-8">
      <h1 className="text-4xl font-bold text-center text-blue-900 mb-4">Welcome to the App Tutorial</h1>
      <p className="text-center text-lg text-blue-800 mb-8">
        This guide will help you navigate through the app's features and functionalities.
      </p>
      <div className="space-y-12">
        {/* Section 1: Getting Started */}
        <motion.div
              className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
              whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-blue-900">Getting Started</h2>
          <p className="mt-4 text-gray-600">
            Begin your journey with our app by setting up your account. Follow the easy steps to get started and explore the basic functionalities that will help you manage your tasks efficiently.
          </p>
        </motion.div>

        {/* Section 2: Features Overview */}
        <motion.div
               className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
               whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-blue-900">Features Overview</h2>
          <p className="mt-4 text-gray-600">
            Discover the powerful features of our app designed to enhance your productivity. From task management to real-time collaboration, learn how each feature can benefit you.
          </p>
        </motion.div>

        {/* Section 3: Advanced Tips */}
        <motion.div
               className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500"
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
               whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-blue-900">Advanced Tips</h2>
          <p className="mt-4 text-gray-600">
            Elevate your experience with advanced tips and tricks. Learn how to customize your settings, automate tasks, and integrate with other tools to maximize efficiency.
          </p>
        </motion.div>

        {/* Section 4: Troubleshooting */}
        <motion.div
             className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500"
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
             whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-blue-900">Troubleshooting</h2>
          <p className="mt-4 text-gray-600">
            Encountering issues? Our troubleshooting guide provides solutions to common problems, ensuring a smooth and uninterrupted experience.
          </p>
        </motion.div>

        {/* Section 5: FAQs */}
        <motion.div
            className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            whileHover={{ scale: 1.01 }}
        >
          <h2 className="text-2xl font-semibold text-blue-900">FAQs</h2>
          <p className="mt-4 text-gray-600">
            Have questions? Check out our frequently asked questions section for quick answers and helpful insights.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TutorialPage;