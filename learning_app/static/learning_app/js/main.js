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
    document.getElementById('video-player').src = story.videoUrl;

    document.getElementById('mark-complete-btn').addEventListener('click', () => {
        window.location.href = '/coding/';
    });
}

function setupCodingPage() {
    const form = document.getElementById('code-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('code-editor').value;

        try {
            const result = await MockAPI.submitCode(code);
            localStorage.setItem('evalResult', JSON.stringify(result));
            window.location.href = '/evaluation/';
        } catch (error) {
            alert("Submission failed");
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

function setupRoadmapPage() {
    // Basic roadmap loader
    const list = document.getElementById('roadmap-list');
    list.innerHTML = "<h3>Your Next Steps</h3><p>Consulting the AI Oracle...</p>";
    // You can add a fetch call here similar to generateStory if needed
}