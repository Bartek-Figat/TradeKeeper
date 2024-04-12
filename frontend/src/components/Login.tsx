import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Perform login validation
    if (username === "admin" && password === "password") {
      toast.success("Login successful!");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="lg:w-1/2 h-full">
        <img
          src="https://images.unsplash.com/photo-1509023464722-18d996393ca8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Login Image"
          className="w-full h-full object-cover"
        />
      </div>
      <form
        onSubmit={handleLogin}
        className="flex justify-center items-center lg:w-1/2 p-4"
      >
        <div className="p-6 rounded-md">
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="text-sm text-gray-600">
            This information will be displayed publicly so be careful what you
            share.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="username"
            />

            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="password"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm text-gray-900">
                Remember Me
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
