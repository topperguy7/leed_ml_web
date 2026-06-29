<h1>LEED Certification Predictor</h1>

An end-to-end web application that evaluates building configurations and predicts their likelihood of achieving different tiers of LEED (Leadership in Energy and Environmental Design) green building certification.

The project features an interactive React (TypeScript) frontend that captures architectural and environmental metrics, and a robust Node.js / Express (TypeScript) backend that runs real-time machine learning inference using ONNX Runtime Node.
<hr>

<h2>🚀 Features</h2>

<li>Comprehensive Data Input: Collects critical data across multiple sustainable categories: building dimensions, energy consumption, environmental/climate indices, and urban metrics.</li>

<li>Real-time Prediction: Connects seamlessly to a local backend API to process inputs and return the predicted LEED certification class.</li>

<li>Informational Modals: Features built-in "About" and "Instructions" overlays to educate users on LEED certification standards and guide input accuracy.</li>

<li>Responsive UI: Built with Tailwind CSS, offering a clean, modern, and mobile-friendly design using an eco-friendly green palette.</li>
<hr>

<h2>🏗️ Project Architecture</h2>

The application operates as a decoupled Full-Stack system:

<li>Frontend: React + TypeScript form collection styled with utility-first Tailwind CSS.</li>

<li>Backend: Node.js + Express API endpoint (POST /leed-prediction) built in TypeScript.</li>

<li>ML Engine: The backend loads an exported TreeEnsembleClassifier model (leed_classifier.onnx) directly using onnxruntime-node to predict certifications seamlessly without needing a separate Python runtime.</li>
<hr>

<h2>🛠️ Tech Stack</h2>

Frontend
<li>React (with TypeScript)</li>
<li>Tailwind CSS</li><br>

Backend
<li>Node.js & Express (TypeScript)</li>
<li>onnxruntime-node (for low-latency model inference)</li>
<li>cors (Cross-Origin Resource Sharing middleware)</li><br>

Model & Machine Learning
<li>Model Type: Scikit-learn TreeEnsembleClassifier</li>
<li>Format: ONNX (Exported via skl2onnx v1.20.0)</li>
<hr>

<h1>📋 Input Feature Payload</h1>
The model parses a matrix of 13 numeric metrics passed from the frontend form into a 1x13 Float32Array tensor wrapper for classification:

| Tensor Index | Parameter Key | Data Type | UI Field Equivalent | Description |
| :---: | :--- | :---: | :--- | :--- |
| **0** | `Building_Area_sqft` | `number` | Internal Area (sqft) | Total indoor usable floor area in square feet. |
| **1** | `floors` | `number` | Story Floors | Total number of functional above-ground building levels. |
| **2** | `Building_Age_Years` | `number` | Structural Age | The total age of the facility structure in years. |
| **3** | `Energy_Consumption_kWh` | `number` | Annual Energy (kWh) | Cumulative annual electricity usage in kilowatt-hours. |
| **4** | `Water_Consumption_Liters` | `number` | Annual Water (Liters) | Cumulative annual indoor/outdoor water usage in liters. |
| **5** | `Average_Temperature_C` | `number` | Avg Temp (°C) | Regional baseline ambient temperature in Celsius. |
| **6** | `Annual_Rainfall_mm` | `number` | Annual Rainfall (mm) | Total regional annual precipitation height in millimeters. |
| **7** | `Solar_Radiation_kWh_m2` | `number` | Solar Radiation | Structural solar exposure footprint density ($kWh/m^2$). |
| **8** | `Humidity_Percent` | `number` | Humidity (%) | Average relative atmospheric humidity scale (0 - 100). |
| **9** | `Urban_Density_Index` | `number` | Urban Density Index | Surrounding infrastructure density ranking matrix (0 - 10). |
| **10** | `Public_Transport_Access_Score` | `number` | Transport Access Score | Proximity and density score for local transit grids (0 - 10). |
| **11** | `Green_Cover_Percent` | `number` | Green Canopy (%) | Surrounding environmental lot vegetation density (0 - 100). |
| **12** | `Renewable_Energy_Usage_Percent`| `number` | Clean Energy (%) | Ratio of building power sourced from renewable grids (0 - 100). |
