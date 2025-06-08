import React from 'react'

function ChapterList({course}) {
    const CHAPTERS=course?.courseLayout?.chapters;
  return (
    <div className='mt-5'>
         <h2 className='font-medium text-xl'>Chapters</h2>


         <div className='mt-3'>
            {CHAPTERS?.map((chapter,index)=>(
                <div  key={index} className='flex flex-col gap-5 text-center items-center p-4 
                border shadow-md mb-2 rounded-lg cursor-pointer'>
                    <h2 className='font-medium text-primary'>{chapter?.title}</h2>
                    <p className='text-gray-500'>{chapter?.summary}</p>
                </div>
            ))}
         </div>
    </div>
  )
}

export default ChapterList