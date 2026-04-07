const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

function calculateRisk(data) {
  let score = 0;

  // Age factor
  if (data.age < 25) score += 30;
  else if (data.age < 60) score += 10;
  else score += 20;

  // Accident history
  score += data.accidents * 15;

  // Car type
  if (data.carType === "sports") score += 30;
  if (data.carType === "average") score += 15;
  if (data.carType === "safe") score += 5;

  return score;
}

function calculatePremium(score) {
  const base = 500;
  return base + score * 10;
}

app.post("/calculate", (req, res) => {
  const { age, accidents, carType } = req.body;

  let ageRisk = 0;
  if (age < 25) ageRisk = 30;
  else if (age < 60) ageRisk = 10;
  else ageRisk = 20;

  let accidentRisk = accidents * 15;

  let carTypeRisk = 0;
  if (carType === "sports") carTypeRisk = 30;
  else if (carType === "average") carTypeRisk = 15;
  else carTypeRisk = 5;

  const riskScore = ageRisk + accidentRisk + carTypeRisk;

  const premium = 500 + riskScore * 10;

  res.json({ riskScore, premium, ageRisk, accidentRisk, carTypeRisk });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});