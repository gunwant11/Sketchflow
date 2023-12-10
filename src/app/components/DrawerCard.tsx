

import type { Identifier, XYCoord } from 'dnd-core'
import { useRef, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import {  EyeIcon, EyeOff, Trash2 } from 'lucide-react'
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
  id: number
  active: boolean
  handleDelete: (id: number) => void
  moveCard: (dragIndex: number, hoverIndex: number) => void
  handleSelectLayer : (layer: ILayer) => void
}

const LayerComponent = ({ layer, index, active, moveCard, id, handleDelete, handleSelectLayer }: LayerProps) => {
  const [showLayer, setShowLayer] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: ItemTypes.Layer,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.Layer,
    item: () => {
      return { id: layer.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  const handleHideLayer = (e: React.MouseEvent) => {
    e.stopPropagation()
    const wrapper = layer.object.wrapperEl as HTMLDivElement
    wrapper.style.display = showLayer ? 'none' : 'block'
    setShowLayer(!showLayer)

  };

  const handleDeleteClick = (e : React.MouseEvent) => {
    e.stopPropagation()
    handleDelete(id)
  };


  return (
    <div
      ref={ref}
      style={{ opacity }}
      onClick={() => handleSelectLayer(layer)}
      data-handler-id={handlerId}
      className={`bg-zinc-800 rounded-xl flex items-center p-2 ${active && `border-2 border-violet-500 accent-violet-600`} `}
    >
      <span className="cursor-pointer" onClick={handleHideLayer}>
        {showLayer ? <EyeIcon /> : <EyeOff />}
      </span>
      <div className="flex-1 flex items-center">
        <div className="w- h-10 rounded-lg bg-zinc-700 mx-2" />
        <div>{layer.name}</div>
      </div>
      <span className="cursor-pointer" onClick={handleDeleteClick}>
        <Trash2 />
      </span>
    </div>
  );
};

export default LayerComponent;
