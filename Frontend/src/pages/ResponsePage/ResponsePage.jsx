import React from "react";
import { TextGenerateEffect } from "../../components/text-generate-effect";

const ResponsePage = () => {
       
  const benefit1 = "● Flexibility Enhancement: Increases range of motion and reduces stiffness in muscles and joints."
  const benefit2 = "● Stress Relief: Promotes relaxation and helps in managing stress through mindfulness and breathing techniques."
  const benefit3 = "● Improved Posture: Strengthens core muscles, leading to better posture and alignment."
  const benefit4 = "● Enhanced Mental Clarity: Encourages focus and mental discipline, improving concentration and cognitive function."
  const benefit5 = "● Better Sleep Quality: Aids in relaxing the body and mind, resulting in more restful and deep sleep."
  const benefit6 = "● Boosted Immunity: Supports the immune system through improved circulation and reduced inflammation."
  
  return (
    // <BackgroundGradientAnimation>
    <div className=" bg-[#191919]  flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6 ">
      <div className="bg-white bg-opacity-5 flex justify-center items-center  h-14 w-full rounded-xl text-xl">
        <p>Benifits of yoga</p>
      </div>
      <div className="h-60 w-full border rounded-xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2">
        <img
          src={
            "https://tse3.mm.bing.net/th?id=OIP.4HSEooX6WzgnTpw1BeaenAHaFo&pid=Api&P=0&h=180"
          }
          className="object-cover w-full h-full col-span-2 row-span-2 rounded-xl"
        />
        <img
          src={
            "https://tse1.mm.bing.net/th?id=OIP.LkONmWDC-jBKPkL5GthCDQHaI4&pid=Api&P=0&h=180"
          }
          className="object-cover w-full h-full rounded-xl"
        />
        <img
          src={
            "https://img.freepik.com/premium-vector/cartoon-panda-doing-yoga-vector-illustration_607277-253.jpg?w=996"
          }
          className="object-cover w-full h-full rounded-xl"
        />
        <img
          src={
            "https://tse4.mm.bing.net/th?id=OIP.8FzYcXfe07gXTYIpj6W2YQHaFj&pid=Api&P=0&h=180"
          }
          className="object-cover w-full h-full rounded-xl"
        />
        <img
          src={
            "https://static.toiimg.com/photo/92353710.cms"
          }
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-5xl text-[#3941FB] font-sans font-bold ">
            Benifits of Yoga
          </h1>
        </div>
        <div>
          <TextGenerateEffect words={benefit1} />
          <TextGenerateEffect words={benefit2} />
          <TextGenerateEffect words={benefit3} />
          <TextGenerateEffect words={benefit4} />
          <TextGenerateEffect words={benefit5} />

        </div>
      </div>
    </div>
    // </BackgroundGradientAnimation>
  );
};

export default ResponsePage;
