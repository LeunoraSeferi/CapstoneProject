//Faqja e pare e localhost/create
import React from 'react'
import Image from 'next/image'
import { useState } from 'react'

function SelectOption({selectedStudyType}) {
    const Options=[
        {
            name:'Exam',
            icon:'/exam_1.png'
        },
        {
            name:'Practice',
            icon:'/practice.png'
        },
        {
            name:'Coding Prep',
            icon:'/code.png'
        },
        {
            name:'Other',
            icon:'/knowledge.png'
        },
    ]
    const [selectedOption,setSelectedOption]=useState();
  return (
    <div className=''>
        <h2 className='text-center mb-2 text-lg'>Which subject do you want to generate your personalized study material for?</h2>
        <div className="mt-5 grid grid-cols-2 gap-5 justify-center md:grid-cols-2 lg:grid-cols-4">
            {Options.map((option,index)=>(
                <div key={index}
                 className={`p-4 flex flex-col items-center justify-center
                 border rounded-xl hover:border-primary cursor-pointer
                 ${option?.name==selectedOption&&'border-primary'}`}
                 onClick={()=>{setSelectedOption(option.name);selectedStudyType(option.name)}}
                 
                 >
                    <Image src={option.icon} alt={option.name} width={50} height={50}/>
                    <h2 className='text-sm mt-2'>{option.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default SelectOption