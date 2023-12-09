'use client'
import React, { useState, useEffect, use, useRef, createElement } from "react";
import { fabric } from "fabric";
import SideDrawer, { ILayer } from "./components/SideDrawer";
import Toolbar from "./components/Toolbar";

export const createCanvas = (id: number) => {
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

  const layerContainer =  useRef<HTMLDivElement>(null)


  useEffect(() => {
    if (layers)
      setActiveLayer(layers[0])
  }, [layers])

  const addLayer = () => {
    console.log(layerContainer)
    const canvas = document.createElement('canvas');
    canvas.id = `canvas-${layers.length}`;
 
    layerContainer.current?.appendChild(canvas)
    const newLayer = {
      object: createCanvas(layers.length ),
      name: `Layer ${layers.length }`,
      id: layers.length ,
      visible: true,
    };

    newLayer.object.renderAll()


setCanvas(newLayer.object)
    setLayers((prevLayers) => [...prevLayers, newLayer]);
  };



  return (
    <div className=" bg-zinc-300  h-screen flex flex-col  ">
      <div className=" bg-zinc-900 w-full  h-16 flex justify-between " >
          Sketch App        
        </div>
      <div className="flex flex-row flex-1 ">
        <Toolbar canvas={canvas} activeLayer={activeLayer} />
        <div className=" flex-1 grid place-items-center" >
          <div id="layer-container" className="bg-white rounded-lg w-[920px] h-[490px] relative" ref={layerContainer} >
          </div>
        </div>
        <SideDrawer canvas={canvas} layers={layers} setLayers={setLayers} addLayer={addLayer} setActiveLayer={setActiveLayer} setCanvas={setCanvas} />
      </div>
    </div>
  )
}
