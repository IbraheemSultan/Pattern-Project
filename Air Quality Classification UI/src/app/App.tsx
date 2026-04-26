import { useState, FormEvent } from "react";
import { Wind, Loader2 } from "lucide-react";
import { FormInput } from "./components/FormInput";
import { FormSelect } from "./components/FormSelect";
import { ResultCard } from "./components/ResultCard";

interface FormData {
  latitude: string;
  longitude: string;
  year: string;
  observationCount: string;
  observationPercent: string;
  completenessIndicator: string;
  validDayCount: string;
  requiredDayCount: string;
  exceptionalDataCount: string;
  nullDataCount: string;
  numObsBelowMDL: string;
  standardDeviation: string;
  pollutantType: string;
  sampleDuration: string;
  eventType: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    latitude: "",
    longitude: "",
    year: "",
    observationCount: "",
    observationPercent: "",
    completenessIndicator: "Yes",
    validDayCount: "",
    requiredDayCount: "",
    exceptionalDataCount: "",
    nullDataCount: "",
    numObsBelowMDL: "",
    standardDeviation: "",
    pollutantType: "Ozone",
    sampleDuration: "8 Hours",
    eventType: "None",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState<"Good" | "Bad" | null>(null);

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrediction(null);

    try {
      const dataPayload = {
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        year: parseInt(formData.year) || new Date().getFullYear(),
        observation_count: parseFloat(formData.observationCount) || 0,
        observation_percent: parseFloat(formData.observationPercent) || 0,
        completeness_indicator: formData.completenessIndicator === "Yes" ? 1 : 0,
        valid_day_count: parseFloat(formData.validDayCount) || 0,
        required_day_count: parseFloat(formData.requiredDayCount) || 0,
        exceptional_data_count: parseFloat(formData.exceptionalDataCount) || 0,
        null_data_count: parseFloat(formData.nullDataCount) || 0,
        num_obs_below_mdl: parseFloat(formData.numObsBelowMDL) || 0,
        std_dev: parseFloat(formData.standardDeviation) || 0,
        pollutant_type: 1,
        sample_duration: formData.sampleDuration === "1 Hour" ? 1 : formData.sampleDuration === "8 Hours" ? 8 : 24,
        event_type: formData.eventType === "None" ? 0 : 1,
      };
      console.log(dataPayload);

      const response = await fetch("https://ibraheemsultan-air-quality-classification.hf.space/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataPayload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setPrediction(result.prediction as "Good" | "Bad");
    } catch (error) {
      console.error("Error predicting:", error);
      alert("Failed to connect to the prediction server. Please make sure the backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 dark">
      <div className="size-full flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Wind className="w-12 h-12 text-blue-400" />
              <h1 className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Air Quality Classification
              </h1>
            </div>
            <p className="text-gray-400">
              Predict environmental quality using AI
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-gray-900/50 backdrop-blur-lg rounded-3xl border border-gray-800 shadow-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Location Section */}
              <div className="space-y-4">
                <h3 className="text-blue-400 pb-2 border-b border-gray-800">
                  Location & Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Latitude"
                    name="latitude"
                    type="number"
                    value={formData.latitude}
                    onChange={(v) => updateField("latitude", v)}
                    placeholder="e.g., 34.0522"
                    tooltip="Geographic latitude coordinate"
                    required
                  />
                  <FormInput
                    label="Longitude"
                    name="longitude"
                    type="number"
                    value={formData.longitude}
                    onChange={(v) => updateField("longitude", v)}
                    placeholder="e.g., -118.2437"
                    tooltip="Geographic longitude coordinate"
                    required
                  />
                </div>
                <FormInput
                  label="Year"
                  name="year"
                  type="number"
                  value={formData.year}
                  onChange={(v) => updateField("year", v)}
                  placeholder="e.g., 2024"
                  tooltip="Year of observation"
                  required
                />
              </div>

              {/* Observation Data Section */}
              <div className="space-y-4">
                <h3 className="text-blue-400 pb-2 border-b border-gray-800">
                  Observation Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Observation Count"
                    name="observationCount"
                    type="number"
                    value={formData.observationCount}
                    onChange={(v) => updateField("observationCount", v)}
                    placeholder="e.g., 365"
                    tooltip="Total number of observations recorded"
                    required
                  />
                  <FormInput
                    label="Observation Percent"
                    name="observationPercent"
                    type="number"
                    value={formData.observationPercent}
                    onChange={(v) => updateField("observationPercent", v)}
                    placeholder="e.g., 98.5"
                    tooltip="Percentage of valid observations"
                    required
                  />
                </div>
                <FormSelect
                  label="Completeness Indicator"
                  name="completenessIndicator"
                  value={formData.completenessIndicator}
                  onChange={(v) => updateField("completenessIndicator", v)}
                  options={[
                    { value: "Yes", label: "Yes" },
                    { value: "No", label: "No" },
                  ]}
                  tooltip="Indicates if data collection is complete"
                  required
                />
              </div>

              {/* Statistical Data Section */}
              <div className="space-y-4">
                <h3 className="text-blue-400 pb-2 border-b border-gray-800">
                  Statistical Data
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Valid Day Count"
                    name="validDayCount"
                    type="number"
                    value={formData.validDayCount}
                    onChange={(v) => updateField("validDayCount", v)}
                    placeholder="e.g., 350"
                    tooltip="Number of days with valid data"
                    required
                  />
                  <FormInput
                    label="Required Day Count"
                    name="requiredDayCount"
                    type="number"
                    value={formData.requiredDayCount}
                    onChange={(v) => updateField("requiredDayCount", v)}
                    placeholder="e.g., 365"
                    tooltip="Required number of observation days"
                    required
                  />
                  <FormInput
                    label="Exceptional Data Count"
                    name="exceptionalDataCount"
                    type="number"
                    value={formData.exceptionalDataCount}
                    onChange={(v) => updateField("exceptionalDataCount", v)}
                    placeholder="e.g., 2"
                    tooltip="Number of exceptional/outlier data points"
                    required
                  />
                  <FormInput
                    label="Null Data Count"
                    name="nullDataCount"
                    type="number"
                    value={formData.nullDataCount}
                    onChange={(v) => updateField("nullDataCount", v)}
                    placeholder="e.g., 5"
                    tooltip="Number of missing or null data points"
                    required
                  />
                  <FormInput
                    label="Num Obs Below MDL"
                    name="numObsBelowMDL"
                    type="number"
                    value={formData.numObsBelowMDL}
                    onChange={(v) => updateField("numObsBelowMDL", v)}
                    placeholder="e.g., 10"
                    tooltip="Observations below Minimum Detection Limit"
                    required
                  />
                  <FormInput
                    label="Standard Deviation"
                    name="standardDeviation"
                    type="number"
                    value={formData.standardDeviation}
                    onChange={(v) => updateField("standardDeviation", v)}
                    placeholder="e.g., 5.3"
                    tooltip="Standard deviation of measurements"
                    required
                  />
                </div>
              </div>

              {/* Pollutant Information Section */}
              <div className="space-y-4">
                <h3 className="text-blue-400 pb-2 border-b border-gray-800">
                  Pollutant Information
                </h3>
                <FormSelect
                  label="Pollutant Type"
                  name="pollutantType"
                  value={formData.pollutantType}
                  onChange={(v) => updateField("pollutantType", v)}
                  options={[
                    { value: "Ozone", label: "Ozone (O₃)" },
                    { value: "PM2.5", label: "PM2.5" },
                    { value: "PM10", label: "PM10" },
                    { value: "SO2", label: "Sulfur Dioxide (SO₂)" },
                    { value: "CO", label: "Carbon Monoxide (CO)" },
                    { value: "NO2", label: "Nitrogen Dioxide (NO₂)" },
                  ]}
                  tooltip="Type of air pollutant being measured"
                  required
                />
                <FormSelect
                  label="Sample Duration"
                  name="sampleDuration"
                  value={formData.sampleDuration}
                  onChange={(v) => updateField("sampleDuration", v)}
                  options={[
                    { value: "1 Hour", label: "1 Hour" },
                    { value: "8 Hours", label: "8 Hours" },
                    { value: "24 Hours", label: "24 Hours" },
                  ]}
                  tooltip="Duration of each air quality sample"
                  required
                />
                <FormSelect
                  label="Event Type"
                  name="eventType"
                  value={formData.eventType}
                  onChange={(v) => updateField("eventType", v)}
                  options={[
                    { value: "None", label: "None" },
                    { value: "Special Event", label: "Special Event" },
                  ]}
                  tooltip="Special environmental events affecting measurements"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wind className="w-5 h-5" />
                    Predict Air Quality
                  </>
                )}
              </button>
            </form>

            {/* Result Display */}
            {prediction && !isLoading && (
              <div className="mt-8">
                <ResultCard result={prediction} />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center text-gray-500">
            <p>Powered by Advanced AI Models</p>
            <p className="mt-1">Environmental Research Team © 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
}