import update from 'immutability-helper'
import React, {  useCallback } from 'react'
import { fabric } from 'fabric'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LayerComponent from './DrawerCard'


export interface ILayer {
  object: fabric.Canvas & { wrapperEl: HTMLElement } 
  name: string
  id: number
  visible: boolean
  containerId?: string
}


interface SideDrawerProps {
  canvas: fabric.Canvas
  layers: ILayer[]
  setLayers: React.Dispatch<React.SetStateAction<ILayer[]>>
  addLayer: () => void
  setCanvas: (canvas: fabric.Canvas) => void
  activeLayer: number
  setActiveLayer: (id: number) => void
}


function SideDrawer({ canvas, layers, setLayers, addLayer, setCanvas, activeLayer, setActiveLayer }: SideDrawerProps) {

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    setLayers((prevLayers: ILayer[]) =>
      update(prevLayers, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevLayers[dragIndex] as ILayer],
        ],
      }),
    )
  }, [])


  const handleSelectLayer = (layer: ILayer) => {

    const wrapper = layer.object.wrapperEl 
    wrapper.style.zIndex = '10'
    layers.forEach((layer) => {
      if (layer.object.wrapperEl !== wrapper) {
        const wrapper = layer.object.wrapperEl 
        wrapper.style.zIndex = '0'
      }
    })
    setActiveLayer(layer.id)
    setCanvas(canvas)
  }

  const handleDelete = (id: number) => {
    const updatedLayers = layers.filter((layer) => layer.id !== id);
    const layerToDelete = layers.find((layer) => layer.id === id);
    if (layerToDelete) {
      layerToDelete.object.dispose();
    }
    setLayers([...updatedLayers]);
  };

  return (
    <div className=' bg-zinc-900 w-[360px]  m-1 rounded-xl  flex flex-col gap-3 p-3 '>
      <button onClick={() => addLayer()}>Add Layer</button>
      <DndProvider backend={HTML5Backend}>
        {layers.map((layer, i) => (
          <LayerComponent
            key={i}
            layer={layer}
            id={layer.id}
            index={i}
            active={activeLayer === layer.id}
            moveCard={moveCard}
            handleDelete={handleDelete}
            handleSelectLayer={handleSelectLayer}
          />
        ))}
      </DndProvider>
    </div>
  )
}

export default SideDrawer