import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://backendpingpal.onrender.com/api/auth/login", { email, password });
      localStorage.setItem("token", response.data.token); // Save JWT token
      toast.success("Login successful! Redirecting...", { position: "top-center" });
      setTimeout(() => navigate("/CreateChat"), 2000); // Redirect after 2 seconds
    } catch (err) {
      toast.error(err.response?.data?.message || "An error occurred.", { position: "top-center" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"} // Toggle password visibility
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-green-500 focus:outline-none"
              onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
            >
              {showPassword ? (
                <span className="font-semibold">Hide</span>
              ) : (
                <span className="font-semibold">Show</span>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-green-500 hover:underline">
              Register here
            </a>
          </p>
          <p className="mt-2">
            <a href="/forgot-password" className="text-green-500 hover:underline">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
