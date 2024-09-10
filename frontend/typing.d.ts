import { MessageContentImageFile, MessageContentText } from "openai/resources/beta/threads/messages/messages.mjs"


interface Message {
    text:MessageContentImageFile | MessageContentText
    // text: MessageContentImageFile
    createdAt: admin.firestore.Timestamp
    user:{
        _id : string
        name : string
        avatar : string
    }
}