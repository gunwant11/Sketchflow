import React, { use, useEffect, useRef, useState } from 'react'
import SideDrawer, { ILayer } from './SideDrawer';
import Toolbar from './Toolbar';
import { fabric } from 'fabric';
import { createCanvas, saveImage } from '@/utils/createCanvas';
import { ProjectStore } from '@/store/project';
import { usePathname } from 'next/navigation';
import lodash from 'lodash'
import { Layer } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
function RenderCanvas() {
    const layerContainer = useRef<HTMLDivElement>(null)
    const [activeLayer, setActiveLayer] = useState<number>(0)

    const { updateProject, canvas, setCanvas, layers, setLayers, setTitle, title } = ProjectStore()

    const path = usePathname()

    const addLayer = () => {
        const canvasElement = document.createElement('canvas');
        canvasElement.id = `canvas-${layers.length}`;
        layerContainer.current?.appendChild(canvasElement)
        const newLayer = {
            object: createCanvas(layers.length),
            name: `Layer ${layers.length}`,
            id: uuidv4(),
            visible: true,
            sortOrder: layers.length
        };

        newLayer.object.renderAll()
        setCanvas(newLayer.object)
        setActiveLayer(newLayer.id)
        setLayers([...layers, newLayer]);
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

    useEffect(() => {
        getProject()
    }, [])

    const fetchProjectById = async (projectId: string) => {
        try {
            const project = await fetch('/api/projectId', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ projectId }),
            });
            const data = await project.json();
            setTitle(data.project.title)
            return data.project;
        } catch (error) {
            console.error(error);
        }
    }

    const getProject = async () => {
        const id = path.split('/')[2]
        const project = await fetchProjectById(id)
        const { layers: savedLayers } = project
        console.log('layers', savedLayers)

        const loadedLayers = savedLayers.map((layer) => {
            const canvasElement = document.createElement('canvas');
            canvasElement.id = `canvas-${layer.id}`;
            layerContainer.current?.appendChild(canvasElement)
            const newCanvas = createCanvas(layer.id)
            newCanvas.loadFromJSON(layer.object, newCanvas.renderAll.bind(newCanvas))
            return {
                ...layer,
                object: newCanvas
            }
        })
        setLayers(loadedLayers)
        setCanvas(loadedLayers[0].object)
        setActiveLayer(loadedLayers[0].id)
    }

    const handleupdateProject = () => {
        const id = path.split('/')[2]
        const res = saveImage(layers.filter((layer) => layer.visible).map((layer) => layer.object));
        const layersData = layers.map((layer) => ({
            ...layer,
            object: layer.object.toJSON()
        }))
        updateProject(id, title, layersData, res)
    }

    useEffect(() => {
        lodash.debounce(handleupdateProject, 1000)();
    }, [layers, canvas, path])


    return (
        <div className="flex flex-row flex-1 ">

            {canvas && <Toolbar canvas={canvas} />}
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
            <SideDrawer canvas={canvas!} addLayer={addLayer} activeLayer={activeLayer} setActiveLayer={setActiveLayer} />

        </div>
    )
}

export default RenderCanvas