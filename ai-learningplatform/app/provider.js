"use client"
import {db} from '@/configs/db';
import {USER_TABLE} from '@/configs/schema';
import { useUser } from '@clerk/nextjs'
import {eq} from 'drizzle-orm';
import React,{useEffect} from 'react'
import axios from "axios";


function Provider({ children }) {

  const { user } = useUser();

  useEffect(()=>{
    user&&CheckIsNewUser();
  },[user])

  const CheckIsNewUser = async() => {
    // Check Is User Already Exist
    //const result = await db
    //  .select()
      //.from(USER_TABLE)
     // .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

   // if(result?.length==0)
   // {
        //If not,then add to DB
     //   const userResp=await db.insert(USER_TABLE).values({
     //       name:user?.fullName,
     //       email:user?.primaryEmailAddress?.emailAddress
    //    }).returning({id:USER_TABLE.id})

   // }

   const resp=await axios.post('/api/create-user',{user:user});
   console.log(resp.data);

   
  }

  return (
    <div>
      {children}
    </div>
  );
}

export default Provider;
