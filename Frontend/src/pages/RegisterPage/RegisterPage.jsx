import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Save the redirect path
  const redirectPath =
    localStorage.getItem("redirectPath") || location.state?.from || "/";

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        formData
      );
      if (response.data.success) {
        setSuccess(true);
        setError("");

        const { token } = response.data; // Get token from response

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Store the token in cookies
        document.cookie = `token=${token}; path=/; secure; SameSite=Strict;`;

        // Clear the redirect path from localStorage and navigate
        localStorage.removeItem("redirectPath");
        navigate(redirectPath);
      }
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Registration Failed");
      setSuccess(false);
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="flex justify-center items-center relative top-56 z-50">
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">
            Register
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">
              Registration successful! Redirecting...
            </p>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-white text-sm font-medium"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none"
              />
            </div>
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
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none"
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
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md focus:outline-none transition duration-300"
            >
              Register
            </button>
          </form>
          <div className=" pl-14 text-white pt-2 opacity-70 ">
            <p>
              Already have an account? <a href="/login">Log in</a>
            </p>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default RegisterPage;
