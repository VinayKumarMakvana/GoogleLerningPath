export const math_04_matrices = {
  MATRICES_LINEAR_TRANSFORMATIONS: {
    title: 'Matrices & Linear Transformations',
    description: 'Master matrix operations, determinants, inverses, matrix factorizations, and how matrices represent linear transformations.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Vectors & Vector Spaces'],
    learningContent: `
# Matrices & Linear Transformations

## 1. Matrices as Linear Transformations
Every matrix A ∈ ℝᵐˣⁿ defines a linear transformation T: ℝⁿ → ℝᵐ via T(x) = Ax.
- A 2×2 rotation matrix rotates every input vector by an angle θ
- A 2×2 scaling matrix stretches/compresses vectors

**ML Connection:** Each layer of a neural network applies a linear transformation W followed by a nonlinear activation. The composition of layers is a composition of transformations.

## 2. Matrix Multiplication
(AB)ᵢⱼ = Σₖ Aᵢₖ Bₖⱼ — the dot product of row i of A with column j of B.

For AB to be defined: A ∈ ℝᵐˣⁿ and B ∈ ℝⁿˣᵖ → AB ∈ ℝᵐˣᵖ

**Properties:**
- NOT commutative: AB ≠ BA in general
- Associative: (AB)C = A(BC)
- Transpose: (AB)ᵀ = BᵀAᵀ

\`\`\`python
import numpy as np
A = np.array([[1,2],[3,4]])
B = np.array([[5,6],[7,8]])
C = A @ B          # Matrix multiply: [[19,22],[43,50]]
\`\`\`

## 3. Transpose and Symmetric Matrices
The transpose Aᵀ swaps rows and columns: (Aᵀ)ᵢⱼ = Aⱼᵢ

A matrix is **symmetric** if A = Aᵀ (square matrices only).

**ML Connection:** The covariance matrix Σ = (1/N)XᵀX is always symmetric positive semi-definite (PSD). Symmetric matrices have real eigenvalues — critical for PCA.

## 4. Determinant
The determinant det(A) is a scalar that encodes how much a linear transformation scales volumes.

For 2×2: det([[a,b],[c,d]]) = ad - bc

Key properties:
- det(A) ≠ 0 ⟺ A is invertible
- det(AB) = det(A)·det(B)
- |det(A)| = volume scaling factor of the transformation

## 5. Matrix Inverse
A⁻¹ exists iff A is square AND det(A) ≠ 0.
A⁻¹A = AA⁻¹ = I (identity matrix)

**ML Connection:** The ordinary least squares (OLS) solution is β = (XᵀX)⁻¹Xᵀy. XᵀX must be invertible (full rank) for a unique solution to exist.

## 6. Special Matrices
- **Identity I:** Iₙ is the n×n matrix with 1s on the diagonal, 0s elsewhere
- **Diagonal D:** Only diagonal entries are nonzero — efficient to multiply
- **Orthogonal Q:** Qᵀ = Q⁻¹ — columns are orthonormal vectors; preserves lengths and angles
- **Positive Definite A:** xᵀAx > 0 for all non-zero x — used in Hessians and covariance matrices
`,
    fullNotes: `
# Detailed Notes: Matrices

- **LU Decomposition:** A = LU where L is lower triangular and U is upper triangular. Used to efficiently solve Ax = b without computing A⁻¹ directly (which is numerically expensive and unstable). Most practical linear system solvers use LU.
- **QR Decomposition:** A = QR where Q has orthonormal columns and R is upper triangular. Used in least squares solvers (more numerically stable than the normal equations) and in the QR algorithm for computing eigenvalues.
- **Moore-Penrose Pseudoinverse:** When A is not square or is singular, A⁺ = (AᵀA)⁻¹Aᵀ gives the least-squares solution. numpy: np.linalg.pinv(A).
`,
    shortNotes: `
- Ax = b: matrix A transforms vector x to produce b
- Matrix multiply: inner dimensions must match; (m×n)(n×p) = m×p
- Transpose: (AB)ᵀ = BᵀAᵀ
- det(A) ≠ 0 ⟺ A is invertible
- Symmetric matrix: A = Aᵀ. Has real eigenvalues.
- Orthogonal matrix Q: QᵀQ = I (rotation/reflection — no distortion)
- Positive definite A: xᵀAx > 0 — like a bowl-shaped surface (convex)
`,
    cheatSheet: `
### Matrix Properties Quick Reference
| Property | Test | ML Relevance |
|----------|------|-------------|
| Invertible | det ≠ 0, rank = n | Unique OLS solution |
| Symmetric | A = Aᵀ | Covariance matrix, Hessian |
| Orthogonal | QᵀQ = I | Rotation, QR decomp |
| Positive Definite | xᵀAx > 0 | Convex optimization, covariance |
| Diagonal | Dᵢⱼ = 0 if i≠j | Efficient computation |

\`\`\`python
np.linalg.det(A)       # determinant
np.linalg.inv(A)       # inverse (only if square, non-singular)
np.linalg.pinv(A)      # pseudoinverse (always defined)
A.T                     # transpose
A @ B                   # matrix multiply
\`\`\`
`,
    interviewQuestions: [
      { question: 'What does the determinant of a matrix represent geometrically?', answerHint: 'The determinant represents how much a linear transformation scales volumes (or areas in 2D). A 2D matrix with determinant 2 doubles areas; with determinant -1, it flips orientation and preserves area. A determinant of 0 means the transformation collapses space onto a lower dimension (the matrix is singular), which is why det(A) = 0 implies A is non-invertible — the transformation is not reversible.', type: 'CONCEPTUAL' },
      { question: 'Why is computing A⁻¹ directly a bad practice for solving linear systems in practice?', answerHint: 'Computing A⁻¹ directly is numerically unstable and computationally expensive (O(n³)). Small numerical errors in A propagate into large errors in A⁻¹. For solving Ax = b, it is far better to use LU decomposition (also O(n³) but more stable) or QR decomposition. numpy.linalg.solve() uses LU internally and is numerically superior to np.linalg.inv(A) @ b.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'Matrices | MIT 18.06 Linear Algebra', url: 'https://www.youtube.com/watch?v=FX4C-JpTFgY', type: 'VIDEO', priority: 'S', source: 'MIT / Gilbert Strang', isOfficial: true, description: 'Gilbert Strang\'s canonical lectures on matrix operations.' },
      { title: 'Matrix Methods in Data Analysis (MIT 18.065)', url: 'https://ocw.mit.edu/courses/18-065-matrix-methods-in-data-analysis-signal-processing-and-machine-learning-spring-2018/', type: 'COURSE', priority: 'A', source: 'MIT OpenCourseWare', isOfficial: true, description: 'Strang\'s course on matrices applied directly to ML and data analysis.' }
    ]
  }
};
