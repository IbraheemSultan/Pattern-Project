import streamlit as st
import numpy as np
import joblib

# load
model = joblib.load("random_forest_model.pkl")
scaler = joblib.load("scaler.pkl")
pca = joblib.load("pca.pkl")

st.title("Air Quality Classification")

st.write("Enter Real Data Inputs:")

# =========================
# ORIGINAL INPUTS (بدون قيود)
# =========================

latitude = st.number_input("Latitude")
longitude = st.number_input("Longitude")
year = st.number_input("Year")

observation_count = st.number_input("Observation Count")
observation_percent = st.number_input("Observation Percent")

completeness_indicator = st.selectbox("Completeness", ["Y", "N"])

valid_day_count = st.number_input("Valid Day Count")
required_day_count = st.number_input("Required Day Count")

exceptional_data_count = st.number_input("Exceptional Data Count")
null_data_count = st.number_input("Null Data Count")
num_obs_below_mdl = st.number_input("Num Obs Below MDL")

arithmetic_standard_dev = st.number_input("Std Dev")

parameter_name = st.selectbox("Pollutant Type", [
    'Ozone',
    'PM2.5 - Local Conditions',
    'PM10 Total 0-10um STP',
    'Sulfur dioxide',
    'Carbon monoxide',
    'Nitrogen dioxide (NO2)',
    'Other'
])

sample_duration = st.selectbox("Sample Duration", [
    "1 HOUR", "3 HOUR", "8-HR", "24 HOUR", "WEEK"
])

event_type = st.selectbox("Event Type", [
    "No Events", "Event"
])

# =========================
# TRANSFORMATIONS
# =========================

valid_pollutants = [
    'Ozone',
    'PM2.5 - Local Conditions',
    'PM10 Total 0-10um STP',
    'Sulfur dioxide',
    'Carbon monoxide',
    'Nitrogen dioxide (NO2)'
]

is_pollutant = 1 if parameter_name in valid_pollutants else 0

def convert_duration(x):
    if "24" in x:
        return 24
    elif "1 HOUR" in x:
        return 1
    elif "8" in x:
        return 8
    elif "3" in x:
        return 3
    elif "WEEK" in x:
        return 168
    else:
        return 24

sample_duration_num = convert_duration(sample_duration)

event_flag = 0 if event_type == "No Events" else 1
completeness_indicator = 1 if completeness_indicator == "Y" else 0

# =========================
# PREDICTION
# =========================

if st.button("Predict"):

    data = np.array([[latitude, longitude, year,
                      observation_count, observation_percent,
                      completeness_indicator, valid_day_count,
                      required_day_count, exceptional_data_count,
                      null_data_count, num_obs_below_mdl,
                      arithmetic_standard_dev, is_pollutant,
                      sample_duration_num, event_flag]])

    data_scaled = scaler.transform(data)
    data_pca = pca.transform(data_scaled)

    prediction = model.predict(data_pca)

    result = "Good ✅" if prediction[0] == 0 else "Bad ❌"

    st.success(f"Air Quality: {result}")