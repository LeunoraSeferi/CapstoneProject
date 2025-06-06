import { inngest } from "./client";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE,USER_TABLE,CHAPTER_NOTES_TABLE, STUDY_TYPE_CONTENT_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { courseOutlineAIModel, generateNotesAiModel, GenerateStudyTypeContentAiModel,GenerateQuizAiModel } from "@/configs/AiModel";

        export const helloWorld = inngest.createFunction(
        { id: "hello-world" },
        { event: "test/hello.world" },
        async ({ event, step }) => {
            await step.sleep("wait-a-moment", "1s");
            return { event, body: "Hello,World!" };
        });

        export const CreateNewUser = inngest.createFunction(
            { id: "create-user" },
            { event: "user.create" },
            async ({ event, step }) => {
                const {user} = event.data; 
                const result = await step.run('Check User and create New if not in DB',async()=>{
                      // Check Is User Already Exist
                const result = await db
                .select()
                .from(USER_TABLE)
                .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

                if (result?.length == 0) {
                //If not,then add to DB
                const userResp = await db
                    .insert(USER_TABLE)
                    .values({
                    name: user?.fullName,
                    email: user?.primaryEmailAddress?.emailAddress,
                    })
                    .returning({ id: USER_TABLE.id });
                    return userResp;
                }
                return result;
              })
              return 'Success';
            }
             //Step is to Send Welcome Email notification

             //Step to Send Email notification after 3 days once user join it
        ) 

        export const GenerateNotes = inngest.createFunction(
            { id: 'generate-course' },
            { event: 'notes.generate' },
            async ({ event, step }) => {
              const { course } = event.data; // All Record Info
          
              // Generate Notes for Each Chapter with AI
              const notesResult = await step.run('Generate Chapter Notes',async()=>{
                const Chapters=course?.courseLayout?.chapters;
                let index=0;
                Chapters.forEach(async(chapter)=>{
                  const PROMPT = `Generate a full HTML exam material for the chapter titled "${chapter.title}".
                  Include all topics below as subheadings and paragraphs.
                  Topics: ${chapter.topics.map((t) => t.topicName).join(", ")}
                  Return clean HTML content without <html>, <head>, or <body> tags.`;
                  
                  const result = await generateNotesAiModel.sendMessage(PROMPT);
                  const aiResp = (await result.response).text();  // sigurohu që e pret me `await`
                  

                    await db.insert(CHAPTER_NOTES_TABLE).values({
                        chapterId:index,
                        courseId:course?.courseId,
                        notes:aiResp
                    })
                    index=index+1;
                })
                return 'Completed'
              })

              //update status to 'ready'
              const updateCourseStatusResult=await step.run('Update Course Status to Ready',async()=>{
                const result=await db.update(STUDY_MATERIAL_TABLE).set({
                    status:'Ready'
                }).where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId))
                return 'Success';
              });

            }
        )


        //used to generate flashcard,quiz,question/answer
      export const GenerateStudyTypeContent=inngest.createFunction(
        {id:'Generate Study Type Content'},
        {event:'studyType.content'},

        async({event,step})=>
        {
          const {studyType,prompt,courseId,recordId}=event.data;

         
          const AiResult=await step.run('Generating Flashcards using Ai',async()=>{
              const result = 
              studyType=='Flashcard'?
              await GenerateStudyTypeContentAiModel.sendMessage(prompt):
              await GenerateQuizAiModel.sendMessage(prompt);
              const AIResult=JSON.parse(result.response.text());
              return AIResult
          })
          
          



        //save the result
        const DbResult=await step.run('Save result to DB',async()=>{
          const result=await db.update(STUDY_TYPE_CONTENT_TABLE)
          .set({
            content:AiResult,
            status:'Ready'
          })
          .where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
          return 'Data Inserted';
        });
      }
    )

    
 
