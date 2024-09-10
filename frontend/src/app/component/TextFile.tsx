import axios from 'axios';


type Props={
  fileId :string
  filenam:string
}

let key =""

const TextFile = ({fileId,filenam}:Props) => {
  // console.log("8777",fileId,filenam)

  const downloadPdf = async () => {
      try {
        const response = await axios.get(
          `https://api.openai.com/v1/files/${fileId}/content`,
          {
            headers:{
              "Authorization":key,
          },
            responseType: "blob",             
          }
        );
        // Create a Blob from the response data
        const fileBlob = new Blob([response.data], { type: `application/${filenam.split(".")[1]}` });

        // Create a temporary URL for the Blob
        const url = window.URL.createObjectURL(fileBlob);

        // Create a temporary <a> element to trigger the download
        const tempLink = document.createElement("a");
        tempLink.href = url;
        tempLink.setAttribute(
          "download",
          `${filenam}`
        ); // Set the desired filename for the downloaded file

        // Append the <a> element to the body and click it to trigger the download
        document.body.appendChild(tempLink);
        tempLink.click();

        // Clean up the temporary elements and URL
        document.body.removeChild(tempLink);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error("Error downloading PDF:", error);
      }
    };

  return (
    <button
    key={fileId} className=" bg-gray-700 truncate p-2 m-2 outline-2 text-yellow-200 rounded-lg"
      onClick={downloadPdf}> {filenam}

    </button>
    
      // <Button key={fileId} className=" bg-gray-700 truncate p-2 m-2 outline-2 text-yellow-200 rounded-lg"
      // onClick={downloadPdf}> {filenam} </Button>
  );
}

export default TextFile;