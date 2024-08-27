import React, { useEffect } from 'react';
import "./main.css"; 
import { IoMdSend } from "react-icons/io";
import { FaMicrophone } from "react-icons/fa";
import { IoMdPhotos } from "react-icons/io";



const Main = ({ toggleSidebar }) => {
  useEffect(() => {
    const interBubbles = document.querySelectorAll('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
      interBubbles.forEach((bubble) => {
        const distance = Math.sqrt(Math.pow(tgX - (bubble.offsetLeft + bubble.offsetWidth / 2), 2) +
                                   Math.pow(tgY - (bubble.offsetTop + bubble.offsetHeight / 2), 2));
        const scale = Math.max(1, 1.2 - distance / 200); // Adjust scale based on distance
        bubble.style.transform = `scale(${scale})`;
      });
      curX += (tgX - curX) / 8;
      curY += (tgY - curY) / 8;
      requestAnimationFrame(move);
    }

    function handleMouseMove(event) {
      tgX = event.clientX;
      tgY = event.clientY;
    }

    window.addEventListener('mousemove', handleMouseMove);
    move();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative flex-1 p-4 main bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-auto ">
      <button onClick={toggleSidebar} className="md:hidden text-gray-200 mb-4 z-50">
        Open Sidebar
      </button>
      <div className="nav flex h-11 justify-center text-white bg-black rounded-2xl w-[80vw] mb-2">
        <div className="logo text-3xl">eScout</div>
      </div>
      <div 
        className="interactive fixed w-96 h-96 rounded-full opacity-60"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(30px)',
          top: '0%',
          left: '0%',
        }}
      ></div>
      <div 
        className="interactive fixed w-72 h-64 rounded-full opacity-50"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(40px)',
          top: '30%',
          left: '30%',
        }}
      ></div>
      <div 
        className="interactive fixed w-96 h-96 rounded-full opacity-40"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(60px)',
          top: '60%',
          left: '10%',
        }}
      ></div>
      <div 
        className="interactive fixed w-80 h-80 rounded-full opacity-70"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(80px)',
          top: '50%',
          left: '50%',
        }}
      ></div>
      <div 
        className="interactive fixed w-72 h-64 rounded-full opacity-60"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(80px)',
          top: '0%',
          left: '80%',
        }}
      ></div>
      <div 
        className="interactive fixed w-96 h-80 rounded-full opacity-50"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(70px)',
          top: '70%',
          left: '80%',
        }}
      ></div>
      <div 
        className="interactive fixed w-72 h-64 rounded-full opacity-40"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(40px)',
          top: '10%',
          left: '60%',
        }}
      ></div>
      <div 
        className="interactive fixed w-96 h-64 rounded-full opacity-30"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(50px)',
          top: '5%',
          left: '30%',
        }}
      ></div>
      <div 
        className="interactive fixed w-96 h-64 rounded-full opacity-30"
        style={{ 
          background: 'radial-gradient(circle at center, rgba(255, 100, 255, 0.8) 0%, rgba(255, 100, 255, 0) 100%)',
          mixBlendMode: 'hard-light',
          filter: 'blur(50px)',
          top: '45%',
          left: '30%',
        }}
      ></div>
      <div className="main-container w-[80vw] h-[100vh] bg-black rounded-3xl">
{/* display of info  */}
      </div>

      {/* <div className='search-box absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[90%] max-w-md p-2 flex items-center bg-white rounded-full gap-4 z-40'> */}
      <div className='search-box absolute  w-[90%] max-w-md p-2 flex items-center bg-white rounded-full gap-4 z-40 sm:w-[100vw]'>
        <input
          type="text"
          placeholder='Enter a prompt here...'
          className='flex-grow p-3 px-5 rounded-full border-none outline-none'
        />
        <div className='text-2xl cursor-pointer'><IoMdPhotos /></div>
        <div className='text-2xl cursor-pointer'><FaMicrophone /></div>
        <div className='text-2xl cursor-pointer'><IoMdSend /></div>
      </div>
    </div>
  );
};

export default Main;
