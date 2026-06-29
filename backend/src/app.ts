import path from 'path';
import express from 'express';
import cors from 'cors';
import type { Express, Request, Response } from 'express';
import {InferenceSession, Tensor} from 'onnxruntime-node';

const PORT = process.env.PORT || 8000;

const app: Express = express();

const corsOption: cors.CorsOptions = {
  origin: '*',
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOption));
app.use(express.json());

let leedSession: InferenceSession | null = null;

interface LeedRequestBody {
  Building_Area_sqft: number;
  floors: number;
  Building_Age_Years: number;
  Energy_Consumption_kWh: number;
  Water_Consumption_Liters: number;
  Average_Temperature_C: number;
  Annual_Rainfall_mm: number;
  Solar_Radiation_kWh_m2: number;
  Humidity_Percent: number;
  Urban_Density_Index: number;
  Public_Transport_Access_Score: number;
  Green_Cover_Percent: number;
  Renewable_Energy_Usage_Percent: number;
}

async function initializeModel(): Promise<void> {
  try {
    const modelPath = path.resolve(__dirname, '../../Leed_Model/leed_classifier.onnx');

    leedSession = await InferenceSession.create(modelPath);
    console.log("Leed Model Successfully loaded into memory");
  } catch (err) {
    console.error("Failed to initialize ONNX session:", err);
    process.exit(1);
  }
}

app.post('/leed-prediction', async (req: Request<{}, {}, LeedRequestBody>, res: Response): Promise<any> => {
  try {
    const buildingData = req.body;

    if (!leedSession) {
      return res.status(500).json({ success: false, error: "Model session is not ready yet." });
    }

    const featurePayload: number[] = [
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
    const inputTensor = new Tensor('float32', float32Data, inputShape);

    const feeds = { building_inputs: inputTensor };
    const outputMap = await leedSession.run(feeds);

    const outputNames = Object.keys(outputMap);
    const primaryOutputNode = outputMap[outputNames[0]];

    if (!primaryOutputNode || !primaryOutputNode.data) {
      throw new Error(`Could not locate tensor data block on node: ${outputNames[0]}`);
    }

    const predictedIndex = Number(primaryOutputNode.data[0]);

    const category:string[] = [
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

  } catch (err) {
    console.error("Inference Error:", err);
    return res.status(500).json({ success: false, error: "Prediction processing failed." });
  }
});

initializeModel().then(() => {
  app.listen(PORT, (): void => {
    console.log(`Server is started on port ${PORT}`);
  });
});