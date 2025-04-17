import { Loader2, PlaySquare, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { v4 as uuidv4 } from 'uuid';
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
  
function AddResume() {

    const [openDialog , setOpenDialog]=useState(false);
    const [resumeTitle,setResumeTitle]=useState();
    const {user}=useUser();
    const [loading , setLoading]=useState(false);
    const navigation=useNavigate();

    const onCreate=()=>{
      setLoading(true)
        const uuid=uuidv4();
        const data={
            data:{
                title:resumeTitle,
                resumeid:uuid,
                userEmail:user?.primaryEmailAddress?.emailAddress,
                userName:user?.fullName
            }
        }
        console.log(resumeTitle , uuid);
        GlobalApi.CreateNewResume(data).then(resp=>{
            console.log(resp.data.data.documentId);
            if(resp){
              setLoading(false);
              navigation('/dashboard/resume/'+resp.data.data.documentId+"/edit");
            }
        },(error)=>{
          setLoading(false);
        }
      )
    }
  return (
    <div>
        <div className='p-14 py-24 border items-center flex 
        justify-center  rounded-lg
        h-[300px] hover:scale-105 transition-all
         hover:shadow-md
         cursor-pointer border-dashed bg-green-50
         ' onClick={()=>setOpenDialog(true)}>
            <PlusSquare/>
        </div>

        <Dialog open={openDialog}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create new Resume</DialogTitle>
      <DialogDescription>
        Add a title for your new Resume
        <Input className="my-2"
         placeholder="Ex.Full Stack resume"
         onChange={(e)=>setResumeTitle(e.target.value)}
         />
      </DialogDescription>
      <div className='flex justify-end gap-5 '>
        <Button  onClick={()=>setOpenDialog(false)} variant="ghost" className="bg-white">Cancel</Button>
        <Button className="bg-purple-500"
        disabled={!resumeTitle || loading}
        onClick={()=>onCreate()}>
          {loading?
          <Loader2 className='animate-spin'/>:'Create'
        }
    </Button>
      </div>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddResume