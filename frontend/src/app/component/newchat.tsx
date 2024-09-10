'use client'


import { PlusIcon } from "@heroicons/react/16/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import { db } from "../database/firebase";
import {assistant,thread} from "@/app/lib/assistant"
import OpenAI from "openai";
    
type assistantType = {
  assistantID :string
  threadID:string
}



const Newchat = () => {
    const router = useRouter()
    const {data:session} = useSession();

    const createNewChat = async() => {   

      const assistantName= "Math Tutor"
      const assistantInstruction= "You are a personal math tutor. Write and run code to answer math questions."  
      const OpenAIModel= "gpt-3.5-turbo-1106"      
    
      
      // console.log("newassistant ",(await assistant).id,(await thread).id)
 
      // console.log("tools  ", (await assistant).tools[0].type)
    const doc = await addDoc(collection(db,'users', session?.user?.email!, "chats"),{
      messages:[],
      userId:session?.user?.email!,
      createAt: serverTimestamp(),
      assistantId:(await assistant).id,
      threadId : (await thread).id,
      assistantName:assistantName,
      assistantInstruction:assistantInstruction,
      OpenAIModel:OpenAIModel,
      tool :(await assistant).tools[0].type
     }) 

     router.push(`/chat/${doc.id}`)
  }
  return (
    <div onClick={createNewChat} className="border-gray-700 border chatRow">
       <PlusIcon className="h-4 w-4"/>
        <p>New chat</p>
    </div>
  )
}

export default Newchat