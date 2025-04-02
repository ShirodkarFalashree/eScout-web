import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundGradientAnimation } from "../../components/Background";
import image1 from "../../assets/1.png";
import image2 from "../../assets/2.png";

const GetStarted = () => {
  const [currentImage, setCurrentImage] = useState(image1);
  const [isSecondImage, setIsSecondImage] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isSecondImage) {
      setCurrentImage(image2);
      setIsSecondImage(true);
    } else {
      navigate("/");
    }
  };

  return (
    <BackgroundGradientAnimation>
      <div className="h-screen relative">
        <img className="h-full w-full object-cover" src={currentImage} alt="Background" />
        <button
          onClick={handleClick}
          className="absolute bottom-10 text-[24px] font-bold w-[80%] h-[60px] left-10 text-white bg-[#2702C2] rounded-lg"
        >
          {isSecondImage ? "Let's Go" : "Next"}
        </button>
      </div>
    </BackgroundGradientAnimation>
  );
};

export default GetStarted;
