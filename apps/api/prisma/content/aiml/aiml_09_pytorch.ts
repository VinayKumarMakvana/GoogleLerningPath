export const aiml_09_pytorch = {
  PYTORCH: {
    title: 'PyTorch',
    description: 'Master PyTorch tensors, autograd, datasets, training loops, optimizers, GPU training, and debugging.',
    difficulty: 'INTERMEDIATE',
    estimatedLearnTime: 90,
    prerequisites: ['Deep Learning Foundations', 'NumPy & Scientific Computing'],
    learningContent: `
# PyTorch

PyTorch is the dominant deep learning framework in research and increasingly in production.

## 1. Tensors
\`\`\`python
import torch

# Create tensors
x = torch.tensor([[1.0, 2.0], [3.0, 4.0]])
x = torch.zeros(3, 4)
x = torch.randn(2, 3)            # Standard normal

# GPU transfer
device = 'cuda' if torch.cuda.is_available() else 'cpu'
x = x.to(device)

# Tensor operations (same as NumPy)
x.shape          # torch.Size([2, 3])
x.dtype          # torch.float32
x + y            # Element-wise
x @ y            # Matrix multiply
x.T              # Transpose
x.reshape(6)     # Reshape
x.numpy()        # Convert to numpy (CPU only)
\`\`\`

## 2. Autograd (Automatic Differentiation)
\`\`\`python
x = torch.tensor([2.0], requires_grad=True)
y = x**2 + 3*x + 1          # y = x² + 3x + 1
y.backward()                  # Compute dy/dx = 2x + 3
print(x.grad)                 # tensor([7.]) — correct!

# In practice: use .zero_grad() before each backward pass
optimizer.zero_grad()
loss.backward()
optimizer.step()
\`\`\`

## 3. Building Models
\`\`\`python
import torch.nn as nn

class MLP(nn.Module):
    def __init__(self, input_dim, hidden_dim, output_dim):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(input_dim, hidden_dim),
            nn.BatchNorm1d(hidden_dim),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(hidden_dim, output_dim)
        )

    def forward(self, x):
        return self.net(x)

model = MLP(128, 256, 10).to(device)
\`\`\`

## 4. Datasets and DataLoaders
\`\`\`python
from torch.utils.data import Dataset, DataLoader

class MyDataset(Dataset):
    def __init__(self, X, y):
        self.X = torch.FloatTensor(X)
        self.y = torch.LongTensor(y)

    def __len__(self):
        return len(self.y)

    def __getitem__(self, idx):
        return self.X[idx], self.y[idx]

train_loader = DataLoader(MyDataset(X_train, y_train), batch_size=64, shuffle=True, num_workers=4)
\`\`\`

## 5. The Training Loop
\`\`\`python
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-3, weight_decay=1e-2)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=num_epochs)
criterion = nn.CrossEntropyLoss()

for epoch in range(num_epochs):
    # Training phase
    model.train()
    for X_batch, y_batch in train_loader:
        X_batch, y_batch = X_batch.to(device), y_batch.to(device)
        optimizer.zero_grad()
        outputs = model(X_batch)
        loss = criterion(outputs, y_batch)
        loss.backward()
        torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)  # Gradient clipping
        optimizer.step()

    # Validation phase
    model.eval()
    with torch.no_grad():
        for X_batch, y_batch in val_loader:
            outputs = model(X_batch.to(device))
            # Compute val metrics

    scheduler.step()

# Save checkpoint
torch.save({'epoch': epoch, 'model_state_dict': model.state_dict(), 'optimizer_state_dict': optimizer.state_dict()}, 'checkpoint.pt')
\`\`\`

## 6. Mixed Precision Training
\`\`\`python
scaler = torch.cuda.amp.GradScaler()
with torch.autocast(device_type='cuda', dtype=torch.float16):
    outputs = model(X_batch)
    loss = criterion(outputs, y_batch)
scaler.scale(loss).backward()
scaler.step(optimizer)
scaler.update()
\`\`\`
Mixed precision uses float16 for compute (2x speed, 2x memory savings) and float32 for optimizer state.
`,
    fullNotes: `
# Detailed Notes: PyTorch

- **torch.no_grad() vs model.eval():** They do different things. torch.no_grad() disables gradient computation (saves memory and compute during inference). model.eval() changes the behavior of BatchNorm (uses running statistics instead of batch statistics) and Dropout (disabled). Always use BOTH during evaluation.
- **DataLoader num_workers:** Spawns background processes to prefetch data. On Windows, use num_workers=0 or guard with if __name__ == '__main__'. On Linux, 4–8 workers typically saturate a GPU.
`,
    shortNotes: `
- tensor.to(device): move tensors to GPU. Always move model AND data.
- requires_grad=True: track computations for autograd
- optimizer.zero_grad() before each backward — PyTorch accumulates gradients by default
- model.train() / model.eval(): switch BatchNorm/Dropout behavior
- torch.no_grad(): disable gradient tracking for inference (saves memory)
- DataLoader: shuffle=True for training, False for validation
- Save/load with torch.save / torch.load (state_dict is preferred over full model)
`,
    cheatSheet: `
### PyTorch Training Loop Template
\`\`\`python
for epoch in range(epochs):
    model.train()
    for X, y in train_loader:
        X, y = X.to(device), y.to(device)
        optimizer.zero_grad()
        loss = criterion(model(X), y)
        loss.backward()
        optimizer.step()

    model.eval()
    with torch.no_grad():
        val_loss = sum(criterion(model(X.to(device)), y.to(device)) for X, y in val_loader)
    print(f"Epoch {epoch}: val_loss={val_loss/len(val_loader):.4f}")
\`\`\`
`,
    interviewQuestions: [
      { question: 'What is the difference between model.eval() and torch.no_grad()?', answerHint: 'model.eval() changes the behavior of specific layers: BatchNorm switches from using batch statistics to its running (training-time) statistics, and Dropout is disabled (all neurons active, activations scaled). torch.no_grad() disables the autograd engine for all operations inside the context, saving memory and compute by not building the computational graph. Both are needed during inference: model.eval() for correct layer behavior and torch.no_grad() for efficiency. They are completely orthogonal.', type: 'TECHNICAL' },
      { question: 'Why do we call optimizer.zero_grad() before backward()?', answerHint: 'PyTorch accumulates gradients by default — each call to backward() adds the new gradients to the existing .grad tensors without clearing them. This is useful for gradient accumulation (training with effective large batches when memory is limited). But for a standard training step, you want fresh gradients for each batch. Calling zero_grad() before backward() resets all gradients to zero, ensuring each batch computes its own clean gradient estimate.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'PyTorch Official Tutorials', url: 'https://pytorch.org/tutorials/', type: 'ARTICLE', priority: 'S', source: 'PyTorch', isOfficial: true, description: 'Official PyTorch tutorials from basics to advanced.' },
      { title: 'PyTorch for Deep Learning Full Course', url: 'https://www.youtube.com/watch?v=Z_ikDlimN6A', type: 'VIDEO', priority: 'S', source: 'freeCodeCamp / Daniel Bourke', isOfficial: false, description: 'Comprehensive PyTorch course covering fundamentals to deployment.' }
    ]
  }
};
