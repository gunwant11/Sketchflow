import React, { use, useEffect, useRef, useState } from 'react'
import SideDrawer, { ILayer } from './SideDrawer';
import { createCanvas } from '../utils/createCanvas';
import Toolbar from './Toolbar';
import { fabric } from 'fabric';

function RenderCanvas() {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [layers, setLayers] = useState<ILayer[]>([])
    const layerContainer = useRef<HTMLDivElement>(null)
    const [activeLayer, setActiveLayer] = useState<number>(0)


    const addLayer = () => {
        const canvas = document.createElement('canvas');
        canvas.id = `canvas-${layers.length}`;
        layerContainer.current?.appendChild(canvas)
        const newLayer = {
            object: createCanvas(layers.length),
            name: `Layer ${layers.length}`,
            id: layers.length,
            visible: true,
        };

        newLayer.object.renderAll()
        setCanvas(newLayer.object)
        setActiveLayer(newLayer.id)
        // @ts-ignore
        setLayers((prevLayers) => [...prevLayers, newLayer]);
    };

    const handleImageUpload = (event: React.DragEvent<HTMLDivElement>) => {
        const data = event.dataTransfer;
        const file = data.files[0];

        if (file && canvas) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imgURL = e.target?.result as string;
                const img = new Image();
                img.onload = function () {
                    const image = new fabric.Image(img);
                    canvas?.add(image);
                    canvas?.requestRenderAll();
                };
                img.src = imgURL;

            };
            reader.readAsDataURL(file);
        }
    }

    return (
        <div className="flex flex-row flex-1 ">
      
              {canvas &&  <Toolbar canvas={canvas} />}
                <div className=" flex-1 grid place-items-center" 
                onDrop={handleImageUpload}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                }}
                >
                    <div id="layer-container" className="bg-white rounded-lg w-[920px] h-[540px] relative" ref={layerContainer} >
                    </div>
                </div>
                <SideDrawer canvas={canvas!} layers={layers} setLayers={setLayers} addLayer={addLayer} setCanvas={setCanvas} activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
        
        </div>
    )
}

export default RenderCanvas