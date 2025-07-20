from fastapi import FastAPI, Request
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import httpx
import google.generativeai as genai
from tavily import TavilyClient
import asyncio

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env'))

app = FastAPI()

from datetime import datetime
# Trending Legal News Endpoint using Tavily
@app.get("/trending-legal-news")
async def trending_legal_news():
    try:
        now = datetime.now().strftime("%Y-%m-%d %H:%M")
        query = f"latest Important legal issue news India {now} only from AUTHENTIC SOURCES"
        tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))
        search_results = tavily_client.search(query=query, max_results=20, search_depth="advanced")
        return search_results
    except Exception as e:
        return {"error": str(e)}

@app.get("/")
def read_root():
    return {"message": "Python backend is running!"}

class NewsRequest(BaseModel):
    claim: str

import logging
logging.basicConfig(level=logging.INFO)

@app.post("/verify-news")
async def verify_news(request: NewsRequest):
    # Input validation
    if not request.claim or len(request.claim.strip()) < 1:
        return {"error": "Claim must be at least 10 characters long."}

    tavily_api_key = os.getenv("TAVILY_API_KEY")
    if not tavily_api_key:
        return {"error": "Tavily API key not set in environment."}
    try:
        # Use TavilyClient for advanced search with the claim as the query
        tavily_client = TavilyClient(api_key=tavily_api_key)
        now = datetime.now().strftime("%Y-%m-%d %H:%M")
        query = f"search for authentic information around these claim : {request.claim} at current {now}"
        data = tavily_client.search(query=query, max_results=20, search_depth="advanced")
        print(f"Tavily API response: {data}")
        logging.info(f"Tavily API response: {data}")
        # Prepare context for Gemini
        summary = data.get("summary") if isinstance(data, dict) else None
        sources = data.get("sources") if isinstance(data, dict) else None
        tavily_context = f"Summary: {summary}\nSources: {sources}\n" if summary or sources else str(data)

        gemini_api_key = os.getenv("GEMINI_API_KEY")
        if not gemini_api_key:
            return {"error": "Gemini API key not set in environment."}
        genai.configure(api_key=gemini_api_key)
        prompt = (
            f"Given the following claim: '{request.claim}'\n"
            f"And the following news search results from Tavily:\n{tavily_context}\n"
            "Based on the above, is the claim likely to be fake or not? Respond with a clear, concise answer and reasoning."
        )
        try:
            model = genai.GenerativeModel('gemini-2.5-pro')
            gemini_response = model.generate_content(prompt)
            gemini_answer = gemini_response.text.strip()
        except Exception as gemini_err:
            logging.error(f"Gemini error: {gemini_err}")
            gemini_answer = f"Gemini error: {gemini_err}"

        result = {
            "claim": request.claim,
            "tavily_summary": summary,
            "tavily_sources": sources,
            "gemini_verdict": gemini_answer,
            "tavily_raw": data
        }
        logging.info(f"Verification request: {request.claim}")
        logging.info(f"Verification result: {result}")
        return result
    except httpx.TimeoutException:
        logging.error("Tavily API request timed out.")
        return {"claim": request.claim, "error": "Verification service timed out. Please try again later."}
    except httpx.HTTPStatusError as e:
        logging.error(f"Tavily API error: {e.response.text}")
        return {"claim": request.claim, "error": f"Verification service error: {e.response.text}"}
    except Exception as e:
        import traceback
        tb = traceback.format_exc()
        logging.error(f"Unexpected error: {str(e)}\nTraceback: {tb}")
        return {"claim": request.claim, "error": str(e), "traceback": tb}


class ChatRequest(BaseModel):
    question: str

@app.post("/chatbot")
async def chatbot(request: ChatRequest):
    gemini_api_key = os.getenv("GEMINI_API_KEY")
    if not gemini_api_key:
        return {"error": "Gemini API key not set in environment."}
    genai.configure(api_key=gemini_api_key)
    prompt = f"You are a helpful legal assistant. Answer the following Legal questions ONLY in a simple, story-based way: {request.question} || IF the request is not related to law, answer with 'I am a legal assistant and can help you with explaining cases in best story format "
    try:
        model = genai.GenerativeModel('gemini-2.5-pro')
        response = model.generate_content(prompt)
        answer = response.text.strip()
        return {"question": request.question, "answer": answer}
    except Exception as e:
        return {"question": request.question, "error": str(e)}

from fastapi import Query

CRIME_TYPE_RESOURCES = {
    "ipc": "15150682-a9ed-475d-b0e3-67b292e90d22",
    "women": "a7c80974-6e60-4ecb-b07f-4cec770f8cf1"
}

@app.get("/stats")
async def get_stats(
    state: str = Query(None, description="Indian State/UT to filter by"),
    crime_type: str = Query("women", description="Type of crime data: 'ipc', 'women', etc.")
):
    api_key = os.getenv("DATA_GOV_API_KEY") or "579b464db66ec23bdd00000116c765c4ab664bf6779038fb5295fe39"
    resource_id = CRIME_TYPE_RESOURCES.get(crime_type, CRIME_TYPE_RESOURCES["women"])
    base_url = f"https://api.data.gov.in/resource/{resource_id}?api-key={api_key}&format=json&limit=50"
    if state:
        url = f"{base_url}&filters[state_ut]={state}"
    else:
        url = base_url
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(url, timeout=15)
            response.raise_for_status()
            data = response.json()
        return {"stats": data.get("records", [])}
    except Exception as e:  
        return {"error": str(e)}

@app.get("/emergency-contacts")
async def get_contacts():
    return {"contacts": [
        {"type": "Police", "number": "100"},
        {"type": "Women Helpline", "number": "1091"},
        {"type": "Cybercrime", "number": "155260"},
        {"type": "Legal Aid", "number": "15100"}
    ]}
