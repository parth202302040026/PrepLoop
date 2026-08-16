# PrepLoop

### AI-Powered Mock Interview Platform

**PrepLoop** is a full-stack interview platform designed to simulate real technical interviews through **AI-generated questions, real-time video interviews, automated transcript analysis, and structured AI feedback**.

The platform supports both interviewees and interviewers, combining real-time communication with an AI evaluation pipeline to create an end-to-end interview experience.

### 🚀 Live Demo

**[Launch PrepLoop](https://prep-loop.vercel.app/)**

---

## ✨ Key Features

### 🤖 AI-Powered Interview Evaluation

* Generates role-specific interview questions using **Google Gemini**
* Analyzes interview transcripts automatically
* Produces structured feedback across:

  * Technical Knowledge
  * Problem Solving
  * Communication
  * Strengths
  * Areas for Improvement
  * Overall Rating
  * Hiring Recommendation

### 🎥 Real-Time Interviews

* Real-time video interviews powered by **Stream Video**
* Interview scheduling and session management
* Recording and transcription workflows
* Stream webhook processing for interview lifecycle events

### 👥 Interviewer & Interviewee Workflows

* Separate workflows for interviewers and candidates
* Role-based access control
* Interview creation and scheduling
* Candidate interview history and feedback
* Interview session management

### 🔐 Authentication & Security

* Authentication and user management using **Clerk**
* Role-based authorization
* **Arcjet token-bucket rate limiting**
* Protected application routes and API endpoints
* Webhook validation and idempotent event processing

### 💳 Interview Credits

* Credit-based interview system
* Credit transactions tracked through the database
* Interviewers can manage available interview credits

### 🗄️ Persistent Data

* PostgreSQL database
* Prisma ORM
* Supabase infrastructure
* Structured relational data models for users, interviews, sessions, feedback, and transactions

---

## 🧠 AI Interview Pipeline

```text
Candidate
    │
    ▼
Interview Session
    │
    ▼
Real-Time Video Interview
    │
    ▼
Stream Recording + Transcript
    │
    ▼
Stream Webhook
    │
    ▼
Transcript Processing
    │
    ▼
Google Gemini
    │
    ▼
Structured Interview Analysis
    │
    ├── Technical Knowledge
    ├── Problem Solving
    ├── Communication
    ├── Strengths
    ├── Improvements
    ├── Rating
    └── Recommendation
    │
    ▼
PostgreSQL / Prisma
    │
    ▼
Candidate Feedback Dashboard
```

---

## 🏗️ Architecture

PrepLoop follows a full-stack Next.js architecture with the frontend, server-side application logic, authentication, database access, AI integration, and external services working together.

```text
┌─────────────────────────────────────────────┐
│                  Next.js                    │
│                                             │
│   React UI ── API Routes ── Server Logic    │
└───────────────┬─────────────────────────────┘
                │
       ┌────────┼───────────┐
       ▼        ▼           ▼
    Clerk    Prisma      Gemini
    Auth     ORM         AI
       │        │           │
       │        ▼           │
       │    PostgreSQL       │
       │    / Supabase       │
       │                    │
       └───────┬────────────┘
               │
               ▼
          Stream Video
               │
               ▼
          Webhooks
               │
               ▼
       Recording / Transcript
```

---

## 🛠️ Tech Stack

| Category       | Technologies                            |
| -------------- | --------------------------------------- |
| Frontend       | Next.js, React, Tailwind CSS, shadcn/ui |
| Backend        | Next.js Server Actions / API Routes     |
| Database       | PostgreSQL, Supabase                    |
| ORM            | Prisma                                  |
| Authentication | Clerk                                   |
| AI             | Google Gemini                           |
| Video          | Stream Video                            |
| Security       | Arcjet                                  |
| Language       | JavaScript                              |
| Deployment     | Vercel                                  |

---

## 🔥 Engineering Highlights

### Webhook-Driven Processing

PrepLoop uses Stream webhooks to react to interview events instead of relying entirely on synchronous request flows.

This allows the system to process events such as recordings and transcripts asynchronously and persist the resulting interview data.

### Idempotent Event Handling

Webhook events can potentially be delivered more than once.

PrepLoop uses database checks and update logic to prevent duplicate processing from creating inconsistent interview records.

### Structured AI Output

Instead of treating the LLM response as arbitrary text, interview analysis is requested and processed as structured data.

This makes the AI output easier to persist and render consistently in the feedback interface.

### Rate Limiting

Arcjet token-bucket rate limiting is used to control API usage based on the authenticated user identity and protect application endpoints from excessive requests.

---

## 📂 Project Structure

```text
PrepLoop/
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── interview/
│   └── ...
├── components/
├── emails/
├── hooks/
├── lib/
├── prisma/
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/parth202302040026/PrepLoop.git
cd PrepLoop
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file and configure the required credentials for:

* Clerk
* Supabase / PostgreSQL
* Prisma
* Google Gemini
* Stream
* Arcjet

### 4. Generate Prisma Client

```bash
npx prisma generate
```

### 5. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

##  What I Built

PrepLoop was built to explore the intersection of:

* Full-stack web development
* Generative AI
* Real-time communication
* Webhook-driven architecture
* Relational database design
* Authentication and authorization
* API security
* AI-assisted evaluation

The goal was not simply to call an LLM API, but to integrate AI into a complete application workflow where **real-time interview data flows through external services, backend processing, AI analysis, persistent storage, and a user-facing feedback system**.

---

## 🔮 Future Improvements

* [ ] Interview analytics dashboard
* [ ] More interview types and assessment modes
* [ ] Additional LLM providers
* [ ] Resume-aware interview generation
* [ ] Personalized interview difficulty
* [ ] Advanced candidate performance analytics
* [ ] Automated interview reports
* [ ] Expanded interviewer collaboration features

---

## 👨‍💻 Author

**Parth Mishra**

Computer Engineering | Full-Stack Developer | AI Enthusiast

[GitHub](https://github.com/parth202302040026) · [LinkedIn](https://www.linkedin.com/in/parthmishra224/)

