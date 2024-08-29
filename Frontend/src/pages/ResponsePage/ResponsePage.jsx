import React from "react";
import { BackgroundGradientAnimation } from "../../components/Background";
import { TextGenerateEffect } from "../../components/text-generate-effect";
import { FaCircle } from "react-icons/fa";

const ResponsePage = () => {
       
const word1 = "● Snapshot of Data: Concise overview of various data types for easy understanding."
const word2 = "● Key Insights: Highlights essential insights for better decision-making."
const word3 = "● Actionable Information: Distills data into actionable points for quick reference."
const word4 = "● Trend Identification: Helps identify trends and patterns for enhanced comprehension."
const word5 = "● Trend Identification: Helps identify trends and patterns for enhanced comprehension."
const word6 = "● Trend Identification: Helps identify trends and patterns for enhanced comprehension."
  return (
    // <BackgroundGradientAnimation>
    <div className=" bg-[#191919]  flex flex-col gap-6 bg-opacity-100 text-white w-full h-full p-6 ">
      <div className="bg-white bg-opacity-5 flex justify-center items-center  h-14 w-full rounded-xl text-xl">
        <p>query will be here</p>
      </div>
      <div className="h-60 w-full border rounded-xl overflow-hidden grid grid-cols-4 grid-rows-2 gap-2">
        <img
          src={
            "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          }
          className="object-cover w-full h-full col-span-2 row-span-2 rounded-xl"
        />
        <img
          src={
            "data:image/jpeg;base64,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"
          }
          className="object-cover w-full h-full rounded-xl"
        />
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQphO1iGa3a8wJpd43zAbREvXa8q4DmAIKww&s"
          }
          className="object-cover w-full h-full rounded-xl"
        />
        <img
          src={
            "data:image/jpeg;base64,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"
          }
          className="object-cover w-full h-full rounded-xl"
        />
        <img
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCyOEc0bADQWarGB2ARkzQyYg4eGfWmx65w&s"
          }
          className="object-cover w-full h-full rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-5xl text-[#3941FB] font-sans font-bold ">
            This will be titile for search
          </h1>
        </div>
        <div>
          <TextGenerateEffect words={word1} />
          <TextGenerateEffect words={word2} />
          <TextGenerateEffect words={word3} />
          <TextGenerateEffect words={word4} />
          <TextGenerateEffect words={word5} />
          <TextGenerateEffect words={word6} />
        </div>
      </div>
    </div>
    // </BackgroundGradientAnimation>
  );
};

export default ResponsePage;
