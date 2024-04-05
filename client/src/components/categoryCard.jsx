import React from "react";
import { useState } from "react";
import img3 from "../Images/leader.png";

const CategoryCard=({name,image})=>{
  
    return(
        <div className="shadow-x w-60 h-24 rounded-2xl flex mb-8 text-white bg-[#343435] ">
           
                      <div className=" w-[50%] h-full">
                            <div className="flex flex-col h-full  text-center  mx-auto justify-center">
                                <img src={image} className="w-full h-full"/>
                            </div>
                        </div>
                        <div className=" w-[50%] p-2 h-full">
                            <div className="flex font-bold flex-col h-full text-center mx-auto justify-center">
                               {name}
                            </div>
                    </div>
        
           
           
        </div>
    )
}

export default CategoryCard;