import { fabric } from 'fabric';
export const createCanvas = (id: number) => {
    const c = new fabric.Canvas(`canvas-${id}`, {
      height: 510,
      width: 920,
    });
    return c;
}

