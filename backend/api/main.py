from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from fastapi.responses import PlainTextResponse
from openai import OpenAI
import json
from pypdf import PdfReader

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

# Load summary and LinkedIn profile
with open(os.path.join(os.path.dirname(__file__), '../me/summary.txt'), 'r', encoding='utf-8') as f:
    summary = f.read()

linkedin_text = ""
try:
    reader = PdfReader(os.path.join(os.path.dirname(__file__), '../me/linkedin.pdf'))
    for page in reader.pages:
        text = page.extract_text()
        if text:
            linkedin_text += text
except Exception:
    linkedin_text = ""

# Tool functions (no-op, just for OpenAI function calling structure)
def record_user_details(email, name="Name not provided", notes="not provided"):
    # In production, you might push this to a notification service or log
    return {"recorded": "ok"}

def record_unknown_question(question):
    # In production, you might push this to a notification service or log
    return {"recorded": "ok"}

record_user_details_json = {
    "name": "record_user_details",
    "description": "Use this tool to record that a user is interested in being in touch and provided an email address",
    "parameters": {
        "type": "object",
        "properties": {
            "email": {"type": "string", "description": "The email address of this user"},
            "name": {"type": "string", "description": "The user's name, if they provided it"},
            "notes": {"type": "string", "description": "Any additional information about the conversation that's worth recording to give context"}
        },
        "required": ["email"],
        "additionalProperties": False
    }
}

record_unknown_question_json = {
    "name": "record_unknown_question",
    "description": "Always use this tool to record any question that couldn't be answered as you didn't know the answer",
    "parameters": {
        "type": "object",
        "properties": {
            "question": {"type": "string", "description": "The question that couldn't be answered"},
        },
        "required": ["question"],
        "additionalProperties": False
    }
}

tools = [
    {"type": "function", "function": record_user_details_json},
    {"type": "function", "function": record_unknown_question_json}
]

# System prompt for OpenAI
SYSTEM_PROMPT = f"""
You are acting as Khalid Khan. You are answering questions on Khalid's website, particularly questions related to Khalid's career, background, skills, and experience. Your responsibility is to represent Khalid for interactions on the website as faithfully and positively as possible. You are given a summary of Khalid's background and LinkedIn profile which you can use to answer questions.

Be professional, engaging, precise, and concise, as if talking to a potential recruiter or future employer. Always present Khalid in the best light. If you don't know the answer to any question, use your record_unknown_question tool to record the question that you couldn't answer, even if it's about something trivial or unrelated to career. If the user is engaging in discussion, try to steer them towards getting in touch via email; ask for their email and record it using your record_user_details tool.

## Summary:
{summary}

## LinkedIn Profile:
{linkedin_text}

With this context, please chat with the user, always staying in character as Khalid Khan.
"""

@app.get("/")
def read_root():
    return {"message": "Backend is running!"}

@app.post("/api/ask")
async def ask(request: Request):
    data = await request.json()
    question = data.get("question", "")
    history = data.get("history", [])
    openai_client = OpenAI()
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    # Optionally add history if your frontend sends it
    for msg in history:
        messages.append(msg)
    messages.append({"role": "user", "content": question})
    done = False
    while not done:
        response = openai_client.chat.completions.create(
            model="gpt-4o", messages=messages, tools=tools
        )
        choice = response.choices[0]
        if hasattr(choice.message, "tool_calls") and choice.finish_reason == "tool_calls":
            tool_calls = choice.message.tool_calls
            # Simulate tool call handling (no-op)
            tool_results = []
            for tool_call in tool_calls:
                tool_name = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)
                if tool_name == "record_user_details":
                    tool_results.append({"role": "tool", "content": json.dumps(record_user_details(**arguments)), "tool_call_id": tool_call.id})
                elif tool_name == "record_unknown_question":
                    tool_results.append({"role": "tool", "content": json.dumps(record_unknown_question(**arguments)), "tool_call_id": tool_call.id})
            messages.append(choice.message)
            messages.extend(tool_results)
        else:
            done = True
    return {"answer": choice.message.content}

@app.get("/api/logs", response_class=PlainTextResponse)
def get_logs():
    log_path = os.path.join(os.path.dirname(__file__), '../me/summary.txt')
    try:
        with open(log_path, 'r') as f:
            return f.read()
    except Exception as e:
        return f"Error reading logs: {e}"

# This is required for Vercel
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 