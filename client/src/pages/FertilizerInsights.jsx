import React, { useState } from "react";

const FertilizerInsights = () => {
  const [soilType, setSoilType] = useState("");
  const [plantType, setPlantType] = useState("");
  const [recommendation, setRecommendation] = useState("");

  const guidelines = {
    Loamy: {
      Rice: "Apply 120 kg N, 60 kg P₂O₅, and 40 kg K₂O per hectare.",
      Wheat: "Apply 100 kg N, 50 kg P₂O₅, and 30 kg K₂O per hectare.",
    },
    Sandy: {
      Maize: "Apply 80 kg N, 40 kg P₂O₅, and 20 kg K₂O per hectare.",
      Peanut: "Apply 20 kg N, 40 kg P₂O₅, and 40 kg K₂O per hectare.",
    },
    Clay: {
      Cotton: "Apply 150 kg N, 75 kg P₂O₅, and 60 kg K₂O per hectare.",
      Soybean: "Apply 20 kg N, 60 kg P₂O₅, and 40 kg K₂O per hectare.",
    },
  };

  const handleCheck = () => {
    if (guidelines[soilType] && guidelines[soilType][plantType]) {
      setRecommendation(guidelines[soilType][plantType]);
    } else {
      setRecommendation("No guideline available for this combination.");
    }
  };

  return (
    <div style={{ padding: "30px", color: "#fff", backgroundColor: "#1a1a2e", minHeight: "100vh" }}>
      <h1>🌱 FAO Fertilizer Guidelines</h1>
      <p>Select your soil and plant type to get standard fertilizer recommendations.</p>

      <div style={{ marginBottom: "20px" }}>
        <label>Soil Type: </label>
        <select value={soilType} onChange={(e) => setSoilType(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Loamy">Loamy</option>
          <option value="Sandy">Sandy</option>
          <option value="Clay">Clay</option>
        </select>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <label>Plant Type: </label>
        <select value={plantType} onChange={(e) => setPlantType(e.target.value)}>
          <option value="">-- Select --</option>
          <option value="Rice">Rice</option>
          <option value="Wheat">Wheat</option>
          <option value="Maize">Maize</option>
          <option value="Peanut">Peanut</option>
          <option value="Cotton">Cotton</option>
          <option value="Soybean">Soybean</option>
        </select>
      </div>

      <button onClick={handleCheck} style={{ padding: "10px 20px", background: "#4caf50", border: "none", color: "#fff", borderRadius: "5px" }}>
        Get Recommendation
      </button>

      {recommendation && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#222", borderRadius: "5px" }}>
          <h3>Recommendation:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  );
};

export default FertilizerInsights;
