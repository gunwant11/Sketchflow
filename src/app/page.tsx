'use client'
import React from "react";
import RenderCanvas from "./components/RenderCanvas";


export default function Home() {
 
  return (
    <div className=" bg-zinc-300  h-screen flex flex-col  ">
      <div className=" bg-zinc-900 w-full  h-16 flex justify-between " >
        <div className="text-2xl text-medium flex items-center ml-4" >DoodleCraft  </div>
      
      </div>
      <RenderCanvas />
    </div>
  )
}
