import React from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'
import Link from 'next/link'


function CourseCardItem({course}) {
  return (
    <div className='border rounded-lg shadow-md p-5'>
        <div>
            <div className='flex justify-between items-center '>
                <Image src={'/knowledge.png'} alt='other' 
                width={50} height={50}/>
                <h2 className='text-[10px] p-1 px-2 rounded-full bg-blue-600 text-white'>23 May 2025</h2>
            </div>
            <h2 className='mt-3 font-medium text-lg'>{course?.courseLayout?.courseTitle}</h2>
            <p className='text-sm line-clamp-2 text-gray-500 mt-2'>{course?.courseLayout?.summary}</p>
            <div className='mt-3'>
                <Progress value={0}/>
            </div>

            <div className='mt-3 flex justify-end'>
             
             {course?.status=='Generating'?
             <h2 className='text-sm p-1 px-2 flex gap-2 items-center rounded-full bg-gray-400 text-white'>
                <RefreshCw className='h-5 w-5 '/>
                Generating...</h2>
             :
             <Link href={'/course/'+course?.courseId}>
              <Button>View</Button>
             </Link>}
            </div>
       
        </div>
    </div>
  )
}

export default CourseCardItem