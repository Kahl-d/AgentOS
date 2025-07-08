from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os

# Import the bot
from bot import Me

load_dotenv(override=True)

app = FastAPI()

# Allow CORS for frontend (Safari-compatible)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite dev server
        "http://localhost:3000",  # Alternative dev port
        "http://localhost:8080",  # Another common dev port
        "https://khalidmk.vercel.app",  # Your production frontend
        "https://agent-os-two.vercel.app",  # Your backend (for self-requests)
        "*"  # Fallback for development
    ],
    allow_credentials=False,  # Changed to False for Safari compatibility
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

class AskRequest(BaseModel):
    question: str
    history: list = []

# Initialize the bot
me = Me()

@app.get("/")
def read_root():
    return {"message": "Backend is running!", "status": "healthy"}

@app.get("/api/test")
def test_endpoint():
    """Simple test endpoint for debugging"""
    return {"message": "API is working!", "timestamp": "2024-01-01T00:00:00Z", "cors": "enabled"}

@app.get("/api/health")
def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "backend": "running", "timestamp": "2024-01-01T00:00:00Z"}

@app.options("/api/ask")
def options_ask():
    """Handle CORS preflight requests for Safari"""
    return {"message": "OK"}

@app.post("/api/ask")
def ask_bot(req: AskRequest):
    # history is a list of {role, content} dicts
    answer = me.chat(req.question, req.history)
    return {"answer": answer}

# This is required for Vercel
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 