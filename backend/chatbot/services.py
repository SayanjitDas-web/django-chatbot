import google.generativeai as genai
from django.conf import settings


def get_gemini_response(user_message):
    """Get response from Gemini AI"""
    api_key = settings.GEMINI_API_KEY
    if not api_key:
        raise ValueError("GEMINI_API_KEY is not set in settings")
    
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-2.5-flash')
    
    try:
        response = model.generate_content(user_message)
        return response.text
    except Exception as e:
        raise Exception(f"Error getting response from Gemini AI: {str(e)}")
