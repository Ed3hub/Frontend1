"use client";

import Carousel from "./ui/carousel";

export function HomeCarousel(){
    const slideData=[
        {
            title:"Learn,Earn and Grow with Ed3Hub",
            button:"",
            src:""
         },
         {
            title:"Your Journey Comes with Reward",
            button:"",
            src:""
         },
         {
            title:"Turn Knowledge into Reward",
            button:"",
            src:""
         },

        
    ];
    return(
        <div className="relative overflow-hidden w-full h-full py-20">
            <Carousel slides={slideData}/>
        </div>
    )
}