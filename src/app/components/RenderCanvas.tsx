import React, { use, useEffect, useRef, useState } from 'react'
import SideDrawer, { ILayer } from './SideDrawer';
import { createCanvas } from '../utils/createCanvas';
import Toolbar from './Toolbar';

function RenderCanvas() {
    const [canvas, setCanvas] = useState<fabric.Canvas>();
    const [layers, setLayers] = useState<ILayer[]>([])
    const layerContainer = useRef<HTMLDivElement>(null)
    const [activeLayer, setActiveLayer] = useState<number>(0)

    useEffect(() => {
        addLayer()
    }, [])

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
        setLayers((prevLayers) => [...prevLayers, newLayer]);
    };

    return (
        <div className="flex flex-row flex-1 ">
            {canvas && <>
                <Toolbar canvas={canvas} />
                <div className=" flex-1 grid place-items-center" >
                    <div id="layer-container" className="bg-white rounded-lg w-[920px] h-[490px] relative" ref={layerContainer} />
                </div>
                <SideDrawer canvas={canvas} layers={layers} setLayers={setLayers} addLayer={addLayer} setCanvas={setCanvas} activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
            </>}
        </div>
    )
}

export default RenderCanvas