import { useEffect, useState } from "react";
import { fetchdata } from "../lib/fetchImages"

type Props={
    fileId:string
}

 const ImageFile =  ({fileId}: Props) => {

    const [base64String, setBase64String] = useState<string | null>(null);
    useEffect(() => {
        const fetchDataAndSetState = async (fileId:string) => {
            try {
               
              const data = await fetchdata(fileId);
              if (data) {
                setBase64String(data);
                // console.log(data)
              } else {
                console.error("Fetched data is undefined");
              }
            } catch (error) {
              console.error("Error fetching data:", error);
            }
          };
    
    fetchDataAndSetState(fileId); // Call fetchData when component mounts
  }, [fileId]); // Run only once when component mounts


  return (
    
            <div >
          {base64String && (
            <img src={`data:image/png;base64,${base64String}`} alt="Image" />
          )}
        </div>
      );
    };
  
    

export default ImageFile