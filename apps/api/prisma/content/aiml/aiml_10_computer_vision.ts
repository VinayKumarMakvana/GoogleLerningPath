export const aiml_10_computer_vision = {
  COMPUTER_VISION: {
    title: 'Computer Vision',
    description: 'Master image representation, CNNs, transfer learning, image classification, and object detection foundations.',
    difficulty: 'ADVANCED',
    estimatedLearnTime: 90,
    prerequisites: ['PyTorch', 'Deep Learning Foundations'],
    learningContent: `
# Computer Vision

## 1. Image Representation
An image is a rank-3 tensor: [Height × Width × Channels] (HWC) or [Channels × Height × Width] (CHW in PyTorch).
- Grayscale: 1 channel
- RGB: 3 channels
- Each pixel value ∈ [0, 255] → normalized to [0, 1] or standardized

\`\`\`python
from torchvision import transforms

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),       # Data augmentation
    transforms.ColorJitter(brightness=0.2),  # Data augmentation
    transforms.ToTensor(),                   # PIL/numpy [0,255] → tensor [0,1]
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])  # ImageNet stats
])
\`\`\`

## 2. Convolutional Neural Networks (CNNs)
CNNs exploit spatial structure: nearby pixels are related (translation equivariance).

**Convolution operation:** slide a small filter (kernel) over the image, computing dot products at each position.
- Kernel size: 3×3, 5×5, 7×7
- Stride: how many pixels to skip between positions
- Padding: add zeros around the border to preserve spatial size

\`\`\`python
import torch.nn as nn

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=3, padding=1),  # 3 channels → 32 feature maps
            nn.BatchNorm2d(32),
            nn.ReLU(),
            nn.MaxPool2d(2),                              # Halve spatial dims
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.BatchNorm2d(64),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.AdaptiveAvgPool2d(1),           # Global average pooling
            nn.Flatten(),
            nn.Linear(64, num_classes)
        )

    def forward(self, x):
        return self.classifier(self.features(x))
\`\`\`

## 3. Transfer Learning
Pre-train on large dataset (ImageNet, 1.2M images) → fine-tune on small target dataset.
\`\`\`python
import torchvision.models as models

# Load pretrained ResNet50
model = models.resnet50(weights='IMAGENET1K_V2')

# Freeze all layers except the final classifier
for param in model.parameters():
    param.requires_grad = False

# Replace the final layer for your number of classes
model.fc = nn.Linear(model.fc.in_features, num_classes)

# Only optimize the new head
optimizer = torch.optim.Adam(model.fc.parameters(), lr=1e-3)
\`\`\`

## 4. Object Detection (Conceptual)
Beyond classification: predict both the **class** and **bounding box** of each object.

**YOLO (You Only Look Once):** Single-pass detection — divide image into grid, each cell predicts bounding boxes + class probabilities. Extremely fast.

**Two-stage detectors (Faster R-CNN):** First propose candidate regions (Region Proposal Network), then classify each region. Slower but more accurate.

**Key metrics:** mAP (mean Average Precision), IoU (Intersection over Union) for bounding box quality.
`,
    fullNotes: `
# Detailed Notes: Computer Vision

- **MaxPool vs AvgPool vs GlobalAvgPool:** MaxPool retains the most prominent feature in a region (good for feature detection). AvgPool computes the average (smoother). Global Average Pooling (GAP) replaces the flatten + fully-connected layers with a single average per feature map — drastically reduces parameters and overfitting.
- **ResNet (He et al., 2015):** Introduced skip/residual connections F(x)+x, enabling training of 152-layer networks. Key insight: adding an identity mapping makes it easy for layers to learn "no change" (identity), avoiding degradation.
- **EfficientNet:** Systematically scales width, depth, and resolution together using a compound scaling coefficient, achieving state-of-the-art accuracy/efficiency.
`,
    shortNotes: `
- Image tensor: [C×H×W] in PyTorch. Always normalize with dataset statistics.
- Conv2d: learn local spatial filters. Kernel slides over the image.
- MaxPool2d: downsample (halve spatial size). Adds translation invariance.
- Transfer learning: freeze pre-trained backbone, train new classifier head.
- Use ImageNet pretrained models for most vision tasks (ResNet, EfficientNet).
- Data augmentation: random flips, crops, color jitter → prevents overfitting.
- IoU: bounding box overlap metric. mAP: object detection performance metric.
`,
    cheatSheet: `
### CNN Architecture Template
\`\`\`python
# Feature extraction backbone
Conv2d → BatchNorm2d → ReLU → MaxPool2d  (×N layers)

# Classifier head
AdaptiveAvgPool2d(1) → Flatten → Dropout → Linear(num_classes)
\`\`\`

### Transfer Learning Strategy
| Target Dataset | Strategy |
|---------------|---------|
| Small + Similar | Freeze all, train head only |
| Small + Different | Freeze early layers, fine-tune later layers + head |
| Large + Any | Fine-tune entire model (low LR for backbone, high LR for head) |
`,
    interviewQuestions: [
      { question: 'What makes CNNs suitable for image processing compared to fully-connected networks?', answerHint: 'CNNs exploit two properties of images: (1) Local connectivity — nearby pixels are correlated; a 3×3 filter captures local patterns efficiently. A fully-connected layer on a 224×224 image would require 150k+ parameters per neuron, while a 3×3 conv filter has only 9 parameters that are shared across the image. (2) Translation equivariance — the same pattern (e.g., a horizontal edge) looks the same regardless of where it appears. CNNs detect it everywhere with the same filter, while FC networks would need to relearn the pattern for each position.', type: 'TECHNICAL' },
      { question: 'What is transfer learning and why does it work?', answerHint: 'Transfer learning reuses a model trained on a large source task (ImageNet) on a smaller target task. It works because lower layers of CNNs learn generic features (edges, textures, colors) that are universally useful across visual tasks, regardless of the specific domain. Only the higher layers and final classifier are task-specific. By freezing the pretrained backbone and only training the new head, we get good performance with far less data and compute. Fine-tuning (slightly updating all layers with a low learning rate) pushes performance further when more target data is available.', type: 'TECHNICAL' }
    ],
    resources: [
      { title: 'torchvision documentation', url: 'https://pytorch.org/vision/stable/index.html', type: 'ARTICLE', priority: 'S', source: 'PyTorch', isOfficial: true, description: 'Official torchvision models, datasets, and transforms.' },
      { title: 'Deep Learning for Computer Vision (Michigan)', url: 'https://www.youtube.com/playlist?list=PL5-TkQAfAZFbzxjBHtzdVCWE0Zbhomg7r', type: 'VIDEO', priority: 'S', source: 'Michigan / Justin Johnson', isOfficial: false, description: 'The best advanced computer vision course on YouTube.' }
    ]
  }
};
