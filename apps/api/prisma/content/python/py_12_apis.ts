export const py_12_apis = {
  PYTHON_APIS_BACKEND: {
    title: 'Python APIs & Backend Integration',
    description: 'Build and consume APIs with FastAPI/httpx, integrate with databases, and structure Python services.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Type Hints & Static Typing', 'Exceptions, Files & Context Managers'],
    learningContent: `
# Python APIs & Backend Integration

## 1. FastAPI — Modern Python API Framework
FastAPI uses Python type hints to auto-generate OpenAPI docs, validate requests, and serialize responses.

\`\`\`python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

app = FastAPI()

class UserCreate(BaseModel):
    name: str
    email: str
    age: int

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

@app.post("/users", response_model=UserResponse, status_code=201)
async def create_user(payload: UserCreate):
    # Pydantic validates the request body automatically
    # If 'age' is missing or not an int, FastAPI returns a 422 error
    user = await db.create_user(payload.name, payload.email)
    return user

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int):
    user = await db.get_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user
\`\`\`

## 2. Pydantic — Data Validation
Pydantic validates and parses data at runtime using type hints.
\`\`\`python
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional

class UserConfig(BaseModel):
    name: str
    email: EmailStr
    timeout: int = 30  # Default value
    tags: list[str] = []

    @field_validator("timeout")
    @classmethod
    def timeout_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("timeout must be positive")
        return v

config = UserConfig(name="Alice", email="alice@example.com")
config = UserConfig.model_validate({"name": "Alice", "email": "not-an-email"})  # ValidationError!
\`\`\`

## 3. HTTP Clients (httpx — Async HTTP)
\`\`\`python
import httpx
import asyncio

async def fetch_user(user_id: int) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"https://api.example.com/users/{user_id}",
            headers={"Authorization": "Bearer token123"},
            timeout=10.0
        )
        response.raise_for_status()  # Raises HTTPError for 4xx/5xx
        return response.json()
\`\`\`

## 4. Environment Configuration
\`\`\`python
# .env file
# DATABASE_URL=postgresql://user:pass@localhost/mydb
# SECRET_KEY=super-secret-key

from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False

    class Config:
        env_file = ".env"

settings = Settings()  # Reads from env/file automatically
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Python APIs

- **Dependency Injection in FastAPI:** FastAPI has a built-in DI system via \`Depends()\`. Use it to inject database sessions, authentication checks, or shared services into route handlers, keeping them clean and testable.
- **Background Tasks:** For fire-and-forget work (e.g., sending an email after registration), FastAPI's \`BackgroundTasks\` runs the task after the HTTP response is sent: \`background_tasks.add_task(send_email, user.email)\`.
- **Structured Logging:** In production Python APIs, use \`structlog\` for JSON-formatted structured logs instead of the stdlib \`logging\` module. Integrates cleanly with observability stacks (Loki/Datadog).
`,
    shortNotes: `
- FastAPI uses Python type hints for automatic request validation and OpenAPI docs.
- Pydantic validates data at runtime (unlike mypy which only checks statically).
- Use @field_validator for custom validation logic in Pydantic models.
- httpx is the modern Python HTTP client (supports async; replaces requests for async code).
- Use pydantic-settings to load typed, validated configuration from env files.
- Dependency Injection (Depends()) in FastAPI keeps route handlers focused and testable.
`,
    cheatSheet: `
### HTTP Status Codes to Know
| Code | Meaning         | When to Use                         |
|------|----------------|-------------------------------------|
| 200  | OK             | Successful GET/PUT/PATCH            |
| 201  | Created        | Successful POST (resource created)  |
| 204  | No Content     | Successful DELETE                   |
| 400  | Bad Request    | Invalid input from client           |
| 401  | Unauthorized   | Missing/invalid authentication      |
| 403  | Forbidden      | Auth OK, but insufficient perms     |
| 404  | Not Found      | Resource doesn't exist              |
| 422  | Unprocessable  | Validation error (FastAPI default)  |
| 500  | Server Error   | Unhandled exception                 |
`,
    interviewQuestions: [
      { question: 'What are the advantages of using Pydantic for data validation in a Python API?', answerHint: 'Pydantic validates data at runtime using Python type hints. It provides automatic type coercion (converting string "30" to int 30), clear and detailed validation error messages, support for complex types (nested models, lists, enums), serialization/deserialization, and integration with FastAPI for automatic request parsing and OpenAPI schema generation. It eliminates the boilerplate of manual validation code.', type: 'TECHNICAL' },
      { question: 'Why should you prefer httpx over the traditional requests library for modern Python services?', answerHint: 'httpx supports both synchronous and asynchronous (async/await) HTTP operations, making it compatible with asyncio-based frameworks like FastAPI. The requests library is strictly synchronous and would block the event loop if used in an async context. httpx also provides HTTP/2 support, connection pooling via persistent clients, and a nearly identical API to requests, making migration straightforward.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'FastAPI Documentation', url: 'https://fastapi.tiangolo.com/', type: 'ARTICLE', priority: 'S', source: 'fastapi.tiangolo.com', isOfficial: true, description: 'Official FastAPI documentation with tutorials.' },
      { title: 'FastAPI Full Course', url: 'https://www.youtube.com/watch?v=7t2alSnE2-I', type: 'VIDEO', priority: 'S', source: 'freeCodeCamp', isOfficial: false, description: 'Comprehensive FastAPI tutorial covering CRUD, auth, and async operations.' }
    ]
  }
};
