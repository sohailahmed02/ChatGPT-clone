import Markdown from 'react-markdown'
import FileHandling from "./FileHandling"
import { DocumentData, Timestamp } from "firebase/firestore"


type Props= {
    msg:DocumentData
}
const Texterv2 = ({ msg }: Props) => {
    // console.log(">>>>msg  ",msg)

    var contnet = ""
    var file_ids = [""]
    var responseType =""
    var file_names = [""]
if(msg.type == "text"){
  contnet = msg.text.value
  if(msg.text.annotations){
    file_ids = msg.text.annotations.map((annoti:any)=> annoti.file_path.file_id)
    file_names = msg.text.annotations.map((annoti:any)=> annoti.text.split("/")[3])
  }
  responseType = "text_file"
}
else 
if(msg.type == "image_file"){
  contnet = ""
  file_names = [""]
  file_ids = Array(msg.image_file.file_id)
  responseType = "image_file"
}
//  console.log(":::contnet",contnet.replace(/\\n/g, '\n'))

// const one  =  "Here are the names of the movies in which Leonardo DiCaprio and Tom Cruise have worked together:\n\n 1. Science Fiction CPMQVGT\n 2. The LCGFQJENB\n 3. Mystery EZQCSZKR\n4. Horror GWAXTHOIM\n5. Action KFFYPBKG\n6. The YACHDGJTKH\n7. Fantasy ENXIYFUPV\n8. An ADMXQH\n9. An OEWVDB\n10. The NDVPXCMW\n11. Fantasy QPCYSHSQ\n12. Fantasy JORFND\n13. Documentary PRCZNYQHRM\n\nIf you have any other questions or need further assistance, feel free to ask!"
// const two =   "Here are the names of the movies in which Leonardo DiCaprio and Tom Cruise have worked together:\n\n1. Science Fiction CPMQVGT\n2. The LCGFQJENB\n3. Mystery EZQCSZKR\n4. Horror GWAXTHOIM\n5. Action KFFYPBKG\n6. The YACHDGJTKH\n7. Fantasy ENXIYFUPV\n8. An ADMXQH\n9. An OEWVDB\n10. The NDVPXCMW\n11. Fantasy QPCYSHSQ\n12. Fantasy JORFND\n13. Documentary PRCZNYQHRM\n\nIf you have any other questions or need further assistance, feel free to ask!"
// console.log(":::one",one)
 
return (
    <div className="flex-col inline-block">
    <Markdown
      className='text-white text-sm'>
      {contnet.replace(/\\n/g, '\n')}
    </Markdown>
   {/* <p className="pt-1 text-white text-sm">{contnet}</p> */}
  <FileHandling restype ={responseType} fileId ={file_ids} filename = {file_names}/>
  </div>
  )
}

export default Texterv2