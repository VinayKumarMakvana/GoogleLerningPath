# Personal Software Engineering Mentorship Platform

A production-quality personal Software Engineering preparation and mentorship platform.

## Architecture Overview
This is a Monorepo containing:
- `apps/web`: Next.js (App Router) frontend application.
- `apps/api`: Node.js + Express.js + TypeScript backend application.
- `packages/shared`: Shared types and utilities (planned).

The architecture follows a modular monolith approach for the backend, preparing the foundation for an eventual microservices transition if required, while keeping the current development lifecycle simple and maintainable. 

### Tech Stack
*   **Database**: PostgreSQL
*   **ORM**: Prisma
*   **Backend**: Node.js, Express, TypeScript
*   **Frontend**: Next.js, React, TypeScript, Vanilla CSS Modules

## Folder Structure
```
/
├── apps/
│   ├── api/          # Express API Server
│   │   ├── prisma/   # Database schema
│   │   ├── src/      # API Source Code (modules, middleware, utils)
│   │   └── tests/    # API tests
│   └── web/          # Next.js Application
│       └── src/      # Frontend source code
├── .env.example      # Example environment variables
└── package.json      # Monorepo configuration
```

## Setup & Development Workflow

1.  **Install dependencies** (from root):
    ```bash
    npm install
    ```
2.  **Environment Variables**:
    Copy `.env.example` to `.env` and configure your local PostgreSQL database URL.
    ```bash
    cp .env.example .env
    ```
3.  **Database Setup**:
    Navigate to `apps/api` and push the database schema:
    ```bash
    cd apps/api
    npx prisma db push
    ```
4.  **Run Development Servers**:
    From the root, start both applications:
    ```bash
    npm run dev
    ```
    - Frontend will run on `http://localhost:3000`
    - Backend will run on `http://localhost:4000`

## Database Schema Overview
The database uses a highly normalized schema covering:
- `Users` and `Profiles`
- `Curriculum` (Roadmap, Phases, Modules, Skills, Topics, Subtopics)
- `Content` (LearningContent, Notes, ShortNotes, CheatSheets, Resources)
- `Practice` & `Assessments` (PracticeItem, PracticeAttempt, Assessment)
- `Projects`
- `Progress` & `Planning` (RevisionSchedule, DailyPlan, Progress)

## API Conventions
- **Routing**: API routes are versioned (e.g., `/api/v1/...`).
- **Standardized Responses**: Using consistent JSON responses for success and error objects.
- **Validation**: Will utilize Zod for payload validation.
