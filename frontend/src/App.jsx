import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FlightStageTab from './components/FlightStageTab';
import TimeTab from './components/TimeTab';
import TemperatureChart from './components/TemperatureChart';
import SpectChart from './components/SpectChart';
import HumidityChart from './components/HumidityChart';
import PressureChart from './components/PressureChart';
import PressureChartFull from './components/PressureChartFull';

function App() {
  const [spectData, setSpectData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [pressureData, setPressureData] = useState([]);
  const [isFullScreen, setIsFullScreen] = useState(null);
  const [fullScreenChart, setFullScreenChart] = useState(null);
  const [fullData, setFullData] = useState([]);

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
      pressure: entry.pressure
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

  async function dataGetter(name) {
    console.log('Getting data triggered');
    const response = await fetch(`http://localhost:4001/mission/data/${name}`);
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }
    const data = await response.json();

    const dataArr = await data.map((entry) => ({
      dateTime: entry.dateTime,
      [name]: entry[name]
    }));

    return dataArr;
  }

  async function handleChartClick(name) {
    console.log('Chart clicked, expanding');
    const fetchedData = await dataGetter(name);
    setFullData(fetchedData);

    switch (name) {
      case 'pressure':
        setFullScreenChart(() => <PressureChartFull pressureData={fetchedData} />);
        break;
    }

    setIsFullScreen(true);
    console.log(fullData);
  }

  function exitFullScreen() {
    setIsFullScreen(false);
    setFullScreenChart(null);
  }

  return (
    <>
      <Navbar />
      {isFullScreen && (
        <div className='flex justify-center'>
          <div className='fixed top-[5vh] p-16 w-[90vw] h-[90vh] bg-[#0c1625] z-50'>
            {fullScreenChart}
            <div
              className='absolute top-0 right-0 p-4 m-4 cursor-pointer text-white'
              onClick={exitFullScreen}
            >
              <img src='close-icon.svg' className='h-[3rem]' />
            </div>
          </div>
        </div>
      )}
      <div className='grid grid-cols-3 grid-rows-[30vh_30vh_30vh] gap-2 p-2 lg:p-8 bg-[#13253f] border-2'>
        <div className='h-[300px]'>
          <div className='bg-gray-300'>Image placeholder</div>
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex flex-col text-center'>
          <div className='flex relative justify-center align-middle place-items-center'>
            <h3 className='text-white text-[1.5rem] my-2'>Pressure/Time Graph</h3>
            <img
              src='expand-icon.svg'
              className='h-[25px] px-2 cursor-pointer absolute right-[20px]'
              onClick={() => handleChartClick('pressure')}
            />
          </div>
          <PressureChart pressureData={pressureData} dataPoints={20} />
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
          <h3 className='text-white text-[1.5rem] my-2'>Spectral Graph</h3>
          <SpectChart spectData={spectData} />
        </div>
      </div>
    </>
  );
}

export default App;
