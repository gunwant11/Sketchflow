// 'use client'
// import React, { useState, useEffect } from "react";
// import { fabric } from "fabric";

// function Canvas() {
//     const [canvas, setCanvas] = useState<fabric.Canvas>();

//     useEffect(() => {
//       const c = new fabric.Canvas("canvas", {
//         height: 600,
//         width: 1080,
//         backgroundColor: "white",
//       });
  
//       fabric.Object.prototype.transparentCorners = false;
//       fabric.Object.prototype.cornerColor = "#2BEBC8";
//       fabric.Object.prototype.cornerStyle = "rect";
//       fabric.Object.prototype.cornerStrokeColor = "#2BEBC8";
//       fabric.Object.prototype.cornerSize = 6;
  
//       setCanvas(c);
  
//       return () => {
//         c.dispose();
//       };
//     }, []);
  
//     const addRect = (canvas?: fabric.Canvas) => {
//       const rect = new fabric.Rect({
//         height: 200,
//         width: 200,
//         stroke: "#000",
//         fill: "transparent",
//       });
//       canvas?.add(rect);
//       canvas?.requestRenderAll();
//     };

//     const addCircle = (canvas?: fabric.Canvas) => {
//         const circle = new fabric.Circle({
//           radius: 50,
//           stroke: "#000",
//           fill: "transparent",
//         });
//         canvas?.add(circle);
//         canvas?.requestRenderAll();
//       }

//       const draw = (canvas: fabric.Canvas) => {
//         const pen = new fabric.PencilBrush(canvas);
//         canvas.freeDrawingBrush.width = 10
//         canvas.freeDrawingBrush.color = "#000"
//         canvas.isDrawingMode = true;
//         canvas?.requestRenderAll();
//       }

//       const addText = (canvas: fabric.Canvas) => {
//         const text = new fabric.Textbox('Text', {
//           left: 50,
//           top: 50,
//           width: 150,
//           fontSize: 20,
//           textAlign: 'center'
//         });
//         canvas.add(text);
//         canvas?.requestRenderAll();
//       }


//       const addImage = (canvas: fabric.Canvas) => {
//         var imgURL = 'http://i.imgur.com/8rmMZI3.jpg';
//         var pugImg = new Image();
//         pugImg.onload = function (img) {
//           var image = new fabric.Image(pugImg, {
//             width: 200,
//             height: 200,
//             left: 50,
//             top: 50,
//             angle: 0,
//             opacity: 1
//           });
//           canvas.add(image);
//         }

//         pugImg.src = imgURL;

//       }


//   return (
//     <div className=" flex-1 grid place-items-center ">
//       <canvas id="canvas" />
//       {/* <button onClick={() => addRect(canvas)}>Add Rectangle</button>
//       <button onClick={() => addCircle(canvas)}>Add Circle</button>
//       <button onClick={() => draw(canvas)}>Use Pen</button>
//       <button onClick={() => addText(canvas)}>Add Text</button> */}
//       <button onClick={() => addImage(canvas)}>Add Image</button>
//     </div>
//   )
// }

// export default Canvas