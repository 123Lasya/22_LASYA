/* Mock API - Simulating Backend Responses */

class MockAPI {
    static async generateStory(concept, language, difficulty) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const story = {
                    title: `The Tale of ${concept} in ${language}`,
                    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Rick Roll as placeholder or better tech video
                    description: `Imagine a world where ${concept} controls the flow of time. In this story, we explore how ${difficulty} programmers can master this skill.`,
                    concept: concept,
                    language: language,
                    id: Date.now().toString()
                };
                localStorage.setItem('currentStory', JSON.stringify(story));
                resolve(story);
            }, 1000);
        });
    }

    static async getRoadmap() {
        return new Promise((resolve) => {
            setTimeout(() => {
                const roadmap = [
                    { id: 1, title: "Variables & Data Types", status: "completed" },
                    { id: 2, title: "Control Structures (If/Else)", status: "pending" },
                    { id: 3, title: "Loops (For/While)", status: "pending" },
                    { id: 4, title: "Functions", status: "pending" },
                    { id: 5, title: "Data Structures", status: "locked" }
                ];
                resolve(roadmap);
            }, 500);
        });
    }

    static async getStoryDetails() {
        // Retrieve from local mock state
        const stored = localStorage.getItem('currentStory');
        return stored ? JSON.parse(stored) : null;
    }

    static async submitCode(code) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const isCorrect = code.length > 20 && !code.includes("error");
                resolve({
                    success: isCorrect,
                    message: isCorrect ? "Excellent! You solved the puzzle." : "Hmm, something isn't right.",
                    explanation: "In our story, the key was to properly sequence the events. Your code needs to reflect that logic."
                });
            }, 1500);
        });
    }
}
