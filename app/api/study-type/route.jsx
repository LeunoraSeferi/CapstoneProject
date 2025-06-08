//pjesa e study type ato 4 qa,quiz...
import { db } from '@/configs/db';
import { CHAPTER_NOTES_TABLE } from '@/configs/schema'; 
import { and, eq } from 'drizzle-orm';
import {NextResponse} from 'next/server';
import { STUDY_TYPE_CONTENT_TABLE } from '@/configs/schema';



export async function POST(req){
    const {courseId,studyType}=await req.json();

    if(studyType=='ALL')
    {
        const notes=await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));


        //Get the all other Study Type Records
        const contentList=await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId));


        const result={
            notes:notes,
            flashcard:contentList?.filter(item=>item.type=='Flashcard'),
            quiz:contentList?.filter(item=>item.type=='Quiz'),
            qa:contentList?.filter(item=>item.type=='QA')
        }
        return NextResponse.json(result);
    }
    else if(studyType=='notes')
    {
        const notes=await db.select().from(CHAPTER_NOTES_TABLE)
        .where(eq(CHAPTER_NOTES_TABLE?.courseId,courseId));

        return NextResponse.json(notes);
    }
    else {
        const result=await db.select().from(STUDY_TYPE_CONTENT_TABLE)
        .where(and( eq(STUDY_TYPE_CONTENT_TABLE?.courseId,courseId),
        eq(STUDY_TYPE_CONTENT_TABLE.type,studyType)))
        return NextResponse.json(result[0]??[]);
    }
}