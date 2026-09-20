export const math_05_eigen = {
  EIGEN_DECOMPOSITIONS: {
    title: 'Eigenvalues, Eigenvectors & Decompositions',
    description: 'Master eigendecomposition, SVD, and PCA mathematical foundations — the core of dimensionality reduction.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['Matrices & Linear Transformations'],
    learningContent: `
# Eigenvalues, Eigenvectors & Decompositions

## 1. Eigenvalues and Eigenvectors

For a square matrix A, a non-zero vector **v** is an **eigenvector** if:
**Av** = λ**v**

where λ is the corresponding **eigenvalue**. A only *scales* v — it doesn't change its direction.

**Finding Eigenvalues:** Solve the characteristic equation: det(A - λI) = 0
The roots of this polynomial are the eigenvalues.

**Worked Example:**
A = [[3, 1], [0, 2]]
det(A - λI) = (3-λ)(2-λ) = 0 → λ₁ = 3, λ₂ = 2

For λ₁ = 3: (A - 3I)v = 0 → [[0,1],[0,-1]]v = 0 → v₁ = [1, 0]
For λ₂ = 2: (A - 2I)v = 0 → [[1,1],[0,0]]v = 0 → v₂ = [-1, 1]

## 2. Eigendecomposition
For a diagonalizable matrix A:
**A = VΛV⁻¹**
- V: matrix whose columns are eigenvectors
- Λ: diagonal matrix of eigenvalues

**For symmetric matrices (spectral theorem):** A = QΛQᵀ
where Q has orthonormal eigenvectors. This is the foundation of PCA.

## 3. Singular Value Decomposition (SVD)
SVD generalizes eigendecomposition to ANY matrix (not just square):
**A = UΣVᵀ**
- U ∈ ℝᵐˣᵐ: left singular vectors (orthogonal)
- Σ ∈ ℝᵐˣⁿ: diagonal matrix of singular values σ₁ ≥ σ₂ ≥ ... ≥ 0
- V ∈ ℝⁿˣⁿ: right singular vectors (orthogonal)

**Geometric interpretation:** Any linear transformation decomposes into:
1. Rotation/reflection (V) 
2. Scaling along axes (Σ)
3. Rotation/reflection (U)

\`\`\`python
import numpy as np
A = np.array([[1,2,3],[4,5,6]])
U, S, Vt = np.linalg.svd(A, full_matrices=False)
# A ≈ U @ np.diag(S) @ Vt
\`\`\`

## 4. PCA Mathematical Foundation
Given data matrix X ∈ ℝᴺˣᵈ (N samples, d features):
1. Center: X̃ = X - mean(X)
2. Compute covariance: C = (1/N) X̃ᵀX̃
3. Eigendecompose: C = QΛQᵀ
4. The eigenvectors (columns of Q) are the **principal components**
5. Project: Z = X̃Q[:, :k] (keep top k principal components)

The first principal component is the direction of MAXIMUM variance in the data.
`,
    fullNotes: `
# Detailed Notes: Eigendecomposition & SVD

- **Positive Definite Eigenvalues:** A symmetric matrix is positive definite iff all eigenvalues are strictly positive. This is why the Hessian of a convex function has all positive eigenvalues — it ensures the gradient descent finds a minimum, not a saddle point.
- **Low-rank approximation:** The Eckart-Young theorem states that the best rank-k approximation of A is: Aₖ = Σᵢ₌₁ᵏ σᵢ uᵢvᵢᵀ (using the top k singular values/vectors). This is used in recommender systems, image compression, and noise reduction.
- **Condition Number:** κ(A) = σₘₐₓ/σₘᵢₙ. A large condition number means the matrix is nearly singular and the linear system Ax = b is ill-conditioned (small perturbations in b lead to large changes in x).
`,
    shortNotes: `
- Av = λv: eigenvector v is only scaled by A, not rotated
- Find eigenvalues: solve det(A - λI) = 0
- Symmetric matrices have real, orthogonal eigenvectors (spectral theorem)
- SVD: A = UΣVᵀ — works for ANY matrix, not just square
- Singular values σ₁ ≥ σ₂ ≥ ... measure how much each direction is stretched
- PCA: eigendecompose the covariance matrix; eigenvectors = principal components
- Low-rank approximation with top-k singular values (Eckart-Young theorem)
`,
    cheatSheet: `
### SVD vs Eigendecomposition
| Property | Eigendecomposition | SVD |
|----------|-------------------|-----|
| Matrix type | Square only | Any matrix |
| Decomposition | A = VΛV⁻¹ | A = UΣVᵀ |
| Eigenvalues/values | Can be negative | Always non-negative |
| For symmetric A | Real, orthogonal eigenvectors | U, V columns = eigenvectors |

\`\`\`python
# Eigendecomposition (symmetric matrix)
eigenvalues, eigenvectors = np.linalg.eig(C)

# SVD (any matrix)  
U, S, Vt = np.linalg.svd(A)

# PCA from scratch
X_centered = X - X.mean(axis=0)
C = (X_centered.T @ X_centered) / len(X)
eigenvalues, eigenvectors = np.linalg.eigh(C)  # eigh for symmetric
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the geometric interpretation of eigenvectors and eigenvalues?', answerHint: 'When a matrix A transforms a vector, most vectors change both direction and magnitude. Eigenvectors are special directions that remain unchanged (they are only scaled). The corresponding eigenvalue λ tells you the scaling factor. If λ > 1, the vector is stretched; if 0 < λ < 1, it is compressed; if λ < 0, it is flipped. In PCA, eigenvectors of the covariance matrix point in the directions of maximum variance (the principal components), and eigenvalues tell you how much variance lies in each direction.', type: 'CONCEPTUAL' },
      { question: 'Why is SVD more general and numerically preferred over eigendecomposition for many ML tasks?', answerHint: 'Eigendecomposition only works for square matrices, and not all square matrices are diagonalizable. SVD works for any matrix (m×n). SVD always produces real, non-negative singular values (even for matrices with complex eigenvalues). It is also more numerically stable. For PCA, computing SVD of the data matrix X is numerically superior to computing the covariance X^T X and then eigendecomposing, because squaring the matrix squares the condition number, amplifying numerical errors.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'SVD and PCA (3Blue1Brown style) — StatQuest', url: 'https://www.youtube.com/watch?v=FgakZw6K1QQ', type: 'VIDEO', priority: 'S', source: 'StatQuest', isOfficial: false, description: 'Intuitive explanation of PCA and SVD with clear visuals.' },
      { title: 'Eigenvalues and Eigenvectors — MIT 18.06', url: 'https://www.youtube.com/watch?v=cdZnhQjJu4I', type: 'VIDEO', priority: 'A', source: 'MIT / Gilbert Strang', isOfficial: true, description: 'Gilbert Strang\'s eigenvalue lecture.' }
    ]
  }
};
