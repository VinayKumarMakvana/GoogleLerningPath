export const be_01_ts = {
  TS_FUNDAMENTALS: {
    title: 'TypeScript Fundamentals',
    description: 'Learn the core concepts of TypeScript including static typing, inference, and setup.',
    difficulty: 'BEGINNER',
    estimatedLearnTime: 60,
    prerequisites: [],
    learningContent: `
# TypeScript Fundamentals

TypeScript is JavaScript with syntax for types. It adds static typing to JavaScript, allowing you to catch errors at compile-time rather than runtime.

## Core Concepts
1. **Static Typing:** Define the shape of your data.
2. **Type Inference:** TS can often guess the type even if you don't explicitly define it.
3. **Compilation:** TS code compiles down to plain JavaScript.

## Basic Types
\`\`\`typescript
let isDone: boolean = false;
let lines: number = 42;
let name: string = "Alice";
let list: number[] = [1, 2, 3];
\`\`\`
`,
    fullNotes: `
# Detailed Notes: TS Fundamentals

- **Why TypeScript?** It scales better than JS for large codebases. The compiler catches typos, undefined errors, and mismatched arguments.
- **Any vs Unknown:** \`any\` turns off type checking. \`unknown\` is a safer alternative that forces you to check the type before using it.
- **Configuring TS:** The \`tsconfig.json\` file controls strictness. Always aim for \`"strict": true\`.
`,
    shortNotes: `
- TS = JS + Static Types
- Compiles to JS
- Use \`tsconfig.json\` to configure compiler
- Basic types: boolean, number, string, array, tuple, enum, any, void, null, undefined.
`,
    cheatSheet: `
\`\`\`typescript
// Arrays
let arr: number[] = [1, 2];
let arr2: Array<number> = [1, 2];

// Tuples
let tuple: [string, number] = ["hello", 10];

// Enums
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between any and unknown in TypeScript?', answerHint: 'any disables type checking, unknown forces you to perform type checking before operations.', type: 'TECHNICAL' },
      { question: 'Why use TypeScript over JavaScript?', answerHint: 'Early error detection, better IDE support, easier refactoring for large applications.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'TypeScript Handbook: Everyday Types', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true },
      { title: 'TypeScript Crash Course', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', type: 'VIDEO', priority: 'A', source: 'Traversy Media', isOfficial: false }
    ]
  },
  INTERFACES_TYPES: {
    title: 'Interfaces and Types',
    description: 'Master object shapes, unions, and intersections in TypeScript.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 60,
    prerequisites: ['TypeScript Fundamentals'],
    learningContent: `
# Interfaces vs Type Aliases

Both \`interface\` and \`type\` allow you to name a type.

## Interfaces
Interfaces are strictly for object shapes and are extensible.
\`\`\`typescript
interface User {
  name: string;
  id: number;
}
interface Admin extends User {
  role: string;
}
\`\`\`

## Type Aliases
Types can represent objects, primitives, unions, and intersections.
\`\`\`typescript
type ID = string | number; // Union
type User = { name: string };
type Admin = User & { role: string }; // Intersection
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Interfaces & Types

- **Extensibility:** Interfaces are "open" and can be merged (Declaration Merging). Types are "closed".
- **Unions:** \`type A = string | number\` is impossible with interfaces.
- **Rule of Thumb:** Use \`interface\` for public API definitions (like defining a class shape or library output) and \`type\` for complex types (unions/mapped types).
`,
    shortNotes: `
- \`interface\`: Object shapes only, supports declaration merging, use \`extends\`.
- \`type\`: Can be primitives, unions, intersections (\`&\`). Cannot merge.
- Use unions \`|\` for "OR" logic.
`,
    cheatSheet: `
\`\`\`typescript
interface Animal { name: string; }
interface Bear extends Animal { honey: boolean; }

type AnimalType = { name: string; }
type BearType = AnimalType & { honey: boolean; }

// Union
type Status = "success" | "error" | "loading";
\`\`\`
`,
    interviewQuestions: [
      { question: 'When should you use an interface versus a type alias?', answerHint: 'Use interfaces for object-oriented design and declaration merging. Use types for unions, intersections, and primitives.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Types vs Interfaces', url: 'https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true },
      { title: 'Interfaces vs Types in TS', url: 'https://www.youtube.com/watch?v=zM9UPcIyyhQ', type: 'VIDEO', priority: 'A', source: 'Web Dev Simplified', isOfficial: false }
    ]
  },
  GENERICS: {
    title: 'Generics',
    description: 'Build reusable, type-safe components using generics.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Interfaces and Types'],
    learningContent: `
# TypeScript Generics

Generics allow you to write reusable code that works with a variety of types while maintaining type safety.

\`\`\`typescript
function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("myString");
\`\`\`

You can constrain generics using \`extends\`:
\`\`\`typescript
interface Lengthwise {
  length: number;
}
function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
  console.log(arg.length); // Now safe!
  return arg;
}
\`\`\`
`,
    fullNotes: `
# Detailed Notes: Generics

- Generics are like variables for types.
- They are heavily used in built-in APIs (like \`Array<T>\` or \`Promise<T>\`).
- **Multiple Type Parameters:** \`function map<T, U>(arr: T[], func: (arg: T) => U): U[]\`
- **Utility Types:** TypeScript provides generic utility types like \`Partial<T>\`, \`Omit<T, K>\`, and \`Pick<T, K>\` which are extremely useful in backend engineering for defining API payloads.
`,
    shortNotes: `
- \`<T>\` denotes a generic type parameter.
- Use \`extends\` to constrain a generic to a specific shape.
- Essential for reusable utility functions and strong typing of generic structures (like API responses).
`,
    cheatSheet: `
\`\`\`typescript
// Generic Interface
interface GenericIdentityFn<Type> {
  (arg: Type): Type;
}

// Partial Utility
interface Todo { title: string; description: string; }
type PartialTodo = Partial<Todo>; // all fields optional
\`\`\`
`,
    interviewQuestions: [
      { question: 'What are Generics in TypeScript and why use them?', answerHint: 'Generics provide a way to make components work over a variety of types rather than a single one, providing reusability with type safety.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Generics Handbook', url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html', type: 'ARTICLE', priority: 'S', source: 'Official Docs', isOfficial: true },
      { title: 'TS Generics Tutorial', url: 'https://www.youtube.com/watch?v=nViEqmEGTpM', type: 'VIDEO', priority: 'A', source: 'YouTube', isOfficial: false }
    ]
  }
};
