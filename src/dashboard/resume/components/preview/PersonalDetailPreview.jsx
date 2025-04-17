import React from 'react'

function PersonalDetailPreview({resumeInfo}) {
  return (
    <div>
        <h2  className='font-bold text-xl text-center'
        style={{
            color:resumeInfo?.themeColor || '#e74c3c'
        }}>{resumeInfo?.firstName}{resumeInfo?.lastName}</h2>
         <h2 className='text-center text-sm font-medium'
       >{resumeInfo?.jobTitle}</h2>
        <h2 className='text-center font-normal text-xs'
        style={{
            color:resumeInfo?.themeColor || '#e74c3c'
        }}>{resumeInfo?.address}</h2>

        <div className='flex justify-between'>
            <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themeColor || '#e74c3c'
            }}>{resumeInfo?.phone}</h2>
            <h2 className='font-normal text-xs'
             style={{
                color:resumeInfo?.themeColor || '#e74c3c'
            }}>{resumeInfo?.email}</h2>

        </div>
        <hr className='border-[1.5px] my-2'
        style={{
            borderColor:resumeInfo?.themeColor || '#e74c3c'
        }}
        />
    </div>
  )
}

export default PersonalDetailPreview