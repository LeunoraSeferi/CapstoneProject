//localhost:3000/course
//pasi e trusi buttonin View te kurs ajo pjesa eshte kjo
"use client"

import Image from 'next/image';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import ChapterList from './_components/ChapterList';
import CourseIntroCard from './_components/CourseIntroCard';
import StudyMaterialSection from './_components/StudyMaterialSection';

function Course() {
  const { courseId } = useParams();
  const [course, setCourse] = useState();

  useEffect(() => {
    GetCourse();
  }, []);

  const GetCourse = async () => {
    const result = await axios.get('/api/courses?courseId=' + courseId);
    setCourse(result.data.result);
  };

  return (
      <div className=''>

        {/*Course intro*/}
            <CourseIntroCard course={course}/>

        {/*Study materials options*/}
            <StudyMaterialSection  courseId={courseId} course={course}/>

        {/*Chapter list*/}
            <ChapterList course={course}/>
      </div>
    
  );
}

export default Course;
