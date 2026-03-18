from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import ollama

app = FastAPI()

# Pydantic model for workout requests
class WorkoutRequest(BaseModel):
    prompt: str

# 👇 Allowed origins (Vite default dev URL)
origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # you can restrict later if you want
    allow_headers=["*"],
)



@app.get("/")
def read_root():
    return {"Workout": "World"}

@app.post("/workout")
def generate_workout(req: WorkoutRequest):
    system_content = f"You are a helpful personal training assistant. You give short responses to user questions and design simple workouts. Use the following cardio activities data if relevant"
    messages = [
        {"role": "system", "content": system_content},
        {"role": "user", "content": req.prompt}
    ]
    
    opt = {
        "temperature": 0.7,
        "max_tokens": 500
    }

    response = ollama.chat(messages=messages, 
                        options=opt,
                        model="llama3.2:1b"
    )
    return {"response": response.message.content}