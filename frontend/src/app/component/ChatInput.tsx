'use client'

import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp,doc, getDoc} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { FormEvent, useState } from "react"
import { db } from "../database/firebase"
// import { useCollection } from "react-firebase-hooks/firestore"
import toast from "react-hot-toast"
import ModelSelection from "./ModelSelection"
// import useSWR from "swr"
import { Message } from "../../../typing"
// import { MessageContentImageFile, MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs"



type Props={
    chatId : string
}

const ChatInput = ({chatId}: Props) => {
    const [prompt,setPrompt] = useState("")
    const {data:session} = useSession()

    //use SWR to get model

    // const {data:  model  } = useSWR("model", {
    //     fallbackData: "gpt-3.5-turbo"})
    const openaimodel = "gpt-3.5-turbo"
  
const sendMessage = async (e:FormEvent<HTMLFormElement>)=>{
    // console.log("send message pressesd")
    e.preventDefault()
    if(!prompt) return

    const input = prompt.trim()
    setPrompt("")
    // const firestorPrompt: MessageContentImageFile| MessageContentText = 
    const firestorPrompt =Array( 
    {
       type:"text",
        text:{
            value: input,
            annotations:[]
        }
    })
    
    // console.log("input " , input)
    const message:Message = {
        text:firestorPrompt,
        createdAt: serverTimestamp(),
        user:{
            _id:session?.user?.email!,
            name:session?.user?.name!,
            avatar:session?.user?.image!
            // avatar:session?.user?.image! || `https://ui-avatars.com/api/?name=${session?.user?.name}`

            }
    }
       
    const docRef = doc(db, 'users', session?.user?.email!,'chats',chatId);
    const docSnap = await getDoc(docRef);
    const ChatAssistantId = docSnap?.data()?.UpAsstID!
    const ChatThreadId = docSnap?.data()?.ThreadId! 


    await addDoc(
        collection(
            db,
            'users',
            session?.user?.email!,
            'chats',
            chatId, 
            'messages'
            ),
        message
    )    
    
    //Toast  notification
    const notification = toast.loading("ChatGPT is thinking...")
// import {} from "@/app/api/askQuestion"
    await fetch("/api/askQuestion",{
        method:"POST",
        headers:{
            "Content-type":"application/json",
        },
        body: JSON.stringify({
            prompt:input,
            chatId,
            openaimodel,
            session,
            ChatAssistantId,
            ChatThreadId
        }),
    }).then(()=>{
        //toast notificiaon for succes
        toast.success("ChatGPT has responded!",{
            id:notification
    })
})
}

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm outline-none ">
        <form onSubmit={sendMessage} className="p-5 space-x-5 flex " >
            <textarea 
                // className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled: text-gray-300 overflow-y-auto overflow-x-hidden"
                className="m-0 flex-1 resize-none border-0  focus-visible:ring-0
                bg-transparent max-h-full py-3 pr-12 pl-3" 
                disabled={!session}
                // type="text" 
                placeholder="Type your message here..."
                value = {prompt}
                onChange={(e)=>setPrompt(e.target.value)}
                
                />
            <button 
                className="bg-[#11A37F] hover:opacity-50 text-white font-bold
                px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed h-10 w-10 justify-center"
                disabled={!prompt || !session}
                type  ="submit">
                <PaperAirplaneIcon className="h-5 w-5 -rotate-45"/>
            </button>
        </form>
        <div className="md:hidden">
            <ModelSelection/>  
        </div>

    </div>
  )
}

export default ChatInput