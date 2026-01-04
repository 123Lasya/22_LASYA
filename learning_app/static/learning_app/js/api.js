/* Real API - Fetching from Django Backend */
class MockAPI { // Kept name same as main.js depends on it
    static async generateStory(concept, language, difficulty) {
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    const response = await fetch('/api/generate-story/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ concept, language, difficulty })
    });
    
    if (!response.ok) throw new Error("Failed to generate story");
    
    const data = await response.json();
    
    // CRITICAL: Save the entire object so setupStoryPage() can read title, description, and videoUrl
    localStorage.setItem('currentStory', JSON.stringify(data)); 
    return data;
    }
 
    static async submitCode(code) {
    // Look for the CSRF token in the HTML form
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    const response = await fetch('/api/evaluate-code/', { // Make sure this matches urls.py
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ code: code })
    });

    if (!response.ok) throw new Error("AI Evaluation failed");
    return await response.json();
}
}