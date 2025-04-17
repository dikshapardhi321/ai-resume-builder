import React, { useContext, useState } from 'react'
// ye humne shadcn ui ke website me se popover se liye hai
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../service/GlobalApi'
// import { data } from 'react-router-dom'
import { toast } from 'sonner'
import { useParams } from 'react-router-dom'

  
function ThemeColor() {

    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF",
        "#FFAA33", "#33AAFF", "#AA33FF", "#33FFAA", "#FF33AA", 
        "#AAFF33", "#33AA71", "#71AA33", "#AA3371", "#3371AA", 
        "#FF6633", "#66FF33", "#3366FF", "#FF3366", "#33FF66",
         "#6633FF", "#33FFCC", "#CC33FF", "#FF33CC", "#33CCFF",
         "#A52A2A","#000000"

      
    ]

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor]=useState();
    const params=useParams();

    const onColorSelect=(color)=>{
        setSelectedColor(color)
        setResumeInfo({
            ...resumeInfo,
            themeColor:color
        });
        const data={
            data:{
                themeColor:color
            }
        }
GlobalApi.UpdateResumeDetail(params.resumeid,data).then(resp=>{
    console.log(resp);
    toast('Theme Color Updated')
})
    }

  return (
    // <div>ThemeColor</div>
    <Popover>
  <PopoverTrigger asChild>
     <Button variant="outline" size="sm" 
     className="flex gap-2"><LayoutGrid/>
     Theme</Button>
  </PopoverTrigger>
  <PopoverContent className="bg-white text-black ">
    <h2 className='mb-2 text-sm font-bold'>Select Theme Color</h2>
    <div className='grid grid-cols-5 gap-3'>
    {colors.map((item,index)=>(
        <div  key={index}
        onClick={()=>onColorSelect(item)}
        // ywe rounded fullse color ka sape round ho jayenga
        className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border 
            ${selectedColor==item && 'border border-black'}`}
        style={{
            background:item
        }}
        >
      </div>
    )) }
    </div>
  </PopoverContent>
</Popover>

  )
}

export default ThemeColor