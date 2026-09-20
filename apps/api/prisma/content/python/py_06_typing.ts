export const py_06_typing = {
  TYPE_HINTS_STATIC_TYPING: {
    title: 'Type Hints & Static Typing',
    description: 'Write safer Python with type annotations, mypy, Protocols, and Generics.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['Object-Oriented & Advanced Python'],
    learningContent: `
# Type Hints & Static Typing

Python is dynamically typed, but type hints (PEP 484+) allow static type checkers like **mypy** and **pyright** to catch bugs before runtime.

## 1. Basic Annotations
\`\`\`python
def greet(name: str) -> str:
    return f"Hello, {name}!"

def process(items: list[int]) -> dict[str, int]:
    return {"count": len(items), "total": sum(items)}
\`\`\`

## 2. Optional, Union, and Any
\`\`\`python
from typing import Optional, Union

def find_user(user_id: int) -> Optional[str]:  # Returns str or None
    return None

def process_value(val: Union[int, str]) -> str:  # int or str
    return str(val)

# Python 3.10+ shorthand
def find_user_modern(user_id: int) -> str | None:
    return None
\`\`\`

## 3. Generics
\`\`\`python
from typing import TypeVar, Generic

T = TypeVar('T')

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

stack: Stack[int] = Stack()
stack.push(1)
stack.push("hello")  # mypy ERROR: Argument of type str not assignable to int
\`\`\`

## 4. Protocols (Structural Subtyping / Duck Typing)
Protocols define structural interfaces — if a class has the required methods, it satisfies the Protocol, regardless of inheritance.
\`\`\`python
from typing import Protocol

class Drawable(Protocol):
    def draw(self) -> None: ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")

class Square:
    def draw(self) -> None:
        print("Drawing square")

def render(shape: Drawable) -> None:  # Accepts any object with draw()
    shape.draw()

render(Circle())  # Works — satisfies Drawable protocol
render(Square())  # Works — satisfies Drawable protocol
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Type Hints

- **mypy vs pyright:** mypy is the original type checker. pyright (from Microsoft) is significantly faster and is the engine behind Pylance in VS Code. Both are excellent choices. Use one consistently in CI.
- **\`TYPE_CHECKING\`:** Sometimes you have circular imports that only exist for type hints. Wrap them in \`if TYPE_CHECKING:\` to prevent them from being imported at runtime.
- **TypedDict:** For type-hinting plain dictionaries with a fixed schema: \`class UserResponse(TypedDict): name: str; email: str\`. Great for validating API response shapes.
`,
    shortNotes: `
- Type hints are NOT enforced at runtime — they are for static analysis only.
- Use Optional[X] or X | None for values that can be None.
- Generics (TypeVar + Generic[T]) type-parameterize classes/functions.
- Protocols implement structural duck typing — no inheritance required.
- Run mypy or pyright in your CI pipeline to catch type errors automatically.
- TypedDict provides type safety for plain dict schemas.
`,
    cheatSheet: `
### Common Type Hint Quick Reference
\`\`\`python
from typing import Optional, Union, Callable, Any, TypeVar

x: list[int]
y: dict[str, float]
z: tuple[int, str, bool]
fn: Callable[[int, str], bool]   # Function taking int, str returning bool
val: Optional[str]               # str | None
any_val: Any                     # Opt-out of type checking
T = TypeVar('T')                 # Generic type variable
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between a Protocol and an Abstract Base Class (ABC) in Python?', answerHint: 'An ABC uses nominal subtyping — a class must explicitly inherit from the ABC to be considered its subtype. A Protocol uses structural subtyping — any class that implements the required methods satisfies the Protocol automatically, with no inheritance required. Protocols better express Python\'s duck typing philosophy and are preferred when working with third-party libraries whose classes you cannot modify.', type: 'TECHNICAL' },
      { question: 'Are Python type hints enforced at runtime?', answerHint: 'No. Python type hints are completely ignored at runtime by default. They exist purely as metadata for static analysis tools (mypy, pyright) and IDEs. The typing module annotations do not affect program execution. You can add runtime validation with libraries like Pydantic, which actually reads and enforces type annotations.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Python Type Hints (PEP 484)', url: 'https://peps.python.org/pep-0484/', type: 'ARTICLE', priority: 'S', source: 'Python.org', isOfficial: true, description: 'The original PEP introducing type hints to Python.' },
      { title: 'mypy — Optional Static Typing', url: 'https://mypy.readthedocs.io/en/stable/', type: 'ARTICLE', priority: 'A', source: 'mypy.readthedocs.io', isOfficial: true, description: 'Official mypy documentation for static type checking.' }
    ]
  }
};
