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
    "http://localhost:5173",
    "http://127.0.0.1:5173",
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

@app.post("/generate")
def generate_workout(req: WorkoutRequest):
    messages = [{"role": "user", "content": req.prompt, "source": "C:\\Users\\Student-35\\Downloads\\Generated-Workout-Planner\\megaGymDataset.csv"}]
    response = ollama.chat(
        model="llama3:8b",
        messages=messages
    )
    return {"response": response}

print(generate_workout(WorkoutRequest(prompt="Create a workout plan for a bodybuilder.")))