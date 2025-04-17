import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';

const formField={
    title:'',
    companyName:'',
    city:'',
    state:'',
    startDate:'',
    endDate:'',
    workSummery:'',

}

function Experience() {
    const [experinceList,setExperinceList]=useState([formField]);
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    // const params=useParams();
    const params=useParams();
    const [loading,setLoading]=useState(false);

    // useEffect(()=>{
    //     resumeInfo && setExperinceList(resumeInfo?.experience)
    // },[resumeInfo])

    useEffect(() => {
        if (resumeInfo?.experience && experinceList.length === 1 && !experinceList[0].title) {
          setExperinceList(resumeInfo.experience);
        }
      }, [resumeInfo]);

    const handleChange=(index,event)=>{
        const newEntries=experinceList.slice();
        const {name,value}=event.target;
        newEntries[index][name]=value;
        console.log(newEntries)
        setExperinceList(newEntries);
    }

  const AddNewExperience=()=>{
    // setExperinceList([...experinceList,formField])
    setExperinceList([...experinceList,{
        title:'',
        companyName:'',
        city:'',
        state:'',
        startDate:'',
        endDate:'',
        workSummery:'',
    }])
  }

  const RemoveExperience=()=>{
    // iska mtlb hai ki lat 1 form ko remove kar dena 
    setExperinceList(experinceList=>experinceList.slice(0,-1))
}

// ye function humne isliye likhe hai taki jo bhi hum edior me likhre hai vo sve hote chale jaye
const handleRichTextEditor=(e,name,index)=>{
    const newEntries=experinceList.slice();
    newEntries[index][name]=e.target.value;
    // const newEntries = [...experinceList];
    // newEntries[index][name] = e; 
   
    setExperinceList(newEntries);
}


// ye use effect se jo bhi hum changes karenge vo show ho jayenga resumepreview page me
useEffect(()=>{
    setResumeInfo({
        ...resumeInfo,
        experience:experinceList
    });
 console.log(experinceList);
},[experinceList]);


const onSave=()=>{
    setLoading(true)
   const data={
    data:{
        experience:experinceList.map(({ id, ...rest }) => rest)
    }
   }
   GlobalApi.UpdateResumeDetail(params.resumeid,data).then(resp=>{
    console.log(resp);
    setLoading(false)
    toast('Detail updates!')
   },(error)=>{
    setLoading(false);
    // toast('Server error,please try again')
   })

}

  return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Professional Experience</h2>
        <p>Add Your previous Job experience</p>
        <div>
            {experinceList.map((item , index)=>(

                <div key={index}>
                  <div className='grid grid-cols-2 gap-3 border p-3 rounded-lg my-5'>
                   <div>
                     <label className='text-xs'>Position Title</label>
                     <Input name="title" 
                     onChange={(event)=>handleChange(index,event)}
                     defaultValue={item?.title}
                     />
                   </div>
                   <div>
                     <label className='text-xs'>Company Name</label>
                     <Input name="companyName" 
                     onChange={(event)=>handleChange(index,event)}
                     defaultValue={item?.companyName}
                     />
                   </div>
                   <div>
                     <label className='text-xs'>City</label>
                     <Input name="city" 
                     onChange={(event)=>handleChange(index,event)}
                     defaultValue={item?.city}
                     />
                   </div>
                   <div>
                     <label className='text-xs'>State</label>
                     <Input name="state" 
                     onChange={(event)=>handleChange(index,event)}
                     defaultValue={item?.state}
                     />
                   </div>
                   <div>
                     <label className='text-xs'>Start Date</label>
                     <Input type="date" name="startDate" 
                     onChange={(event)=>handleChange(index,event)}
                     defaultValue={item?.startDate}
                     />
                   </div>
                   <div>
                     <label className='text-xs'>End Date</label>
                     <Input type="date" name="endDate" 
                     onChange={(event)=>handleChange(index,event)}
                     defaultValue={item?.endDate}
                     />
                   </div>
                   <div className='col-span-2'>
                    {/* work summery */}
                    <RichTextEditor   index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(event)=>handleRichTextEditor(event,'workSummery',index)}
                    />
                    </div>
                  </div>

                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewExperience} className="text-purple-800"> + Add more Experience</Button>
            <Button variant="outline" onClick={RemoveExperience} className="text-purple-800"> -Remove</Button>
            </div>
            {/* <Button variant="outline" onClick={AddNewExperience} className="text-purple-800"> + Add more Experience</Button> */}
            {/* <Button>Save</Button> */}
            <Button disabled={loading} onClick={()=>onSave()} className="bg-purple-600">
            {loading?<LoaderCircle className='animate-spin' />:'Save'}    
            </Button>
        </div>
        </div>
    </div>
  )
}

export default Experience