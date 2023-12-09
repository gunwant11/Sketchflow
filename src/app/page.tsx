'use client'
import React, { useState, useEffect } from "react";
import { fabric } from "fabric";
import SideDrawer, { ILayer } from "./components/SideDrawer";
import Toolbar from "./components/Toolbar";

export const createCanvas = (id:number) => {
  const c = new fabric.Canvas(`canvas-${id}`, {
    height: 490,
    width: 920,
  });
  return c;
}

export default function Home() {
  const [canvas, setCanvas] = useState<fabric.Canvas>();
  const [layers, setLayers] = useState<ILayer[]>([])
  const [activeLayer, setActiveLayer] = useState<ILayer>()
useEffect(() => {
  const c = createCanvas(0)
    setCanvas(c);

    return () => {
      c.dispose();
    };
  }, []);

  useEffect(() => {
    if (layers)
    setActiveLayer(layers[0])
  },  [layers])



  return (
    <div className=" bg-zinc-300  h-screen flex flex-col  ">
      <div className=" bg-zinc-900 w-full  h-16 " />
      <div className="flex flex-row flex-1 ">
        <Toolbar canvas={canvas} activeLayer={activeLayer}  />
        <div className=" flex-1 grid place-items-center" >
          <div id="canvas-container" className="bg-white rounded-lg w-[920px] h-[490px] relative">
          <canvas id="canvas-0" />
          <canvas id="canvas-1" />
          <canvas id="canvas-2" />
             
          </div>
        </div>
        <SideDrawer canvas={canvas} layers={layers} setLayers={setLayers}   />
      </div>
    </div>
  )
}
