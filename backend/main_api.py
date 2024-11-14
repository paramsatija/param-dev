from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv
import openai
import json
from linkedin_api import Linkedin

# Import your existing classes, except email_templates and embedder
from composio_langchain import ComposioToolSet, Action
from main import (
    GmailDraftCreator, 
    OpenAIInteractor, 
    LinkedInHelper, 
    process_query
)

# Load environment variables
load_dotenv()

# Initialize OpenAI
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize FastAPI app
app = FastAPI()

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your Next.js domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request and response
class EmailGenerationRequest(BaseModel):
    query: str
    linkedin_url: str
    recipient_email: str

class EmailGenerationResponse(BaseModel):
    success: bool
    message: str
    draft_content: Optional[str] = None
    error: Optional[str] = None

# Initialize your classes as global variables
linkedin_helper = LinkedInHelper(
    os.getenv('LINKEDIN_USERNAME'),
    os.getenv('LINKEDIN_PASSWORD')
)
draft_creator = GmailDraftCreator()
openai_interactor = OpenAIInteractor()

@app.post("/api/generate-email", response_model=EmailGenerationResponse)
async def generate_email(request: EmailGenerationRequest):
    try:
        # Process the query using the modified process_query function (without embedding)
        result = await process_query(
            query=request.query,
            linkedin_profile_url=request.linkedin_url,
            draft_creator=draft_creator,
            openai_interactor=openai_interactor,
            linkedin_helper=linkedin_helper
        )
        
        return EmailGenerationResponse(
            success=True,
            message="Email draft generated successfully",
            draft_content=result
        )
    except Exception as e:
        return EmailGenerationResponse(
            success=False,
            message="Failed to generate email",
            error=str(e)
        )

@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

# Modified process_query function without embedding references
async def process_query(
    query: str,
    linkedin_profile_url: str,
    draft_creator: GmailDraftCreator,
    openai_interactor: OpenAIInteractor,
    linkedin_helper: LinkedInHelper
) -> str:
    """Process a user query to create a Gmail draft."""
    try:
        # Fetch LinkedIn profile information
        linkedin_info = linkedin_helper.get_profile_info(linkedin_profile_url)
        context = "\nLinkedIn Profile Information:\n"
        for key, value in linkedin_info.items():
            context += f"{key.capitalize()}: {value}\n"
        
        messages = [
            {'role': 'system', 'content': context},
            {'role': 'user', 'content': f"""
Craft a tailored email addressing this request: {query}

Input:
- Recipient's LinkedIn profile data
- Specific request details

Guidelines:
1. Analyze the LinkedIn profile to extract key personalization points.
2. Compose the email draft.
3. Optimize for engagement.
4. Polish and refine.

Please draft the email version below.
"""}
        ]
        
        gmail_draft_function = {
            'name': 'create_gmail_draft',
            'description': 'Create a draft email using Gmail\'s API.',
            'parameters': {
                'type': 'object',
                'properties': {
                    'user_id': {'type': 'string'},
                    'recipient_email': {'type': 'string'},
                    'subject': {'type': 'string'},
                    'body': {'type': 'string'},
                    'is_html': {'type': 'boolean'},
                },
                'required': ['recipient_email', 'subject', 'body']
            }
        }

        response = openai_interactor.get_openai_response(messages, [gmail_draft_function])
        
        if response.get("function_call"):
            function_args = json.loads(response["function_call"]["arguments"])
            function_response = await draft_creator.create_gmail_draft(**function_args)
            
            if not function_response.get("successful"):
                raise Exception(function_response.get("error", "Failed to create draft"))
            
            return response["content"]
        else:
            return response["content"]
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
