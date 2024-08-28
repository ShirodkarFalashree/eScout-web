import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={` bg-transparent text-white p-4 h-screen transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative fixed w-64 z-50`}   style={{ 
        backdropFilter: 'blur(30px)', // Apply the blur effect to the sidebar
        backgroundColor: 'rgba(0, 0, 0, 0.3)' // Semi-transparent background to make the blur effect visible
      }}>
      <button onClick={toggleSidebar} className="text-white mb-4 md:hidden ">
        Close
      </button>
      <h2 className="text-xl font-semibold mb-4">Sidebar</h2>
      <nav>
        <ul>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-400">Home</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-400">About</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-400">Services</a>
          </li>
          <li className="mb-2">
            <a href="#" className="hover:text-gray-400">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
