import React from 'react'
import DashboardHeader from '../dashboard/_components/DashboardHeader';


function CourseViewLayout({children}) {
  return (
    <div>
        {/* DASHBOARD HEADER */}
            <DashboardHeader />
        <div className='mx-10 md:mx-36 lg:px-40 mt-10'>
          {children}
        </div>
    </div>
  )
}

export default CourseViewLayout