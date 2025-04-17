import React from 'react'

function ExperiencePreview({resumeInfo}) {
  return (
   <div className="my-6">
    <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeInfo?.themeColor || '#e74c3c'
        }}
        >Professional Experience</h2>
         <hr style={{
            borderColor:resumeInfo?.themeColor || '#e74c3c'
        }} />
        
        {(resumeInfo?. experience || []).map(( experience,index)=>(
            <div key={experience.id || index}>
                <h2 className='text-sm font-bold'
                 style={{
                    color:resumeInfo?.themeColor || '#e74c3c'
                }}>{ experience?.title}</h2>
                <h2 className='text-xs flex justify-between'>{experience?.companyName}, 
                {experience?.city}, 
                {experience?.state}
                <span>{experience?.startDate} To {experience?.currentlyWorking?'Present':experience.endDate} </span>
                </h2>
                {/* ye isase richeditor me jo hum bold me lkhte hai vo html stline ke form me aata hai th hum if ise likhenge toh vo html style hat jayengi and normal texk me aa jaynege sab */}
                <div className='text-xs my-2' dangerouslySetInnerHTML={{__html:experience?.workSummery}} />
                </div>
            
        ))}
   </div>
  )
}

export default ExperiencePreview