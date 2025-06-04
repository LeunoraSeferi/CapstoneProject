import { Button } from '@/components/ui/button'
import React from 'react'
import { useState } from 'react'

function QuizCardItem({quiz,userSelectedOption}) {

    const [selectedOption,setSelectedOption]=useState();

  return quiz&&(
    <div className='mt-10 p-5 '>
        <h2 className='font-medium text-3xl text-center'>{quiz?.question}</h2>



        <div className='grid grid-cols-2 gap-5 mt-6'>
            {quiz?.options.map((option,index)=>(
                  <h2 
                  onClick={()=>{setSelectedOption(option);
                    userSelectedOption(option)
                  }}
                  key={index} 
                  variant="outline"
                  className={`w-full min-h-[70px] rounded-full border p-4 text-base font-medium 
                 text-center flex items-center justify-center 
                 whitespace-normal break-words hover:bg-gray-200 cursor-pointer
                 ${selectedOption==option&&'bg-primary text-white hover:bg-primary'}`}
                  >{option}</h2>
            ))}
          
        </div>
    </div>
  )
}

export default QuizCardItem
