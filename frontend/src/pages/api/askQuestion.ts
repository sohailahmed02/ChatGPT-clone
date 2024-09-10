import query from "@/app/lib/queryAPI";
import queryAssist from "@/app/lib/quertAssist"
import { type NextApiRequest, type NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/app/firebase/Admin";
import { NextRequest, NextResponse } from "next/server";
// import { MessageContentImageFile, MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs";
import { Timestamp } from "firebase/firestore";
import { Message } from "../../../typing";

// type Data ={
//     answer : MessageContentImageFile | MessageContentText
//  }

 const  handler = async(
    req : NextApiRequest,
    res : NextApiResponse
    // res : NextApiResponse<Data>
 ) => {
   const {prompt, chatId, openaimodel, session,ChatAssistantId,ChatThreadId} = req.body
    // console.log(">>>>>>body   ", prompt, chatId, openaimodel, session,ChatAssistantId,ChatThreadId)
   if(!prompt){
    res.status(400).json({
        answer:  {
            type: 'text',
            text: {
              value: "Please provide a prompt !",
              annotations: []
            }
          }
            })
   }

   if(!chatId){
    res.status(400).json({
        answer:  {
            type: 'text',
            text: {
              value: "Please provide a valid chat ID:",
              annotations: []
            }
          }
        })
   }
  //  await queryAssist(prompt,ChatAssistantId,ChatThreadId)
    // const response = await query( prompt,openaimodel)
    const {role, content} = await queryAssist(prompt,ChatAssistantId,ChatThreadId)      

    // console.log(">>>>>response :" , role, content)
   
    // || "ChatGPt was unable to find answer"
    const message:Message ={
        text : content.reverse()  ,
        createdAt : admin.firestore.Timestamp.now(),
        user : {
            _id : "ChatGPt",
            name : role,
            avatar : "https://ui-avatars.com/api/assistant"
    }   
}

await adminDb
.collection('users')
.doc(session?.user?.email!)
.collection('chats')
.doc(chatId)
.collection('messages')
.add(message)

   res.status(200).json({
        answer: message.text
    })

    
} 
 
 export default handler