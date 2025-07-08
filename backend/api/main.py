from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Import the bot
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from bot import Me

load_dotenv(override=True)

app = FastAPI()

# Allow CORS for local frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    question: str
    history: list = []

# Initialize the bot
me = Me()

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/api/ask")
def ask_bot(req: AskRequest):
    # history is a list of {role, content} dicts
    answer = me.chat(req.question, req.history)
    return {"answer": answer}

# This is required for Vercel
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 