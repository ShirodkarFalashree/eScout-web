import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic Validation
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData,
        { withCredentials: true }
      );

      if (response.data.success) {
        setSuccess(true);
        setError("");

        const { token } = response.data;
        localStorage.setItem("token", token);

        // Get redirect path or default to home
        const redirectPath = sessionStorage.getItem("redirectPath") || "/";
        sessionStorage.removeItem("redirectPath");

        // Redirect to the desired page
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login failed. Please try again.");
      setSuccess(false);
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="flex justify-center items-center relative top-56 z-50">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-500 text-center mb-4">Login successful! Redirecting...</p>}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Email Address"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm font-medium"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Password"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md focus:outline-none transition duration-300 focus:ring-2 focus:ring-blue-400"
            >
              Login
            </button>
          </form>
          <div className="pl-8 text-white pt-2 opacity-70">
            <p>
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="text-blue-400 hover:underline"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default LoginPage;
