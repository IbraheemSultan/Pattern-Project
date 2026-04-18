# Air Quality Classification

This project provides a machine learning-based approach to classify air quality as either "Good" or "Bad" based on various environmental and geographical inputs. It features a simple user-friendly Streamlit web application that serves the predictions using a pre-trained Random Forest model.

## Project Structure

- `App.py`: The main Streamlit web application script that handles user inputs and provides predictions.
- `ProjectPattern.ipynb`: A Jupyter Notebook containing the data exploration, preprocessing, and model training workflow.
- `epa_air_quality_annual_summary.csv`: The primary dataset containing over 2 million records across 55 initial columns of EPA (Environmental Protection Agency) data.
- `random_forest_model.pkl`: The saved trained Random Forest classifier.
- `scaler.pkl`: The fitted scaler used for normalizing numerical inputs.
- `pca.pkl`: The fitted PCA (Principal Component Analysis) model used for dimensionality reduction.

## Setup and Installation

1. **Clone or Download** this repository/directory.
2. Ensure you have **Python 3.x** installed.
3. **Install the required dependencies** (you may want to do this in a virtual environment):
   ```bash
   pip install streamlit numpy pandas scikit-learn joblib
   ```

## Running the Application

To run the Streamlit app locally:

```bash
streamlit run App.py
```

This will start a local server, and you can interact with the web interface in your browser (typically at http://localhost:8501).

## Usage

1. Open the application in your browser.
2. Enter the requested real data inputs, including geographical features (Latitude, Longitude), Year, Observation parameters (Count, Percent, Completeness, etc.), Pollutant Type, and Sample Duration.
3. Click the **"Predict"** button.
4. The application will output an indicator showing whether the air quality is "Good ✅" or "Bad ❌".

## Under the Hood

The predictive pipeline applies the following transformations to the user inputs:
1. Formats and scales features utilizing the pre-trained `scaler.pkl`.
2. Applies Principal Component Analysis via `pca.pkl` to transform features into the reduced space trained on the original variables.
3. Feeds the resulting data to the `random_forest_model.pkl` to yield the final classification.
