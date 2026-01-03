import json
import google.generativeai as genai
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

# Configure Gemini with your provided API key
genai.configure(api_key="AIzaSyD09ZN_MlrCqe9XVYM6ppE6w_RwLbqaYyk")
model = genai.GenerativeModel("gemini-2.5-flash")
# --- Page Rendering Views ---
def index(request):
    return render(request, 'learning_app/index.html')
def roadmap_page(request):
    return render(request, 'learning_app/roadmap.html') # Ensure this HTML file exists
def concept_page(request):
    return render(request, 'learning_app/concept.html')

def story_page(request):
    return render(request, 'learning_app/story.html')

def coding_page(request):
    return render(request, 'learning_app/coding.html')

def evaluation_page(request):
    return render(request, 'learning_app/evaluation.html')

# --- API (Logic) Views ---
@csrf_exempt
@csrf_exempt
def generate_story_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        concept = data.get("concept")
        language = data.get("language")
        difficulty = data.get("difficulty")
        
        prompt = (f"Explain the programming concept '{concept}' for a {difficulty} level "
                  f"learner in {language} as a creative story. Map characters to variables "
                  f"and actions to functions. Finally, provide a 5-minute video script.")
        
        response = model.generate_content(prompt)
        print("AI Response:", response.text)
        # We wrap the AI text into the "description" key so main.js can find it
        # text="hi"
        return JsonResponse({
            "title": f"The Tale of {concept}",
            "description": response.text, # This contains the full story from the terminal
            "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ" 
        })

@csrf_exempt
def evaluate_code_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user_code = data.get("code")
        
        prompt = f"Evaluate this code: {user_code}. Is it logically correct? Explain using a story theme."
        response = model.generate_content(prompt)
        
        is_success = "correct" in response.text.lower()
        return JsonResponse({
            "success": is_success,
            "message": "AI Evaluation Complete",
            "explanation": response.text
        })
@csrf_exempt
def get_roadmap_api(request):
    if request.method == "POST":
        data = json.loads(request.body)
        concept = data.get("concept")
        
        prompt = f"The student just learned {concept}. Suggest the next 5 logical programming topics to learn in a structured roadmap."
        response = model.generate_content(prompt)
        
        return JsonResponse({"roadmap": response.text})