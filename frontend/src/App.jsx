import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FlightStageTab from './components/FlightStageTab';
import TimeTab from './components/TimeTab';
import TemperatureChart from './components/TemperatureChart';
import SpectChart from './components/SpectChart';
import HumidityChart from './components/HumidityChart';
import PressureChart from './components/PressureChart';

function App() {
  const [spectData, setSpectData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pressureData, setPressureData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  // Single API call for all data points, query limited to 50
  async function getData() {
    const response = await fetch('http://localhost:4001/mission/data?limit=50');
    const data = await response.json();

    const temperatureArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      temperature: entry.temperature
    }));

    const humidityArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      humidity: entry.humidity
    }));

    const pressureArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      pressure: entry.pressure / 1000
    }));

    const spectArr = data.map((entry) => ({
      dateTime: entry.dateTime,
      spectV: entry.spectV,
      spectB: entry.spectB,
      spectG: entry.spectG,
      spectY: entry.spectY,
      spectD: entry.spectD,
      spectR: entry.spectR
    }));

    setTempData(temperatureArr);
    setHumidityData(humidityArr);
    setPressureData(pressureArr);
    setSpectData(spectArr);
  }

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-3 grid-rows-[325px_325px_500px] gap-2 p-2 lg:p-8 bg-[#13253f]'>
        <div className='h-[300px]'>
          <div className='bg-gray-300'>Image placeholder</div>
        </div>
        {/* <div className='flex'>
          <div className='col-start-3 col-span-1 row-span-1 flex justify-center'>
            <TimeTab />
          </div>
          <div className='col-start-3 col-span-1 row-span-1  flex justify-center'>
            <FlightStageTab />
          </div>
        </div> */}
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <h3 className='text-white text-[1.5rem] my-2'>Pressure/Time Graph</h3>
          <PressureChart pressureData={pressureData} />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <h3 className='text-white text-[1.5rem] my-2'>Humidity/Time Graph</h3>
          <HumidityChart humidityData={humidityData} />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <h3 className='text-white text-[1.5rem] my-2'>Temperature/Time Graph</h3>
          <TemperatureChart tempData={tempData} />
        </div>
        <div className='col-start-1 col-span-2 row-span-2 row-start-3 flex flex-col text-center'>
          <h3 className='text-white text-[1.5rem] my-2'>Spectral Chart</h3>
          <SpectChart spectData={spectData} />
        </div>
      </div>


    </>
  );
}

export default App;
