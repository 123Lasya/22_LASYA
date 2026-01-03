TECHTALES

An AI-Driven Story-Based Learning Platform for Improving Programming Productivity

1. Problem Statement

Programming concepts are often taught using abstract explanations and syntax-heavy approaches.
This makes it difficult for many learners to understand the actual logic behind the code.

As a result:

Learners memorize code instead of understanding it

The same doubts are repeated multiple times

Learning becomes slow and confusing

Teaching productivity is reduced

There is a need for an intelligent learning system that explains programming concepts intuitively, validates real understanding, and improves learning productivity.

2. Proposed Solution

TECHTALES is an AI-powered learning platform that teaches programming concepts using real-life stories.

Instead of starting with syntax, TECHTALES starts with intuition.
Each programming concept is converted into a real-world story, explained through a short explainer video, clearly mapped to programming logic, and then evaluated using a new concept-based coding task.

The platform allows users to:

Enter any programming concept

Select programming language

Choose difficulty level

and receive AI-generated explanations, feedback, and personalized learning roadmaps.

3. Innovation Highlights

Free-text input for programming concepts (no predefined syllabus)

AI-generated real-life stories for coding concepts

Automated story-based explainer video generation

Clear mapping of story elements to programming constructs

Concept-based code evaluation using new problem statements

Story-based textual feedback for incorrect solutions

AI-generated personalized learning roadmaps

4. System Architecture Overview

TECHTALES is designed as a modular AI-driven system with the following components:

Concept Input and Context Builder

Story Generation Engine (LLM)

Story Explainer Video Generator

Story-to-Code Mapping Module

Personalized Learning Roadmap Generator

Code Evaluation Engine

Story-Based Feedback Generator

These components work together through an agent-based workflow to ensure consistency, adaptability, and scalability.

5. AI Pipelines
5.1 Concept to Story Generation

Input: User-entered concept, programming language, difficulty level

Output: Structured real-life story explaining the concept

Uses prompt engineering and controlled AI generation

5.2 Story to Video Generation

Converts the generated story into a narrated explainer video

Focuses on logic understanding, not syntax

5.3 Story to Code Mapping

Maps story elements to programming constructs:

Characters → Variables

Actions → Functions

Repetition → Loops

Decisions → Conditional statements

Includes pseudocode and reference explanation.

5.4 Learning Roadmap Generation

Triggered when the user selects “What should I learn next?”

Uses language, difficulty level, and completed concepts

Generates a personalized learning roadmap

5.5 Code Evaluation and Feedback

Users solve a new problem testing the same concept

Evaluation checks conceptual correctness

Feedback is explained first using the story, then mapped to code

6. Final User Flow

User enters a programming concept, language, and difficulty level

AI generates a real-life story

Story explainer video is presented

Story-to-code mapping is displayed

User writes code for a new concept-based problem

AI evaluates the code

Story-based feedback is provided

User proceeds to the next concept, replays the story, or views a roadmap

7. Productivity Impact
For Learners

Faster conceptual understanding

Less confusion and stress

Better confidence and retention

For Educators and Institutions

Fewer repeated explanations

Scalable teaching approach

Improved teaching productivity

8. Guardrails and Evaluation

AI responses are grounded using retrieved contextual knowledge

Low-confidence responses are handled explicitly

Evaluation focuses on logic and understanding, not syntax alone

Known limitations and failure cases are documented

9. Technology Stack
Backend & Core Logic

Programming Language: Python

Backend Framework: Django

AI Models: Large Language Models (API-based)

RAG Framework: Vector embeddings with ChromaDB

Evaluation Engine: Rule-based validation with LLM-assisted reasoning


12. Conclusion

TECHTALES demonstrates how AI and storytelling can be combined to improve programming education productivity.
By teaching understanding before syntax, the platform reduces confusion, saves instructional effort, and makes learning more effective and scalable.
