import openai from "./chatgpt"

// import toast from "react-hot-toast"

  const queryAssist =async (prompt:string,ChatAssistantId:string,ChatThreadId:string) => {

    
        const threadMessages = await openai.beta.threads.messages.create(
          ChatThreadId,
            {
            role: "user",
            content: prompt
            }
        )
        // console.log(">>>>>>>>>threadMessages.content",threadMessages.content)
        var latestRun = await openai.beta.threads.runs.createAndPoll(
          ChatThreadId,
            { 
              assistant_id: ChatAssistantId,
              instructions: "."
            }
          )
          console.log("run id", JSON.stringify(latestRun,null,2))
        // var latestRun = await openai.beta.threads.runs.create(
        //   ChatThreadId,
        //     { 
        //       assistant_id: ChatAssistantId,
        //       instructions: "."
        //     }
        //   )
        // console.log("first status   ",latestRun.status)

       
        // while (latestRun.status !== "completed") {
        //     // console.log("Going to sleep");
        //     await new Promise(resolve => setTimeout(resolve, 1000)); // Sleep for 1 second before checking again
        //     // Retrieve the latest run information
        //     latestRun = await openai.beta.threads.runs.retrieve(ChatThreadId, latestRun.id  )
        //     console.log("Latest Status: ", latestRun.status);
        //     }
  

        const response = await openai.beta.threads.messages.list(ChatThreadId);
        // console.log("response", JSON.stringify(response, null, 2))
        const filteredMessages = response.data.filter(msg=> msg.run_id ===latestRun.id)
        // console.log("9999", JSON.stringify(filteredMessages,null,2))
        const contentList = filteredMessages.flatMap(message => message.content)
        // console.log("oooo", JSON.stringify(contentList,null,2))
        const assistResonse ={
            role : response.data[0].role,
            // content :  response.data[0].content
            content : contentList
        }
        return assistResonse
  }

export default queryAssist