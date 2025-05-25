import React from 'react'
import MaterialCardItem from './MaterialCardItem';


function StudyMaterialSection() {

    const MaterialList=[
        {
            name:'Notes/Chapters',
            desc:'Go through the notes for preparation',
            icon:'/notes.png',
            path:'/notes'
        }, {
            name: 'Flashcard',
            desc: 'Flashcard help to remember the concepts',
            icon: '/flashcard.png',
            path: '/flashcards'
          },
          {
            name: 'Quiz',
            desc: 'Great way to test your knowledge',
            icon: '/quiz.png',
            path: '/quiz'
          },
          {
            name: 'Question/Answer',
            desc: 'A useful way to apply your knowledge',
            icon: '/qa.png',
            path: '/qa'
          }
        ]
    
  return (
    <div className='mt-5'>
        <h2 className='font-medium text-xl '>Study Material</h2>

        <div className='grid grid-cols-2 md:grid-cols-4 gap-5 mt-3'>
            {MaterialList.map((item,index)=>(
                <MaterialCardItem item={item}/>
            ))}
        </div>
    </div>
  )
}

export default StudyMaterialSection