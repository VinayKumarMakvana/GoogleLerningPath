export const py_10_numpy = {
  NUMPY_SCIENTIFIC: {
    title: 'NumPy & Scientific Computing',
    description: 'Master NumPy arrays, vectorization, broadcasting, and linear algebra operations for AI/ML foundations.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Performance & Profiling'],
    learningContent: `
# NumPy & Scientific Computing

NumPy is the foundation of the entire Python scientific stack (Pandas, scikit-learn, PyTorch). Understanding it deeply is mandatory for AI/ML engineering.

## 1. The ndarray — NumPy's Core Data Structure
An \`ndarray\` is a contiguous block of typed memory. All elements must be the same dtype (e.g., \`float64\`, \`int32\`).

\`\`\`python
import numpy as np

# 1D array (vector)
v = np.array([1.0, 2.0, 3.0])
print(v.shape)   # (3,)
print(v.dtype)   # float64

# 2D array (matrix)
M = np.array([[1, 2, 3], [4, 5, 6]])
print(M.shape)   # (2, 3) — 2 rows, 3 columns
print(M.ndim)    # 2
print(M.size)    # 6 — total elements
\`\`\`

## 2. Array Creation
\`\`\`python
np.zeros((3, 4))          # 3x4 matrix of zeros
np.ones((2, 3))           # 2x3 matrix of ones
np.eye(4)                 # 4x4 identity matrix
np.arange(0, 10, 2)       # [0, 2, 4, 6, 8]
np.linspace(0, 1, 5)      # [0, 0.25, 0.5, 0.75, 1.0]
np.random.randn(3, 3)     # 3x3 standard normal distribution
\`\`\`

## 3. Vectorized Operations (No Python Loops!)
\`\`\`python
a = np.array([1, 2, 3, 4])
b = np.array([10, 20, 30, 40])

a + b    # array([11, 22, 33, 44]) — element-wise
a * b    # array([10, 40, 90, 160])
a ** 2   # array([1, 4, 9, 16])
np.sqrt(a)  # array([1, 1.41, 1.73, 2.0])
\`\`\`

## 4. Broadcasting
Broadcasting allows NumPy to apply operations between arrays of different shapes.
\`\`\`python
M = np.ones((3, 3))      # 3x3 matrix
v = np.array([1, 2, 3])  # 1D vector (shape: (3,))

# NumPy broadcasts v to every row of M
result = M + v           # [[2,3,4],[2,3,4],[2,3,4]]
\`\`\`

## 5. Indexing and Slicing
\`\`\`python
M = np.arange(12).reshape(3, 4)
# [[0,1,2,3],[4,5,6,7],[8,9,10,11]]

M[0, :]      # First row:  [0, 1, 2, 3]
M[:, 2]      # Third column: [2, 6, 10]
M[1:, 1:3]   # Submatrix: [[5,6],[9,10]]

# Boolean indexing
M[M > 5]     # All elements > 5: [6, 7, 8, 9, 10, 11]
\`\`\`

## 6. Linear Algebra
\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

A @ B        # Matrix multiplication (dot product)
A.T          # Transpose
np.linalg.det(A)    # Determinant
np.linalg.inv(A)    # Matrix inverse
np.linalg.eig(A)    # Eigenvalues and eigenvectors
\`\`\`
`,
    fullNotes: `
# Detailed Notes: NumPy

- **Views vs Copies:** NumPy slicing returns a **view**, not a copy. Modifying the slice modifies the original array. Use \`.copy()\` to create an independent copy: \`sub = M[0, :].copy()\`.
- **dtype matters for ML:** ML models typically use \`float32\` (not Python's default \`float64\`) to halve memory usage and accelerate GPU computation. Always check and convert: \`arr.astype(np.float32)\`.
- **Structured Arrays vs Record Arrays:** For mixed-type tabular data, prefer Pandas. NumPy structured arrays are available but cumbersome.
`,
    shortNotes: `
- ndarray: Contiguous, single-typed memory block. Completely different from a Python list.
- All elements in an ndarray must have the same dtype.
- Vectorized operations apply to all elements simultaneously via C/Fortran loops (100x faster than Python loops).
- Broadcasting rules: dimensions must be equal or one of them must be 1.
- Slicing returns a view (not a copy) — modifying the slice modifies the original.
- Use float32 dtype for ML/GPU workloads to halve memory usage.
`,
    cheatSheet: `
### NumPy Shape Quick Reference
\`\`\`python
a.shape        # Tuple of dimension sizes
a.reshape(r,c) # Change shape without changing data
a.flatten()    # Collapse to 1D (always a copy)
a.ravel()      # Collapse to 1D (view if possible)
np.expand_dims(a, axis=0)  # Insert new axis
a.squeeze()    # Remove size-1 dimensions
a.T            # Transpose (view)
\`\`\`
`,
    interviewQuestions: [
      { question: 'Explain NumPy broadcasting and provide an example.', answerHint: 'Broadcasting is NumPy\'s mechanism for performing element-wise operations between arrays of different shapes without creating additional copies of data. The rule is: NumPy compares shapes element-wise from the trailing dimensions. Two dimensions are compatible if they are equal or if one of them is 1. The dimension of size 1 is "broadcast" (virtually stretched) to match the other. For example, adding a (3,3) matrix and a (3,) vector works because the vector is broadcast across each of the 3 rows.', type: 'TECHNICAL' },
      { question: 'What is the difference between a NumPy view and a copy?', answerHint: 'A view is a new ndarray object that references the same underlying memory data as the original array. Modifying a view modifies the original. Basic slicing in NumPy always returns a view. A copy is an independent array with its own separate memory. Modifying a copy does not affect the original. You can force a copy with array.copy(). Understanding this distinction is critical to avoiding hard-to-debug mutations in numerical data pipelines.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'NumPy Official Documentation', url: 'https://numpy.org/doc/stable/', type: 'ARTICLE', priority: 'S', source: 'numpy.org', isOfficial: true, description: 'The complete NumPy reference and user guide.' },
      { title: 'NumPy Crash Course', url: 'https://www.youtube.com/watch?v=9JUAPgtkKpI', type: 'VIDEO', priority: 'S', source: 'Nicholas Renotte', isOfficial: false, description: 'Comprehensive NumPy tutorial covering arrays, broadcasting, and linear algebra.' }
    ]
  }
};
