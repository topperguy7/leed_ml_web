import React, { useState } from 'react'
import type {JSX} from 'react';

function App():JSX.Element {
  const [Building_Area_sqft, setBuilding_Area_sqft] = useState<string>("");
  const [Building_Age_Years, setBuilding_Age_Years] = useState<string>("");
  const [Floors, setFloors] = useState<string>("");
  const [Energy_Consumption_kWh, setEnergy_Consumption_kWh] = useState<string>("");
  const [Water_Consumption_Liters, setWater_Consumption_Liters] = useState<string>("");
  const [Solar_Radiation_kWh_m2, setSolar_Radiation_kWh_m2] = useState<string>("");
  const [Renewable_Energy_Usage_Percent, setRenewable_Energy_Usage_Percent] = useState<string>("");
  const [Average_Temperature_C, setAverage_Temperature_C] = useState<string>("");
  const [Annual_Rainfall_mm, setAnnual_Rainfall_mm] = useState<string>("");
  const [Humidity_Percent, setHumidity_Percent] = useState<string>("");
  const [Green_Cover_Percent, setGreen_Cover_Percent] = useState<string>("");
  const [Urban_Density_Index, setUrban_Density_Index] = useState<string>("");
  const [Public_Transport_Access_Score, setPublic_Transport_Access_Score] = useState<string>("");

  const [Prediction, setPrediction] = useState<string>("");
  const [Error, setError] = useState<string>("");

  const [aboutModal, setAboutModal] = useState<boolean>(false);
  const [instrutionModal, setInstructionModal] = useState<boolean>(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void>=> {
    e.preventDefault();

    const payload = {
      Building_Area_sqft: Number(Building_Area_sqft),
      floors: Number(Floors),
      Building_Age_Years: Number(Building_Age_Years),
      Energy_Consumption_kWh: Number(Energy_Consumption_kWh),
      Water_Consumption_Liters: Number(Water_Consumption_Liters),
      Average_Temperature_C: Number(Average_Temperature_C),
      Annual_Rainfall_mm: Number(Annual_Rainfall_mm),
      Solar_Radiation_kWh_m2: Number(Solar_Radiation_kWh_m2),
      Humidity_Percent: Number(Humidity_Percent),
      Urban_Density_Index: Number(Urban_Density_Index),
      Public_Transport_Access_Score: Number(Public_Transport_Access_Score),
      Green_Cover_Percent: Number(Green_Cover_Percent),
      Renewable_Energy_Usage_Percent: Number(Renewable_Energy_Usage_Percent)
    };

    try{
      const response = await fetch("http://localhost:8000/leed-prediction", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();

      if(data.success){
        setPrediction(data.prediction);
      } else{
        setPrediction("No Prediction");
      }
    } catch (err){
      console.log(err);
      setError("Request failed");
    }
  }

  return (
    <>
      
      {/* Header */}
      <div className='flex justify-center p-2 bg-green-800 mb-4 lg:mb-8'>
        <h1 className='text-3xl lg:text-6xl text-white font-bold border-b-4'>Leed Certification Predictor</h1>
      </div>

      {/* Inputs */}
      <div className='flex justify-center'>
        
        <form className='flex flex-col justify-center gap-4 p-2' onSubmit={handleSubmit}>
          
          <h1 className='text-center text-4xl lg:text-6xl text-green-800 font-bold'>Building Data</h1>

          <div className='flex flex-col lg:flex-row justify-center text-xl lg:text-2xl gap-2 lg:gap-8 mb-6 lg:mb-20'>

            <div>
              <label>Building_Area_sqft</label>
              <input 
              type='number'
              required
              min={"0"}
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              value={Building_Area_sqft}
              onChange={(e) => setBuilding_Area_sqft(e.target.value)}
              placeholder='0'
              />
            </div>

            <div>
              <label>Building_Age_Years</label>
              <input 
              type='number'
              required
              min={"0"}
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              value={Building_Age_Years}
              onChange={(e) => setBuilding_Age_Years(e.target.value)}
              placeholder='0'
              />
            </div>

            <div>
              <label>Floors</label>
              <input 
              type='number'
              required
              min={"0"}
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              value={Floors}
              onChange={(e) => setFloors(e.target.value)}
              placeholder='0'
              />
            </div>

          </div>

          <h1 className='text-center text-4xl lg:text-6xl text-green-800 font-bold'>Energy Consumption</h1>

          <div className='flex flex-col lg:flex-row justify-center text-xl lg:text-2xl gap-2 lg:gap-8 mb-6 lg:mb-20'>
          
            <div>
              <label>Energy_Consumption_kWh</label>
                <input 
                type='number'
                required
                min={"0"}
                className='bg-green-200 max-w-[100px] lg:max-w-[150px] py-2 m-2 rounded-md border-1'
                value={Energy_Consumption_kWh}
                onChange={(e) => setEnergy_Consumption_kWh(e.target.value)}
                placeholder='0'
                />
              </div>

              <div>
                <label>Water_Consumption_Liters</label>
                <input 
                type='number'
                required
                min={"0"}
                className='bg-green-200 max-w-[100px] lg:max-w-[150px] py-2 m-2 rounded-md border-1'
                value={Water_Consumption_Liters}
                onChange={(e) => setWater_Consumption_Liters(e.target.value)}
                placeholder='0'
                />
              </div>

              <div>
                <label>Solar_Radiation_kWh_m2</label>
                <input 
                type='number'
                required
                min={"0"}
                className='bg-green-200 max-w-[100px] lg:max-w-[150px] py-2 m-2 rounded-md border-1'
                value={Solar_Radiation_kWh_m2}
                onChange={(e)=> setSolar_Radiation_kWh_m2(e.target.value)}
                placeholder='0'
                />
              </div>

              <div>
                <label>Renewable_Energy_Usage_Percent</label>
                <input
                type='number'
                min={"0"}
                max={"100"}
                required
                className='bg-green-200 max-w-[60px] py-2 m-2 rounded-md border-1'
                placeholder='0%'
                value={Renewable_Energy_Usage_Percent}
                onChange={(e) => setRenewable_Energy_Usage_Percent(e.target.value)}
                />
              </div>
          </div>

          <h1 className='text-center text-4xl lg:text-6xl text-green-800 font-bold'>Environemnt Metrics</h1>

          <div className='flex flex-col lg:flex-row justify-center text-xl lg:text-2xl gap-2 lg:gap-8 mb-6 lg:mb-20'>

            <div>
              <label>Average_Temperature_C</label>
              <input 
              type='number'
              required
              min={"0"}
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              placeholder='0'
              value={Average_Temperature_C}
              onChange={(e) => setAverage_Temperature_C(e.target.value)}
              />
            </div>

            <div>
              <label>Annual_Rainfall_mm</label>
              <input 
              type='number'
              required
              min={"0"}
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              placeholder='0'
              value={Annual_Rainfall_mm}
              onChange={(e) => setAnnual_Rainfall_mm(e.target.value)}
              />
            </div>

            <div>
              <label>Humidity_Percent</label>
              <input 
              type='number'
              min={"0"}
              max={"100"}
              required
              className='bg-green-200 max-w-[60px] py-2 m-2 rounded-md border-1'
              placeholder='0%'
              value={Humidity_Percent}
              onChange={(e) => setHumidity_Percent(e.target.value)}
              />
            </div>

            <div>
              <label>Green_Cover_Percent</label>
              <input 
              type='number'
              required
              min={"0"}
              max={"100"}
              className='bg-green-200 max-w-[60px] py-2 m-2 rounded-md border-1'
              placeholder='0%'
              value={Green_Cover_Percent}
              onChange={(e) => setGreen_Cover_Percent(e.target.value)}
              />
            </div>

          </div>

          <h1 className='text-center text-4xl lg:text-6xl text-green-800 font-bold'>Additional Metrics</h1>

          <div className='flex flex-col lg:flex-row justify-center text-xl lg:text-2xl gap-2 lg:gap-8 mb-6'>

            <div>
              <label>Urban_Density_Index</label>
              <input 
              type='number'
              min={"0"}
              max={"10"}
              required
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              placeholder='0/10'
              value={Urban_Density_Index}
              onChange={(e) => setUrban_Density_Index(e.target.value)}
              />
            </div>

            <div>
              <label>Transport_Access_Score</label>
              <input 
              type='number'
              min={"0"}
              max={"10"}
              required
              className='bg-green-200 max-w-[150px] py-2 m-2 rounded-md border-1'
              placeholder='0/10'
              value={Public_Transport_Access_Score}
              onChange={(e) => setPublic_Transport_Access_Score(e.target.value)}
              />
            </div>

          </div>

          <button className='bg-green-800 border-6 border-yellow-400 text-3xl lg:text-6xl px-6 py-3 text-white rounded-xl mx-w-[200px] lg:max-w-[300px] mx-auto shadow-2xl 
          cursor-pointer hover:-translate-y-1 hover:bg-green-600 active:bg-green-800 active:scale-95 ease-in-out transition-all mb-6'
          type='submit'
          >Submit</button>

        </form>

      </div>

      {/* Output */}
      <div className='flex justify-center font-semibold text-xl lg:text-4xl px-4 mb-4 lg:mb-10'>
        {Error ? (
          <h1>Error Occured: <span className='text-red-600'>{Error}</span></h1>
          ) : Prediction ? (
            <h1 >Predicited Class: <span className='text-blue-700'>{Prediction}</span></h1>
          ) : <h1>Enter parameters and press submit to get prediction</h1>}
      </div>

      {/* Footer */}
      <div className='max-w-full bg-green-800 p-4 lg:p-5 text-center'>
        <h1 className='text-xl lg:text-2xl mb-2 text-white'>All Right Reserved @ 2026</h1>
        <div className='flex justify-center gap-4 text-xl lg:text-2xl'>
          <button
          onClick={() => setAboutModal(true)}
          className='bg-yellow-300 p-1 rounded-lg border-1 cursor-pointer hover:-translate-y-1 hover:bg-yellow-400 active:bg-yellow-300 active:scale-95 ease-in-out transition-all'
          >About</button>
          <button 
          onClick={() => setInstructionModal(true)}
          className='bg-yellow-300 p-1 rounded-lg border-1 cursor-pointer hover:-translate-y-1 hover:bg-yellow-400 active:bg-yellow-300 active:scale-95 ease-in-out transition-all'>Instructions</button>
        </div>
      </div>

      {/* About */}
      {aboutModal && (
        <div onClick={() => setAboutModal(false)} className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
          <div onClick={(e) => e.stopPropagation()} className='max-w-[350px] lg:max-w-[1100px] border-2 lg:border-4 rounded-xl'>

            <div className='relative bg-green-800 text-white rounded-lg p-2 lg:p-4 border-b-2 lg:border-b-4 border-red-200'>
              <h1 className='text-center text-base lg:text-3xl font-bold'>About the LEED Certification Predictor</h1>
              <button 
              onClick={() => setAboutModal(false)}
              className='absolute top-1 right-2 lg:top-2 lg:right-5 font-bold text-xl lg:text-4xl hover:text-yellow-500'>&times;</button>
            </div>

            <div className='p-2'>

              <h1 className='text-lg lg:text-2xl font-semibold lg:my-2'>What is this application?</h1>
              <p className='text-md lg:text-xl my-5 lg:my-8'>The LEED Certification Predictor is a sustainability tool engineered to evaluate
                structure configurations against ecological baselines. By submitting localized engineering
                parameters, environmental indexes, and consumption rates, our predictive system calculates
                the likelihood of a facility achieving specific tiers of green building certification.
              </p>
              
              <h1 className='text-lg lg:text-2xl font-semibold lg:my-2'>What is LEED?</h1>
              <p className='text-md lg:text-xl my-5 lg:my-8'>Leadership in Energy and Environmental Design (LEED) is the most widely 
                recognized green building rating framework globally. It provides an official verification architecture for 
                highly efficient, cost-saving, and healthy sustainable structures.
              </p>

              <h1 className='text-lg lg:text-2xl font-semibold lg:my-2'>System Engine</h1>
              <p className='text-md lg:text-xl my-5 lg:my-8'>
                Predictions are computed through a classification backend analyzing operational parameters against benchmarked parameters.
              </p>
            </div>
          
          </div>
        </div>
      )}

      {/*Instructions Modal*/}
      {instrutionModal && (
        <div onClick={() => setInstructionModal(false)} className='fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm'>
          <div onClick={(e) => e.stopPropagation()} className='max-w-[350px] lg:max-w-[1100px] border-2 lg:border-4 rounded-xl'>

            <div className='relative bg-green-800 text-white rounded-lg p-2 lg:p-4 border-b-2 lg:border-b-4 border-red-200'>
              <h1 className='text-center text-base lg:text-3xl font-bold'>Instructions</h1>
              <button 
              onClick={() => setInstructionModal(false)}
              className='absolute top-1 right-2 lg:top-2 lg:right-5 font-bold text-xl lg:text-4xl hover:text-yellow-500'>&times;</button>
            </div>

            <div className='p-2'>

              <ul>
                <li className='text-lg lg:text-2xl my-5 lg:my-8'>1. Enter Building Parameters: Fill in the physical data dimensions, including internal area (sqft), structural age, and total story floors.</li>

                <li className='text-lg lg:text-2xl my-5 lg:my-8'>2. Input Resource Metrics: Input annual electrical consumption (kWh) and water metrics along with your clean energy generation percentage (0-100%).</li>

                <li className='text-lg lg:text-2xl my-5 lg:my-8'>3. Add Climate Indexes: Provide local environmental averages for regional temperature, annual rainfall parameters, and green canopy cover.</li>

                <li className='text-lg lg:text-2xl my-5 lg:my-8'>4. Submit for Estimation: Click the yellow-bordered Submit button to process the parameters and calculate the target LEED tier ranking.</li>
              </ul>
            </div>

          </div>
        </div>
      )}

    </>
  )
}

export default App
