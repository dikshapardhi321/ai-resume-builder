import Header from '@/components/custom/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import ResumePreview from '@/dashboard/resume/components/ResumePreview'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../service/GlobalApi'
import { RWebShare } from 'react-web-share'

function ViewResume() {

const  [resumeInfo , setResumeInfo]=useState();
   const {resumeid}=useParams();

   useEffect(()=>{
    GetResumeInfo();
   },[])

const GetResumeInfo=()=>{
    GlobalApi.GetResumeById(resumeid).then(resp=>{
        console.log(resp.data.data);
        setResumeInfo(resp.data.data);
    })
}

// ye method se directly download ka option show ho jayenga
const HandleDownload=()=>{
    window.print();
}

  return (
    <ResumeInfoContext.Provider value={{resumeInfo , setResumeInfo}}>
        {/* isase ye div me jo bhi part aara hai vo download nhi honga */}
        <div id='no-print'>
        <Header/>
       <div className='my-10 mx-10 md:mx-2 lg:mx-36'>
        <h2 className='text-center text-2xl font-medium'>Congrats!Your Ultimate AI generates Resume is ready!</h2>
        <p className='text-center text-gray-400'>Now you are ready to download your resume and you can share
         unique resume url with your friends and family</p>
        <div className='flex justify-between px-44 my-10'>
            <Button onClick={HandleDownload} className="bg-purple-600">Download</Button>
            {/* <Button> Share</Button> */}
            <RWebShare
        data={{
          text: "Hello Everyone,This is my resume please open url to see it:) ",
          url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeid+"/view",
          title: resumeInfo?.firstName+" "+resumeInfo?.lastName+"resume",
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button className="bg-purple-600">Share</Button>
      </RWebShare >
        </div>
        </div>
      
       </div>
         {/* ye id=print-area se bas hamara resume download honga usme baki koi  dashboard vagere nhi aayneg  */}
         <div id='print-area' className='my-10 mx-10 md:mx-2 lg:mx-36'>
            <ResumePreview/>
        </div>
    </ResumeInfoContext.Provider>
  )
}

export default ViewResume