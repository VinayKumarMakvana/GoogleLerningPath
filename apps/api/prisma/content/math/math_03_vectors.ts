export const math_03_vectors = {
  VECTORS_VECTOR_SPACES: {
    title: 'Vectors & Vector Spaces',
    description: 'Master vector spaces, linear independence, span, basis, dimension, and projections with ML connections.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 75,
    prerequisites: ['Linear Algebra Fundamentals'],
    learningContent: `
# Vectors & Vector Spaces

## 1. Vector Spaces
A vector space V is a set of vectors with two operations (addition and scalar multiplication) satisfying 8 axioms (closure, associativity, identity elements, etc.).

The most important vector space for ML: **ℝⁿ** — the set of all n-dimensional real vectors.

## 2. Linear Combinations, Span, and Linear Independence

A **linear combination** of vectors {v₁, v₂, ..., vₖ} is: c₁v₁ + c₂v₂ + ... + cₖvₖ

The **span** of a set of vectors is the set of ALL possible linear combinations.

Vectors are **linearly independent** if NO vector in the set can be written as a linear combination of the others. Equivalently: c₁v₁ + c₂v₂ + ... = 0 implies all cᵢ = 0.

**Intuition:** Linearly dependent vectors are redundant — they don't add new "directions."

## 3. Basis and Dimension

A **basis** is a set of linearly independent vectors that span the entire space.
- Standard basis in ℝ³: e₁=[1,0,0], e₂=[0,1,0], e₃=[0,0,1]
- The **dimension** of a space = number of vectors in any basis

**ML Connection:** PCA finds a new basis aligned with the directions of maximum data variance. Features expressed in this basis are uncorrelated.

## 4. Subspaces

A subspace is a subset of a vector space that is itself a vector space. Key subspaces of a matrix A ∈ ℝᵐˣⁿ:
- **Column space** col(A): span of A's columns — the set of all vectors Ax can produce
- **Null space** null(A): all vectors x such that Ax = 0
- **Rank** = dim(col(A)) = number of linearly independent columns

## 5. Orthogonality and Projections

Vectors u, v are **orthogonal** if u·v = 0. An **orthonormal** set has mutually orthogonal unit vectors.

**Projection of v onto u:**
proj_u(v) = (v·u / ‖u‖²) u

This is the "shadow" of v onto the direction of u.

**Worked Example:**
v = [3, 4], u = [1, 0]
proj_u(v) = (3·1 + 4·0) / (1²+0²) · [1,0] = 3·[1,0] = [3, 0]
✓ The projection onto the x-axis is [3, 0], which makes geometric sense.

**ML Connection:** Least squares regression finds the projection of the target vector y onto the column space of the design matrix X, giving the best linear approximation.
`,
    fullNotes: `
# Detailed Notes: Vector Spaces

- **Change of Basis:** If we have basis B = {b₁, b₂, ...}, the coordinate vector of x in that basis is found by solving [B][coordinates] = x. This is the foundation of feature transformation — expressing data in a new coordinate system (e.g., PCA basis).
- **Gram-Schmidt Process:** Given any set of linearly independent vectors, Gram-Schmidt orthogonalizes them into an orthonormal basis. This is how the QR decomposition is computed.
- **Rank-Nullity Theorem:** rank(A) + nullity(A) = n (number of columns). If a matrix has a large null space, many input vectors map to zero — the transformation is many-to-one and loses information.
`,
    shortNotes: `
- Vector space: closed under addition and scalar multiplication
- Linearly independent: no vector is a linear combination of the others
- Span: all possible linear combinations of a set of vectors
- Basis: a minimal spanning set (linearly independent + spans the space)
- Dimension = number of vectors in any basis
- Rank = number of linearly independent columns = dim(column space)
- Projection of v onto u: (v·u / ‖u‖²) u — the "shadow" of v onto u
`,
    cheatSheet: `
### Vector Space Checklist for ML
| Concept | ML Relevance |
|---------|-------------|
| Span | What outputs can the model produce? |
| Rank | How many independent features/directions exist? |
| Null space | What inputs does the model collapse to zero? |
| Orthonormal basis | PCA components, eigenvectors of covariance |
| Projection | Least squares fit, attention mechanism |

### NumPy: Projection
\`\`\`python
import numpy as np
v = np.array([3., 4.])
u = np.array([1., 0.])
proj = (np.dot(v, u) / np.dot(u, u)) * u  # [3., 0.]
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the rank of a matrix, and why does it matter in ML?', answerHint: 'The rank of a matrix A is the dimension of its column space — the number of linearly independent columns (or rows). In ML, the rank of the design matrix X tells you how many truly independent features/directions exist in your data. If rank(X) < n (number of features), the features are linearly dependent (multicollinearity), making the normal equation X^T X singular and the least squares solution non-unique.', type: 'TECHNICAL' },
      { question: 'What is the geometric interpretation of projecting a vector onto a subspace?', answerHint: 'Projecting a vector y onto a subspace S gives the point in S closest to y. This "closest point" minimizes the L2 distance between y and the subspace. In linear regression, projecting the target vector y onto the column space of the design matrix X gives the best linear approximation ŷ = Xβ. The residual vector e = y - ŷ is orthogonal to the column space.', type: 'CONCEPTUAL' }
    ],
    resources: [
      { title: 'Linear Algebra Done Right (Sheldon Axler)', url: 'https://linear.axler.net/', type: 'BOOK', priority: 'S', source: 'Sheldon Axler', isOfficial: true, description: 'Rigorous linear algebra from a vector-space perspective (free online).' },
      { title: 'Linear Algebra MIT 18.06 (Gilbert Strang)', url: 'https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/', type: 'COURSE', priority: 'S', source: 'MIT OpenCourseWare', isOfficial: true, description: 'The classic MIT linear algebra course by Gilbert Strang.' }
    ]
  }
};
