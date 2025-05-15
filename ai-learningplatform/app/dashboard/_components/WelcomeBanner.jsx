"use client"
import { useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

function WelcomeBanner() {
    const {user}=useUser();
  return (
    <div className='p-5 bg-blue-500 w-full text-white rounded-lg flex items-center gap-6'>
        <Image src={'/laptop.png'} alt='Laptop' width={125} height={125}/>
        <div>
            <h2 className='font-bold text-3xl'>Hello. {user?.fullName}</h2>
            <p className=''>Welcome back! Ready to explore your next course?</p>
        </div>
    </div>
  )
}

export default WelcomeBanner