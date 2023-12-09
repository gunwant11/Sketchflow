import update from 'immutability-helper'
import React, { use, useCallback, useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import Layer from './Layer'
import { createCanvas } from '../page'


export interface ILayer {
  object : fabric.Canvas
  name: string
  id: number
  visible: boolean
  }


interface SideDrawerProps {
 canvas: fabric.Canvas
  layers: ILayer[]
  setLayers: React.Dispatch<React.SetStateAction<ILayer[]>>
}


function SideDrawer({ canvas, layers, setLayers }: SideDrawerProps) {
  

  useEffect(() => {
    if (!canvas) return
    addLayer()
  }, [canvas])

  const addLayer = () => {
        const newLayer = {
      object: createCanvas(layers.length + 1),
      name: `Layer ${layers.length + 1}`,
      id: layers.length + 1,
      visible: true,
          };

newLayer.object.renderAll()

  setLayers((prevLayers) => [...prevLayers, newLayer]);
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