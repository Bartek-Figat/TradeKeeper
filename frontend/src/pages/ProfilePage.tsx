import React, { useState } from "react";
import { useSelector } from "react-redux";

const ProfilePage: React.FC = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [company, setCompany] = useState("Flowbite");
  const [phone, setPhone] = useState("123-456-7890");
  const [website, setWebsite] = useState("flowbite.com");
  const [visitors, setVisitors] = useState("");
  const [email, setEmail] = useState("john.doe@example.com");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const darkMode = useSelector(
    (state: { darkMode: boolean }) => state.darkMode,
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    alert("Profile Updated!");
  };

  return (
    <section
      className={`my-auto py-10 ${darkMode ? "dark:bg-gray-900" : "bg-[#f9f9f9] shadow-md"}`}
    >
      <div
        className={`mx-auto max-w-3xl rounded-lg p-8 shadow-lg ${darkMode ? "bg-gray-800 text-white" : "bg-white text-[#000080]"}`}
      >
        <h2
          className={`mb-6 text-2xl font-bold ${darkMode ? "text-white" : "text-[#000080]"}`}
        >
          Profile Settings
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6 grid gap-6 sm:grid-cols-2">
            <div>
              <label
                htmlFor="first_name"
                className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
                placeholder="John"
                required
              />
            </div>
            <div>
              <label
                htmlFor="last_name"
                className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
              >
                Last name
              </label>
              <input
                type="text"
                id="last_name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
                placeholder="Doe"
                required
              />
            </div>
            <div>
              <label
                htmlFor="company"
                className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
              >
                Company
              </label>
              <input
                type="text"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
                placeholder="Flowbite"
                required
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
              >
                Phone number
              </label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
                placeholder="123-456-7890"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                required
              />
            </div>
            <div>
              <label
                htmlFor="website"
                className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
              >
                Website URL
              </label>
              <input
                type="url"
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
                placeholder="flowbite.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="visitors"
                className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
              >
                Unique visitors (per month)
              </label>
              <input
                type="number"
                id="visitors"
                value={visitors}
                onChange={(e) => setVisitors(e.target.value)}
                className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
                placeholder=""
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="email"
              className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
              placeholder="john.doe@company.com"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
              placeholder="•••••••••"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm_password"
              className={`mb-2 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-[#000080]"}`}
            >
              Confirm password
            </label>
            <input
              type="password"
              id="confirm_password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`block w-full rounded-md border p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500 ${darkMode ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400" : "border-gray-300 bg-gray-50 text-[#000080]"}`}
              placeholder="•••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full rounded-md px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 ${darkMode ? "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800" : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"}`}
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default ProfilePage;
