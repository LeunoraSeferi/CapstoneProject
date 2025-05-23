//pjesa e kurseve
import {NextResponse} from 'next/server';
import {db} from "@/configs/db";
import {STUDY_MATERIAL_TABLE} from "@/configs/schema";
import { courseOutlineAIModel } from '@/configs/AiModel';
import { inngest } from '@/inngest/client';

export async function POST(req){

    const{courseId,topic,courseType,difficultyLevel,createdBy}=await req.json();


    const PROMPT='Generate a study material for the book '+topic+' as a '+courseType+' course.The difficulty level is '+difficultyLevel+'.Please include:- A brief summary of the entire course/book.A list of chapters with a short summary for each chapter.A topic breakdown for each chapter (key concepts or subtopics).Return the response in structured JSON format.'  
 
    //Generate course layout using AI'
    const aiResp=await courseOutlineAIModel.sendMessage(PROMPT);
    const aiResult=JSON.parse(aiResp.response.text());

    //save the result along with User Input
    const dbResult=await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult
    }).returning({resp:STUDY_MATERIAL_TABLE})

    //trigger the Inngest function to generate chapter notes
    const result=await inngest.send({
        name:'notes.generate',
        data:{
            course:dbResult[0].resp
        }
    });
    console.log(result);


    return NextResponse.json({result:dbResult[0]})
}