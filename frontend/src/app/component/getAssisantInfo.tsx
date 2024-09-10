import { doc, getDoc} from "firebase/firestore"
import { useSession } from "next-auth/react"
import { db } from "../database/firebase"


type Props={
    chatId : string
}

    
const getData = async (chatId: string)=> {
    var AssistantName =""
    var Tool =""
    

// const {data:session} = useSession()

    // console.log("chatId",chatId)
    // const docRef = doc(db, 'users', session?.user?.email!,'chats',chatId);
    // const docSnap = await getDoc(docRef);
    // AssistantName = docSnap?.data()?.AssistantName!
    // Tool = docSnap?.data()?.tool[0]!.type
    // // console.log(AssistantName)
    // // console.log(Tool)
    // // console.log(docSnap?.data()?.assistantName!)
    return {"AssistantName": AssistantName , "Tool": Tool}
}

export default getData