# 🧠 Alzheimer's Disease Detection & Explainable AI (Grad-CAM)

[![Python 3.13+](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/)
[![PyTorch 2.x](https://img.shields.io/badge/PyTorch-2.x-ee4c2c.svg)](https://pytorch.org/)
[![FastAPI 0.140+](https://img.shields.io/badge/FastAPI-0.140+-009688.svg)](https://fastapi.tiangolo.com/)
[![React 18](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![Vite 6](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS 3.4](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

An end-to-end deep learning framework and modern web platform designed for early-stage diagnosis of **Alzheimer's Disease** using brain Magnetic Resonance Imaging (MRI) scans. The platform integrates a fine-tuned **ResNet-18** deep convolutional neural network with **Explainable AI (Grad-CAM)** to visually highlight key brain regions driving diagnostic decisions, enabling interpretable computer-aided clinical assistance.

---

## ✨ Key Features

- 🔬 **4-Stage Multi-Class Dementia Classification**: Accurately classifies brain MRI scans into four clinical stages:
  - `NonDemented` (Normal brain structures)
  - `VeryMildDemented` (Initial stage subtle changes)
  - `MildDemented` (Noticeable structural atrophy)
  - `ModerateDemented` (Advanced cortical & hippocampal atrophy)
- 🧠 **Fine-Tuned ResNet-18 Backbone**: Utilizes transfer learning with un-frozen `layer4` convolutional blocks and a customized fully connected classifier head for optimal feature extraction and high-confidence predictions.
- 🔥 **Explainable AI (Grad-CAM)**: Computes Gradient-weighted Class Activation Maps over `model.layer4[-1]` forward/backward hooks, generating heatmaps overlaid on MRI scans to visually pinpoint regions of interest.
- ⚡ **High-Performance FastAPI Backend**: Asynchronous REST API serving real-time model inference, health monitoring, custom exception handling, and static heatmap asset delivery.
- 🎨 **Modern React Dashboard**: Sleek web application built with React 18, Vite, Tailwind CSS, Framer Motion, and Recharts, featuring drag-and-drop MRI upload, dynamic probability breakdown charts, and dual-pane image/heatmap comparisons.

---

## 📊 Dataset Overview

The model is trained and validated on a balanced dataset of structural brain MRI slice images preprocessed and split across four dementia stages:

| Dementia Stage | Class Name | Sample Count | Percentage |
| :--- | :--- | :--- | :--- |
| **Non Demented** | `NonDemented` | 12,800 | 29.1% |
| **Very Mild Demented** | `VeryMildDemented` | 11,200 | 25.5% |
| **Mild Demented** | `MildDemented` | 10,000 | 22.7% |
| **Moderate Demented** | `ModerateDemented` | 10,000 | 22.7% |
| **Total Images** | — | **44,000** | **100%** |

---

## 🏗️ Project Architecture

```
alzheimers_disease_detection/
├── app/                      # FastAPI Backend Application
│   ├── main.py               # API entry point, CORS & static file mounting
│   ├── routes.py             # Endpoint declarations (/predict, /health, /)
│   ├── predictor.py          # Model inference wrapper & Grad-CAM pipeline
│   ├── schemas.py            # Pydantic data schemas & response validation
│   └── exceptions.py         # Custom HTTP exception handling logic
│
├── checkpoints/              # Model Checkpoints
│   └── best_fine_tune_model.pth # Saved PyTorch fine-tuned model weights
│
├── src/                      # Core Machine Learning & Data Pipeline
│   ├── config/               # System configurations, paths & label mappings
│   ├── data/                 # Dataset loaders, augmentation transforms & data splitters
│   ├── evaluation/           # Model testing & performance evaluation metrics
│   ├── inference/            # Prediction engine & Grad-CAM visualizer engine
│   ├── models/               # ResNet-18 neural network architecture definition
│   ├── training/             # Loss tracking, validation & training loops
│   └── utils/                # General helper utilities
│
├── frontend/                 # React + Vite Frontend Application
│   ├── src/
│   │   ├── components/       # UploadCard, HeatmapViewer, PredictionCard, ProbabilityChart
│   │   ├── pages/            # Main layout and dashboard views
│   │   ├── services/         # Axios API HTTP client integrations
│   │   └── App.jsx           # Core UI router & layout component
│   ├── package.json          # Frontend Node dependencies & scripts
│   └── vite.config.js        # Vite dev server configuration & proxy settings
│
├── outputs/                  # Generated Grad-CAM heatmaps (served statically)
├── uploads/                  # Temporary image file uploads
├── test/                     # Automated unit and integration test suite
├── for_training.py           # Training and evaluation entry-point script
├── pyproject.toml            # Python package specifications & dependencies
└── README.md                 # Project documentation
```

---

## 🛠️ Technology Stack

| Layer | Technology / Library |
| :--- | :--- |
| **Deep Learning** | PyTorch 2.x, Torchvision, NumPy, OpenCV, Matplotlib |
| **Backend API** | FastAPI, Uvicorn, Pydantic, Python-Multipart |
| **Frontend UI** | React 18, Vite 6, Tailwind CSS 3.4, Framer Motion, Recharts, Axios |
| **Package Management** | `uv` / `pip` (Python), `npm` (Node.js) |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Python**: `3.13+`
- **Node.js**: `18.0+`
- **Package Manager**: `uv` (recommended) or `pip`

---

### Backend Setup (FastAPI)

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/jaiathiyaa/Alzheimer-Diseases-Detection.git
   cd alzheimers_disease_detection
   ```

2. **Install Python Dependencies**:
   Using `uv` (Fast & recommended):
   ```bash
   uv sync
   ```
   Or using standard `pip`:
   ```bash
   pip install -e .
   ```

3. **Verify Model Checkpoint**:
   Ensure the trained PyTorch model weights exist at:
   ```
   checkpoints/best_fine_tune_model.pth
   ```

4. **Launch the FastAPI Server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   - API Root: `http://localhost:8000`
   - Interactive Swagger Docs: `http://localhost:8000/docs`

---

### Frontend Setup (React + Vite)

1. **Navigate to Frontend Directory**:
   ```bash
   cd frontend
   ```

2. **Install Node Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   - Application URL: `http://localhost:5173`

---

## 🔌 API Reference

### `GET /`
- **Description**: Verifies if the API is active.
- **Response**:
  ```json
  {
    "message": "Alzheimer Disease Detection API is running!"
  }
  ```

### `GET /health`
- **Description**: Health status check for monitoring services.
- **Response**:
  ```json
  {
    "status": "healthy"
  }
  ```

### `POST /predict`
- **Description**: Accepts an uploaded brain MRI image file, executes model inference, and returns dementia stage classification with Grad-CAM heatmap location.
- **Payload**: `multipart/form-data` with key `file` (Image format `.jpg`, `.png`, `.jpeg`).
- **Sample Response**:
  ```json
  {
    "prediction": "VeryMildDemented",
    "confidence": 94.65,
    "probabilities": {
      "MildDemented": 3.12,
      "ModerateDemented": 0.45,
      "NonDemented": 1.78,
      "VeryMildDemented": 94.65
    },
    "heatmap": "/outputs/a4a80d3da58449b78f6495a712f56d7f.jpg"
  }
  ```

---

## 🏋️ Model Training & Evaluation Pipeline

To train or re-evaluate the ResNet-18 model on a custom MRI dataset:

1. **Prepare Dataset**: Place slice images inside `data/combined_images/` structured into class subdirectories.
2. **Execute Training Script**:
   ```bash
   python for_training.py
   ```

### Hyperparameter Configuration:
- **Architecture**: Fine-Tuned `ResNet-18` (Pre-trained ImageNet weights)
- **Trainable Layers**: Un-frozen `layer4` + Custom Fully Connected Linear Head (`in_features -> 4`)
- **Optimizer**: Adam ($\text{lr} = 10^{-4}$, $\text{weight\_decay} = 10^{-4}$)
- **Loss Function**: `nn.CrossEntropyLoss()`
- **LR Scheduler**: `ReduceLROnPlateau(mode='max', factor=0.5, patience=2)`
- **Batch Size**: `32`
- **Input Image Size**: `224x224` (Normalized with ImageNet mean and std)

---

## 🔬 Explainable AI (Grad-CAM) Details

Grad-CAM (Gradient-weighted Class Activation Mapping) produces visual explanations for decisions made by the CNN:
1. **Hook Registration**: Registers forward and backward hooks on `model.model.layer4[-1]`.
2. **Gradient Computation**: Calculates the gradients of the target class score with respect to feature map activations of the last convolutional layer.
3. **Global Average Pooling**: Computes importance weights ($\alpha_k^c$) by pooling spatial gradients.
4. **Heatmap Generation**: Performs a weighted combination of forward activation maps followed by a ReLU operation to preserve positive features.
5. **Overlay & Rendering**: Resizes heatmap to `224x224`, applies `COLORMAP_JET`, and overlays onto original MRI image with $\alpha = 0.4$ transparency.

---

## 🧪 Testing & Verification

Run automated integration and unit test suites:

```bash
# Run prediction pipeline test
python -m unittest test/test_predict.py

# Run dataset split disjointness test
python -m unittest test/test_disjoint.py
```

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.