import { Circle, Eraser, ImagePlus, MousePointer2, Palette, PenTool, Square, Type } from 'lucide-react';
import React, { useRef } from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { fabric } from 'fabric'
interface Props {
  canvas: fabric.Canvas
}

const ToolMap = {
  pen: 'Pen',
  eraser: 'Eraser',
  select: 'Select',
  circle: 'Circle',
  square: 'Square',
  text: 'Text',
  image: 'Image',
  color: 'Color',
}

function Toolbar({ canvas }: Props) {
  const [color, setColor] = useColor("rgb(86 30 203)");
  const [showColorPicker, setShowColorPicker] = React.useState(false);

  const colorPickerRef = useRef(null);


  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgURL = e.target?.result as string;
        addImage(imgURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const addRect = () => {
    canvas.isDrawingMode = false;
    const rect = new fabric.Rect({
      height: 200,
      width: 200,
      stroke: color.hex,
      fill: "transparent",
    });
    canvas?.add(rect);
    canvas?.requestRenderAll();
  };

  const addCircle = () => {
    canvas.isDrawingMode = false;
    const circle = new fabric.Circle({
      radius: 50,
      stroke: color.hex,
      fill: "transparent",
    });
    canvas?.add(circle);
    canvas?.requestRenderAll();
  }

  const draw = () => {
    const pen = new fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush = pen
    canvas.freeDrawingBrush.width = 10
    canvas.freeDrawingBrush.color = color.hex
    canvas.isDrawingMode = true;
    canvas?.requestRenderAll();
  }


  const addText = () => {
    canvas.isDrawingMode = false;
    const text = new fabric.Textbox('Text', {
      left: 50,
      top: 50,
      width: 150,
      fontSize: 20,
      textAlign: 'center'
    });
    canvas.add(text);
    canvas?.requestRenderAll();
  }

  const eraseElents = () => {
    // @ts-ignore
    const erase = new fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush = erase
    canvas.freeDrawingBrush.width = 10
    canvas.isDrawingMode = true;

    canvas?.requestRenderAll();
  }

  const select = () => {
    canvas.isDrawingMode = false;
    canvas?.requestRenderAll();
  }

  const handleColorPicker = (e: any) => {
    setColor(e)
    if (canvas.isDrawingMode) {
      draw()
    }
  }

  const addImage = (imgURL: string) => {
    var pugImg = new Image();
    pugImg.onload = function (img) {
      var image = new fabric.Image(pugImg, {
        left: 50,
        top: 50,
        angle: 0,
        opacity: 1,
        scaleX: 0.3,
        scaleY: 0.3,
      });
      canvas.add(image);
    }
    pugImg.src = imgURL;

  }


  return (
    <div className=' bg-zinc-900 w-20 m-1 rounded-xl flex  flex-col  p-3 gap-3 '>
      <button className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500' 
        onClick={() => select()}>
        <MousePointer2 />
        <span className=' hover:text-violet-500 text-[10px] active:text-white active:bg-violet-500'>
          Cursors</span>
      </button> <button className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col '
        onClick={() => draw()}>
        <PenTool />
        <span className=' hover:text-violet-500 text-[10px]'>Pen</span>
      </button>
      <button className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col  '
        onClick={() => eraseElents()}>
        <Eraser />
        <span className=' hover:text-violet-500 text-[10px]'>
          Eraser
        </span>
      </button>
      <button className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500 '
        onClick={() => addRect()}>
        <Square />
        <span className=' hover:text-violet-500 text-[10px] active:text-white active:bg-violet-500'>Square</span>
      </button>
      <button className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500 '
        onClick={() => addCircle()}>
        <Circle />
        <span className=' hover:text-violet-500 text-[10px] active:text-white active:bg-violet-500'>Circle</span>
      </button>
      <button className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500'
        onClick={() => addText()}>
        <Type />
        <span className=' hover:text-violet-500 text-[10px] active:text-white active:bg-violet-500'>Text</span>
      </button>
      <button className=' hover:text-violet-500  relative h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500 '
        onClick={() => setShowColorPicker(!showColorPicker)}>
        <span className=' hover:text-violet-500 absolute min-w-[360px] left-[75px] z-10 active:text-white active:bg-violet-500' ref={colorPickerRef}>
          {showColorPicker &&
            <ColorPicker
              color={color}
              onChange={handleColorPicker} />}
        </span>
        <span className=' hover:text-violet-500 text-[10px]'><Palette /></span>
      </button>
      <input type="file" onChange={handleImageUpload} style={{ display: 'none' }}
        id="imageInput" />
      <label htmlFor="imageInput" className=' hover:text-violet-500  h-14 bg-zinc-800 rounded-xl flex justify-center items-center flex-col active:text-white active:bg-violet-500' >
        <ImagePlus />
        <span className=' hover:text-violet-500 text-[10px] active:text-white active:bg-violet-500'>Image</span>
      </label>

    </div>
  )
}

export default Toolbar