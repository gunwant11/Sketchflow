import { fabric } from 'fabric';
export const createCanvas = (id: number) => {
  const c = new fabric.Canvas(`canvas-${id}`, {
    height: 540,
    width: 920,
  });
  return c;
}


export const saveImage = (canvases: fabric.Canvas[]) => {
  const finalCanvas = new fabric.Canvas('finalCanvas', {
    height: 540,
    width: 920,
  });
  finalCanvas.backgroundColor = 'white';
  canvases.forEach((canvas) => {
    const element = canvas.getObjects();
    element.forEach((obj) => {
      finalCanvas.add(obj);
    });
  }
  );
  finalCanvas.renderAll();
  const dataURL = finalCanvas.toDataURL({
    format: 'png',
    quality: 1,
  });
  return dataURL;
}

