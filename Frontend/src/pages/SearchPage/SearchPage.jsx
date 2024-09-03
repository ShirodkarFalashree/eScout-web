// import React, { useState } from 'react';
// import { BackgroundGradientAnimation } from '../../components/Background';
// import { PlaceholdersAndVanishInput } from '../../components/InputBox';
// import { useNavigate } from 'react-router-dom';
// import { PiBookmarkSimpleBold } from "react-icons/pi";
// import { Link } from 'react-router-dom';
// const SearchPage = () => {
//   const [isClicked, setIsClicked] = useState(false);
//   const navigate = useNavigate();

//   const handleInputClick = () => {
//     // Set `isClicked` to true when the input is clicked
//     setIsClicked(true);
//   };
//   const handleSubmit = () => {
//     setTimeout(() => {
//       navigate("/crawling");
//     }, 500); // 500 ms delay before navigation
//   };
//   return (
//     <BackgroundGradientAnimation>
//       <div
//         className={`outer-div ${isClicked ? 'bg-opacity-25' : 'bg-opacity-0'} bg-white bg-blur-xl p-4 pt-8 rounded-3xl w-[430px] shadow-lg ${isClicked ? 'h-[80vh] -bottom-[160px]' : 'h-[75vh] -bottom-[600px]'} justify-end absolute left-1/2 transform -translate-x-1/2 mb-5 z-10 transition-all duration-500`}
//       >

//         <div className="search-container flex items-center justify-end relative w-[90vw] max-w-2xl mx-auto">
//           <PlaceholdersAndVanishInput
//             placeholders={["Type here to search", "Search here.."]}
//             onChange={(e) => console.log(e.target.value)}
//             onSubmit={handleSubmit} // Corrected: Pass the function directly
//             onClick={handleInputClick} // Pass the click handler to the search box
//           />
//         </div>
//         <div className="relative -bottom-[430px] left-[320px]">
//           <Link to="/saved">

//             <div className="bg-white text-black text-3xl w-16 h-16 flex items-center justify-center rounded-full">
//               <PiBookmarkSimpleBold />
//             </div>
//           </Link>
//         </div>
//       </div>
//     </BackgroundGradientAnimation>
//   );
// };

// export default SearchPage;
import React, { useState } from 'react';
import { BackgroundGradientAnimation } from '../../components/Background';
import { PlaceholdersAndVanishInput } from '../../components/InputBox';
import { useNavigate } from 'react-router-dom';
import { PiBookmarkSimpleBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
const SearchPage = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();

  const handleInputClick = () => {
    // Set `isClicked` to true when the input is clicked
    setIsClicked(true);
  };
  const handleSubmit = () => {
    setTimeout(() => {
      navigate("/crawling");
    }, 500); // 500 ms delay before navigation
  };
  return (
    <BackgroundGradientAnimation>
      <div
        className={`outer-div ${isClicked ? 'bg-opacity-25' : 'bg-opacity-0'} bg-white bg-blur-xl p-4 pt-8 rounded-3xl w-[430px] shadow-lg ${isClicked ? 'h-[90vh] -bottom-[100px]' : 'h-[80vh] -bottom-[500px]'} justify-end absolute left-1/2 transform -translate-x-1/2 mb-5 z-10 transition-all duration-500`}
      >

        <div className="search-container flex items-center justify-end relative w-[90vw] max-w-2xl mx-auto">
          <PlaceholdersAndVanishInput
            placeholders={["Type here to search", "Search here.."]}
            onChange={(e) => console.log(e.target.value)}
            onSubmit={handleSubmit} // Corrected: Pass the function directly
            onClick={handleInputClick} // Pass the click handler to the search box
          />
        </div>
        <div className="relative -bottom-[430px] left-[320px]">
          <Link to="/saved">

            <div className="bg-white text-black text-3xl w-16 h-16 flex items-center justify-center rounded-full">
              <PiBookmarkSimpleBold />
            </div>
          </Link>
        </div>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default SearchPage;
