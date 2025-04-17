import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { toast } from 'sonner';
import { Brain, LoaderCircle } from 'lucide-react';
import { AIChatSession } from './../../../../../service/AIModal';

const prompt="Job Title: {jobTitle} , Depends on job title give me list of  summery for 3 experience level, Mid Level and Freasher level in 3 -4 lines in array format, With summery and experience_level Field in JSON Format"
function Summery({enabledNext}) {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [summery,setSummery]=useState();
    const [loading,setLoading]=useState(false);
    const params=useParams();
    const [aiGeneratedSummeryList,setAiGenerateSummeryList]=useState();

    useEffect(()=>{
        summery&&setResumeInfo({
            ...resumeInfo,
            summery:summery
        })
    },[summery])

    const GenerateSummeryFromAI=async()=>{
        setLoading(true)
        const PROMPT=prompt.replace('{jobTitle}',resumeInfo?.jobTitle);
        console.log(PROMPT);
        // const result=await AIChatSession.sendMessage(PROMPT);
        // console.log(JSON.parse(result.response.text()));
        // setAiGenerateSummeryList(JSON.parse([result.response.text()]))
        // --const parsed = JSON.parse(await result.response.text());
        //  setAiGenerateSummeryList(parsed);--
        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const text = await result.response.text(); // ✅ wait for the response text
            console.log("AI Raw Response:", text);
        
            const parsed = JSON.parse(text); // ✅ parse after waiting
            console.log("Parsed AI Summary:", parsed); // <-- Add this!
            const data = Array.isArray(parsed) ? parsed : [parsed]; // Ensure it's an array
            setAiGenerateSummeryList(data);
          } catch (err) {
            console.error("Failed to parse AI summary:", err);
            toast("Failed to generate summary. Please try again.");
          } finally {
            setLoading(false);
          }
        //  console.log("AI Summary List:", aiGeneratedSummeryList);

               
        setLoading(false);
    }

    //  const onSave=()=>{
    //     setLoading(true)
    //     const data={
    //       data:{
    //         summery:summery
    //       }
    //     }
    //     GlobalApi.UpdateResumeDetail(params.resumeid,data).then(resp=>{
    //         console.log(resp);
    //         setLoading(false);
    //         toast('detail updated!')
    //     },(error)=>{
    //         setLoading(false);
    //         toast('Server error,Please try again:)')
    //     }
    // )
    // }
    
    const onSave=(e)=>{
          setLoading(true)
        const data={
            data:{
                summery:summery
            }
        }

        GlobalApi.UpdateResumeDetail(params.resumeid,data).then(resp=>{
            console.log(resp);
            // enabledNext(true);
            setLoading(false);
            toast("Details updated")
        },(error)=>{
            setLoading(false);
        })
    }

  return (
    <div>
         <div className='p-5 shadow-lg rounded-lg border-t-purple-600 border-t-4 mt-10'>
        <h2 className='font-bold text-lg'>Summery</h2>
        <p>Add Summery for your job title</p>
        


        <form className='mt-7' onSubmit={onSave}>
            <div className='flex justify-between items-end'>
                <label>Add Summery</label>
                <Button variant="outline" onClick={()=>GenerateSummeryFromAI()} type="button" size="sm" className="text-purple-600
                 text-purple-950 flex gap-2"><Brain className='h-4 w-4'/>Generate from AI</Button>
            </div>
            <Textarea className="mt-5" required
            onChange={(e)=>setSummery(e.target.value)}
            />
            <div className='mt-2 flex justify-end'>
                <Button disabled={loading}  onClick={()=>onSave()} type="submit" className="bg-purple-600">
              {loading?<LoaderCircle className='animate-spin'/>:'Save'}</Button>
            </div>
        </form>
</div>

{Array.isArray(aiGeneratedSummeryList) &&  aiGeneratedSummeryList.length > 0 && (<div className='my-5'>
    
   <h2 className='font-bold text-lg'>Suggestion</h2>
 { aiGeneratedSummeryList?.map((item,index)=>(
        <div key={index} className='cursor-pointer
         hover:bg-purple-50 p-3 rounded transition-all'
          onClick={()=>setSummery(
            Array.isArray(item.summary)
            ? item.summary.join(' ')
            : item.summary
          )} >
            <h2 className='font-bold my-1 text-purple-600'>Level:{item?. experience_level}</h2>
            
            <p> {Array.isArray(item.summary)
            ? item.summary.join(' ')
            : item.summary}</p>
            {/* <p>{item?.summary}</p> */}
            
            {/* <div dangerouslySetInnerHTML={{ __html: item.summery }} /> */}


        </div>
    ))}
</div>
)}
 </div>
  )
}

export default Summery