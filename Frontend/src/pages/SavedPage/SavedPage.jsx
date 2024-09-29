import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { BackgroundGradientAnimation } from '../../components/Background';
import { AnimatedList } from '../../components/AnimatedList';

const items = [
  <div key="1" className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2">Benifite of yoga</div>,
  <div key="2" className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2">recursion in cpp</div>,
  <div key="3" className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2">healthy dal recipe</div>,
  <div key="7" className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2">React hooks</div>,
  <div key="8" className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2">test plan for project</div>,
  <div key="9" className="p-4 py-8 text-white text-2xl bg-gray-200 bg-opacity-35 border border-1 rounded-3xl z-10 mx-2">java prime number program</div>,
  // Add more items as needed
];

const SavedPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleClick = () => {
    navigate('/response'); // Redirect to the response page
  };

  return (
    <div onClick={handleClick} className="cursor-pointer"> {/* Wrap everything in a div with onClick */}
      <BackgroundGradientAnimation onClick={handleClick}>
        <AnimatedList delay={500} className="m-3 z-50" onClick={handleClick}>
          {items}
        </AnimatedList>
      </BackgroundGradientAnimation>
    </div>
  );
}

export default SavedPage;
