'use client'
import RenderCanvas from "@/components/RenderCanvas";
import { ProjectStore } from "@/store/project";
import { saveImage } from "@/utils/createCanvas";
import { ArrowLeft, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { signOut } from "next-auth/react";


export default function Home() {

  const { layers, title, setTitle } = ProjectStore();

  const downloadImage = () => {
    const res = saveImage(layers.filter((layer) => layer.visible).map((layer) => layer.object));
    const a = document.createElement('a');
    a.href = res;
    a.download = 'image.png';
    a.click();
  }

  const router = useRouter();


  return (
    <div className=" bg-zinc-300  h-screen w-full flex flex-col  ">
      <div className=" bg-zinc-900 w-full  h-16 flex justify-between items-center px-4  " >
        <button
          onClick={() => router.push('/dashboard')}
        > <ArrowLeft /></button>
        <div className="text-xl text-medium flex items-center ml-4" >Sketchflow/<input value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent border-none text-white w-40" /></div>

        <button onClick={downloadImage} className='bg-violet-500/40 border border-violet-500 px-8 text-sm text-white h-10 items-center flex gap-2 rounded-xl'> <Download size={14} /> Download</button>
      </div>
      <RenderCanvas />
    </div>
  )
}
