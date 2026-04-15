

import SpotLightContainer from "./components/SpotLightContainer";
import Banner from "./components/Banner";
import CategoryButton from "./components/CategoryButton";
import YoutubeReelContainer from "./components/YoutubeReelContainer";
import Heading from './components/Heading'
import MembershipBanner from './components/MembershipBanner';
import Categories from './components/Categories';
import Testmonial from './components/Testmonial';
import TestmonialContainer from "./components/TestmonialContainer";
import Recipe from "./components/Recipe";

export default function Home() {
  console.log("inside home")

  return (
  <div className="w-full">
    <CategoryButton/>
    <Banner/>
    <SpotLightContainer/>
   <MembershipBanner/>
   <Categories/>
    <YoutubeReelContainer/>
     <TestmonialContainer/>
     {/* To do work */}
      {/* <Recipe/>
     <Blog/> */}
    
      
  </div>
  );
}
