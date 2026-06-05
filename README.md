# JutePest Detector 🌿

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](#)
[![Python Version](https://img.shields.io/badge/python-3.12-blue.svg)](#)
[![React Version](https://img.shields.io/badge/react-18.3-orange.svg)](#)
[![Conference Paper](https://img.shields.io/badge/IEEE-10723939-blue.svg)](https://ieeexplore.ieee.org/document/10723939)

JutePest Detector is a high-performance web platform designed to automatically classify Jute crop pests and explain predictions using Explainable AI (XAI). The system utilizes an **Improved VGG-19 base model** to detect **18 categories of jute pests** with a validation accuracy of **92%**, and visualizes inference triggers using **LIME** (Local Interpretable Model-agnostic Explanations).

This repository houses the refactored, modernized codebase presenting our research from the 2024 International Conference on Computing Communication and Networking Technologies (ICCCNT).

---

## 🏗️ Architecture

Here is the system architecture diagram illustrating the workflow of the JutePest Detector:

![Architecture Diagram](./Blank%20diagram.png)

---

## ✨ Key Features

* **High-Accuracy Classification:** Powered by an improved VGG-19 CNN model trained to classify 18 categories of Jute pests.
* **Explainable AI (LIME):** Perturbates the input image 1000 times to map the exact superpixels that triggered the AI decision, coloring positive correlations in green.
* **Organic Design UI:** A responsive, wabi-sabi themed interface leveraging moss green and terracotta colors, paper-grain noise overlays, and comfortable touch targets.
* **Light & Dark Themes:** Adapts from light Rice Paper (`#FDFCF8`) to a dark Pine Charcoal (`#151813`) theme with customized soft-tinted shadows.
* **Local Pest Registry:** Exposes symptoms, descriptions, and treatment recommendations instantly upon classification.

---

## 🚀 How to Get Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [Python](https://www.python.org/) (v3.12+)

### 1. Setup Backend Server

1. Navigate to the root directory:
   ```bash
   cd JutePestDetectionWeb
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv backend/env
   
   # Windows (PowerShell)
   .\backend\env\Scripts\activate
   
   # macOS / Linux
   source backend/env/bin/activate
   ```
3. Install Python dependencies:
   ```bash
   pip install -r backend/requirements.txt
   ```
4. Place your trained model file (`best_model_VGG_92.h5`) in `backend/model/`.
5. Start the FastAPI server on port 3000:
   ```bash
   uvicorn backend.app.main:app --port 3000 --reload
   ```

### 2. Setup Frontend Client

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install npm packages:
   ```bash
   npm install
   ```
3. Launch the Vite client:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

---

## 🧪 Model Details & Output Format

### API Prediction Response
When you upload an image, the `POST /api/predict` endpoint returns the following payload:
```json
{
  "pest": "Jute Hairy",
  "confidence": 94.6,
  "explanation": "data:image/png;base64,iVBORw0K...",
  "status": "success"
}
```

### Supported Jute Pests (18 Classes)
- Beet Armyworm
- Black Hairy
- Cutworm
- Field Cricket
- Jute Aphid
- Jute Hairy
- Jute Leafhopper
- Jute Red Mite
- Jute Semilooper
- Jute Stem Girdler
- Jute Stem Weevil
- Leaf Beetle
- Mealybug
- Pod Borer
- Scopula Emissaria
- Termite
- Termite odontotermes (Rambur)
- Yellow Mite

---

## 📚 Publications & Citations

If you use this model or system in your academic research, please cite our conference paper:

> **Bragadeeshwaran C, Sairam R, Aishwarya A, Rajalakshmi Shenbaga Moorthy.** *"A Novel Approach for Jute Pest Detection Using Improved VGG-19 and XAI"* in Proceedings of the 2024 15th International Conference on Computing Communication and Networking Technologies (ICCCNT). 
> **DOI:** [10.1109/ICCCNT61001.2024.10723939](https://doi.org/10.1109/ICCCNT61001.2024.10723939)

---

## 🤝 Contributing & Support

- **Help:** For bugs or inquiries, open an issue in this repository or contact the project maintainers.
- **Contributions:** Feel free to fork this project, open PRs, or check out our contribution guidelines.

*Developed with care for explainable agriculture.*
