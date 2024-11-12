import React, { useState } from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const regClick = (e) => {
    e.preventDefault();
    navigate("/register")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://escout-web-1.onrender.com/api/v1/auth/login", // URL to the login route
        formData,
        {
          withCredentials: true, // Add this option
        }
      );
      if (response.data.success) {
        setSuccess(true);
        setError("");
        const { token } = response.data; // Get token from response
    
        // Set token in localStorage
        localStorage.setItem('token', token);
    
        // Set token in cookies
        document.cookie = `token=${token}; path=/; secure; HttpOnly;`;
    
        navigate("/"); // Redirect to homepage or dashboard after successful login
    }
    
    } catch (error) {
      console.error(error);
      setError(error.response?.data?.message || "Login Failed");
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
              <label htmlFor="email" className="block text-white text-sm font-medium">Email</label>
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
              <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
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
              Login
            </button>
          </form>
          <div className=" pl-8 text-white pt-2 opacity-70 ">
            <p>Dont have account? <span onClick={regClick} >Create Account</span></p>
          </div>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default LoginPage;
