# Air Quality Classification

This project provides a fullstack machine learning application to classify air quality as either "Good" or "Bad" based on various environmental and geographical inputs. It consists of a React frontend UI and a FastAPI backend that serves predictions using a pre-trained Random Forest model.

## 📂 Project Structure

- **`Air Quality Classification UI/`**: The React/Vite frontend application that provides a user-friendly web interface for inputting data and viewing predictions.
- **`Air-Quality-Classification/`**: The Python FastAPI backend service. It exposes the `/predict` REST endpoint, handles CORS, and automatically downloads the necessary `.pkl` ML models on startup.
- **`ProjectPattern.ipynb`**: A Jupyter Notebook detailing the data exploration, feature engineering, preprocessing, and the training workflow for the Random Forest model.
- **`Presentation.md`**: Project presentation and overview documentation.

## 🚀 Setup and Installation

This project is divided into two parts: the frontend UI and the backend API. You will need to run both to fully experience the application.

### 1. Backend API (FastAPI)

The backend serves the ML model predictions and runs on port `7860`.

**Option A: Using Docker (Recommended)**
```bash
cd Air-Quality-Classification
docker build -t air-quality-api .
docker run -p 7860:7860 air-quality-api
```

**Option B: Using Python Virtual Environment**
```bash
cd Air-Quality-Classification
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 7860 --reload
```
The API will be running at `http://localhost:7860`. The interactive API documentation is available at `http://localhost:7860/docs`.

*(Note: On the first run, the backend will automatically download the necessary model files (`scaler.pkl`, `pca.pkl`, `random_forest_model.pkl`) from Google Drive).*

### 2. Frontend UI (React)

The frontend is a Vite-based React application that communicates with the backend.

```bash
cd "Air Quality Classification UI"
npm install
npm run dev
```

This will start a local development server. Open your browser and navigate to the URL provided in the terminal (usually `http://localhost:5173`) to interact with the application.

## 🧠 Under the Hood (Machine Learning)

The predictive pipeline applies the following transformations to the user inputs:
1. **Scaling**: Formats and scales features utilizing a pre-trained `StandardScaler`.
2. **Dimensionality Reduction**: Applies Principal Component Analysis (PCA) to transform features into the reduced space trained on the original variables.
3. **Inference**: Feeds the resulting data to the `Random Forest Classifier` to yield the final "Good" or "Bad" classification.

To see how the models were trained, refer to `ProjectPattern.ipynb`.
