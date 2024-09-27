import React from 'react';
import { BackgroundGradientAnimation } from '../../components/Background';

const RegisterPage = () => {
  return (
    <BackgroundGradientAnimation>
      <div className='flex justify-center items-center relative top-56 z-50'>
        <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-lg shadow-lg w-full max-w-sm">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Register</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-white text-sm font-medium">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none" // Removed focus:ring
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-white text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none" // Removed focus:ring
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-white text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="mt-1 w-full p-3 rounded-md border border-gray-300 bg-transparent text-white placeholder-white focus:outline-none" // Removed focus:ring
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md shadow-md focus:outline-none transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default RegisterPage;
