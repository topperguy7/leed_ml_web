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
