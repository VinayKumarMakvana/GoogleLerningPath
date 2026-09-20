export const py_07_testing = {
  PYTHON_TESTING: {
    title: 'Testing & Code Quality',
    description: 'Write production-grade tests in pytest, mock external dependencies, and enforce quality with ruff/mypy.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Type Hints & Static Typing'],
    learningContent: `
# Testing & Code Quality in Python

## 1. pytest — The Standard Testing Framework
\`\`\`python
# test_calculator.py
def add(a: int, b: int) -> int:
    return a + b

def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_returns_int():
    assert isinstance(add(1, 2), int)
\`\`\`
Run: \`pytest -v\`

## 2. Fixtures
Fixtures provide setup/teardown logic, injectable into test functions.
\`\`\`python
import pytest

@pytest.fixture
def database():
    db = create_test_db()
    db.seed_test_data()
    yield db         # Test runs here
    db.teardown()    # Always runs after test

def test_user_creation(database):
    user = database.create_user("Alice")
    assert user.name == "Alice"
\`\`\`

## 3. Mocking with pytest-mock / unittest.mock
\`\`\`python
from unittest.mock import MagicMock, patch

def get_user_name(user_id: int) -> str:
    response = requests.get(f"/api/users/{user_id}")
    return response.json()["name"]

def test_get_user_name(mocker):  # pytest-mock provides 'mocker' fixture
    mock_get = mocker.patch("requests.get")
    mock_get.return_value.json.return_value = {"name": "Alice"}

    result = get_user_name(1)

    assert result == "Alice"
    mock_get.assert_called_once_with("/api/users/1")
\`\`\`

## 4. Code Quality Tools
- **ruff:** An extremely fast Python linter and formatter (written in Rust). Replaces flake8, isort, and pylint in a single tool.
- **black:** The opinionated Python code formatter. Non-configurable — everyone uses the same style.
- **mypy / pyright:** Static type checkers.

\`\`\`bash
# Install all quality tools
pip install pytest pytest-mock ruff mypy

# Run
ruff check .           # Lint
ruff format .          # Format
mypy .                 # Type check
pytest -v --cov=. --cov-report=term  # Tests with coverage
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Python Testing

- **Parametrize:** Avoid writing 10 identical tests for 10 different inputs. Use \`@pytest.mark.parametrize\` to define a test with multiple input/output pairs: \`@pytest.mark.parametrize("a,b,expected", [(2,3,5),(-1,1,0)])\`.
- **Conftest.py:** pytest automatically discovers \`conftest.py\` files in the test directory. Any fixtures defined there are available to all tests in the directory, without needing to import them explicitly.
- **Coverage:** \`pytest-cov\` provides test coverage metrics. 80% line coverage is a common floor. But coverage alone does not guarantee tests are meaningful. Pair it with assertions and behavioral tests.
`,
    shortNotes: `
- pytest is the de facto standard Python testing framework.
- Fixtures provide reusable setup and teardown using yield.
- Use unittest.mock or pytest-mock to mock external services and APIs.
- mocker.patch() replaces a function with a MagicMock for the duration of the test.
- ruff: one-stop linter and formatter replacing flake8, isort, pylint.
- Use @pytest.mark.parametrize to test multiple inputs with one test function.
`,
    cheatSheet: `
### pytest Workflow
\`\`\`bash
pytest                        # Run all tests
pytest -v                     # Verbose output
pytest tests/test_foo.py      # Single file
pytest -k "test_login"        # Run tests matching name pattern
pytest --cov=src              # Coverage report
pytest -x                     # Stop on first failure
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between mocking and stubbing in Python tests?', answerHint: 'A stub is an object that returns pre-programmed responses (e.g., mock_db.get_user.return_value = {"name": "Alice"}). It provides fake data for the system under test. A mock additionally records how it was called (arguments, call count) and allows assertions on those interactions (e.g., mock_db.get_user.assert_called_once_with(1)). In Python, unittest.mock.MagicMock acts as both — it provides canned return values and tracks interactions.', type: 'TECHNICAL' },
      { question: 'What is a pytest fixture, and why is it preferred over setup/teardown methods?', answerHint: 'A pytest fixture is a function decorated with @pytest.fixture that provides setup code for tests and can inject values into test functions as parameters. Using yield inside a fixture allows teardown logic after the test completes. Fixtures are preferred over setUp/tearDown because they are composable (fixtures can depend on other fixtures), scoped (session/module/function level), and auto-discoverable via conftest.py without explicit imports.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'pytest Documentation', url: 'https://docs.pytest.org/', type: 'ARTICLE', priority: 'S', source: 'pytest.org', isOfficial: true, description: 'Official pytest documentation.' },
      { title: 'pytest Full Tutorial', url: 'https://www.youtube.com/watch?v=cHYq1MRoyI0', type: 'VIDEO', priority: 'S', source: 'Arjan Codes', isOfficial: false, description: 'Comprehensive pytest guide covering fixtures, mocking, and best practices.' }
    ]
  }
};
