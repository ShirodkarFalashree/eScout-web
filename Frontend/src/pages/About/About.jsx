import React from "react";

const About = () => {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-blue-500 to-purple-600 text-white py-20 px-6 text-center">        <h1 className="text-4xl md:text-6xl font-bold">About eScout</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Empowering your search with AI-driven summaries and insights, eScout simplifies complex information for an enhanced user experience.
        </p>
      </div>

      {/* Features Section */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-white">
          Why Choose eScout?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <div className="text-blue-400 text-5xl mb-4">
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Smart Search</h3>
            <p>
              Find exactly what you’re looking for with advanced web crawling and scraping capabilities.
            </p>
          </div>
          {/* Feature 2 */}
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <div className="text-blue-400 text-5xl mb-4">
              <i className="fas fa-brain"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">AI-Powered Summaries</h3>
            <p>
              Get concise summaries of your search results, saving you time and effort.
            </p>
          </div>
          {/* Feature 3 */}
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <div className="text-blue-400 text-5xl mb-4">
              <i className="fas fa-history"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Saved History</h3>
            <p>
              Easily revisit your past searches with our history tracking feature.
            </p>
          </div>
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <div className="text-blue-400 text-5xl mb-4">
              <i className="fas fa-file-export"></i>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-white">Export Content</h3>
            <p>
              Easily export the data and share it with others.
            </p>
          </div>
        </div>
      </div>

      {/* How We Came Up With This Idea */}
      <div className="py-16 bg-gray-800 px-6">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-white">
          How We Came Up With This Idea
        </h2>
        <div className="text-lg max-w-4xl mx-auto space-y-4">
          <p>
            The idea for eScout was born during our brainstorming sessions for solving common challenges faced by internet users. We noticed that while search engines are incredibly powerful, they often present information in overwhelming amounts, leaving users to sift through irrelevant results.
          </p>
          <p>
            Our team wanted to create a tool that not only retrieves information but also intelligently summarizes it, making it easier for users to find what they need. This need for simplicity and efficiency inspired us to integrate **AI-driven summarization** and **intuitive UI features** into a single platform.
          </p>
          <p>
            Additionally, we aimed to provide solutions for saving search history and creating personalized experiences. The result? A platform that makes searching smarter, faster, and more insightful for everyone.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gradient-to-br from-blue-500 to-purple-600 text-white text-center px-6">
        <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-white">
          Our Mission
        </h2>
        <p className="text-lg max-w-4xl mx-auto">
          At eScout, our mission is to revolutionize the way users interact with information. We aim to deliver fast, accurate, and insightful results, enabling users to make informed decisions effortlessly.
        </p>
      </div>

      {/* Team Section */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-8 text-white">
          Meet Our Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white">Falashree Shirodkar</h3>
            <p className="text-gray-400">Developer</p>
          </div>
          {/* Team Member 2 */}
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white">Avishkar Kakade</h3>
            <p className="text-gray-400"> Developer</p>
          </div>
          {/* Team Member 3 */}
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white">Ayush Sonawane</h3>
            <p className="text-gray-400">UI/UX Designer</p>
          </div>
          <div className="bg-gray-800 shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-semibold text-white">Kartik Sawant</h3>
            <p className="text-gray-400">UI/UX Designer</p>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-900 text-white py-6 text-center">
        <p>&copy; 2024 eScout. All rights reserved.</p>
      </div>
    </div>
  );
};

export default About;
