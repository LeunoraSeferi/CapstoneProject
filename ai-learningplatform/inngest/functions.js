import { inngest } from "./client";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE,USER_TABLE,CHAPTER_NOTES_TABLE } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { courseOutlineAIModel, generateNotesAiModel } from "@/configs/AiModel";

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
                    const PROMPT='Generate exam material detail content for each chapter,Make sure to includes all topic point in the content,make sure to give content in HTML format(do not add HTML,Head ,Body,title tag),The chapters:'
                    +JSON.stringify(chapter);
                    const result=await generateNotesAiModel.sendMessage(PROMPT);
                    const aiResp=result.response.text();

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

    

   
 
