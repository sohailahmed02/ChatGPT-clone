import AssistantInfo from "@/app/component/AssistantInfo"
import Chat from "@/app/component/Chat"
import ChatInput from "@/app/component/ChatInput"


type Props={
  params:{
    id:string
  } 

}

const ChatPage = ({params:  {id}} : Props) => {

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <AssistantInfo chatId={id}/>
      <Chat chatId={id} /> 
      <ChatInput chatId= {id}/>
      
    </div>
  )
}

export default ChatPage