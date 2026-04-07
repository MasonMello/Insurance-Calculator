# Insurance Risk Calculator

## Overview
This project is a full-stack web application that estimates an insurance premium based on user-specific risk factors. 
It was built as an introductory actuarial-style project to apply programming skills to real-world risk modeling problems.

The application calculates a risk score using inputs such as age, accident history, and vehicle type, and converts that 
score into an estimated insurance premium. It also provides a visual breakdown of how each factor contributes to overall risk.

---

## Features
- User-friendly interface for entering risk factors
- Risk score calculation based on weighted inputs
- Estimated insurance premium output
- Risk classification (Low, Moderate, High)
- Visual breakdown of risk components using a bar chart
- Full-stack implementation with API communication

---

## How It Works
1. The user inputs:
   - Age
   - Number of reported accidents
   - Vehicle risk classification

2. The backend processes the data:
   - Each input is assigned a risk weight
   - A total risk score is calculated
   - The score is converted into a premium estimate

3. The frontend displays:
   - Risk score
   - Risk level classification
   - Estimated premium
   - Graph showing contribution of each risk factor

---

## Tech Stack
**Frontend**
- React (Vite)

**Backend**
- Node.js
- Express

**Data Visualization**
- Recharts

---
