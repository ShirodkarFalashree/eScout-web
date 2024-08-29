import React from 'react'
import { BackgroundGradientAnimation } from '../../components/Background'
import { PlaceholdersAndVanishInput } from '../../components/InputBox'
const SearchPage = () => {
  return (
    <BackgroundGradientAnimation>
  
  <div className=" outer-div bg-white bg-opacity-0 bg-blur-lg p-4 rounded-3xl top shadow-lg h-64 justify-end absolute -bottom-48 left-1/2 transform -translate-x-1/2 mb-8 z-10 ">
    <div className="search-container flex items-center justify-end relative w-[80vw] max-w-md mx-auto">
      <PlaceholdersAndVanishInput 
        placeholders={["Type here to search", "Search here.."]} 
        onChange={(e) => console.log(e.target.value)}
        onSubmit={() => console.log("Submitted")}
      />
    </div>

</div>

    </BackgroundGradientAnimation>
  )
}

export default SearchPage