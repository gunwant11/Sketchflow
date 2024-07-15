import update from 'immutability-helper'
import React, { useCallback, useEffect } from 'react'
import { fabric } from 'fabric'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import LayerComponent from './LayerComponent'
import { ProjectStore } from '@/store/project'


export interface ILayer {
  object: fabric.Canvas & { wrapperEl: HTMLElement }
  name: string
  id: number
  visible: boolean
  containerId?: string
}


interface LayersPanalProps {
  canvas: fabric.Canvas
  addLayer: () => void
  activeLayer: number
  setActiveLayer: (id: number) => void
}


function LayersPanal({ addLayer, activeLayer, setActiveLayer }: LayersPanalProps) {

  const { canvas, layers, setLayers, setCanvas } = ProjectStore()
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const prevLayers = layers
    const dragCard = prevLayers[dragIndex]
    const updatedLayers = [...prevLayers]
    updatedLayers.splice(dragIndex, 1)
    updatedLayers.splice(hoverIndex, 0, dragCard)
    setLayers(updatedLayers)

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

  useEffect(() => {
    console.log('layers', layers)
  }
    , [layers])

  return (
    <div className=' bg-zinc-900 w-[360px]  m-1 rounded-xl  flex flex-col gap-3 p-3 '>
      <button onClick={() => addLayer()}
        className=' hover:text-violet-500  h-10 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500' >Add Layer</button>
      <DndProvider backend={HTML5Backend}>
        {layers.length > 0 && layers?.map((layer, i) => (
          <LayerComponent
            key={i}
            layer={layer}
            id={layer.id}
            index={i}
            active={activeLayer === layer.id}
            moveCard={moveCard}
            handleDelete={handleDelete}
            handleSelectLayer={handleSelectLayer}
            setLayers={setLayers}
          />
        ))}
      </DndProvider>
    </div>
  )
}

export default LayersPanal