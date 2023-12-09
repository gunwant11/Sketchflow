

import type { Identifier, XYCoord } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { Delete, EyeIcon, Trash2 } from 'lucide-react'
import Image from 'next/image'
import { ILayer } from './SideDrawer'

interface DragItem {
  index: number
  id: string
  type: string
}

const ItemTypes = {
  Layer: 'layer',
}

interface LayerProps {
  layer: ILayer
  index: number
  name: string
  id: number
  moveCard: (dragIndex: number, hoverIndex: number) => void
  active: boolean
  handleDelete: (id: number) => void
}


function DrawerCard({ layer, index, name, id, moveCard, active, handleDelete, ...props }: LayerProps) {

  const ref = useRef<HTMLDivElement>(null)
  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.Layer,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      }
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) {
        return
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset = monitor.getClientOffset()
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })


  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Layer,
    item: () => {
      return { id, index }
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const opacity = isDragging ? 0 : 1
  drag(drop(ref))



  return (

    <div ref={ref} style={{ opacity }} data-handler-id={handlerId} className={`bg-zinc-800  rounded-xl flex items-center p-2 ${active && `border-2 border-violet-500 accent-violet-600`} `} >
      <span>
        <EyeIcon />
      </span>
      <div className="flex-1 flex items-center ">
        <div className="w- h-10 rounded-lg bg-zinc-700 mx-2" />
        <div>
          {name}
        </div>
      </div>
      <span className="cursor-pointer" onClick={() => handleDelete(id)}>
        <Trash2 />
      </span>
    </div>
  )
}


export default DrawerCard
