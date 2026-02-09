from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

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

@app.post("/workout")
def create_workout(): 
    return {"message": "Workout created successfully"}



