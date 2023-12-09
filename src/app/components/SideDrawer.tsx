import update from 'immutability-helper'
import React, { use, useCallback, useEffect, useState } from 'react'
import { fabric } from 'fabric'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { createCanvas } from '../page'
import DrawerCard from './DrawerCard'


export interface ILayer {
  object: fabric.Canvas
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
  setActiveLayer: (id: number) => void
  activeLayer: number

}


function SideDrawer({ canvas, layers, setLayers, addLayer, setActiveLayer, activeLayer , setCanvas}: SideDrawerProps) {

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

  const renderLayer = useCallback((layer: ILayer, index: number, activeLayer: number, handleDelete: (id: number) => void, handleHideLayer: (id: number) => void) => {
    return (
      <DrawerCard
        key={layer.id}
        index={index}
        layer={layer}
        id={layer.id}
        name={layer.name}
        moveCard={moveCard}
        active={layer.id === activeLayer}
        handleDelete={handleDelete}
        handleHideLayer={handleHideLayer}

      />
    )
  }
    , [])


  const handleDelete = (id: number) => {
    const newLayers = layers.filter((item) => item.id !== id)
    setLayers([...newLayers])
  }

  const handleHideLayer = (id: number) => {
    // const stage = stageRef.current
    // const selectedLayer = stage.current.children.find((item) => item.index + 1 === id)

    // selectedLayer.hide()
  }

  return (
    <div className=' bg-zinc-900 w-[360px]  m-1 rounded-xl  flex flex-col gap-3 p-3 '>
      <button onClick={() => addLayer()}>Add Layer</button>
      <DndProvider backend={HTML5Backend}>

        {layers.map((layer, i) => (
          <div onClick={() => setCanvas(layer.object)} key={i} >{renderLayer(layer, i, activeLayer, handleDelete, handleHideLayer)}</div>
        ))}
      </DndProvider>
    </div>
  )
}

export default SideDrawer