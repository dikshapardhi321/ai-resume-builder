import React, { useState } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from 'react-router-dom';
import ThemeColor from './ThemeColor';

function FormSection() {
    const [activeFormIndex , setActiveFormIndex]=useState(2);
    const [enableNext , setEnableNext]=useState(false);
    const {resumeid}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center'>
            <div className='flex gap-5'>
                <Link to={"/dashboard"}>
            <Button className="bg-purple-600"><Home/></Button>
            </Link>
            <ThemeColor/>
       
        </div>
            <div className='flex gap-2'>
                {activeFormIndex > 1 && <Button size="sm"
                 onClick={()=>setActiveFormIndex(activeFormIndex-1)}><ArrowLeft className='bg-purple-500 w-7'/></Button>}
            <Button 
            // disabled={!enableNext}
            className="flex gap-2 bg-purple-600" size="sm"
            onClick={()=>setActiveFormIndex(activeFormIndex+1)}>
                Next<ArrowRight className='bg-purple-600'/></Button>
            </div>
        </div>
     {/* personal details */}
     {/* vaha activeformindex==2 ka mtlb hai ki pages 2 hai toh next option enable honag and vaha humne summary dikhengi */}
       { activeFormIndex==1?<PersonalDetail 
       enabledNext={(v)=>setEnableNext(v)}/>
       :activeFormIndex==2?<Summery enabledNext={(v)=>setEnableNext(v)}/>
       :activeFormIndex==3?<Experience />
       :activeFormIndex==4?<Education />
       :activeFormIndex==5?<Skills/>
       :activeFormIndex==6?<Navigate to={'/my-resume/'+resumeid+"/view"}/>
       :null}
       
        {/* Experience */}

        {/* Educational details */}
        {/* skills */}

    </div>
  )
}

export default FormSection