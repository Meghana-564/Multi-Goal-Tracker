# About the Multi-User Roadmap Builder

Welcome to the Multi-User Roadmap Builder! This document explains exactly what this project is, how it was built from scratch, and how everything connects together in a simple, easy-to-understand way.

## 🌟 What is this project?
This is a web application where users can create, share, and track "Roadmaps" (like a step-by-step guide to learn a new skill). Users can earn experience points (XP) and badges for completing steps, chat with an AI assistant, and visually see their roadmap as an interactive graph.

---

## 🛠️ The Two Main Parts

The project is split into two halves: the **Backend** (the brain and database) and the **Frontend** (what the user sees and clicks).

### 1. The Backend (Node.js + Express + MongoDB)
The backend is responsible for saving data and handling the "logic" of the application. 

**Dependencies installed:**
- `express`: The framework used to create the web server.
- `mongoose`: A tool to easily save and read data from our MongoDB database.
- `bcryptjs`: Used to scramble (hash) user passwords so they are safe.
- `jsonwebtoken (JWT)`: Used to create a digital "key" when a user logs in, so they stay logged in.
- `cors`: Allows our frontend to talk to our backend without security blocks.
- `dotenv`: Keeps our secret keys safe.

**What we built:**
- **Models**: We created schemas for `User`, `Roadmap`, `Step`, `Progress`, and `Bookmark`. This tells the database exactly how to structure the data.
- **Routes**: We made paths (like `/api/auth/login` or `/api/roadmaps`) that the frontend can call to get or save data.
- **Gamification**: We added logic so that whenever a user checks off a step, the backend calculates the progress and adds `10 XP` to their account!

### 2. The Frontend (React + Vite)
The frontend is the visual interface built using React. 

**Dependencies installed:**
- `react-router-dom`: Allows users to navigate between different pages (like Home, Login, Dashboard) without reloading the browser.
- `axios`: A tool to easily send requests to our backend to get data.
- `jwt-decode`: Reads the user's login token to know who is logged in.
- `lucide-react`: Provides all the pretty icons (like the Robot icon or Download icon).
- `recharts`: Used to draw the beautiful circular Pie Chart on the Dashboard.
- `framer-motion`: Adds the buttery-smooth fade-in animations when you open pages or the chat bot.
- `@xyflow/react` (React Flow): Draws the interactive "Flow View" where steps are connected by lines.
- `html2canvas` & `jspdf`: Takes a "screenshot" of your roadmap and converts it into a downloadable PDF file.

**Components we created:**
- `Navbar.jsx`: The top menu bar.
- `RoadmapCard.jsx`: The little cards that display a roadmap's title and description on the Home page.
- `StepItem.jsx`: A single step in a roadmap, complete with a checkbox and an "Improve with AI" button.
- `ProgressBar.jsx`: A green bar that fills up as you complete steps.
- `AIChatAssistant.jsx`: The floating chat bot in the bottom right corner.

**Pages we created:**
- `Home`: Browse all public roadmaps.
- `Login` & `Register`: Create an account or sign in.
- `Dashboard`: See your XP, Streak, Badges, and roadmaps you created.
- `CreateRoadmap`: A form to make a new roadmap (with an AI auto-generate button).
- `RoadmapDetail`: The main page for a roadmap where you see the steps, the interactive React Flow graph, and can download a PDF.

---

## 🤖 How the AI Integration Works

We integrated AI into the app to make it a "smart" learning platform. To keep things running smoothly right out of the box without requiring you to pay for API keys, we created a **"Mock" (simulated) AI Service** in the backend (`backend/services/aiService.js`). 

Here is how the 3 AI features work:

1. **Auto-Generate Roadmaps**: 
   - **What happens:** When you go to "Create Roadmap", you can type something like "Learn React" and click Generate.
   - **How it works:** The frontend sends that text to our backend `/api/ai/generate-roadmap` route. The AI service waits for 1.5 seconds (to simulate thinking) and then sends back a pre-filled title, description, and category.

2. **Improve Step with AI**: 
   - **What happens:** When looking at your roadmap steps, you can click "Improve AI".
   - **How it works:** The frontend sends the current step details to the backend `/api/ai/enhance-step` route. The AI service modifies the text to make it sound better and adds an extra suggested resource link, then sends it back to the screen.

3. **Floating AI Chat Assistant**:
   - **What happens:** You click the purple chat bubble in the bottom right, type a question, and it replies.
   - **How it works:** The `AIChatAssistant` component in React sends your message to the backend `/api/ai/chat` route. The AI service replies with an encouraging, simulated response.

*(Note: If you want to use real AI in the future, we would simply replace the simulated responses in `aiService.js` with real network requests to the OpenAI ChatGPT API using an API key!)*
