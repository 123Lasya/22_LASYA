document.addEventListener('DOMContentLoaded', () => {
    const path = window.location.pathname;

    if (path.includes('/concept/')) {
        setupConceptPage();
    } else if (path.includes('/story/')) {
        setupStoryPage();
    } else if (path.includes('/coding/')) {
        setupCodingPage();
    } else if (path.includes('/evaluation/')) {
        setupEvaluationPage();
    } else if (path.includes('/roadmap/')) {
        setupRoadmapPage();
    }
});

function setupConceptPage() {
    const form = document.getElementById('concept-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = "Generating Story...";
        submitBtn.disabled = true;

        const concept = document.getElementById('concept-input').value;
        const language = document.getElementById('language-select').value;
        const difficulty = document.getElementById('difficulty-select').value;

        try {
            const data = await MockAPI.generateStory(concept, language, difficulty);
            // Data is saved to localStorage in MockAPI.generateStory
            window.location.href = '/story/';
        } catch (error) {
            console.error(error);
            alert("Error. Try again.");
            submitBtn.textContent = "Generate Learning Story";
            submitBtn.disabled = false;
        }
    });

    document.getElementById('roadmap-btn').addEventListener('click', () => {
        window.location.href = '/roadmap/';
    });
}

function setupStoryPage() {
    const storyData = localStorage.getItem('currentStory');
    if (!storyData) {
        window.location.href = '/concept/';
        return;
    }

    const story = JSON.parse(storyData);
    document.getElementById('story-title').textContent = story.title;
    document.getElementById('story-description').innerText = story.description;

    // Update Video Player Source
    const videoElement = document.getElementById('video-player');
    const sourceElement = videoElement.querySelector('source');
    sourceElement.src = story.videoUrl;
    videoElement.load(); // Forces the player to load the new video file

    document.getElementById('mark-complete-btn').addEventListener('click', () => {
        window.location.href = '/coding/';
    });
}

function setupCodingPage() {
    const form = document.getElementById('code-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.textContent = "AI is evaluating...";
        submitBtn.disabled = true;

        const code = document.getElementById('code-editor').value;

        try {
            // This calls the function in api.js
            const result = await MockAPI.submitCode(code);
            
            // Save the AI's result to memory
            localStorage.setItem('evalResult', JSON.stringify(result));
            
            // MAGIC FIX: Use the leading slash to ensure it goes to http://127.0.0.1:8000/evaluation/
            window.location.href = '/evaluation/'; 
        } catch (error) {
            console.error(error);
            alert("Submission failed. Check your internet or API key.");
            submitBtn.textContent = "Submit Code";
            submitBtn.disabled = false;
        }
    });
}

function setupEvaluationPage() {
    const result = JSON.parse(localStorage.getItem('evalResult'));
    if (!result) return;

    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('result-content').style.display = 'block';
    
    document.getElementById('result-message').textContent = result.message;
    document.getElementById('result-explanation').innerText = result.explanation;
    document.getElementById('result-icon-container').innerHTML = result.success ? '🎉' : '⚠️';
}

async function setupRoadmapPage() {
    const list = document.getElementById('roadmap-list');
    const currentConcept = localStorage.getItem('lastLearnedConcept') || "Variables"; // Remembers what they just did
    const apiKey = "YOUR_GEMINI_API_KEY"; // Ensure your key is here or in your Secrets

    // 1. Show a "Thinking" message
    list.innerHTML = `
        <div class="loader">
            <h3>Mapping your journey...</h3>
            <p>The AI Oracle is choosing your next 3 adventures based on <b>${currentConcept}</b>.</p>
        </div>
    `;

    try {
        // 2. Ask the Brain for the next steps
        const prompt = `You are a friendly coding guide. The student just learned about "${currentConcept}". 
        Suggest the next 3 logical coding concepts they should learn. 
        Return ONLY a simple JSON list of strings like ["Concept 1", "Concept 2", "Concept 3"].`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });

        const data = await response.json();
        const aiText = data.candidates[0].content.parts[0].text;
        
        // Clean the AI text to make sure it's a valid list
        const nextConcepts = JSON.parse(aiText.replace(/```json|```/g, ""));

        // 3. Clear the loader and show the buttons
        list.innerHTML = "<h3>Your Next Adventures:</h3>";
        
        nextConcepts.forEach(concept => {
            const btn = document.createElement('button');
            btn.className = "roadmap-btn"; // Add your CSS styling to this class
            btn.innerText = `🚀 Start: ${concept}`;
            btn.onclick = () => {
                localStorage.setItem('selectedConcept', concept);
                window.location.href = "story.html"; // Takes them back to the start of a new story
            };
            list.appendChild(btn);
        });

    } catch (error) {
        console.error("Roadmap Error:", error);
        list.innerHTML = "<p>Oops! The AI Oracle is sleepy. Please try again!</p>";
    }
}