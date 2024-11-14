import os
from typing import List, Dict, Any
import numpy as np
import json
import asyncio
from dotenv import load_dotenv
import openai

from email_templates import email_database
from composio_langchain import ComposioToolSet, Action

from linkedin_api import Linkedin

load_dotenv()  # Load environment variables

openai.api_key = os.getenv("OPENAI_API_KEY")

class LinkedInHelper:
    def __init__(self, username: str, password: str):
        self.api = Linkedin(username, password)

    def get_profile_info(self, profile_url: str) -> Dict[str, Any]:
        """Fetch profile information from LinkedIn."""
        profile_id = profile_url.split('/in/')[-1].split('/')[0]
        profile = self.api.get_profile(profile_id)
        return {
            "name": profile.get("firstName", "") + " " + profile.get("lastName", ""),
            "headline": profile.get("headline", ""),
            "current_company": profile.get("company", {}).get("name", ""),
            "location": profile.get("location", {}).get("name", ""),
            "summary": profile.get("summary", "")
        }

class EmailEmbedder:
    def __init__(self):
        self.email_embeddings = None
        self.embedding_model = "text-embedding-3-small"
        self.client = openai.OpenAI()

    def get_embedding(self, text: str) -> List[float]:
        """Get embedding for a single text using OpenAI API."""
        response = self.client.embeddings.create(
            input=text,
            model=self.embedding_model
        )
        return response.data[0].embedding

    def embed_emails(self, emails: List[Dict[str, str]]) -> np.ndarray:
        """Embed a list of emails using OpenAI API."""
        texts = [f"{email['type']}: {email['subject']} {email['body']}" for email in emails]
        embeddings = [self.get_embedding(text) for text in texts]
        return np.array(embeddings)

    def find_similar_emails(self, query: str, top_k: int = 2) -> List[Dict[str, str]]:
        """Find the most similar emails to a given query."""
        if self.email_embeddings is None:
            self.email_embeddings = self.embed_emails(email_database)
        
        query_embedding = self.get_embedding(query)
        similarities = np.dot(self.email_embeddings, query_embedding)
        top_indices = similarities.argsort()[-top_k:][::-1]
        return [email_database[i] for i in top_indices]
class GmailDraftCreator:
    def __init__(self):
        self.tool_set = ComposioToolSet()
        self.gmail_tools = self.tool_set.get_tools(actions=[Action.GMAIL_CREATE_EMAIL_DRAFT])

    async def create_gmail_draft(self, user_id: str = "me", recipient_email: str = None, 
                                 subject: str = None, body: str = None, is_html: bool = False) -> Dict[str, Any]:
        """Create a Gmail draft asynchronously."""
        gmail_draft_tool = self.gmail_tools[0]
        tool_input = {
            "user_id": user_id,
            "recipient_email": recipient_email,
            "subject": subject,
            "body": body,
            "is_html": is_html
        }
        try:
            result = gmail_draft_tool.run(tool_input)
            output = result
            return {
                "response_data": output.get("response_data"),
                "successful": output.get("successful", False),
                "error": output.get("error")
            }
        except json.JSONDecodeError:
            return {
                "response_data": None,
                "successful": False,
                "error": "Failed to parse tool output"
            }
        except Exception as e:
            return {
                "response_data": None,
                "successful": False,
                "error": f"An error occurred: {str(e)}"
            }

