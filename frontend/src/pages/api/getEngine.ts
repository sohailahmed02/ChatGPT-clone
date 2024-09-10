import openai from "@/app/lib/chatgpt"
// import openai from "@/app/component/newchat"
import { NextApiRequest, NextApiResponse } from "next"

type Option ={
    value:string,
    label:string
}

type Data={
    modelOptions : Option[]
}

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse<Data>
){
    
    const models = await 
        openai.models.list()
        .then((res) => res.data)

    // console.log("models : ", models)
    
    const modelOptions = models.map((model) => ( {
        
        value : model.id,
        label : model.id
    }))

    res.status(200).json({
        modelOptions,
})
}