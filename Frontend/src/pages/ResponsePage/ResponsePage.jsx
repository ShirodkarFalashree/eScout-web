import React, { useState } from "react";
import { TextGenerateEffect } from "../../components/text-generate-effect";
import { PiBookmarkSimpleBold } from "react-icons/pi"; // Unfilled icon
import { RxBookmarkFilled } from "react-icons/rx"; // Filled icon
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles
import './ResponsePage.css'; // Ensure you import your CSS file here

const ResponsePage = () => {
  const [isSaved, setIsSaved] = useState(false); // State to track if the page is saved

  const benefit1 = "● Flexibility Enhancement: Increases range of motion and reduces stiffness in muscles and joints.";
  const benefit2 = "● Stress Relief: Promotes relaxation and helps in managing stress through mindfulness and breathing techniques.";
  const benefit3 = "● Improved Posture: Strengthens core muscles, leading to better posture and alignment.";
  const benefit4 = "● Enhanced Mental Clarity: Encourages focus and mental discipline, improving concentration and cognitive function.";
  const benefit5 = "● Better Sleep Quality: Aids in relaxing the body and mind, resulting in more restful and deep sleep.";

  // Function to handle save button click and trigger toast notification
  const handleSaveClick = () => {
    setIsSaved((prev) => !prev); // Toggle the save state

    // Show the toast notification based on the save state
    if (!isSaved) {
      toast("Document added in saved!", {
        position: "bottom-right",
        style: { backgroundColor: '#ffffffdc', color: 'black',borderRadius: '10px' },
        autoClose: false, // Prevent auto close, disables loader
            closeOnClick: false,
      });
    } else {
      toast("Document removed from saved!", {
        position: "bottom-right",
        style: { backgroundColor: '#ffffffdc', color: 'black',
          borderRadius: '10px'
         },
         autoClose: false, // Prevent auto close, disables loader
            closeOnClick: false,
      });
    }
  };

  return (
    <div className="bg-[#0f0f0f] flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6">
      <div className="relative bg-white bg-opacity-5 flex items-center h-14 w-full rounded-xl text-xl">
        <p className="w-full text-center">Benefits of Yoga</p>
        <div
          className="absolute right-4 text-white text-3xl w-16 h-16 flex items-center justify-end rounded-full cursor-pointer"
          onClick={handleSaveClick} // Add click event to toggle save
        >
          {/* Conditional rendering based on isSaved state */}
          {isSaved ? <RxBookmarkFilled /> : <PiBookmarkSimpleBold />}
        </div>
      </div>

      <div className="h-60 w-full border rounded-xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2">
        <img
          src={"https://tse3.mm.bing.net/th?id=OIP.4HSEooX6WzgnTpw1BeaenAHaFo&pid=Api&P=0&h=180"}
          className="object-cover w-full h-full col-span-2 row-span-2 rounded-xl"
          alt="Yoga Image 1"
        />
        <img
          src={"https://tse1.mm.bing.net/th?id=OIP.LkONmWDC-jBKPkL5GthCDQHaI4&pid=Api&P=0&h=180"}
          className="object-cover w-full h-full rounded-xl"
          alt="Yoga Image 2"
        />
        <img
          src={"https://img.freepik.com/premium-vector/cartoon-panda-doing-yoga-vector-illustration_607277-253.jpg?w=996"}
          className="object-cover w-full h-full rounded-xl"
          alt="Yoga Image 3"
        />
        <img
          src={"https://tse4.mm.bing.net/th?id=OIP.8FzYcXfe07gXTYIpj6W2YQHaFj&pid=Api&P=0&h=180"}
          className="object-cover w-full h-full rounded-xl"
          alt="Yoga Image 4"
        />
        <img
          src={"https://static.toiimg.com/photo/92353710.cms"}
          className="object-cover w-full h-full rounded-xl"
          alt="Yoga Image 5"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-5xl text-[#3941FB] font-sans font-bold">Benefits of Yoga</h1>
        </div>
        <div>
          <TextGenerateEffect words={benefit1} />
          <TextGenerateEffect words={benefit2} />
          <TextGenerateEffect words={benefit3} />
          <TextGenerateEffect words={benefit4} />
          <TextGenerateEffect words={benefit5} />
        </div>
      </div>

      {/* Toast container to show notifications */}
      <ToastContainer className="custom-toast-container" />
    </div>
  );
};

export default ResponsePage;