class OpenAIInteractor:
    def __init__(self, model_name: str = "gpt-3.5-turbo"):
        self.model_name = model_name
        self.client = openai.OpenAI()

    def get_openai_response(self, messages: List[Dict[str, str]], functions: List[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Get a response from the OpenAI API."""
        kwargs = {
            "model": self.model_name,
            "messages": messages,
        }
        
        if functions:
            kwargs["functions"] = functions
            kwargs["function_call"] = "auto"
        
        response = self.client.chat.completions.create(**kwargs)
        message = response.choices[0].message
        
        return {
            "content": message.content if message.content is not None else "",
            "function_call": message.function_call.model_dump() if message.function_call else None
        }

async def process_query(query: str, linkedin_profile_url: str, embedder: EmailEmbedder, 
                        draft_creator: GmailDraftCreator, openai_interactor: OpenAIInteractor, linkedin_helper: LinkedInHelper):
    """Process a user query to create a Gmail draft."""
    similar_emails = embedder.find_similar_emails(query)
    
    context = "Here are some reference emails that might be helpful:\n\n"
    for email in similar_emails:
        context += f"Type: {email['type']}\nSubject: {email['subject']}\nBody: {email['body']}\n\n"
    
    # Fetch LinkedIn profile information
    linkedin_info = linkedin_helper.get_profile_info(linkedin_profile_url)
    context += f"\nLinkedIn Profile Information:\n"
    for key, value in linkedin_info.items():
        context += f"{key.capitalize()}: {value}\n"
    
    messages = [
        {'role': 'system', 'content': context},
        {'role': 'user', 'content': f"""
Craft a tailored email addressing this request: {query}

Input:
- Recipient's LinkedIn profile data
- Reference emails for tone and style
- Specific request details

Guidelines:
1. Analyze the LinkedIn profile to extract key personalization points:
   - Current role and company
   - Career trajectory
   - Notable achievements
   - Educational background
   - Skills and endorsements
   - Shared connections or interests

2. Mirror the tone and style of the reference emails, paying attention to:
   - Level of formality
   - Use of industry-specific language
   - Overall structure and length

3. Compose the email draft:
   Subject line: Create a compelling, concise subject relevant to the request
   
   Opening: Begin with a personalized greeting using insights from LinkedIn
   
   Body:
   - Directly address the core request
   - Weave in 2-3 relevant details from the LinkedIn profile
   - If applicable, mention a shared connection or interest
   - Ensure clear value proposition and call-to-action
   
   Closing: End with an appropriate sign-off and your full name/title

4. Optimize for engagement:
   - Use concise paragraphs (3-4 sentences max)
   - Incorporate one thought-provoking question if appropriate
   - Aim for a total length of 50-125 words

5. Polish and refine:
   - Ensure proper grammar and punctuation
   - Remove any filler words or redundant phrases
   - Double-check all referenced LinkedIn details for accuracy

Please draft the email version below.
"""}
    ]
    
    gmail_draft_function = {
        'name': 'create_gmail_draft',
        'description': 'Create a draft email using Gmail\'s API.',
        'parameters': {
            'type': 'object',
            'properties': {
                'user_id': {
                    'type': 'string',
                    'description': "The user's email address or 'me' for the authenticated user.",
                },
                'recipient_email': {
                    'type': 'string',
                    'description': 'Email address of the recipient',
                },
                'subject': {
                    'type': 'string',
                    'description': 'Subject of the email',
                },
                'body': {
                    'type': 'string',
                    'description': 'Body content of the email. Can be plain text or HTML.',
                },
                'is_html': {
                    'type': 'boolean',
                    'description': 'Set to True if the body content is HTML.',
                }
            },
            'required': ['recipient_email', 'subject', 'body']
        }
    }

    response = openai_interactor.get_openai_response(messages, [gmail_draft_function])
    print("OpenAI Response:", response["content"])
    
    if response["function_call"]:
        function_args = json.loads(response["function_call"]["arguments"])
        function_response = await draft_creator.create_gmail_draft(**function_args)
        print("\nGmail Draft Creation Response:\n", function_response)
        
        # Ask for a summary of the action taken
        summary_messages = messages + [
            {'role': 'assistant', 'content': "I've created a draft email based on your request."},
            {'role': 'user', 'content': "Can you summarize what you've done?"}
        ]
        summary_response = openai_interactor.get_openai_response(summary_messages)
        return summary_response["content"]
    else:
        return response["content"]

async def main():
    embedder = EmailEmbedder()
    draft_creator = GmailDraftCreator()
    openai_interactor = OpenAIInteractor()
    linkedin_helper = LinkedInHelper(os.getenv('LINKEDIN_USERNAME'), os.getenv('LINKEDIN_PASSWORD'))
    
    query = input("Enter your request for creating a Gmail draft: ")
    linkedin_profile_url = input("Enter the LinkedIn profile URL of the recipient: ")
    result = await process_query(query, linkedin_profile_url, embedder, draft_creator, openai_interactor, linkedin_helper)
    print("\nFinal Response:", result)

if __name__ == "__main__":
    asyncio.run(main())