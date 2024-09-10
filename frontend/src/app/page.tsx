import React from 'react'

import { BoltIcon, ExclamationTriangleIcon, SunIcon } from '@heroicons/react/24/outline'

const Homepage = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen px-2 text-white'>
    
      <h1 className='text-5xl font-bold mb-20'>Chat NestAI Messenger</h1>
      
      <div className='flex space-x-2 text-center'>
        <div >

          <div className='flex flex-col items-center justify-center mb-5'>
            <SunIcon className="h-8 w-8 text-blue-500" />
            <h2>Examples</h2>
          </div>

          <div className='space-y-2'>
            <p className='info_text'>"Generate python code as file to produce first 50 prime number"</p>
            <p className='info_text'>"Generate graph between Fahrenheit and Celsius"</p>
            <p className='info_text'>"Can you summarize the attached document?"</p>
          </div>

        </div>


        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <BoltIcon className="h-8 w-8 text-blue-500" />
            <h2>Capabilities</h2>
          </div>

          <div className='space-y-2'>
            <p className='info_text'>"Generate 30 different types of file content, can be downloable"</p>
            <p className='info_text'>"Automatically parses and chunks your documents, creates and stores the embeddings"</p>
            <p className='info_text'>"To write and run Python code in background and produce output"</p>
          </div>

        </div>

        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <ExclamationTriangleIcon className="h-8 w-8 text-blue-500" />
            <h2>Limitation</h2>
          </div>

          <div className='space-y-2'>
            <p className='info_text'>"Max 500MB per file size can be upload as propritery document"</p>
            <p className='info_text'>"Input: text,file Output: text, images of graphs,  files with data "</p>
            <p className='info_text'>"Training Data upto sep 2021"</p>
          </div>

        </div>
      </div>


    </div>
  )
}
export default Homepage