'use client'
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import SideDrawer, { ILayer } from "./components/SideDrawer";
import Toolbar from "./components/Toolbar";
import Konva from "konva";
import { Stage } from "react-konva";

export default function Home() {
  const [activeLayer, setActiveLayer] = useState()

  const stageRef = React.useRef<Konva.Stage>(null);


  return (
    <div className=" bg-zinc-300  h-screen flex flex-col  ">
      <div className=" bg-zinc-900 w-full  h-16 " />
      <div className="flex flex-row flex-1 ">
        <Toolbar stage={stageRef} activeLayer={activeLayer}  />
        <div className=" flex-1 grid place-items-center ">
          <Stage 
        width={1004}
        height={650}
        style={{ backgroundColor: "white"}}
        ref={stageRef}
        >
          </Stage>
        </div>
        <SideDrawer stage={stageRef} activeLayer={activeLayer}  setActiveLayer={setActiveLayer} />
      </div>
    </div>
  )
}
