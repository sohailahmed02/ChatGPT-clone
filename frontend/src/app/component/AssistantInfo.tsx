'use client'

import { doc, getDoc} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { db } from "../database/firebase"
// import getData from "./getAssisantInfo"
import { useEffect, useState } from "react"



type Props={
    chatId : string
}

type AssistantData = {
  AssistantName: string;
  Tool: string;
};
const getData = async (chatId: string, session: any): Promise<AssistantData> => {
  let AssistantName = "";
  let Tool = "";

  // console.log("chatId", chatId);
  const docRef = doc(db, 'users', session?.user?.email!, 'chats', chatId);
  const docSnap = await getDoc(docRef);
  AssistantName = docSnap?.data()?.AssistantName!;
  Tool = docSnap?.data()?.tool[0]?.type!; // Make sure to handle cases where tool or type might be undefined/null

  return { AssistantName, Tool };
};

const AssistantInfo =  ({chatId}: Props)  => {
    const { data: session } = useSession();
    const [data, setData] = useState<AssistantData | null>(null);

    useEffect(() => {
      if (session) {
          getData(chatId, session)
              .then(data => {
                  setData(data);
              })
              .catch(error => {
                  console.error("Error fetching data:", error);
              });
      }
  }, [chatId, session]);
    // const [AssistantData, setAssistantData] = useState({
    //     "AssistantName": "",
    //     "Tool": ""
    // })    

    // const AssistDAta = async () =>{
    //     setAssistantData(await getDa  ta(chatId))
    // }

    // AssistDAta()    
    // console.log("AssistantName, Tool",AssistantData.AssistantName, AssistantData.Tool)

    // const { data: session } = useSession();


  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-sm outline-none ">
       <div className='text-lg text-white'>Assistatnt Name : {data?.AssistantName}</div> 
       <div className='text-lg text-white' >Assistant Type : {data?.Tool}</div>
    </div>
  )
}

export default AssistantInfo