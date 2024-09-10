'use client'

import { useEffect, useState } from "react"
import { db } from "../database/firebase";
import { addDoc, collection, serverTimestamp, updateDoc , doc, getDocs, query, where, } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"
import ModelSelection from "../component/ModelSelection"


const FileUpload =  ()  => {

    const router = useRouter()
    const {data:session} = useSession();
    const [files,    setFiles] =   useState([])
    const [AsstName, setAsstName]= useState("")
    const [AsstDesc, setAsstDesc]= useState("")
    const [doc_idi,   setdoc_idi]= useState("")
    var AsstId = ""
    var ThreadId = ""
    var VectId =""
    var UpAsstID =""    
    var tools = [{}]
    var doc_id =[""]

    const handleFileInputChange = (event:any) =>{
        setFiles(Array.from(event.target.files))    
    }

    const addDoco = async (AsstID:string,ThreadId:string,VectID:string,UpAsstID:string,AsstName:string,AsstDesc:string,tools:{}) =>{
        // console.log("id",AsstID,"id",VectID,"id",UpAsstID,"id",tools,"ThreadId",ThreadId)
         const doc = await addDoc(collection(db,'users', session?.user?.email!, "chats"),{
            messages:[],
            userId:session?.user?.email!,
            createAt: serverTimestamp(),
            AssistantId:AsstID,
            ThreadId:ThreadId,
            VectID : VectID,
            UpAsstID : UpAsstID,
            AssistantName:AsstName,
            AssistantInstruction:AsstDesc,
            OpenAIModel:"gpt-3.5-turbo-1106",
            tool :tools
                })
            return doc
            }
                                
    const SubmitFunction = async (event:any) =>{
        event.preventDefault()

        // console.log("submitted")
        const doc = await handleconfiguration(AsstName, AsstDesc)            
    }       

    const handleconfiguration = async (AsstName:string , AsstDesc:string)=>{
            const endpoint = "http://127.0.0.1:8000/configure/"
            const response  = await fetch(endpoint,{
                method: "POST",
                body:JSON.stringify({
                    AsstNamei:AsstName,
                    AsstDesci:AsstDesc,
                    AsstTool : isFile ? "file_search" : isCode ? "code_interpreter" : ""
                }),
                headers:{
                    "Content-Type" : "application/json"
                }
            })
            .then(res => res.json())
            .then(async response => {
                // console.log("1-ThreadId", response[1])
                AsstId = response[0]
                ThreadId = response[1]
                // console.log("1-AsstId", AsstId);
                
                if(isFile){
                        const formData = new FormData()

                        files.forEach(file=>{
                            formData.append('file', file)
                        })
                            const endpoint = "http://127.0.0.1:8000/uploadfile/"
                            const responsefile  = await fetch(endpoint,{
                                method: "POST",
                                body:formData
                            })
                            .then(res => res.json())
                            .then(async response => {
                                VectId = response
                                // console.log("1- VectId***", VectId)
                                // console.log("2-AsstId***", AsstId);

                                        const endpoint = "http://127.0.0.1:8000/AssistantUpdate/"
                                        const responseassistantupdate  = await fetch(endpoint,{
                                            method: "POST",
                                            body:JSON.stringify({
                                                AsstId: AsstId,
                                                VectId: VectId,
                                            }),
                                            headers:{
                                                "Content-Type" : "application/json"
                                            }                
                                        })
                                        .then(res => res.json())
                                        .then(async response  => {
                                            UpAsstID = response
                                            // console.log("updated assis id", UpAsstID);
                                            // console.log("VectId***", VectId)
                                            // console.log("3-AsstId***", AsstId);
                                            tools=[{"type": "file_search"}]      
                                        });
                            })
                }
                else {
                    tools=[{"type": isCode ? "code_interpreter": ""}]
                    VectId = ""
                    UpAsstID = AsstId                                                      
                } 
                addDoco(AsstId,ThreadId,VectId,UpAsstID,AsstName, AsstDesc,tools)
                // console.log("get data")
                const docRef = collection(db, 'users', session?.user?.email!,'chats');  
                const querySnapshot = query(docRef,where('AssistantInstruction', '==', AsstDesc));
                const docSnap = await getDocs(querySnapshot);  
                
                docSnap.forEach((doc:any) => {
                    // Access each document's data
                    const data = doc.data();
                    doc_id.push(doc.id)
                    // console.log("Document ID:", doc.id);
                    // console.log("Document Data:", data);
            })
                // console.log("doc_id***", doc_id)
                router.push(`/chat/${doc_id[1]}`)

                
            });            
        }    
        const [isFile, setisFile] = useState(false);
        const [isCode, setisCode] = useState(false);

      
        const handleCheckboxFileSearchChange = () => {
          setisFile(prevState => !prevState);
        };

        const handleCheckboxCodeInterpreterChange =()=>{
            setisCode(prevState => !prevState);
        }
    

    return (
      <div>
        <div className="p-6 m-6" >
            <h1 className="text-xl text-yellow-100"> Model Selection</h1>
          < ModelSelection/>
      </div> 
<div className="outline-2 shadow-md rounded-lg outline-gray-100 m-6 p-6">
    <form className="flex flex-col bg-[#202123] rounded-lg " onSubmit={SubmitFunction}>
        <h1 className="font-extrabold text-2xl text-white shadow-lg m-2" >Assistant configuration</h1>
        <input 
            type="text" 
            placeholder="OpenAI Assistant Name" 
            className="bg-gray-500 text-black rounded-lg truncate p-2 m-5"
            onChange={(e)=>setAsstName(e.target.value)}/>
        <textarea  
            placeholder="Assistant Instruction" 
            className="bg-gray-500 text-black rounded-lg  p-2 m-5"
            onChange={(e)=> setAsstDesc(e.target.value)}/>      
            
         <h1 className="font-extrabold text-2xl text-white shadow-lg m-2" >Assistant Tools</h1>
                        
        <div className="inline-block align-middle" >
        <input
        type="checkbox"
        checked={isFile}
        onChange={handleCheckboxFileSearchChange}
        className="w-7 h-7 m-5 "
        disabled={!AsstName || !AsstDesc}
      />
      <label className="inline-block text-xl text-yellow-100"  htmlFor="checkbox">File Search </label>

      <input
        type="checkbox"
        checked={isCode}
        onChange={handleCheckboxCodeInterpreterChange}
        className="w-7 h-7 m-5 "
        disabled={!AsstName || !AsstDesc}
      />
      <label className="inline-block text-xl text-yellow-100"  htmlFor="checkbox">Code Interpreter </label>
      

      </div>
        <input disabled={!isFile} type="file" onChange={handleFileInputChange} multiple className="m-5 text-yellow-100 text-xl" />
        <button  type='submit'  disabled={!AsstName || !AsstDesc} className="bg-white border w-40 h-10 my-2 mx-5 text-xl font-extrabold rounded-lg disabled:text-slate-400 disabled:cursor-not-allowed" > Submit</button>        
    </form>
</div>
      </div>
    )
  }
  
  export default FileUpload