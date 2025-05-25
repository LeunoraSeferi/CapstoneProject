//localhost:3000/course
//pasi e trusi buttonin View te kurs ajo pjesa eshte kjo
"use client"
import DashboardHeader from '@/app/dashboard/_components/DashboardHeader';
import axios from 'axios';
import { useParams } from 'next/navigation'
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import ChapterList from './_components/ChapterList';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';

function Course() {
    const {courseId}=useParams();
    const [course,setCourse]=useState();


    useEffect(()=>{
        GetCourse();
    },[])
    const GetCourse=async()=>{
        const result=await axios.get('/api/courses?courseId='+courseId);
        console.log(result);
        setCourse(result.data.result);
    }
  return (
    <div>
        <DashboardHeader/>
        <div className='mx-10 md:mx-36 lg:px-40 mt-10'>

        {/*Course intro*/}
             <CourseIntroCard course={course}/>

        {/*Study materials options*/}
             <StudyMaterialSection/>

        {/*Chapter list*/}
            <ChapterList course={course}/>
        </div>
    </div>
  )
}

export default Course