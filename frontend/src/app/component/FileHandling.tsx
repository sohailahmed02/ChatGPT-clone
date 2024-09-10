import TextFile from './TextFile'
import ImageFile from './ImageFile'



type Props ={
    restype:string
    fileId:string[]
    filename:string[]
}

const FileHandling = ({restype,fileId,filename}:Props) => {
  return (
    <div className='flex flex-wrap flex-col'>
        {fileId.map((file,index)=> 
         restype=='text_file' ?
         <div><p><TextFile key={file} fileId={file} filenam = {filename[index]}/> </p>  </div>  :
         <div><ImageFile key={file} fileId={file}/></div> 
         )}
    </div>
  )
}

export default FileHandling