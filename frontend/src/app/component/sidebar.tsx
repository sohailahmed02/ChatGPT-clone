'use client'
import { useSession,signOut } from "next-auth/react"
import {useCollection} from 'react-firebase-hooks/firestore'
// import Newchat from "./newchat"
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "../database/firebase"
import ChatRow from "@/app/component/ChatRow"
// import ModelSelection from "./ModelSelection"
// import { useRouter } from "next/router"
import Link from "next/link"
import { PlusIcon } from "@heroicons/react/16/solid"
import { HomeModernIcon } from "@heroicons/react/16/solid"






const Sidebar = () => {
  // const router = useRouter()
  const {data:session} = useSession()

  const [chats,loading] = useCollection(session &&
      collection(db,"users", session?.user?.email!,"chats")    )      
  // const [chats] = useCollection( session &&
  //     query(   
  //         collection(db, 'users', session.user?.email!, 'chats'),
  //         orderBy('createdAt', 'asc')
  //         )
  //   )  

  // console.log("chats  ",chats)

  return (
    <div className='flex flex-col h-screen p-2'>
        <div className='flex-1'>
            <div>
               {/* <Newchat/> */}
               <div >
                  <Link href="../" 
                  className="border-gray-700 border chatRow" > 
                   <HomeModernIcon className="h-4 w-4"/> 
                   <p>Home</p>
                  </Link>
                </div>

               <div  >
                  <Link href="../NewChat" 
                  className="border-gray-700 border chatRow" > 
                   <PlusIcon className="h-4 w-4"/> 
                   <p>New chat</p>
                  </Link>
                </div>
                {/* <div className="hidden sm:inline">
                    <ModelSelection/>
                </div>  */}
                
                <div className="flex flex-col space-y-2 my-2">
                  {loading && (
                    <div className="animate-pulse text-center text-white">
                      <p>Loading Chat...</p>
                    </div>
                  )}                
                  
                    {chats?.docs.map(chat=>(
                      <ChatRow key={chat.id} id={chat.id} />

                    ))}
                     </div> 
            </div>               
        </div>
        {session && (
          <div className="flex flex-col"> 
          <div className="items-center">
            <img 
            src={session.user?.image!} 
            alt="profile pic" 
            className ="h-12 w-12 rounded-full cursor-pointer mb-2 hover:opacity-40"
          />
          <h1 className='text-gray-200 font-bold ' >{session.user?.name}</h1>
          </div>
          <button onClick={() => signOut()} className="border-gray-700 border chatRow" >Sign Out</button>
          
          </div>
          
          
          
        )}
    </div>
  )
}

export default Sidebar