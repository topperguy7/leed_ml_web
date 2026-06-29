"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const onnxruntime_node_1 = require("onnxruntime-node");
const PORT = process.env.PORT || 8000;
const app = (0, express_1.default)();
const corsOption = {
    origin: '*',
    methods: ['POST', 'GET', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
    optionsSuccessStatus: 200
};
app.use((0, cors_1.default)(corsOption));
app.use(express_1.default.json());
let leedSession = null;
async function initializeModel() {
    try {
        const modelPath = path_1.default.resolve(__dirname, '../../Leed_Model/leed_classifier.onnx');
        leedSession = await onnxruntime_node_1.InferenceSession.create(modelPath);
        console.log("Leed Model Successfully loaded into memory");
    }
    catch (err) {
        console.error("Failed to initialize ONNX session:", err);
        process.exit(1);
    }
}
app.post('/leed-prediction', async (req, res) => {
    try {
        const buildingData = req.body;
        if (!leedSession) {
            return res.status(500).json({ success: false, error: "Model session is not ready yet." });
        }
        const featurePayload = [
            Number(buildingData.Building_Area_sqft),
            Number(buildingData.floors),
            Number(buildingData.Building_Age_Years),
            Number(buildingData.Energy_Consumption_kWh),
            Number(buildingData.Water_Consumption_Liters),
            Number(buildingData.Average_Temperature_C),
            Number(buildingData.Annual_Rainfall_mm),
            Number(buildingData.Solar_Radiation_kWh_m2),
            Number(buildingData.Humidity_Percent),
            Number(buildingData.Urban_Density_Index),
            Number(buildingData.Public_Transport_Access_Score),
            Number(buildingData.Green_Cover_Percent),
            Number(buildingData.Renewable_Energy_Usage_Percent)
        ];
        const inputShape = [1, 13];
        const float32Data = new Float32Array(featurePayload);
        const inputTensor = new onnxruntime_node_1.Tensor('float32', float32Data, inputShape);
        const feeds = { building_inputs: inputTensor };
        const outputMap = await leedSession.run(feeds);
        const outputNames = Object.keys(outputMap);
        const primaryOutputNode = outputMap[outputNames[0]];
        if (!primaryOutputNode || !primaryOutputNode.data) {
            throw new Error(`Could not locate tensor data block on node: ${outputNames[0]}`);
        }
        const predictedIndex = Number(primaryOutputNode.data[0]);
        const category = [
            "Certified",
            "Gold",
            "Not Certified",
            "Platinum",
            "Silver"
        ];
        const predictedCategory = category[predictedIndex] || "Error at predicted Index Wrong Output";
        return res.json({
            success: true,
            prediction: predictedCategory
        });
    }
    catch (err) {
        console.error("Inference Error:", err);
        return res.status(500).json({ success: false, error: "Prediction processing failed." });
    }
});
initializeModel().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is started on port ${PORT}`);
    });
});
