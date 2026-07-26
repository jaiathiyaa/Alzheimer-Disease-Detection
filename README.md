# 🧠 Alzheimer's Disease Detection & Explainable AI (Grad-CAM)

[![Python 3.13+](https://img.shields.io/badge/python-3.13+-blue.svg)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-2.x-ee4c2c.svg)](https://pytorch.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.140+-009688.svg)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646cff.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8.svg)](https://tailwindcss.com/)

An end-to-end deep learning framework and web application designed for early stage diagnosis of **Alzheimer's Disease** using brain Magnetic Resonance Imaging (MRI) scans. The platform integrates a fine-tuned **ResNet-18** deep convolutional network with **Explainable AI (Grad-CAM)** to visually highlight key brain regions driving diagnostic decisions.

---

## ✨ Features

- 🔬 **4-Stage Multi-Class Classification**: Accurately classifies brain MRI scans into four clinical dementia stages:
  - `NonDemented`
  - `VeryMildDemented`
  - `MildDemented`
  - `ModerateDemented`
- 🧠 **ResNet-18 Neural Network**: Leverages a pre-trained ResNet-18 architecture with un-frozen `layer4` and custom fully connected classification head for optimal feature extraction.
- 🔥 **Grad-CAM Visualizations**: Generates Gradient-weighted Class Activation Maps overlaid on input scans, allowing medical professionals to inspect regions of interest (e.g., cortical thinning, hippocampal atrophy).
- ⚡ **FastAPI Backend**: Asynchronous REST API serving predictions, health metrics, and static visual heatmap artifacts.
- 🎨 **Modern Web Dashboard**: Feature-packed React SPA powered by Vite, Tailwind CSS, Framer Motion, and Recharts for interactive probability visualization and dual-pane heatmap comparison.

---

## 📊 Dataset Overview

The dataset consists of preprocessed structural brain MRI slice images balanced across four stages:

| Dementia Stage | Sample Count |
| :--- | :--- |
| **Non Demented** | 12,800 |
| **Very Mild Demented** | 11,200 |
| **Mild Demented** | 10,000 |
| **Moderate Demented** | 10,000 |
| **Total Images** | **44,000** |

---

## 🏗️ Project Architecture

```
alzheimers_disease_detection/
├── app/                      # FastAPI Backend Application
│   ├── main.py               # Application entry point & CORS configuration
│   ├── routes.py             # API Endpoints (/predict, /health, /)
│   ├── predictor.py          # Model inference & Grad-CAM integration wrapper
│   ├── schemas.py            # API Pydantic response models
│   └── exceptions.py         # Custom exception handlers
│
├── checkpoints/              # Saved PyTorch Model Weights (.pth)
│   └── best_fine_tune_model.pth
│
├── src/                      # Core Machine Learning Pipeline
│   ├── config/               # Paths & class name constants
│   ├── data/                 # Dataset loader, transforms, & split script
│   ├── evaluation/           # Model testing & evaluation metrics
│   ├── inference/            # Prediction logic & Grad-CAM visualizer
│   ├── models/               # ResNet-18 model architecture definition
│   ├── training/             # Model training loops
│   └── utils/                # Helper utilities
│
├── frontend/                 # React + Vite Web Application
│   ├── src/
│   │   ├── components/       # UploadCard, HeatmapViewer, PredictionCard, charts
│   │   ├── pages/            # Home page view
│   │   ├── services/         # Axios API connection client
│   │   └── App.jsx           # Root UI layout component
│   ├── package.json          # Node dependencies
│   └── vite.config.js        # Vite dev server configuration
│
├── outputs/                  # Generated Grad-CAM heatmaps (API served)
├── uploads/                  # Temporary image uploads
├── test/                     # Integration and disjoint unit tests
├── for_training.py           # Training and evaluation runner script
├── pyproject.toml            # Python package & dependency specifications
└── README.md                 # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

- **Python**: `3.13+`
- **Node.js**: `18.0+`
- **Package Managers**: `uv` or `pip` for Python, `npm` for Node.js.

---

### Backend Setup (FastAPI)

1. **Clone the repository** (if not already done):
   ```bash
   git clone https://github.com/your-username/alzheimers-disease-detection.git
   cd alzheimers-disease-detection
   ```

2. **Install Python dependencies**:
   Using `uv` (recommended):
   ```bash
   uv sync
   ```
   Or using standard `pip`:
   ```bash
   pip install -e .
   ```

3. **Ensure Model Checkpoint is present**:
   Verify that your trained model weight file is placed at:
   `checkpoints/best_fine_tune_model.pth`

4. **Start the FastAPI backend server**:
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```
   The backend API will run at `http://localhost:8000`. You can inspect the interactive OpenAPI documentation at `http://localhost:8000/docs`.

---

### Frontend Setup (React + Vite)

1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the Vite development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser to view the application.

---

## 🔌 API Reference

### `GET /`
- **Description**: Returns welcome status message.
- **Response**: `{"message": "Alzheimer Disease Detection API is running!"}`

### `GET /health`
- **Description**: Health check endpoint.
- **Response**: `{"status": "healthy"}`

### `POST /predict`
- **Description**: Upload a brain MRI image file to classify dementia stage and generate Grad-CAM heatmap.
- **Payload**: `multipart/form-data` with `file` (image file).
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

## 🏋️ Model Training & Evaluation

To train or evaluate the ResNet-18 model on your custom dataset:

1. Place your dataset directory inside `data/combined_images/`.
2. Configure training parameters in `for_training.py`.
3. Run the training script:
   ```bash
   python for_training.py
   ```

Key Hyperparameters:
- **Optimizer**: Adam ($\text{lr} = 10^{-4}$, $\text{weight\_decay} = 10^{-4}$)
- **Loss Function**: `CrossEntropyLoss`
- **Learning Rate Scheduler**: `ReduceLROnPlateau(factor=0.5, patience=2)`
- **Batch Size**: 32

---

## 🧪 Running Tests

Execute test suites for model disjointness and prediction logic:

```bash
python -m unittest test/test_predict.py
python -m unittest test/test_disjoint.py
```

---

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).