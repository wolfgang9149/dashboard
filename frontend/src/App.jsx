import { useState, useEffect } from 'react';
import SensorChart from './components/SensorChart';
import Navbar from './components/Navbar';
import FlightStageTab from './components/FlightStageTab';
import TimeTab from './components/TimeTab';
import EnvironmentSensorTab from './components/EnvironmentSensorTab';
import TelemetrySensorTab from './components/TelemetrySensorTab';
import TemperatureChart from './components/TemperatureChart';
import SpectChart from './components/SpectChart';
import HumidityChart from './components/HumidityChart';

function App() {
  const [spectData, setSpectData] = useState([]);
  const [flightStage, setFlightStage] = useState(null);
  const [envSensor, setEnvSensor] = useState(null);
  const [teleSensor, setTeleSensor] = useState(null);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);

  useEffect(() => {
    getTempData();
    getSpectData();
    getHumidityData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getTempData() {
    const response = await fetch('http://localhost:4001/mission/data/temp');
    const data = await response.json();
    setTempData(data);
    console.log(tempData);
  }

  async function getSpectData() {
    const response = await fetch('http://localhost:4001/mission/data/spect');
    const data = await response.json();
    setSpectData(data);
    console.log(spectData);
  }

  async function getHumidityData() {
    const response = await fetch('http://localhost:4001/mission/data/humidity');
    const data = await response.json();
    setHumidityData(data);
  }

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-3 grid-rows-3 gap-2 p-2 lg:p-8 bg-[#13253f]'>
        <div className='col-start-1 col-span-2 row-span-3  h-[300px]'>
          <div className='bg-gray-300'>Image placeholder</div>
        </div>
        <div className='flex'>
          <div className='col-start-3 col-span-1 row-span-1 flex justify-center'>
            <TimeTab />
          </div>
          <div className='col-start-3 col-span-1 row-span-1  flex justify-center'>
            <FlightStageTab flightStage={flightStage} />
          </div>
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <h3 className='text-white text-[1.5rem] my-2'>Humidity/Time Graph</h3>
          <HumidityChart humidityData={humidityData} />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <h3 className='text-white text-[1.5rem] my-2'>Temperature/Time Graph</h3>
          <TemperatureChart tempData={tempData} />
        </div>
      </div>

      <SpectChart spectData={spectData} />
    </>
  );
}

export default App;
