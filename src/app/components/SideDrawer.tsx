import update from 'immutability-helper'
import React, { use, useCallback, useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Layer from './Layer'
import Konva from 'konva'

export interface ILayer {
  object : Konva.Layer
  name: string
  id: number
  visible: boolean
  locked: boolean
}

interface SideDrawerProps {
 stage : Konva.Stage 
 activeLayer : Konva.Layer
 setActiveLayer: () => void

}

function SideDrawer({ stage, activeLayer, setActiveLayer }: SideDrawerProps) {
const [layers, setLayers] = useState<ILayer[]>([])
  

  useEffect(() => {
    if (!stage) return
    addLayer()
  }, [stage])

  const addLayer = () => {
    const layer = new Konva.Layer()
    const newLayer = {
      object: layer,
      name: `Layer ${layers.length + 1}`,
      id: layers.length + 1,
      visible: true,
      locked: false,
    };

  setLayers((prevLayers) => [...prevLayers, newLayer]);
  setActiveLayer(layer)
   stage.current.add(layer);
  };

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

  const renderLayer =  useCallback((layer: ILayer, index: number) => {
    return (
      <Layer
        key={layer.id}
        index={index}
        layer={layer}
        id={layer.id}
        name={layer.name}
        moveCard={moveCard}
      />
    )
  }
  , [])

  return (
    <div className=' bg-zinc-900 w-[360px]  m-1 rounded-xl  flex flex-col gap-3 p-3 '>
      <button onClick={() => addLayer()}>Add Layer</button>
    <DndProvider backend={HTML5Backend}>

      {layers.map((layer,i) => (
        renderLayer(layer, i)
      ))}
    </DndProvider>
    </div>
  )
}

export default SideDrawer