import { useState, useEffect } from 'react';
import SensorChart from './components/SensorChart';
import Navbar from './components/Navbar';
import FlightStageTab from './components/FlightStageTab';
import TimeTab from './components/TimeTab';
import EnvironmentSensorTab from './components/EnvironmentSensorTab';
import TelemetrySensorTab from './components/TelemetrySensorTab';
import TemperatureChart from './components/TemperatureChart';

function App() {
  const [spectData, setSpectData] = useState(null);
  const [flightStage, setFlightStage] = useState(null);
  const [envSensor, setEnvSensor] = useState(null);
  const [teleSensor, setTeleSensor] = useState(null);
  const [counter, setCounter] = useState(0);
  const [tempData, setTempData] = useState([])

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  async function getData() {
    const response = await fetch('http://localhost:4001/mission/data/temp');
    const data = await response.json();
    setTempData(data.slice(-60))
    console.log(tempData)
  }

  return (
    <>
      <Navbar />
      <div className='grid grid-cols-3 grid-rows-3 gap-2 p-2 lg:p-8 bg-gray-300 '>
        <div className='col-start-1 col-span-2 row-span-3  h-[300px]'>
          <div className='bg-gray-300'>Image placeholder</div>
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex justify-center'>
          <TimeTab />
        </div>
        <div className='col-start-3 col-span-1 row-span-1  flex justify-center'>
          <FlightStageTab flightStage={flightStage} />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex justify-center'>
          <EnvironmentSensorTab envSensor={envSensor} />
        </div>
        <div className='col-start-3 col-span-1 row-span-1 flex justify-center'>
          <TelemetrySensorTab teleSensor={teleSensor} />
        </div>
      </div>
      <SensorChart data={spectData} />
      <TemperatureChart tempData={ tempData }/>
    </>
  );
}

export default App;
