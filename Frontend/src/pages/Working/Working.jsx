import React from "react";

const Working = () => {
  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen py-10 px-6">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white">How eScout Works</h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          Explore the powerful steps behind eScout's search and summarization process.
        </p>
      </div>

      {/* Steps Section */}
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Step 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">1. User Input</h2>
            <p>
              The journey starts with you entering a query into the search bar. This input defines
              the topic or information you're looking for.
            </p>
          </div>
         
        </div>

        {/* Step 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              2. Web Crawling and Scraping
            </h2>
            <p>
              eScout's web crawler searches through various websites and fetches the most relevant
              data. 
            </p>
          </div>
          
        </div>

        {/* Step 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              3. AI-Powered Summarization
            </h2>
            <p>
              Our AI models analyze the gathered data to create concise, accurate summaries. This
              ensures you get the key insights without the hassle of reading long articles.
            </p>
          </div>
          
        </div>

        {/* Step 4 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">4. Display Results</h2>
            <p>
              The processed and summarized results are displayed on an interactive interface,
              allowing you to navigate and explore the content seamlessly.
            </p>
          </div>
          
        </div>

        {/* Step 5 */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              5. Export and History
            </h2>
            <p>
              Users can export summaries or revisit previous searches through the history feature,
              enhancing productivity and convenience.
            </p>
          </div>
         
        </div>
      </div>

      {/* Footer Section */}
      <div className="bg-gray-800 text-white py-6 text-center mt-12">
        <p>&copy; 2024 eScout. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Working;
