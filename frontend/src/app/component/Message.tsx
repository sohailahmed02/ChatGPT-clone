import { DocumentData, Timestamp } from "firebase/firestore"
// import { MessageContentImageFile, MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs"
// import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
// import {FileImage, FileLineChart, FileSpreadsheet, FileType,Text} from 'lucide-react'
// import File_download from "./File_download"
// import HTMLRenderer from "./HTMLRenerer"
import FileHandling from "./FileHandling"
import Markdown from 'react-markdown'
import Texterv2 from "./Messagev2"


type Props= {
    message:DocumentData
}

const Message = ({message}:Props) => {
  // console.log(">>>>message  ",message.text.map((msg:any)=> console.log(msg.text)))
  // console.log(">>>>text  ",message?.text?.text?.value)
    const isChatGPT = message.user.name === "assistant"   

    var contnet = ""
    var file_ids = [""]
    var responseType =""
    var file_names = [""]
if(message.text.type == "text"){
  contnet = message.text.text.value
  if(message.text.text.annotations){
    file_ids = message.text.text.annotations.map((annoti:any)=> annoti.file_path.file_id)
    file_names = message.text.text.annotations.map((annoti:any)=> annoti.text.split("/")[3])
  }
  responseType = "text_file"
}
else 
if(message.text.type == "image_file"){
  contnet = ""
  file_names = [""]
  file_ids = Array(message.text.image_file.file_id)
  responseType = "image_file"
}
  return (
    <div className={`py-5 ${isChatGPT && "bg-[#434654]"}`}>
        <div className="flex space-x-5 px-10 max-w-2xl mx-auto flex-wrap">
            <div><img src={message.user.avatar} alt="avatar" className="h-8 w-8 inline-block" /> </div>
                {/* <div className="flex-col"> */}
                {/* <Markdown */}
                  {/* className='pt-1 text-white text-sm'> */}
                  {/* {contnet} */}
                {/* </Markdown> */}
               {/* <p className="pt-1 text-white text-sm">{contnet}</p> */}
              {/* <FileHandling restype ={responseType} fileId ={file_ids} filename = {file_names}/> */}
              {/* </div> */}
              {message.text.map((msg:any)=>(
        <Texterv2 key={msg.id} msg={msg}/>            
              ))}
        </div>
    </div>
  )
}

export default Message