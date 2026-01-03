/* Main Application Logic */

document.addEventListener('DOMContentLoaded', () => {
    // Determine current page from URL
    const path = window.location.pathname;

    // Setup Global Listeners if any

    // Page Specific Logic
    if (path.includes('concept.html')) {
        setupConceptPage();
    } else if (path.includes('roadmap.html')) {
        setupRoadmapPage();
    } else if (path.includes('story.html')) {
        setupStoryPage();
    } else if (path.includes('coding.html')) {
        setupCodingPage();
    } else if (path.includes('evaluation.html')) {
        setupEvaluationPage();
    }
});

function setupConceptPage() {
    const form = document.getElementById('concept-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = "Generating Story...";
        submitBtn.disabled = true;

        const concept = document.getElementById('concept-input').value;
        const language = document.getElementById('language-select').value;
        const difficulty = document.getElementById('difficulty-select').value;

        try {
            await MockAPI.generateStory(concept, language, difficulty);
            window.location.href = 'story.html';
        } catch (error) {
            console.error(error);
            alert("Failed to generate story. Please try again.");
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    const roadmapBtn = document.getElementById('roadmap-btn');
    if (roadmapBtn) {
        roadmapBtn.addEventListener('click', () => {
            window.location.href = 'roadmap.html';
        });
    }
}

function setupRoadmapPage() {
    const list = document.getElementById('roadmap-list');
    if (!list) return;

    MockAPI.getRoadmap().then(items => {
        list.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('div');
            li.className = 'roadmap-item card';
            li.innerHTML = `
                <div class="roadmap-content">
                    <h3>${item.title}</h3>
                    <span class="status ${item.status}">${item.status.toUpperCase()}</span>
                </div>
                <button class="btn btn-secondary" ${item.status === 'locked' ? 'disabled' : ''}>
                    ${item.status === 'completed' ? 'Review' : 'Start Learning'}
                </button>
            `;
            list.appendChild(li);
        });
    });
}

function setupStoryPage() {
    MockAPI.getStoryDetails().then(story => {
        if (!story) {
            // Redirect back if no story found (e.g. direct access)
            if (confirm("No story found. Go back to start?")) {
                window.location.href = 'concept.html';
            }
            return;
        }

        document.getElementById('story-title').textContent = story.title;
        document.getElementById('story-description').textContent = story.description;
        document.getElementById('video-player').src = story.videoUrl;
    });

    const btn = document.getElementById('mark-complete-btn');
    if (btn) {
        btn.addEventListener('click', () => {
            window.location.href = 'mapping.html';
        });
    }
}

function setupCodingPage() {
    const form = document.getElementById('code-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = "Submitting...";
        btn.disabled = true;

        const code = document.getElementById('code-editor').value;

        try {
            const result = await MockAPI.submitCode(code);
            // Store result for evaluation page
            localStorage.setItem('evalResult', JSON.stringify(result));
            window.location.href = 'evaluation.html';
        } catch (error) {
            alert("Error submitting code");
            btn.textContent = "Submit Code";
            btn.disabled = false;
        }
    });
}

function setupEvaluationPage() {
    const resultStr = localStorage.getItem('evalResult');
    if (!resultStr) return;

    const result = JSON.parse(resultStr);
    const container = document.getElementById('result-content');
    const loading = document.getElementById('loading-state');
    const iconContainer = document.getElementById('result-icon-container');

    loading.style.display = 'none';
    container.style.display = 'block';

    if (result.success) {
        iconContainer.innerHTML = '🎉';
        iconContainer.classList.add('success');
        document.getElementById('result-message').textContent = result.message;
        document.getElementById('result-message').classList.add('success');
    } else {
        iconContainer.innerHTML = '⚠️';
        iconContainer.classList.add('error');
        document.getElementById('result-message').textContent = result.message;
        document.getElementById('result-message').classList.add('error');
    }

    document.getElementById('result-explanation').textContent = result.explanation;
}
