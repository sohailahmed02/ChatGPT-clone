import Link from "next/link"
import { ChatBubbleLeftIcon } from "@heroicons/react/24/outline"
import { TrashIcon } from "@heroicons/react/16/solid"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useCollection } from "react-firebase-hooks/firestore"
import { useSession } from "next-auth/react"
import { collection, deleteDoc, doc, or, orderBy, query } from "firebase/firestore"
import { db } from "../database/firebase"
import { set } from "firebase/database"

type Props = {
    id:string
}


const ChatRow = ({id} : Props) => {
    const pathname = usePathname()
    const router   = useRouter()
    const {data : session} = useSession()
    const [active, setActive] = useState(false)
    const [messages] = useCollection(session && 
        query(   
            collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
            orderBy('createdAt', 'asc'))
            )       
            // console.log(id)
    // const [messages] = useCollection(
    //     collection(db,"users", session?.user?.email!,"chats")    )
    // console.log("messagesmessages?.docs   :", messages?.docs[0]?.data().text[0].text.value)
    // console.log("messagesmessages?.docs   :", messages?.docs[0]?.data().text[0].text.value.split(":[")[0])
    useEffect(()=>{
        if(!pathname) return;

        setActive(pathname.includes(id))   
    },[pathname]    
    )            

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace("/")
    }

    return (        
        <Link 
            href={`/chat/${id}`} 
            className={`chatRow justify-center ${active && "bg-gray-700/50"}`}>
            <ChatBubbleLeftIcon className='h-5 w-5'/>
            <p className="flex-1 hidden md:inline-flex truncate">
                {/* {messages?.docs[messages?.docs.length - 1]?.data().text.text.value.split(":[")[0] || "New Chat"} */}
                {/*--- {messages?.docs[0]?.data().text.text.value.split(":[")[0] || "New Chat"} */}
                {messages?.docs[0]?.data().text[0].text.value || "New Chat"} 

            </p>
            <TrashIcon 
                onClick={removeChat}
                className="h-5 w-5 text-gray-200 hover:text-red-700"/>
        </Link>         
  )

}

export default ChatRow