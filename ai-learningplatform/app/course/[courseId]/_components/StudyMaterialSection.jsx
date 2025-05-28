import axios from 'axios';
import Link from 'next/link';
import React, { useEffect } from 'react'
import { useState } from 'react';
import MaterialCardItem from './MaterialCardItem';


function StudyMaterialSection({courseId}) {


    const[studyTypeContent,setStudyTypeContent]=useState();
    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Go through the notes for preparation',
            icon:'/notes.png',
            path:'/notes',
            type:'notes'
        }, {
            name: 'Flashcard',
            desc: 'Flashcard help to remember the concepts',
            icon: '/flashcard.png',
            path: '/flashcards',
            type:'flashcard'
          },
          {
            name: 'Quiz',
            desc: 'Great way to test your knowledge',
            icon: '/quiz.png',
            path: '/quiz',
            type:'quiz'
          },
          {
            name: 'Question/Answer',
            desc: 'A useful way to apply your knowledge',
            icon: '/qa.png',
            path: '/qa',
            type:'qa'
          }
        ]

    useEffect(()=>{
      GetStudyMaterial();
    },[])
    
    const GetStudyMaterial=async()=>{
        const result=await axios.post('/api/study-type',{
          courseId:courseId,
          studyType:'ALL'
        })
        console.log(result?.data);
        setStudyTypeContent(result.data)

    }



  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl '>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item,index)=>(
              <Link key={index} href={'/course/'+courseId+item.path}>
                <MaterialCardItem item={item} key={index}
                  studyTypeContent={studyTypeContent}
                />
                </Link>
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection