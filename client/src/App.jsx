
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [formData, setFormData] = useState({
    age: "",
    accidents: "",
    carType: "safe",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://insurance-calculator-s9wh.onrender.com/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: Number(formData.age),
          accidents: Number(formData.accidents),
          carType: formData.carType,
        }),
      });

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error calculating risk. Make sure the backend is running.");
    }
  };

  const getRiskLevel = (score) => {
    if (score <= 30) return "Low Risk";
    if (score <= 70) return "Moderate Risk";
    return "High Risk";
  };

  const getRiskColor = (score) =>
    score <= 30 ? "green" : score <= 70 ? "orange" : "red";

  return (
    <div
      style={{
        maxWidth: "450px",
        margin: "40px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Insurance Risk</h1>
      <h1 style={{ textAlign: "center" }}>Calculator</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <label>
          <strong>Age of Policyholder</strong>
          <input
            type="number"
            name="age"
            placeholder="e.g., 35"
            value={formData.age}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>

        <label>
          <strong>Number of Reported Accidents</strong>
          <input
            type="number"
            name="accidents"
            placeholder="e.g., 2"
            value={formData.accidents}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          />
        </label>

        <label>
          <strong>Vehicle Risk Classification</strong>
          <select
            name="carType"
            value={formData.carType}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", marginTop: "5px" }}
          >
            <option value="safe">Safe</option>
            <option value="average">Average</option>
            <option value="sports">Sports</option>
          </select>
        </label>

        <button
          onClick={handleSubmit}
          style={{
            padding: "10px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Calculate Risk
        </button>
      </div>

      {result && (
        <div
          style={{
            marginTop: "30px",
            padding: "20px",
            border: "1px solid #ccc",
            borderRadius: "10px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <h2 style={{ textAlign: "center" }}>Risk Analysis Results</h2>

          <p>
            <strong>Risk Score:</strong> {result.riskScore}
          </p>

          <p style={{ color: getRiskColor(result.riskScore), fontWeight: "bold" }}>
            <strong>Risk Level:</strong> {getRiskLevel(result.riskScore)}
          </p>

          <div
            style={{
              background: "#ddd",
              borderRadius: "10px",
              overflow: "hidden",
              height: "20px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                width: `${Math.min(result.riskScore, 100)}%`,
                background: getRiskColor(result.riskScore),
                height: "100%",
              }}
            />
          </div>

          <p>
            <strong>Estimated Premium:</strong> ${result.premium}
          </p>

          <p style={{ fontSize: "0.8em", color: "#555" }}>
            This estimate is based on assumed risk weights. Real actuarial models
            use historical data and statistical calibration.
          </p>

          {/* Bar Chart */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ textAlign: "center" }}>Risk Component Breakdown</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={[
                  { name: "Age", value: result.ageRisk },
                  { name: "Accidents", value: result.accidentRisk },
                  { name: "Vehicle Type", value: result.carTypeRisk },
                ]}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;