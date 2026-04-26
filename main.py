from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import joblib

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# تحميل الموديلات
scaler = joblib.load("scaler.pkl")
pca = joblib.load("pca.pkl")
model = joblib.load("random_forest_model.pkl")

# شكل البيانات اللي جاية من الفرونت
class InputData(BaseModel):
    latitude: float
    longitude: float
    year: int
    observation_count: float
    observation_percent: float
    completeness_indicator: int
    valid_day_count: float
    required_day_count: float
    exceptional_data_count: float
    null_data_count: float
    num_obs_below_mdl: float
    std_dev: float
    pollutant_type: int
    sample_duration: int
    event_type: int


@app.post("/predict")
def predict(data: InputData):
    try:
        # تحويل البيانات لـ array
        input_array = np.array([[
            data.latitude,
            data.longitude,
            data.year,
            data.observation_count,
            data.observation_percent,
            data.completeness_indicator,
            data.valid_day_count,
            data.required_day_count,
            data.exceptional_data_count,
            data.null_data_count,
            data.num_obs_below_mdl,
            data.std_dev,
            data.pollutant_type,
            data.sample_duration,
            data.event_type
        ]])

        # preprocessing
        scaled = scaler.transform(input_array)
        reduced = pca.transform(scaled)

        # prediction
        prediction = model.predict(reduced)[0]
        
        print("Received Data:", input_array)
        print("Scaled:", scaled)
        print("Reduced:", reduced)
        print("Raw Prediction:", prediction)

        result = "Good" if prediction == 0 else "Bad"

        return {
            "prediction": result
        }

    except Exception as e:
        return {"error": str(e)}