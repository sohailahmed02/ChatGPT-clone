import openai from "./chatgpt";


const query =async (prompt:string, model:string) => {
    const res = await openai.chat.completions.create({
        model,
        temperature: 0.9,
        top_p: 1,
        max_tokens: 1000,
        frequency_penalty: 0,
        presence_penalty: 0,
        messages:[{
            "role":'user',
            "content":prompt}],
        // stream:true
    })

   
    .then((res)=> res.choices[0].message.content)
    .catch(
        (err)=>`ChatGPt was unable to find answer (Error: ${err.
        message})`
        )

        return res      
}
export default query

//updates of openai 
// https://github.com/openai/openai-node/discussions/217/