'use client'
import React from "react";
import RenderCanvas from "./components/RenderCanvas";


export default function Home() {
 
  const [darkMode, setDarkMode] = React.useState(false)

  return (
    <div className={` bg-zinc-300  h-screen flex flex-col  ${darkMode ? 'dark' : ''} `} >
      <div className=" dark:bg-zinc-900 w-full  h-16 flex justify-between " >
        <div className="text-xl text-medium" >DoodleCraft  </div>
        <div>
          <input type="checkbox" className="mr-2" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
        </div>
      </div>
      <RenderCanvas />
    </div>
  )
}
