from fastapi import File, UploadFile,FastAPI
from fastapi.middleware.cors import CORSMiddleware
# from openai import OpenAI
from pathlib import Path
import os
from pydantic import BaseModel
# from openai.types import

from openai import OpenAI


UPLOAD_DIR = Path() / 'UPLOAD'

app = FastAPI()

key = ""

client = OpenAI(api_key= key)
OpenAIModel= "gpt-3.5-turbo-1106" 
vector_store_name =  "Analyzer"   

    
app.add_middleware(
    CORSMiddleware,
    allow_origins =     ['*'],
    allow_credentials = ['*'],
    allow_methods =     ['*'],
    allow_headers =     ['*']
)

def OPENAI_fileSearch(AsstName:str, AsstDesc:str, AsstTool:str):    
    tools =[]
    if AsstTool != "":
        tools.append({"type":AsstTool})
    assistant = client.beta.assistants.create(
        name=        AsstName,
        instructions= AsstDesc,
        model=OpenAIModel,
        tools= tools 
        )    
    print(assistant)
    thread  = client.beta.threads.create()
    print("thread.id",thread.id)
    
    
    return assistant.id, thread.id
    
def fileUpload():
    
    vector_store = client.beta.vector_stores.create(name=vector_store_name)   
    
    uploaded_files = os.listdir("../backend/UPLOAD")
    print("uploaded_files", uploaded_files)
    print("with path ", ["../backend/UPLOAD/%s" %name for name in uploaded_files])
    file_paths = ["../backend/UPLOAD/%s" %name for name in uploaded_files]
    file_streams = [open(path, "rb") for path in file_paths]
    
    file_batch = client.beta.vector_stores.file_batches.upload_and_poll(
    vector_store_id=vector_store.id, files=file_streams)
    
    print(file_batch.status)
    print(file_batch.file_counts)
       
    return vector_store.id 
 
def code_interpreter():
    # Upload a file with an "assistants" purpose
    file = client.files.create(
    file=open("mydata.csv", "rb"),
    purpose='assistants'
) 
 
def AssstantUpdate(assistant_id, vector_store_id):    
     assistant = client.beta.assistants.update(
        assistant_id = assistant_id,
        tool_resources={"file_search": {"vector_store_ids": [vector_store_id]}},
)
     print("updated assisantt",assistant)
     return assistant.id
    
def askQuestion():    
    print("askQuestion")
    
    
    # while True:
    #     text = input("Ask a question?\n")
        
    #     message = client.beta.threads.messages.create(
    #         thread_id= thread.id,
    #         role = "user",
    #         content = text
    #     )
        
    #     run = client.beta.threads.runs.create_and_poll(
    #         thread_id= thread.id,
    #         assistant_id= assistant.Configid
    # #     )
    # #     # print(run) 
        
    # #     messages = list(client.beta.threads.messages.list(
    # #         thread_id=thread.id, 
    # #         run_id=run.id,
    # #     ))
        
    #     message_content = messages[0].content[0].text
        
    #     print("Response: \n")
#     #     print(message_content.value)
     
# class upload_type(BaseModel):
#     file:list[UploadFile]
#     AsstId:str     
     
    
@app.post("/uploadfile/",status_code=200)
async def upload( file:list[UploadFile]):   
    # print("uploadData", postdata.AsstId)   
    # print("uploadfile",len(file))
    # for file_path in UPLOAD_DIR.iterdir():
    #     if file_path.is_file():
    #         file_path.unlink()
    for fi in file:
        data = await fi.read()
        save_to = UPLOAD_DIR/fi.filename
        with open(save_to,'wb') as f:
            f.write(data)
    
    vector_store_ID = fileUpload()
    print("vector_store_ID",vector_store_ID)
    return vector_store_ID


class config_type(BaseModel):
    AsstNamei:str
    AsstDesci:str
    AsstTool : str

@app.post("/configure/",status_code=200)
async def configure(configuration: config_type):    
    print("AsstName",configuration.AsstNamei)
    print("Asstinstr",configuration.AsstDesci)
    print("AsstTool",configuration.AsstTool)
    
    assistant_id,thread_id = OPENAI_fileSearch(configuration.AsstNamei, configuration.AsstDesci,configuration.AsstTool)    
    return assistant_id,thread_id

class asstupdate_type(BaseModel):
    AsstId:str
    VectId:str

@app.post("/AssistantUpdate/",status_code=200)
async def AssistantUpdate(ids : asstupdate_type):  
    print("ids" ,ids.AsstId, ids.VectId)    
    UpdatedAssistantId = AssstantUpdate(ids.AsstId, ids.VectId)
         
    return UpdatedAssistantId

@app.post("/AskQuestion/",status_code=200)
async def AskQuestion(prompt:str):  
    print("prompt" ,prompt)    
    # AssstantUpdate(ids.AsstId, ids.VectId)
         
    return {"message": "assisant update sucessfully"}
