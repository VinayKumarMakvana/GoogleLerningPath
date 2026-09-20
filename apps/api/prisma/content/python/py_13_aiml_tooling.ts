export const py_13_aiml_tooling = {
  PYTHON_AIML_TOOLING: {
    title: 'Python for AI/ML Engineering',
    description: 'Set up reproducible ML environments, manage dependencies with Poetry/uv, and understand Python tooling for ML workflows.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Pandas & Data Processing', 'Python APIs & Backend Integration'],
    learningContent: `
# Python for AI/ML Engineering

This module covers the Python **tooling** ecosystem required for AI/ML work. We do NOT teach ML algorithms here — those belong to the 9J/9K/9L tracks.

## 1. Virtual Environments & Dependency Management
**The Problem:** Project A needs \`numpy==1.24\`, Project B needs \`numpy==2.0\`. They cannot coexist in the global Python installation.

**Solutions:**
- **venv (built-in):** \`python -m venv .venv && source .venv/bin/activate\`
- **Poetry:** Full dependency management with lock files and pyproject.toml
- **uv (modern, fast):** Extremely fast package installer written in Rust

\`\`\`bash
# Using uv (recommended for speed)
pip install uv
uv venv .venv
source .venv/bin/activate
uv pip install numpy pandas torch
uv pip freeze > requirements.txt  # Lock exact versions
\`\`\`

## 2. pyproject.toml — The Modern Python Project Standard
\`\`\`toml
[project]
name = "my-ml-project"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "numpy>=1.26",
    "pandas>=2.0",
    "fastapi>=0.110",
]

[project.optional-dependencies]
dev = ["pytest", "ruff", "mypy"]
\`\`\`

## 3. Reproducible Environments
Critical in ML: if two engineers train the same model with different library versions, they may get different results.

\`\`\`bash
# Lock entire dependency tree (exact versions for all transitive deps)
uv pip freeze > requirements.lock.txt

# Recreate exactly the same environment
uv pip install -r requirements.lock.txt

# Or with Poetry
poetry lock       # Creates poetry.lock
poetry install    # Installs exactly what's in the lock file
\`\`\`

## 4. Python Logging for ML Workflows
\`\`\`python
import logging
import structlog  # pip install structlog

# Structured logging for ML jobs
logger = structlog.get_logger()

def train_model(config: dict):
    logger.info("Training started", epochs=config["epochs"], lr=config["lr"])
    
    for epoch in range(config["epochs"]):
        loss = train_one_epoch()
        logger.info("Epoch complete", epoch=epoch, train_loss=loss)
    
    logger.info("Training complete", final_loss=loss)
\`\`\`

## 5. Configuration Management
\`\`\`python
import yaml
from dataclasses import dataclass

@dataclass
class TrainingConfig:
    learning_rate: float
    batch_size: int
    epochs: int
    model_name: str

# Load from YAML
def load_config(path: str) -> TrainingConfig:
    with open(path) as f:
        data = yaml.safe_load(f)
    return TrainingConfig(**data)
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Python ML Tooling

- **Jupyter Notebooks vs Python Scripts:** Notebooks (Jupyter/Colab) are great for interactive exploration and visualization. They are terrible for production code — they have hidden state, non-linear execution, and are hard to version-control and test. Production ML pipelines should always be Python scripts or modules.
- **Makefile for ML Projects:** A simple \`Makefile\` standardizes common commands: \`make train\`, \`make test\`, \`make lint\`, \`make docker-build\`. Every team member runs the exact same commands without memorizing complex CLI arguments.
- **Hydra (Facebook Research):** A Python framework for managing complex ML experiment configurations hierarchically via YAML. Extremely popular in research and production ML teams.
`,
    shortNotes: `
- Always use virtual environments. Never install ML packages globally.
- Use Poetry or uv for dependency management with lock files.
- Lock files (requirements.lock.txt or poetry.lock) ensure reproducibility.
- Prefer Python scripts over Jupyter notebooks for production ML code.
- Use structlog for structured JSON logging in ML training pipelines.
- pyproject.toml is the modern standard for Python project configuration.
`,
    cheatSheet: `
### Python ML Project Setup (uv)
\`\`\`bash
uv venv .venv
source .venv/bin/activate        # Linux/Mac
.venv\\Scripts\\activate            # Windows
uv pip install numpy pandas torch
uv pip freeze > requirements.lock.txt
echo ".venv/" >> .gitignore      # Never commit the venv!
\`\`\`
`,
    interviewQuestions: [
      { question: 'Why is reproducibility critical in ML environments, and how do you achieve it?', answerHint: 'ML model training is highly sensitive to library versions. Minor version differences in NumPy, PyTorch, or CUDA can produce different results, making debugging impossible. Reproducibility is achieved by: (1) Using virtual environments to isolate project dependencies, (2) Generating a lock file that pins exact versions of all direct and transitive dependencies (poetry.lock or uv pip freeze), (3) Version-controlling the lock file in Git, and (4) Using Docker to package the exact Python version and OS environment.', type: 'TECHNICAL' },
      { question: 'What is the difference between requirements.txt and a lock file?', answerHint: 'requirements.txt typically contains a list of direct dependencies, possibly with version ranges (e.g., numpy>=1.26). A lock file (poetry.lock, requirements.lock.txt from pip freeze) contains the exact, pinned versions of every package including all transitive (indirect) dependencies resolved at a specific point in time. The lock file guarantees that anyone who installs from it gets identical package versions, ensuring a reproducible environment.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'uv — An Extremely Fast Python Package Manager', url: 'https://docs.astral.sh/uv/', type: 'ARTICLE', priority: 'S', source: 'Astral', isOfficial: true, description: 'Official documentation for the uv package manager.' },
      { title: 'Poetry — Python Dependency Management', url: 'https://python-poetry.org/docs/', type: 'ARTICLE', priority: 'A', source: 'python-poetry.org', isOfficial: true, description: 'Official Poetry documentation for dependency management.' }
    ]
  }
};
